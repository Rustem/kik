var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var Index = require('./components/Index.jsx');
var Hub = require('./components/Hub.jsx');
var LoginPage = require('./components/LoginPage.jsx');
var stages = require('./components/stages');
var ApplicationDetail = require('./components/applications/ApplicationDetail.jsx');
var PersonFinder = require('./components/people/PersonFinder.jsx');

var routes = (
    <Route name="index" path="/" handler={Index}>
	    <Route name="login" path="/login" handler={LoginPage} />
        <Route name="stages" path="/stages/" handler={stages.Index}>
        	<Route name="stage0" path="stage0" handler={stages.Stage0} />
        	<Route name="stage1" path="stage1" handler={stages.Stage1} />
        	<Route name="stage20" path="stage20" handler={stages.Stage20} />
        	<Route name="stage21" path="stage21" handler={stages.Stage21} />
        	<Route name="stage22" path="stage22" handler={stages.Stage22} />
            <Route name="stage3" path="stage3" handler={stages.Stage3} />
        </Route>
        <Route name="application_detail" path="/application/:id" handler={ApplicationDetail} />
        <Route name="person_finder" path="/people/search" handler={PersonFinder} />
        <DefaultRoute handler={Hub}/>
    </Route>
);

module.exports.routes = routes;

