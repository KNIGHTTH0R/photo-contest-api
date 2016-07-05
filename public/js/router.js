(function() {
  /**
    Router to handle all your url to view initialization needs.
  */
  window.Router = BaseRouter.extend({
    routes: {
      'admin/': 'onContests',
      'admin/contests/': 'onContests',
    },

    onContests: function() {
      this.collection = new ContestCollection();
      this.view = new ContestListView({
        el: '#contests',
        collection: this.collection
      });
      this.collection.fetch({});

      this.switchToSubView('#contests');
    }
  });
})();
