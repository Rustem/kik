var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var Index = React.createFactory(require('./components/Index.jsx'));
var ApplicationList = React.createFactory(require('./components/applications/ApplicationList.jsx'));

var routes = (
    <Route name="index" path="/" handler={Index}>
        <Route name="application_list" path="/application_list/" handler={ApplicationList} />
        <Redirect from="/" to="application_list" />
    </Route>
);

module.exports.routes = routes;

