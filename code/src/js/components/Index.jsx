var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SessionStore = require('../stores/SessionStore');

var Index = React.createClass({

    render: function() {
        return (
            <div className='body-container'>
                <RouteHandler />
            </div>
        )
    }
});

module.exports = Index;
