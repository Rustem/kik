var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var UserActions = require('../../actions/UserActions');

var Index = React.createClass({
	mixins: [Router.Navigation],
	onLogout: function() {
		var promise = UserActions.logout(undefined);
        promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
	},

    render: function() {
        return (
        	<div>
        		<button onClick={this.onLogout}>Выйти</button>
            	<RouteHandler />
            </div>
        )
    }
});

module.exports = Index;
