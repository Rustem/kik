var ApplicationInfo = React.createClass({

	render: function() {
		var application = this.props.application;
		return (
			<table className="table table-striped">
				<tbody>
			        <tr>
			          <th>ФИО</th>
			          <td>{application.lastname} {application.firstname} {application.middlename}</td>
			        </tr>
			        <tr>
			          <th>Программа</th>
			          <td>{application.program}</td>
			        </tr>
		      	</tbody>
			</table>
		)
	}
});

module.exports = ApplicationInfo;