---
title: "Ohms law"
layout: default
parent: Calculators
permalink: /calculators/ohmslaw
---
# {{page.title}}
<script type="text/javascript">
<!--
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
//-->
</script>
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="temps" action="">
<table align="center">
    <tr>
      <td valign="top">Volts</td>
	  <td valign="top"><input type="text" name="volts" style="width:150px" value="" maxlength="10" size="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Amperes</td>
	  <td valign="top"><input type="text" name="amperes" style="width:150px" value="" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Watts</td>
	  <td valign="top"><input type="text" name="watts" style="width:150px" value="" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top"><input type="button" value="Calculate" onclick="docalc()" /></td>
	  <td valign="top"><input type="reset"  value="Reset" onclick="clearForm()" />	</td>
	</tr>

</table>
    </form>
<table align="center">
	<tr>
	  <td>
      <b>{{page.title}}</b><br />
Ohms Law is a electrical formula used to show the relationship between Volts(V), Amperes(A) and Watts(W):<br />
<br />
W = V * A<br />

Enter any two values then press Calculate

<br />
	  </td>
	</tr>
</table>
</td>
</tr>
</table>