(function() {
  /**
    Router to handle all your url to view initialization needs.
  */
  window.Router = BaseRouter.extend({
    routes: {
      'contests': 'onContests',
      'contests/:slug/photos': 'onPhotos',
    },

    onContests: function() {
      this.collection = new ContestCollection();
      this.view = new ContestListView({
        el: '#contests',
        collection: this.collection
      });
      this.collection.fetch({});

      this.switchToSubView('#contests');
    },

    onPhotos: function(slug) {
      this.collection = new PhotoCollection([], {contestSlug: slug});
      this.view = new PhotoListView({
        el: '#photos',
        collection: this.collection
      });
      this.collection.fetch({});

      this.switchToSubView('#photos');
    }
  });
})();
