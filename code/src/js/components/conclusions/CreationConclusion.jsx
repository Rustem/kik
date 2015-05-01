var Router = require('react-router');
var Link = Router.Link;

var CreationConclusion = React.createClass({
	PropTypes: {
		application: React.PropTypes.object,
	},

	render: function() {
		var application = this.props.application;
		return  <div className="row">
					<div className="text-center">
						<Link to="application_edit"
							  className="btn btn-primary"
							  params={{id: application.id}}>
							 Редактировать
						</Link>
					</div>
				</div>
		
	}
});

module.exports = CreationConclusion;