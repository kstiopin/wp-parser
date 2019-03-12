module.exports = {
  elements: {},
  commands: [{
    loadGuild: function(guildName) {
      return this
          .api.url('https://www.wowprogress.com/guild/eu/гордунни/' + guildName)
          .waitForElementPresent('table.rating', 1000);
    }
  }]
};
