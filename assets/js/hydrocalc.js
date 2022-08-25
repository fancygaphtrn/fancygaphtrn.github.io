function perRound(num, precision) {
  precision = typeof(precision) != 'undefined' ? precision : 9;
	// remark if passed from caller
	precision = parseInt(precision); // make certain the decimal precision is an integer
	var result1 = num * Math.pow(10, precision);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10, precision);
	return result3;
}


function docalc2()
{
  document.temps.watts2.value=perRound(Number(document.temps.head2.value * document.temps.flow2.value * 0.18 * (document.temps.efficiency2.value *.01)),Number(2));
  document.temps.watts3.value=document.temps.watts2.value
  document.temps.head3.value=document.temps.head2.value;

  document.temps.flow3.value=perRound(Number(document.temps.flow2.value * 0.002228),6);
  
  document.temps.pressure4.value=perRound(Number(document.temps.head2.value * 0.432781),6);
  docalc4();
}
function clearForm2()
{
  document.temps.head2.value = "";
  document.temps.flow2.value = "";
  document.temps.efficiency2.value = "";
  document.temps.watts2.value = "";
  document.temps.head3.value = "";
  document.temps.flow3.value = "";
  document.temps.watts3.value = "";
}
function docalc3()
{
  document.temps.head2.value=document.temps.head3.value;

  document.temps.flow2.value=perRound(Number(document.temps.flow3.value * 448.9),Number(2));

  document.temps.watts2.value=perRound(Number(document.temps.head2.value * document.temps.flow2.value * 0.18 * (document.temps.efficiency2.value *.01)),Number(2));
  document.temps.watts3.value=document.temps.watts2.value

  document.temps.pressure4.value=perRound(Number(document.temps.head3.value * 0.432781),6);
  docalc4();
}
function clearForm3()
{
  document.temps.head2.value = "";
  document.temps.flow2.value = "";
  document.temps.efficiency2.value = "";
  document.temps.watts2.value = "";
  document.temps.head3.value = "";
  document.temps.flow3.value = "";
  document.temps.watts3.value = "";
}
function docalc4()
{
  pressure4=Number(document.temps.pressure4.value);

  document.temps.headfeet4.value=perRound(Number(pressure4 / 0.432781),Number(2));
  document.temps.headmeters4.value=perRound(Number(document.temps.headfeet4.value * 0.3048),Number(2));

  document.temps.head2.value = document.temps.headfeet4.value;
  document.temps.head3.value = document.temps.headfeet4.value;

}
function clearForm4()
{
  document.temps.pressure4.value = "";
  document.temps.headfeet4.value = "";
  document.temps.headmeters4.value = "";
}
