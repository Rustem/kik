var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var Index = require('./components/Index.jsx');
var ApplicationList = require('./components/applications/ApplicationList.jsx');
var LoginPage = require('./components/LoginPage.jsx');

var routes = (
    <Route name="index" path="/" handler={Index}>
	    <Route name="login" path="/login" handler={LoginPage} />
        <Route name="application_list" path="/application_list" handler={ApplicationList} />
        <Redirect from="/" to="application_list" />
    </Route>
);

module.exports.routes = routes;

