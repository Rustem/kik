var GridForms = require('newforms-gridforms');
var {GridForm, Section, Row, Field} = GridForms;


var ApplicationForm = React.createClass({
  render: function() {
    return (
      <form onSubmit={this._onSubmit}>
        <forms.RenderForm form={ProductForm} ref="signupForm">
          <GridForm>
            <Section name="Add to inventory">
              <Row>
                <Field name="productName" span="3"/>
                <Field name="tags"/>
              </Row>
              <Row>
                <Field name="vendor"/>
                <Field name="productType"/>
              </Row>
              <Row>
                <Field name="productDescription"/>
              </Row>
              <Row>
                <Field name="sku"/>
                <Field name="initialStockLevel"/>
                <Field name="costPrice"/>
                <Field name="wholesalePrice"/>
                <Field name="retailPrice"/>
              </Row>
            </Section>
          </GridForm>
        </forms.RenderForm>
        <button type='submit'>Red Button!</button>
      </form>
    );
  },

});
