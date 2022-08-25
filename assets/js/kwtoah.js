function perRound(num, precision) {
	var precision = 4; //default value if not passed from caller, change if desired
	// remark if passed from caller
	precision = parseInt(precision); // make certain the decimal precision is an integer
	var result1 = num * Math.pow(10, precision);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10, precision);
	return result3;
}
function docalc()
{
   document.temps.kwhd.value = perRound((document.temps.kwh.value  / (document.temps.kwht.value / 24) ), 4);
   document.temps.avgamphour.value = perRound((document.temps.kwh.value  / document.temps.kwht.value )  / document.temps.bvoltage.value, 4);
   document.temps.totalamphour.value = perRound(document.temps.kwhd.value / document.temps.bvoltage.value, 4);
 totalamphour  
}
