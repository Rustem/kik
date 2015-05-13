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

	genDoc: function(template, application, decisionData) {
		var decision_rus = function(decision) {
			switch(decision){
				case 'approve':
					return "ОДОБРЕНИЕ"
				case 'reject':
					return "ОТКАЗ"
				case 'manual':
					return "РАССМОТРЕНИЕ АРЕНДНОГО КОМИТЕТА"
			}
		}

		var flags_rus = function(decision, flags) {
			switch(decision){
				case 'approve':
					return {
						flag0: flags[0] ? 'Да' : 'Нет',
						flag1: flags[1] ? 'Да' : 'Нет',
						flag2: flags[2] ? 'Да' : 'Нет',
						flag3: flags[3] ? 'Да' : 'Нет',
						flag4: flags[4] ? 'Да' : 'Нет',
						flag5: flags[5] ? 'Да' : 'Нет',
					}
				case 'reject':
					return {
						flag0: flags[0] ? 'Нет' : 'Да',
						flag1: flags[1] ? 'Нет' : 'Да',
						flag2: flags[2] ? 'Нет' : 'Да',
						flag3: flags[3] ? 'Нет' : 'Да',
						flag4: flags[4] ? 'Нет' : 'Да',
					}
				case 'manual':
					return {
						flag0: flags[0] ? 'Да' : 'Нет',
						flag1: flags[1] ? 'Да' : 'Нет',
						flag2: flags[2] ? 'Да' : 'Нет',
						flag3: flags[3] ? 'Да' : 'Нет',
						flag4: flags[4] ? 'Да' : 'Нет',
						flag5: flags[5] ? 'Да' : 'Нет',
						flag6: flags[6] ? 'Нет' : 'Да',
						flag7: flags[7] ? 'Нет' : 'Да',
						flag8: flags[8] ? 'Нет' : 'Да',
						flag9: flags[9] ? 'Нет' : 'Да',
						flag10: flags[10] ? 'Нет' : 'Да',
					}
			}
		}

		var conclusions = this.getConclusions();
		var author = this.getUser();
		var params = _.assign({
			id: application.id,
			program: application.program,
			author: author.lastname+" "+author.firstname[0]+".",
			lastname: application.person.lastname,
			firstname: application.person.firstname,
			middlename: application.person.middlename,
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
			decision: decision_rus(decisionData.decision)
		}, flags_rus(decisionData.decision, decisionData.flags))
		// console.log(params);

		utils.print_doc(template, params);
	},

	decide: function() {
		var makeDecision = utils.makeDecision,
			gcvpData = utils.getFromGCVP('12345'),
			pkbData = utils.getFromPKB('12345');

		var decisionData = makeDecision(this.props.application, gcvpData, pkbData);

		this.setState({
			decisionData: decisionData,
			showDecisionDetails: false,
		});
	},


// ==== temporary

	decideBad: function() {
		var makeDecision = utils.makeDecision,
			gcvpData = utils.getFromGCVP('12344'),
			pkbData = utils.getFromPKB('12344');

		var decisionData = makeDecision(this.props.application, gcvpData, pkbData);

		this.setState({
			decisionData: decisionData,
			showDecisionDetails: false,
		});
	},

	decideNeutral: function() {
		var makeDecision = utils.makeDecision,
			gcvpData = utils.getFromGCVP('12343'),
			pkbData = utils.getFromPKB('12343');

		var decisionData = makeDecision(this.props.application, gcvpData, pkbData);

		this.setState({
			decisionData: decisionData,
			showDecisionDetails: false,
		});
	},

// ====

	toggleShowDecisionDetails: function() {
		this.setState({
			showDecisionDetails: !this.state.showDecisionDetails,
		})
	},

	buildDetails: function(data) {
		var application = this.props.application;
		var GCVPRow = function(row, idx) {
			return  <tr>
						<td>{idx+1}</td>
						<td>{row.date}</td>
						<td>{row.company}</td>
						<td>{row.value}</td>
					</tr>
		}

		var PKBRow = function(row, idx) {
			return  <tr>
						<td>{idx+1}</td>
						<td>{row.opened_date}</td>
						<td>{row.bank}</td>
						<td>{row.status == 'open' ? 'Открыт' : <div>Закрыт<br /><small>дата закрытия: {row.closed_date}</small></div>}</td>
						<td>{row.delay_days_total}</td>
					</tr>
		}

		var ComponentGCVP = <table className="table table-stripped table-condensed">
								<thead>
									<tr>
										<th>#</th>
										<th>Дата</th>
										<th>Юридическое лицо</th>
										<th>Сумма</th>
									</tr>
								</thead>
								<tbody>
									{data.gcvp.map(GCVPRow)}
								</tbody>
							</table>

		var ComponentPKB = <table className="table table-stripped table-condensed">
								<thead>
									<tr>
										<th>#</th>
										<th>Дата открытия</th>
										<th>Банк</th>
										<th>Статус</th>
										<th>Общее количество дней просрочки</th>
									</tr>
								</thead>
								<tbody>
									{data.pkb.map(PKBRow)}
									<tr>
										<th>Итого</th>
										<th></th>
										<th></th>
										<th></th>
										<th>{_.reduce(data.pkb, function(total, c) {
											return total + c.delay_days_total
										}, 0)}</th>
									</tr>
								</tbody>
							</table>
									

		return <div>
					<h4 className="text-center">Информация для принятия решения</h4>
					<h6 className="text-center">Данные заявителя</h6>
					<div className="row">
						<div className="col-md-8">
							<div className="col-md-4"><b>ФИО</b></div>
							<div className="col-md-8">{application.person.lastname+" "+application.person.firstname+" "+application.person.middlename}</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="col-md-4"><b>Коэффициент П/Д</b></div>
							<div className="col-md-8">{application.pd} %</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-8">
							<div className="col-md-4"><b>Коэффициент О/Д</b></div>
							<div className="col-md-8">{application.od} %</div>
						</div>
					</div>
					<h6 className="text-center">Данные из ГЦВП</h6>
					{ComponentGCVP}
					<h6 className="text-center">Данные из ПКБ</h6>
					{ComponentPKB}
			   </div>;
	},

	showDecision: function() {
		var data = this.state.decisionData;
		if(!data)
			return null;

		var	Component = null,
			ComponentDetails = this.buildDetails(data.details),
			doc_template;

		switch(data.decision) {
			case 'approve':
				doc_template = TEMPLATES.FULL_APPROVE;
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
			case 'reject':
				doc_template = TEMPLATES.FULL_REJECT;
				Component = <table className="table table-bordered table-condensed" style={{marginTop:"30px", backgroundColor:'white'}}>
								<thead>
									<tr>
										<th colSpan="3" className="text-center danger">
											Решение: ОТКАЗ
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>просрочки по действующим кредитам</td>
										<td style={{backgroundColor: data.flags[0] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[0] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>2</td>
										<td>просрочки по завершенным кредитам более 1000 дней</td>
										<td style={{backgroundColor: data.flags[1] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[1] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>3</td>
										<td>завершенные кредиты с просрочками были закрыты после 01.01.2015</td>
										<td style={{backgroundColor: data.flags[2] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[2] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>4</td>
										<td>арендатор не имеет дохода, коэффициенты платежеспособности рассчитаны за счет доходов гаранта</td>
										<td style={{backgroundColor: data.flags[3] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[3] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>5</td>
										<td>коэффициенты П/Д более 65% и О/Д более 72%</td>
										<td style={{backgroundColor: data.flags[4] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[4] ? 'Нет' : 'Да'}</td>
									</tr>
								</tbody>
							</table>
				break;
			case 'manual':
				doc_template = TEMPLATES.FULL_MANUAL;
				Component = <table className="table table-bordered table-condensed" style={{marginTop:"30px", backgroundColor:'white'}}>
								<thead>
									<tr>
										<th colSpan="3" className="text-center warning">
											Решение: РАССМОТРЕНИЕ АРЕНДНОГО КОМИТЕТА
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th colSpan="3">Сценарии одобрения</th>
									</tr>
									<tr>
										<td>1</td>
										<td>П/Д не более 65%, О/Д не более 70% (65,01 и 70,01 считать более)</td>
										<td style={{backgroundColor: data.flags[0] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[0] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Доходы арендатора и гаранта (если имеется) подтверждены с основного места работы за последние 6 мес. отчислениями из ГЦВП, с дополнительного места работы за последние 12 мес.(рассчитывается наименьший доход)</td>
										<td style={{backgroundColor: data.flags[1] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[1] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<td>3</td>
										<td>Отсутствие просрочек по действующему кредиту и максимальные дни составляли до 90 дней (дополнительно запросить объяснительную)</td>
										<td style={{backgroundColor: data.flags[2] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[2] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<td>4</td>
										<td>По завершенным кредитам просрочка максимальная до 1000 дней и данные кредиты закрыты до 01.01.2015 г.(дополнительно запросить объяснительную)</td>
										<td style={{backgroundColor: data.flags[3] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[3] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<td>5</td>
										<td>стаж с последнего основного места работы неполные 6 мес.при этом прерывался не более 1 мес.</td>
										<td style={{backgroundColor: data.flags[4] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[4] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<td>6</td>
										<td>арендатор яв-ся ИП либо работодателем яв-ся ИП,ТОО и доходы за последние 6-12 мес. подтверждаются отчислениями из ГЦВП не полностью (запросить письмо-разъяснение с места работы)</td>
										<td style={{backgroundColor: data.flags[5] ? 'DarkGreen' : 'Red', color:'white'}}>{data.flags[5] ? 'Да' : 'Нет'}</td>
									</tr>
									<tr>
										<th colSpan="3">Сценарии отказа</th>
									</tr>
									<tr>
										<td>1</td>
										<td>просрочки по действующим кредитам</td>
										<td style={{backgroundColor: data.flags[6] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[6] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>2</td>
										<td>просрочки по завершенным кредитам более 1000 дней</td>
										<td style={{backgroundColor: data.flags[7] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[7] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>3</td>
										<td>завершенные кредиты с просрочками были закрыты после 01.01.2015</td>
										<td style={{backgroundColor: data.flags[8] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[8] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>4</td>
										<td>арендатор не имеет дохода, коэффициенты платежеспособности рассчитаны за счет доходов гаранта</td>
										<td style={{backgroundColor: data.flags[9] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[9] ? 'Нет' : 'Да'}</td>
									</tr>
									<tr>
										<td>5</td>
										<td>коэффициенты П/Д более 65% и О/Д более 72%</td>
										<td style={{backgroundColor: data.flags[10] ? 'Red' : 'DarkGreen', color:'white'}}>{data.flags[10] ? 'Нет' : 'Да'}</td>
									</tr>
								</tbody>
							</table>
				break;
		}

		return  <div>
					{Component}
					<div className="text-center">
						<button className="btn btn-success" onClick={this.genDoc.bind(null, doc_template, this.props.application, data)}>Скачать документ с решением</button>
					</div>
					<p><button className="btn btn-link" onClick={this.toggleShowDecisionDetails}>{this.state.showDecisionDetails ? 'Скрыть делали' : 'Показать детали'}</button></p>
					{this.state.showDecisionDetails ? ComponentDetails : null}
				</div>
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
							<button className="btn btn-info" onClick={this.decide}>Принять решение</button>
							&nbsp;&nbsp;<button className="btn btn-link" onClick={this.decideBad}>Симулировать отказ</button>&nbsp;&nbsp;
							<button className="btn btn-link" onClick={this.decideNeutral}>Симулировать отправку в Арендный комитет</button>
						</div>
						{decisionDetails}
				</div>
		
	}
});

module.exports = FullConclusion;