var FieldPureRender = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  , span: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {span: '1'}
  },

  render: function() {
    var bf = this.props.form.boundField(this.props.name)
    return bf.render();
  }
});

module.exports = FieldPureRender;
