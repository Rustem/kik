var forms = require('newforms');
var GridForms = require('newforms-gridforms');
var GridForm = GridForms.GridForms;
var Section = GridForms.Section;
var Row = GridForms.Row;
var Field = GridForms.Field;


var ApplicationForm = forms.Form.extend({
  username: forms.CharField(),
  email: forms.EmailField(),
  password: forms.CharField({widget: forms.PasswordInput}),
  confirmPassword: forms.CharField({widget: forms.PasswordInput}),
  acceptTerms: forms.BooleanField({required: true})
});


var ApplicationFormView = React.createClass({

  render: function() {
    return (
      <form onSubmit={this._onSubmit}>

        <forms.RenderForm form={ApplicationForm} >
          <GridForm>

          </GridForm>
        </forms.RenderForm>

        <button type='submit'>Red Button!</button>
      </form>
    );
  },

});


module.exports = ApplicationFormView;