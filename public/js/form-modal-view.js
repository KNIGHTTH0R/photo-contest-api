(function () {
  /**
    Generic Form Wizard in a modal.
    Use `init` instead of `initialize` BackBone constructor.
    Required events:
    ```
    events: {
      'click .btn-submit': 'onSubmit'
    }
    ```
    Properties:
    refreshEvent - Backbone event to trigger when success
    collection
    title - Title of modal
    properties - Render properties
    formTemplate - Template of form content
  */
  window.FormWizardView = ModalView.extend({
    tagName: 'section',
    captureEscape: true,

    refreshEvent: 'refresh',
    title: 'New Object',
    properties: {},
    submitTitle: 'Create',
    formTemplate: _.template([
      '<div class="form-group">',
        '<label for="title">Title</label>',
        '<input type="text" name="title" class="form-control" id="title" placeholder="My title" value="<%= title %>" />',
        '<span class="help-block"></span>',
      '</div>',
    ].join('')),

    template: _.template([
      '<div class="modal-dialog">',
        '<form class="form modal-content">',
          '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
            '<h4 class="modal-title"><%= title %></h4>',
          '</div>',
          '<div class="modal-body">',
            '<!--PLACEHOLDER-->',
          '</div>',
          '<div class="modal-footer">',
            '<span class="span-status pull-left"></span>',
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
            '<input type="submit" class="btn btn-primary btn-submit" value="Create" />',
          '</div>',
        '</form>',
      '</div>',
    ].join('')),

    render: function() {
      var self = this

      var html = this.template({
        url: _.result(this, 'url'),
        method: _.result(this, 'method'),
        title: _.result(this, 'title'),
      })
        .replace('<!--PLACEHOLDER-->', this.formTemplate(_.result(this, 'properties')))

      this.$el.append(html)

      return this;
    },

    onSubmit: function (ev) {
      ev.preventDefault();

      // Reset errors
      $('.help-block', this.el).html('')
      $('.has-error', this.el).removeClass('has-error')
      $('.btn-submit', this.el).attr('disabled', 1)
      $('.span-status', this.el).text('Please wait...')

      var self = this;
      this._processData()
        .then(function (formData) {
          self.collection.create(formData, {
            wait: true,
            success: function () {
              Backbone.trigger(_.result(self, 'refreshEvent'));
              self.$el.modal('hide');
            },
            error: function (model, xhr) {
              $('.span-status', self.el).text('Error(s) found.')
              var body = xhr.responseJSON
              $('.btn-submit', self.el).removeAttr('disabled')
              body.errors && self._displayErrors(body.errors);
              console.error(body.code, body.message)
            }
          })
        }).catch(function (err) {
          $('.btn-submit', self.el).removeAttr('disabled')
          $('.span-status', self.el).text(err.message)
          console.error(err.stack)
        })
    },

    _displayErrors: function (errors) {
      var self = this;
      errors.forEach(function (error) {
        var formGroupEl = self.el.querySelector('[name=' + error.name + ']').parentElement
        if (formGroupEl.classList.contains('input-group') || formGroupEl.classList.contains('form-control')) {
          formGroupEl = formGroupEl.parentElement;
        }
        var helpEl = formGroupEl.querySelector('.help-block');

        formGroupEl.classList.add('has-error');
        var errorHtml = [];
        errorHtml.push('<ul>');
        error.errors.forEach(function (message) {
          errorHtml.push('<li>');
          errorHtml.push(message);
          errorHtml.push('</li>');
        });
        errorHtml.push('</ul>');
        helpEl.innerHTML = errorHtml.join('');
      })
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
      return Promise.resolve(data);
    }
  });
})();
