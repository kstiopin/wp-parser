const guilds = require('../data.json');
const guildResults = {};

module.exports = {
  before: function () {
    startTime = Date.now();
  },
  after: function () {
    console.log(`total time ${Date.now() - startTime}sec`, guildResults);
  },
  'Loading guilds': function(client) {
    guilds.slice(0, 1).forEach(guild => {
      const guildName = guild.name;
      guildResults[guildName] = {};
      const bossId = 589;
      guildResults[guildName][bossId] = {};
      client.page.wpGuild().loadGuild(guildName);
      client.executeAsync(function(guildName, bossId, done) {
        window._asyncResult = undefined;
        new Promise(function(resolve) {
          fetch(`https://www.wowprogress.com/guild/eu/гордунни/${guildName}?boss_kills=${bossId}`).then(response => {
            resolve(response.text());
          });
        }).then(response => {
          window._asyncResult = response;
          done(window._asyncResult);
        });
      }, [guildName, bossId], function(resp) {
        console.log(`--> Guild ${guild.name} loaded`);
        const dataRows = resp.value.split('data-aid="').slice(1);
        guildResults[guildName][bossId] = {};
        dataRows.forEach(dataRow => {
          const data = dataRow.split('" class="raidcomp_link innerLink"');
          const reportKey = data[0];
          const reportDate = data[1].split('aria-label="')[1].split('" class="hint')[0];
          guildResults[guildName][bossId][reportDate] = [];

          client.executeAsync(function(guildName, reportKey, done) {
            window._asyncResult = undefined;
            new Promise(function(resolve) {
              fetch(`https://www.wowprogress.com/guild/eu/гордунни/${guildName}?raidcomp=${reportKey}`).then(response => {
                resolve(response.text());
              });
            }).then(response => {
              window._asyncResult = response;
              done(window._asyncResult);
            });
          }, [guildName, reportKey], function(resp) {
            console.log(`---> Data for report ${reportKey} loaded`);
            const raidSetup = resp.value.split('<tr>').slice(2);
            raidSetup.forEach(characterDataRow => {
              const characterData = characterDataRow.split('<td>');
              let characterInfo = characterData[1].replace('</td>', ' ');
              const characterExtraInfo = characterData[2].replace('<a aria-label="', '').replace('</a></td>', '').split('"');
              characterInfo += characterExtraInfo[0] + characterExtraInfo[characterExtraInfo.length - 1].replace('>', ' ');
              guildResults[guildName][bossId][reportDate].push(characterInfo);
            });
          });
        });
      });
      client.end();
    });
  }
};
