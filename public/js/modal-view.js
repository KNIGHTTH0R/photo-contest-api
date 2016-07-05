(function() {
  /**
    Generic Modal view with `esc` button capture.
    Use `init` instead of `initialize` BackBone constructor.
    Properties:
    captureEscape - whether to capture `ESC` key to close the form.
  */
  window.ModalView = Backbone.View.extend({
    className: 'modal fade',
    captureEscape: true,

    initialize: function(options) {
      this.$el.on('hidden.bs.modal', this.onClose.bind(this));
      document.addEventListener('keydown', this.onKeyDown.bind(this), true);

      this.init && this.init(options);

      document.body.appendChild(this.render().el);
      this.$el.modal('show');
    },

    onKeyDown: function(ev) {
      if (this.captureEscape && ev.which === 27) {
        this.$el.modal('hide');
      }
    },

    onClose: function(ev) {
      document.removeEventListener('keyDown', this.onClose.bind(this), true);
      this.$el.removeData().unbind().undelegate();
      this.remove();
    }
  });
})();
