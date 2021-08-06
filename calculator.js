var isDiminishing = false;
var total = "";
var cache = "";
var benefit = "";
var months = "";


function calculate(){
    if(IsFormValid()){
        isDiminishing = $("input[type=checkbox][name=isDiminishing]:checked" ).val() == 'on';
        benefit = benefit / 100;
        var remaningMonths = months;
		var totalYears = Math.round(months/12);
		var amountPaid = 0;
		var totalFund = total-cache;
        var result = "";
        var resultHead = "<p> Result: </p>";
        if(isDiminishing){
			var totalFundBack = 0;
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

				totalFundBack += Math.round(totalYearMonthlyInstalments);
                result += "<p>" + "Year "+i+": Total Paid: "+Math.round(totalYearMonthlyInstalments) + "</p>";
                result += "<p>" + "Year "+i+": Monthly Installment: "+Math.round(totalYearMonthlyInstalments /yearMonths) + "</p>";
			}
			resultHead += "Total Fund Back: " + totalFundBack + "</p>";
            result = resultHead + result;
		}else{
			var totalBenefit = Math.round(totalFund * benefit * totalYears);
			var monthlyInstallment = Math.round(totalBenefit / months);
            result += "<p>" + "Total Benefit: " + totalBenefit + "</p>";
            result += "<p>" + "Monthly Installment: " + monthlyInstallment + "</p>";
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