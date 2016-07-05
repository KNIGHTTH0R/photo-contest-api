(function () {
  window.ContestCreateWizardView = FormWizardView.extend({
    id: 'release-create-wizard',
    tagName: 'section',
    captureEscape: true,

    // refreshEvent: window.Events.RELEASES_REFRESH,
    backboneModel: ContestModel,
    title: 'New Contest',
    submitTitle: 'Create',
    properties: {},
    formTemplate: _.template([
      '<div class="form-group">',
        '<label for="name">Name</label>',
        '<input type="text" name="name" class="form-control" id="name" placeholder="Contest title" autofocus />',
        '<span class="help-block"></span>',
      '</div>',
      '<div class="form-group">',
        '<label for="tag">Hash Tag</label>',
        '<div class="input-group">',
          '<div class="input-group-addon">#</div>',
          '<input type="text" name="tag" class="form-control" id="tag" placeholder="my-hash-tag" />',
        '</div>',
        '<span class="help-block"></span>',
      '</div>',
    ].join('')),

    events: {
      'click .btn-submit': 'onSubmit',
    },

    _processData: function () {
      var formEl = this.el.querySelector('form')
      var data = {}
      for (var item in formEl.elements) {
        var el = formEl.elements.namedItem(item)
        if (el) {
          data[item] = el.value
        }
      }
      data.startedAt = Date.now()
      return Promise.resolve(data)
    }
  });
})();
