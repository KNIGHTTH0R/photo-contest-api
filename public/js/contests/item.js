(function () {
  window.ContestItemView = TableItemView.extend({
    tagName: 'tr',
    type: 'Contest',
    deleteKey: 'name',

    template: _.template([
      '<td><%= name %></td>',
      '<td>#<%= tag %></td>',
      '<td><%= moment(startedAt).fromNow() %></td>',
      '<td>',
        '<div class="btn-group">',
          '<a class="btn btn-primary btn-xs btn-photos" href="#contests/<%= slug %>/photos">Photos</a>',
          '<button class="btn btn-danger btn-xs btn-delete">Delete</button>',
        '</div>',
      '</td>'
    ].join('')),

    events: {
      'click': 'onClick',
      'click .btn-delete': 'onDelete'
    },

    init: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.empty();
      this.$el.append(this.template({
        name: this.model.get('name'),
        slug: this.model.get('slug'),
        tag: this.model.get('tag'),
        startedAt: this.model.get('startedAt')
      }));

      return this;
    },

    preventSelection: function(ev) {
      ev.stopPropagation();
    }
  });
})();
