var Router = require('react-router');
var SessionStore = require('../stores/SessionStore');
var LogInForm = require('../forms/LogInForm.jsx');
var UserActions = require('../actions/UserActions');

var LoginPage = React.createClass({
    mixins: [React.State],
    statics: {
        willTransitionTo: function (transition, params) {
            console.log(SessionStore.current_user())
          if (SessionStore.current_user()) {
            transition.abort();
            transition.redirect('hub', {}, {});
          }
        },
    },
    contextTypes: {
        router: React.PropTypes.func
    },

    onLogIn: function(object) {
        var promise = UserActions.login(object);
        promise.done(
            this.context.router.transitionTo('index'));
    },

    render: function() {
        return (
            <div className='body-container'>
                <LogInForm onHandleSubmit={this.onLogIn} />
            </div>
        )
    }
});

module.exports = LoginPage;
