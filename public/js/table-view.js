(function() {
  /**
    Generic Table item view with checkboxes and delete button.
    Use `init` instead of `initialize` BackBone constructor.
    Required events:
    ```
    events: {
      'click': 'onClick',
      'click .btn-delete': 'onDelete',
    }
    ```
  */
  var TableItemView = window.TableItemView = Backbone.View.extend({
    type: 'Table Item',
    deleteKey: 'id',

    _deleteTemplate: _.template('Are you sure you want to permanently delete this <%= type %>?\n\nTo confirm deletion, please type the <%= deleteKey %>, "<%= deleteValue %>".'),

    initialize: function(options) {
      this.selected = false;

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'select', this.onSelect);

      this.init && this.init(options);
    },

    onClick: function(ev) {
      ev.stopPropagation();
      this.model.trigger('select');
    },

    onSelect: function(options) {
      var opt = options || {};

      if (~Object.keys(opt).indexOf('selected')) {
        this.selected = opt.selected;
      } else {
        // Toggle
        this.selected = !this.selected;
      }

      var checkBoxEl = this.el.querySelector('input');
      if (checkBoxEl) {
        this.el.querySelector('input').checked = this.selected;
      }

      if (this.selected) {
        this.$el.addClass('selected');
      } else {
        this.$el.removeClass('selected');
      }
    },

    onDelete: function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var self = this;
      var userInput = prompt(this._deleteTemplate({
        type: this.type,
        deleteKey: this.deleteKey,
        deleteValue: this.model.get(this.deleteKey),
      }));

      if (userInput === this.model.get(this.deleteKey)) {
        this.model.destroy({
          wait: true,
          success: function() {
            console.log('destroyed', self)
            self.onDeleteSuccess && self.onDeleteSuccess()
          },
          error: function (model, xhr, options) {
            console.log(arguments)
          }
        });
      }
    }
  });

  /**
    Generic Table List View with checkboxes and delete selected button.
    Use `init` instead of `initialize` BackBone constructor.
    Required Events:
    ```
    events: {
      'click thead > tr > th > input': 'onSelectAll',
      'click .btn-delete-selected': 'onDeleteSelected',
    }
    ```
  */
  window.TableListView = Backbone.View.extend({
    itemView: TableItemView,
    itemTypes: 'Table Item(s)',

    _deleteTemplate: _.template('Are you sure you want to permanently delete the selected <%= count %> <%= itemTypes %>?\n\nTo confirm deletion, please type, "<%= token %>".'),

    initialize: function(options) {
      this.views = [];

      this.listenTo(this.collection, 'add', this.onAdd);
      this.listenTo(this.collection, 'remove', this.onRemove);

      this.init && this.init(options);
    },

    onAdd: function(model, collection, options) {
      var $list = $('tbody', this.el);
      var index = collection.indexOf(model);
      var view = new this.itemView({model: model});
      this.views.splice(index, 0, view);

      if (index === 0) {
        $list.prepend(view.render().el);
      } else {
        $list.children().eq(index - 1).after(view.render().el);
      }

      this.listenTo(model, 'select', this.onSelectChange);
    },

    onRemove: function(model, collection, options) {
      var view = this.getViewFromModel(model);
      var index = this.views.indexOf(view);

      var view = this.views.splice(index, 1)[0];
      view.remove();
    },

    getViewFromModel: function(model) {
      return this.views.filter(function(views) {
        return model.id === views.model.id;
      })[0];
    },

    onRefresh: function(ev) {
      ev && ev.preventDefault()
      this.collection.fetch();
    },

    onSelectAll: function() {
      var self = this;
      var value = true;
      if (this.selectedItems().length) {
        value = false;
      }
      this.el.querySelector('input').checked = value;

      this.collection.each(function(model) {
        self.stopListening(model, 'select');  // Optimization
        model.trigger('select', {selected: value});
        self.listenTo(model, 'select', self.onSelectChange);  // Optimization
      });

      this.onSelectChange();  // Trigger update
    },

    selectedItems: function() {
      return this.views.reduce(function(list, view) {
        if (view.selected && view.$el.is(':visible')) {
          list.push(view.model);
        }
        return list;
      }, []);
    },

    onSelectChange: function() {
      var $deleteSelectedEl = $('.btn-delete-selected', this.el);
      if (this.selectedItems().length) {
        $deleteSelectedEl.removeAttr('disabled');
        $deleteSelectedEl.removeClass('disabled');
      } else {
        $deleteSelectedEl.attr('disabled', 'disabled');
        $deleteSelectedEl.addClass('disabled');
      }
    },

    onDeleteSelected: function() {
      var self = this;
      var items = this.selectedItems();
      var token = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

      var userInput = prompt(this._deleteTemplate({
        count: items.length,
        itemTypes: this.itemTypes,
        token: token
      }));

      if (userInput !== token) {
        return;
      }

      var promises = items.map(function (item) {
        return new Promise(function (resolve, reject) {
          console.log('destroy', item)
          item.destroy({wait: true, success: resolve, error: reject});
        });
      })

      Promise.all(promises)
        .then(function () {
          console.log(arguments)
          self.el.querySelector('input').checked = false;
          alert('The selected ' + items.length + ' ' + self.itemTypes + ' were permanently deleted.');
        });
    }
  });
})();
