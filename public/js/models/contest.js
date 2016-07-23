(function() {
  var ContestModel = window.ContestModel = Backbone.Model.extend({
    idAttribute: 'slug',

    getPhotos: function () {
      if (!this._photos) {
        this._photos = new PhotoCollection([], {contest: this})
      }
      return this._photos
    },

    // Fix for empty DELETE response
    sync: function (method, model, options) {
      if (method === 'delete') {
        options.dataType = 'html';
      }
      Backbone.sync.call(this, method, model, options);
    }
  });

  var ContestCollection = window.ContestCollection = Backbone.Collection.extend({
    model: ContestModel,
    url: '/api/contests/'
  });
})();
