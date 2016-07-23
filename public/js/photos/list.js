(function () {
  window.PhotoListView = TableListView.extend({
    itemView: PhotoItemView,
    itemTypes: 'contest(s)',

    template: _.template([
      '<header>',
        '<h2>Contest Photos</h2>',
        '<div class="btn-group">',
          '<button class="btn btn-default btn-refresh">Refresh</button>',
        '</div>',
      '</header>',
      '<table id="tree-list" class="table table-hover">',
        '<thead>',
          '<th>Photo</th>',
          '<th>Caption</th>',
          '<th>Author</th>',
          '<th>Post Date</th>',
          '<th>Actions</th>',
        '</thead>',
        '<tbody />',
        '<tfoot />',
      '</table>',
      '<center><h3><small class="status"></small></h3></center>',
    ].join('')),

    events: {
      'click thead > tr > th > input': 'onSelectAll',
      'click .btn-refresh': 'onRefresh'
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
    }
  });
})();
