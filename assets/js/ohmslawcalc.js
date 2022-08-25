function perRound(num, precision) {
	var precision = 9; //default value if not passed from caller, change if desired
	// remark if passed from caller
	precision = parseInt(precision); // make certain the decimal precision is an integer
	var result1 = num * Math.pow(10, precision);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10, precision);
	return result3;
}
function docalc()
{
   var fwatts = document.temps.watts.value;
   var fvolts = document.temps.volts.value;
   var famperes = document.temps.amperes.value;
   
   if (fvolts != "" && famperes != "") {
      document.temps.watts.value = perRound(fvolts * famperes);
   } else if (fvolts != "" && fwatts != "") {
      document.temps.amperes.value = perRound(fwatts / fvolts);
   } else if (famperes != "" && fwatts != "") {
      document.temps.volts.value = perRound(fwatts / famperes);
   }
}

function clearForm()
{
   document.temps.watts.value = "";
   document.temps.volts.value = "";
   document.temps.amperes.value = "";
}
