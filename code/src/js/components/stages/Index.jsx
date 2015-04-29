var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var StageHeader = require('./StageHeader.jsx');

var Index = React.createClass({

    render: function() {
        return (
        	<div className="page-container">
                <StageHeader />
                <div className="row" style={{marginTop:'90px'}}>
            	   <RouteHandler />
                </div>
            </div>
        )
    }
});

module.exports = Index;
