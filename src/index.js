let wpGuildPage;

module.exports = {
  before: function (client) {
    wpGuildPage = client.page.wpGuild();
    startTime = Date.now();
  },
  after: function (client) {
    console.log('total time ' + this.tags[0] + ' ' + (Date.now() - startTime) / defaultDelay + 'sec');
    client.end();
  },
  'Load test guild': function() {
    wpGuildPage.load('Ингениум');
  }
};
