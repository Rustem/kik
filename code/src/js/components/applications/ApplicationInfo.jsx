var _ = require('lodash');
var constants = require('../../constants/appConstants');
var PROGRAMS = constants.PROGRAMS;
var REGIONS = constants.REGIONS;
var ROOMS = constants.ROOMS;
var RENT = constants.RENT;
var NATIONALITY = constants.NATIONALITY;
var FAMILYSTATUS = constants.FAMILYSTATUS;

var ApplicationInfo = React.createClass({

	render: function() {
		var application = this.props.application;
		return (
			<table className="table table-striped">
				<tbody>
			        <tr>
			          <th>ФИО</th>
			          <td>{application.person.lastname} {application.person.firstname} {application.person.middlename}</td>
			        </tr>
			        <tr>
			          <th>Программа</th>
			          <td>{PROGRAMS[application.program]}</td>
			        </tr>
			       	<tr>
			          <th>Регион</th>
			          <td>{REGIONS[application.region]}</td>
			        </tr>
			        <tr>
			          <th>Город</th>
			          <td>{application.city}</td>
			        </tr>
			        <tr>
			          <th>Жилой комплекс</th>
			          <td>{application.house}</td>
			        </tr>
			        <tr>
			          <th>Количество комнат</th>
			          <td>{ROOMS[application.rooms]}</td>
			        </tr>
			        <tr>
			          <th>Номер квартиры</th>
			          <td>{application.flat}</td>
			        </tr>
			        <tr>
			          <th>Подъезд</th>
			          <td>{application.podiezd}</td>
			        </tr>
			        <tr>
			          <th>Этаж</th>
			          <td>{application.level}</td>
			        </tr>
			        <tr>
			          <th>Квадратура</th>
			          <td>{application.area}</td>
			        </tr>
			        <tr>
			          <th>Стоимость аренды за 1м<sup>2</sup></th>
			          <td>{application.rent_area_payment}</td>
			        </tr>
			        <tr>
			          <th>Процентная ставка</th>
			          <td>{application.interest_rate}</td>
			        </tr>
			        <tr>
			        	<th colSpan="2" style={{textAlign: "center"}}>Параметры арендной недвижимости</th>
			        </tr>
			        <tr>
			          <th>Ежемесячный платеж по аренде</th>
			          <td>{application.cost_rent_payment}</td>
			        </tr>
			        <tr>
			          <th>Платеж по страхованию имущества</th>
			          <td>{application.cost_insurance_items}</td>
			        </tr>
			        <tr>
			          <th>Платеж по страхованию жизни</th>
			          <td>{application.cost_insurance_life}</td>
			        </tr>
			        <tr>
			          <th>Платеж по страхованию риска неплатежей по аренде</th>
			          <td>{application.cost_insurance_payments}</td>
			        </tr>
			        <tr>
			          <th>Коммунальные платежи</th>
			          <td>{application.cost_utility}</td>
			        </tr>
			        <tr>
			          <th>Услуги по техническому обслуживанию имущества</th>
			          <td>{application.cost_maintenance}</td>
			        </tr>
			        <tr>
			          <th>Платеж по налогу на имущество</th>
			          <td>{application.cost_taxes}</td>
			        </tr>
			        <tr>
			          <th>Другие платежи</th>
			          <td>{application.cost_other}</td>
			        </tr>
			        <tr>
			          <th>Итого ежемесячный платеж</th>
			          <td>{application.cost_total}</td>
			        </tr>
			        <tr>
			        	<th colSpan="2" style={{textAlign: "center"}}>Анкета (демографические данные)</th>
			        </tr>
			        <tr>
			          <th>Дата рождения</th>
			          <td>{application.person.birthday}</td>
			        </tr>
			        <tr>
			          <th>Национальность</th>
			          <td>{NATIONALITY[application.person.nationality]}</td>
			        </tr>
			        <tr>
			          <th>Семейный статус</th>
			          <td>{FAMILYSTATUS[application.person.familystatus]}</td>
			        </tr>
			        <tr>
			          <th>Адрес проживания</th>
			          <td>{application.person.address}</td>
			        </tr>
			        <tr>
			          <th>Номер телефона</th>
			          <td>{application.person.phonenumber}</td>
			        </tr>
			        {!_.isEmpty(application.person_guarantor) ? <div><tr>
			        	<th colSpan="2" style={{textAlign: "center"}}>Сведения о гаранте</th>
			        </tr>
			        <tr>
			          <th>ФИО</th>
			          <td>{application.person_guarantor.lastname} {application.person_guarantor.firstname} {application.person_guarantor.middlename}</td>
			        </tr>
			        <tr>
			          <th>Дата рождения</th>
			          <td>{application.person_guarantor.birthday}</td>
			        </tr>
			        <tr>
			          <th>Национальность</th>
			          <td>{NATIONALITY[application.person_guarantor.nationality]}</td>
			        </tr>
			        <tr>
			          <th>Семейный статус</th>
			          <td>{FAMILYSTATUS[application.person_guarantor.familystatus]}</td>
			        </tr>
			        <tr>
			          <th>Адрес проживания</th>
			          <td>{application.person_guarantor.address}</td>
			        </tr>
			        <tr>
			          <th>Номер телефона</th>
			          <td>{application.person_guarantor.phonenumber}</td>
			        </tr></div> : null}
			        <tr>
			        	<th colSpan="2" style={{textAlign: "center"}}>Информация о доходах/расходах</th>
			        </tr>
			        <tr>
			          <th>Доход по основному месту работы</th>
			          <td>{application.income_mainwork}</td>
			        </tr>
			        <tr>
			          <th>Доходы по доп. месту работы</th>
			          <td>{application.income_extrawork}</td>
			        </tr>
			        <tr>
			          <th>Доходы в виде диведендов</th>
			          <td>{application.income_dividend}</td>
			        </tr>
			        <tr>
			          <th>Доход в виде вознагражд. и регулярных страховых выплат</th>
			          <td>{application.income_emolument}</td>
			        </tr>
			        <tr>
			          <th>Пенсионные выплаты и стипендии</th>
			          <td>{application.income_pension}</td>
			        </tr>
			        <tr>
			          <th>Доход в виде арендной платы</th>
			          <td>{application.income_rental}</td>
			        </tr>
			        <tr>
			          <th>Алементы получаемые</th>
			          <td>{application.income_aliment}</td>
			        </tr>
			        <tr>
			          <th>Другие доходы</th>
			          <td>{application.income_extra}</td>
			        </tr>
			        <tr>
			          <th>Итого</th>
			          <td>{application.income_total}</td>
			        </tr>
			        <tr>
			        	<th colSpan="2" style={{textAlign: "center"}}>Коэффициенты (авто)</th>
			        </tr>
			        <tr>
			          <th>О/Д</th>
			          <td>{application.od}</td>
			        </tr>
			        <tr>
			          <th>П/Д</th>
			          <td>{application.pd}</td>
			        </tr>


		      	</tbody>
			</table>
		)
	}
});

module.exports = ApplicationInfo;