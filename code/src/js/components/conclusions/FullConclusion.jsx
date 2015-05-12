var _ = require('lodash');
var moment = require('moment');
var ConclusionStore = require('../../stores/ConclusionStore');
var UserStore = require('../../stores/UserStore');
var RiskForm = require('../../forms/RiskForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;
var TEMPLATES = require('../../constants/appConstants').TEMPLATES;
var utils = require('../../utils');
var AppContextMixin = require('../../mixins/AppContextMixin');


var FullConclusion = React.createClass({
	mixins: [AppContextMixin],
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getInitialState: function() {
		return {
			decisionData: null,
		}
	},

	getConclusions: function() {
		var application = this.props.application;
		var conclusions = ConclusionStore.getByApplication(application);
		return {
			risk: _.findWhere(conclusions, { type: ConclusionTypes.RISK }),
			legal: _.findWhere(conclusions, { type: ConclusionTypes.LEGAL }),
			secur: _.findWhere(conclusions, { type: ConclusionTypes.SECUR }),
		}
	},

	genDoc: function(application) {
		var conclusions = this.getConclusions();
		var author = this.getUser();
		var params = {
			id: application.id,
			program: application.program,
			author: author.lastname+" "+author.firstname[0]+".",
			lastname: application.lastname,
			firstname: application.firstname,
			middlename: application.middlename,
			area: application.area,
			region: application.region,
			city: application.city,
			house: application.house,
			pd: conclusions.risk.pd,
			od: conclusions.risk.od,
			risk_remark: conclusions.risk.remark,
			risk_output: conclusions.risk.output,
			legal_output: conclusions.legal.output,
			secur_remark: conclusions.secur.remark,
			secur_output: conclusions.secur.output,
		}
		// console.log(params);

		utils.print_doc(TEMPLATES.FULL, params);
	},

	decide: function() {
		var makeDecision = utils.makeDecision,
			gcvpData = utils.getFromGCVP('12345'),
			pkbData = utils.getFromPKB('12345');

		var decisionData = makeDecision(this.props.application, gcvpData, pkbData);
		this.setState({
			decisionData: decisionData,
		});
	},

	showDecision: function() {
		var data = this.state.decisionData,
			Component = null;
		if(!data)
			return null;
		switch(data.decision) {
			case 'approve':
				Component = <table className="table table-bordered table-condensed" style={{marginTop:"30px", backgroundColor:'white'}}>
								<thead>
									<tr>
										<th colSpan="3" className="text-center success">
											Решение: ОДОБРЕНИЕ
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>П/Д не более 65%, О/Д не более 70% (65,01 и 70,01 считать более)</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Доходы арендатора и гаранта (если имеется) подтверждены с основного места работы за последние 6 мес. отчислениями из ГЦВП, с дополнительного места работы за последние 12 мес.(рассчитывается наименьший доход)</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
									<tr>
										<td>3</td>
										<td>Отсутствие просрочек по действующему кредиту и максимальные дни составляли до 90 дней (дополнительно запросить объяснительную)</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
									<tr>
										<td>4</td>
										<td>По завершенным кредитам просрочка максимальная до 1000 дней и данные кредиты закрыты до 01.01.2015 г.(дополнительно запросить объяснительную)</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
									<tr>
										<td>5</td>
										<td>стаж с последнего основного места работы неполные 6 мес.при этом прерывался не более 1 мес.</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
									<tr>
										<td>6</td>
										<td>арендатор яв-ся ИП либо работодателем яв-ся ИП,ТОО и доходы за последние 6-12 мес. подтверждаются отчислениями из ГЦВП не полностью (запросить письмо-разъяснение с места работы)</td>
										<td style={{backgroundColor:'DarkGreen', color:'white'}}>Да</td>
									</tr>
								</tbody>
							</table>
				break;
							// <table>
							// 	<tr>
							// 		<td>dfsaf</td>
							// 		<td>asdfasd</td>
							// 	</tr>
							// </table>
		}
		return Component;
	},

	render: function() {
		var conclusions = this.getConclusions();
		var decisionDetails = this.showDecision();
		return  <div className="row">
						<h3>Управление риск-менеджмента</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Резюме:</b></p>
							{conclusions.risk.output}
						</div>
						
						<h3>Юридическое управление</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Резюме:</b></p>
							{conclusions.legal.output}
						</div>
						
						<h3>Управление службы безопасности и режима</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Заключение и выводы:</b></p>
							{conclusions.secur.output}
						</div>
						<div className="text-center">
							<button className="btn btn-info" onClick={this.decide}>Принять решение</button>&nbsp;&nbsp;
							<button className="btn btn-info" onClick={this.genDoc.bind(null, this.props.application)}>Скачать документ</button>
						</div>
						{decisionDetails}
				</div>
		
	}
});

module.exports = FullConclusion;