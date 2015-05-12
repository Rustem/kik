var _ = require('lodash');
var moment = require('moment');
var ConclusionTypes = require('./constants/appConstants').ConclusionTypes;


function isConclusionsCollected(application) {
	var conclusions = JSON.parse(localStorage.getItem('conclusions'));

	function filter(conclusions, application, type) {
		var by_app = _.where(conclusions, { application_id: application.id });
		return _.first(_.where(by_app, { type: type }))
	}

    var riskConclusion = filter(conclusions, application, ConclusionTypes.RISK);
    var legalConclusion = filter(conclusions, application, ConclusionTypes.LEGAL);
    var securConclusion = filter(conclusions, application, ConclusionTypes.SECUR);

    return riskConclusion  !== undefined &&
	       legalConclusion !== undefined &&
	       securConclusion !== undefined
}

function print_doc(template_name, params) {
	var loadFile=function(url,callback){
        JSZipUtils.getBinaryContent(url,callback);
    }
    loadFile("src/doc_templates/"+template_name, function(err,content){
        if (err) { throw err};
        doc=new Docxgen(content);
        doc.setData( params );
        doc.render();
        out=doc.getZip().generate({type:"blob"})
        saveAs(out,"doc_"+params.id+".docx")
    })
}

function makeDecision(application, gcvpData, pkbData) {
    var credits = pkbData.credits;
        open_credits = _.filter(credits, {'status': 'open'}),
        closed_credits = _.filter(credits, {'status': 'closed'});

    // ============================== ОТКАЗ ===========================================================
    var flags = [false, false, false, false, false];

    // просрочки по действующим кредитам 
    var total = _.reduce(open_credits, function(total, credit) {
          return total + credit.delay_days_total;
        },0)
    if(total > 0)
        flags[0] = true

    // просрочки по завершенным кредитам более 1000 дней
    var total = _.reduce(closed_credits, function(total, credit) {
          return total + credit.delay_days_total;
        },0)
    if(total > 1000)
        flags[1] = true

    // завершенные кредиты с просрочками были закрыты после 01.01.2015
    var total = _.filter(closed_credits, function(credit) {
           return credit.delay_days_total > 0 && moment(credit.closed_date) > moment("20150101", "YYYYMMDD")
        })
    if(total.length > 0)
        flags[2] = true

    // арендатор не имеет дохода, коэффициенты платежеспособности рассчитаны за счет доходов гаранта
    if(application.income_total <= 0)
        flags[3] = true

    // коэффициенты П/Д более 65% и О/Д более 72%
    if(application.pd > 65 && application.od > 72)
        flags[4] = true

    var total = _.reduce(flags, function(total, flag) {
          return total || flag;
        }, false)
    if(total)
        return {
            decision: 'reject',
            flags: flags
        }

    // ============================== ОДОБРЕНИЕ =======================================================
    var flags = [false, false, false, false, true, true];

    // П/Д не более 65%, О/Д не более 70% (65,01 и 70,01 считать более)
    if(application.pd <= 65 && application.od <= 70)
        flags[0] = true

    // Доходы арендатора и гаранта (если имеется) подтверждены с основного места работы за
    // последние 6 мес. отчислениями из ГЦВП, с дополнительного места работы за последние 
    // 12 мес.(рассчитывается наименьший доход)
    var six_month_ago = moment().startOf('month').subtract(6, 'month');
    var one_year_ago = moment().startOf('month').subtract(1, 'year');
    var person_main = _.filter(gcvpData.income.main.receipts, function(receipt) {
          return moment(receipt.date, "DD.MM.YYYY") > six_month_ago;
        });
        person_additional = _.filter(gcvpData.income.additional.receipts, function(receipt) {
          return moment(receipt.date, "DD.MM.YYYY") > one_year_ago;
        });
    if(person_main.length >= 6 && person_additional.length >= 12)
        flags[1] = true

    // Отсутствие просрочек по действующему кредиту и максимальные дни составляли до 90
    // дней (дополнительно запросить объяснительную)
    var cur_total = _.reduce(open_credits, function(total, credit) {
          return total + credit.delay_days_total;
        },0)
    var max_total = _.reduce(open_credits, function(total, credit) {
          return total + credit.delay_days_max;
        },0)
    if(cur_total == 0 && max_total < 90)
        flags[2] = true

    // По завершенным кредитам просрочка максимальная до 1000 дней и данные кредиты
    // закрыты до 01.01.2015 г.(дополнительно запросить объяснительную)
    var total = _.reduce(_.filter(closed_credits, function(credit) {
           return moment(credit.closed_date) > moment("20150101", "YYYYMMDD")
        }), function(total, credit) {
            return total + credit.delay_days_max 
        },0);
    if(total < 1000)
        flags[3] = true

    var total = _.reduce(flags, function(total, flag) {
          return total && flag;
        }, true)
    if(total)
        return {
            decision: 'approve',
            flags: flags
        }

    // ========================== НА РАССМОТРЕНИЕ АРЕНДНОГО КОМИТЕТА ====================================
    return {
        decision: 'manual',
    }
}

function getFromGCVP(iin) {
    var gcvpData = require('./ext_sources/gcvp.js');
    return _.findWhere(gcvpData, {'iin': iin})
}

function getFromPKB(iin) {
    var pkbData = require('./ext_sources/pkb.js');
    return _.findWhere(pkbData, {'iin': iin})
}

// function checkPersonDetails(data) {

//     var i=0;
//     for(i; i<pkbData.length; i++){
//         if(pkbData[i].iin === data.iin)
//             break
//     }

//     var k=0;
//     for(k; k<gcvpData.length; k++){
//         if(gcvpData[k].iin === data.iin){
//             break
//         }
//     }
//     console.log(pkbData[i].iin);
//     console.log(pkbData[i].firstname);
//     console.log(pkbData[i].lastname);
//     console.log(pkbData[i].middlename);
//     console.log(pkbData[i].birthday);
//     console.log(pkbData[i].credits.length);
//     for(var j=0; j<pkbData[i].credits.length; j++){
//         console.log(pkbData[i].credits[j].status);
//         console.log(pkbData[i].credits[j].opened_date);
//         console.log(pkbData[i].credits[j].closed_date);
//         console.log(pkbData[i].credits[j].delay_days);
//     }




//     /*
//     console.log(gcvpData[k].iin);
//     console.log(gcvpData[k].firstname);
//     console.log(gcvpData[k].lastname);
//     console.log(gcvpData[k].middlename);
//     console.log(gcvpData[k].birthday);*/
//     console.log(gcvpData[k].income.main.type);
//     for(var j=0; j<gcvpData[k].income.main.receipts.length; j++){
//       console.log(gcvpData[k].income.main.receipts[j].date);
//       console.log(gcvpData[k].income.main.receipts[j].value);
//      }
//     for(var j=0; j<gcvpData[k].income.additional.receipts.length; j++){
//         console.log(gcvpData[k].income.additional.receipts[j].date);
//         console.log(gcvpData[k].income.additional.receipts[j].value);
//     }

// }


module.exports = {
  isConclusionsCollected: isConclusionsCollected,
  print_doc: print_doc,
  makeDecision: makeDecision,
  getFromGCVP: getFromGCVP,
  getFromPKB: getFromPKB,
}