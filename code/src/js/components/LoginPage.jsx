var Router = require('react-router');
var SessionStore = require('../stores/SessionStore');
var LogInForm = require('../forms/LogInForm.jsx');
var UserActions = require('../actions/UserActions');

var LoginPage = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        willTransitionTo: function (transition, params) {
          if (SessionStore.current_user()) {
            transition.abort();
            transition.redirect('index', {}, {});
          }
        },
    },
    contextTypes: {
        router: React.PropTypes.func
    },

    onLogIn: function(object) {
        var promise = UserActions.login(object);
        console.log(this.context)
        promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
    },

    render: function() {
        return (
            <div className='login-container'>
                <div className="text-center">
                    <img src="http://kmc.kz/uploads/settings/537c680011584.png" alt="Казахстанская ипотечная компания" />
                </div>
                <br />
                <LogInForm onHandleSubmit={this.onLogIn} />
            </div>
        )
    }
});

module.exports = LoginPage;
