(function() {
  /**
    Startup
  */
  window.onload = function() {
    window.router = new Router();

    Backbone.history.start({pushState: true})
  };
})();
