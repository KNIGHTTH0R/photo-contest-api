(function() {
  /**
    Router to handle all your url to view initialization needs.
  */
  window.BaseRouter = Backbone.Router.extend({
    initialize: function() {
      this.viewStore = {} // Temporary in-memory view store
    },

    switchToSubView: function(selector) {
      var subView = document.querySelector(selector);

      if (subView) {
        var activeViews = document.querySelectorAll('.subview.active');
        for (var i = activeViews.length - 1; i >= 0; i--) {
          activeViews[i].classList.remove('active');
        };

        subView.classList.add('active');
      }
    },

    saveToStore: function() {
      var storage = this.view.saveState();
      if (this.view.storeKey && storage) {
        this.viewStore[this.view.storeKey] = storage
      }
    },

    loadFromStore: function() {
      if (this.view.storeKey && this.view.loadState && this.viewStore[this.view.storeKey]) {
        this.view.loadState(this.viewStore[this.view.storeKey])
      }
    },

    cleanUpView: function() {
      this.view.stopListening();
      this.view.$el.empty();
      this.tearDownView && this.tearDownView()
      // this.view = null;
    },

    cleanUpCollection: function() {
      this.collection.reset([]);
    },

    /**
      Override route execute
    */
    execute: function(callback, args, name) {
      this.view && this.view.storeKey && this.view.saveState && this.saveToStore();
      this.view && this.cleanUpView();
      this.collection && this.cleanUpCollection();

      if (callback) callback.apply(this, args);

      this.view && this.view.storeKey && this.view.loadState && this.loadFromStore();
    },

    onNotFound: function() {
      // Backbone.trigger(window.Events.NOTIFY, {level: 'info', message: 'Route not found.'})
      router.navigate('admin/tree/master/', {trigger: true})
    }
  });
})();
