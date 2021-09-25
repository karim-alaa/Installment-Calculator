var isDiminishing = false;
var total = "";
var cache = "";
var benefit = "";
var months = "";
var remaningMonths = 0;
var totalYears = 0;
var amountPaid = 0;
var totalFund = 0;
var result = "";
var resultHead = "";

function calculate(){
    if(IsFormValid()){
        isDiminishing = $("input[type=checkbox][name=isDiminishing]:checked" ).val() == 'on';
        benefit = benefit / 100;
        remaningMonths = months;
		totalYears = Math.round(months/12);
		amountPaid = 0;
		totalFund = total-cache;
        if(isDiminishing){
			var totalFundBack = 0;
			result += "<table class=\"table table-striped table-hover\">";
			result += "<thead class=\"thead-dark\">";
			result += "<tr>";
			result += "<th class=\"col\">السنه</th>";
			result += "<th class=\"col\">المبلغ الكلى</th>";
			result += "<th scope=\"col\">القسط الشهرى</th>";
			result += "</tr>";
			result += "</thead>";
			for(var i = 1; i <= totalYears; i++)
			{
				var yearMonths = 0;
				if(i < totalYears){
					remaningMonths -= 12;
					yearMonths = 12;
				}else{
					yearMonths = remaningMonths;
					remaningMonths = 0;
				}
				var totalYearMonthlyInstalments = 0; 
				if(i == 0)
					totalYearMonthlyInstalments = totalFund * benefit * yearMonths;
				else
					totalYearMonthlyInstalments = (totalFund - amountPaid) * benefit * (yearMonths / 12);
				amountPaid += totalYearMonthlyInstalments/ yearMonths;
				var fundBack = Math.round(totalYearMonthlyInstalments + (totalFund / totalYears));
				totalFundBack += fundBack;
				result += "<tbody>";
				result +="<tr>";
				result += "<th scope=\"row\">"+i+"</th>";
				result += "<th>"+fundBack+"</th>";
				result += "<th>"+Math.round(fundBack / yearMonths)+"</th>";
				result +="</tr>";
				result += "</tbody>";
            }
			resultHead += "<p> إجمالى المبلغ المدفوع فى كل الاقساط: " + totalFundBack + "</p>";
			result += "</table>";
            result = resultHead + result;
		}else{
			var totalBenefit = Math.round(totalFund * benefit * totalYears);
			var totalFundBack = Math.round((totalBenefit + totalFund));
			var monthlyInstallment = Math.round(totalFundBack  / months);
			result += "<p>" + "إجمالى المبلغ المدفوع فى كل الاقساط: " + totalFundBack + "</p>";
            result += "<p>" + "مقدار الفائدة: " + totalBenefit + "</p>";
            result += "<p>" + "القسط الشهرى: " + monthlyInstallment + "</p>";
		}
        $('#result').html(result);
    }
}

function IsFormValid(){
    total = $("#total").val();
    cache = $("#cache").val();
    benefit = $("#benefit").val();
    months = $("#months").val();
    if(total != "" && cache != "" && benefit != "" && months != "")
        return true;
    return false;
}