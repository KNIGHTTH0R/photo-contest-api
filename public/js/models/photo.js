(function() {
  var PhotoModel = window.PhotoModel = Backbone.Model.extend({});

  var PhotoCollection = window.PhotoCollection = Backbone.Collection.extend({
    model: PhotoModel,
    initialize: function (data, options) {
      this.contestSlug = options.contestSlug
    },
    url: function () {
      return '/api/contests/' + this.contestSlug + '/photos/'
    }
  });
})();
