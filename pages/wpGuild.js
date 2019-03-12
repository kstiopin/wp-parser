module.exports = {
  elements: {},
  commands: [{
    load: function(guildName) {
      return this.api.url('https://www.wowprogress.com/guild/eu/гордунни/' + guildName);
    }
  }]
};
