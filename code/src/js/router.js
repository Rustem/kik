var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var Index = require('./components/Index.jsx');
var Hub = require('./components/Hub.jsx');
var LoginPage = require('./components/LoginPage.jsx');
var stages = require('./components/stages');

var routes = (
    <Route name="index" path="/" handler={Index}>
	    <Route name="login" path="/login" handler={LoginPage} />
	    <Route name="hub" handler={Hub} />
        <Route name="stages" path="/stages" handler={stages.Index}>
        	<Route name="stage0" path="/stage0" handler={stages.Stage0} />
        	<Route name="stage1" path="/stage1" handler={stages.Stage1} />
        	<Route name="stage20" path="/stage20" handler={stages.Stage20} />
        	<Route name="stage21" path="/stage21" handler={stages.Stage21} />
        	<Route name="stage22" path="/stage22" handler={stages.Stage22} />
        </Route>

        <Redirect from="/" to="hub" />
    </Route>
);

module.exports.routes = routes;

