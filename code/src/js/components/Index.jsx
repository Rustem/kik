var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionStore = require('../stores/SessionStore');

var Index = React.createClass({

	childContextTypes: {
        user: React.PropTypes.object,
    },

	getInitialState: function() {
        return {
        	current_user: SessionStore.current_user()
        }
    },

	getChildContext: function() {
        return {
            user: this.state.current_user,
        };
    },

    render: function() {
        return (
            <div className='body-container'>
                <RouteHandler />
            </div>
        )
    }
});

module.exports = Index;
