(function () {
  window.ContestListView = TableListView.extend({
    itemView: ContestItemView,
    itemTypes: 'contest(s)',

    template: _.template([
      '<header>',
        '<h2>Contests</h2>',
        '<div class="btn-group">',
          '<button class="btn btn-default btn-refresh">Refresh</button>',
          '<button class="btn btn-primary btn-create">Create Contest</button>',
        '</div>',
      '</header>',
      '<table id="tree-list" class="table table-hover">',
        '<thead>',
          '<th>Contest</th>',
          '<th>Tag</th>',
          '<th>Start Date</th>',
          '<th>Actions</th>',
        '</thead>',
        '<tbody />',
        '<tfoot />',
      '</table>',
      '<center><h3><small class="status"></small></h3></center>',
    ].join('')),

    events: {
      'click thead > tr > th > input': 'onSelectAll',
      'click .btn-refresh': 'onRefresh',
      'click .btn-create': 'onCreate',
      'click .btn-delete-selected': 'onDeleteSelected',
    },

    init: function() {
      // this.listenTo(Backbone, window.Events.REFRESH, this.onRefresh);
      this.listenTo(this.collection, 'error', this.error);

      this.render();
    },

    error: function (collection, xhr, options) {
      var statusEl = document.querySelector('small.status');
      statusEl.classList.add('has-error');
      statusEl.textContent = xhr.status ? xhr.statusText : 'Connection Error';
    },

    render: function() {
      this.$el.empty();

      this.$el.append(this.template({}));
      return this;
    },

    onCreate: function(ev) {
      ev.preventDefault()

      new ContestCreateWizardView({collection: this.collection})
    }
  });
})();
