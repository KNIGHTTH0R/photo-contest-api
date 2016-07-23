(function () {
  window.PhotoItemView = TableItemView.extend({
    tagName: 'tr',
    type: 'Photo',
    deleteKey: 'name',

    template: _.template([
      '<td><img src="<%= imageUrl %>" width="100%"/></td>',
      '<td><%= caption %></td>',
      '<td><%= name %></td>',
      '<td><%= moment(startedAt).fromNow() %></td>',
      '<td>',
        '<div class="btn-group">',
          '<button class="btn btn-danger btn-xs btn-delete"<%= name === "master" ? "disabled" : "" %>>Delete</button>',
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
        imageUrl: this.model.get('images').low_resolution.url,
        caption: this.model.get('caption').text,
        name: this.model.get('caption').from.full_name,
        startedAt: parseInt(this.model.get('created_time'), 10) * 1000
      }));

      return this;
    },

    preventSelection: function(ev) {
      ev.stopPropagation();
    }
  });
})();
