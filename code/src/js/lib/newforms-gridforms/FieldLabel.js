var FieldLabel = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  , span: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {span: '1'}
  },

  render: function() {
    var bf = this.props.form.boundField(this.props.name)
    return <div data-field-span={this.props.span}>
      {bf.labelTag()}
      {bf.value()}
      <span className="text-danger">{bf.errorMessage()}</span>
    </div>
  }
});

module.exports = FieldLabel;
