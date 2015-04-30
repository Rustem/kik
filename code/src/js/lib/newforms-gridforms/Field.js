var Field = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  , span: React.PropTypes.string
  },

  getDefaultProps() {
    return {span: '1'}
  },

  render() {
    var bf = this.props.form.boundField(this.props.name)
    return <div data-field-span={this.props.span}>
      {bf.labelTag()}
      {bf.render()}
      <span>{bf.errorMessage()}</span>
    </div>
  }
});

module.exports = Field;