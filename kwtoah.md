---
title: "KW hours to Amp hours"
layout: page
---
<script type="text/javascript">
<!--
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
//-->
</script>
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="temps" action="">
<table align="center">
    <tr>
    <td valign="top">Watt hours in days</td>
	  <td valign="top"><input type="text" name="kwh" style="width:150px" value="" maxlength="10" size="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Watt time in hours</td>
	  <td valign="top"><input type="text" name="kwht" style="width:150px" value="" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Watt hours per day</td>
	  <td valign="top"><input type="text" disabled="disabled" name="kwhd" style="width:150px" value="" size="10" maxlength="10" readonly="readonly" />	</td>
	</tr>
	<tr>
	  <td valign="top">Battery voltage</td>
	  <td valign="top"><input type="text" name="bvoltage" style="width:150px" value="24" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Avg. Amp hours</td>
	  <td valign="top"><input type="text" disabled="disabled" name="avgamphour" style="width:150px" value="" size="10" maxlength="10" readonly="readonly" />	</td>
	</tr>
	<tr>
	  <td valign="top">Total Amp hours per day</td>
	  <td valign="top"><input type="text" disabled="disabled" name="totalamphour" style="width:150px" value="" size="10" maxlength="10" readonly="readonly" />	</td>
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
Used to convert the measured watt hours over the time as measured on a meter to the
 equivalent daily watt hours, of the device measured.
<br />
<br />
Watt Time in days = Watt Time in hours / 24 hours in a day<br />
Watt Hours per day = Watt Hours / Watt Time in days<br />
<br />
Watt hours per day is then converted to the equivelent battery amp hours at the
 systems voltage.
<br />
<br />
Average Amp per Hour =  Watt Hours / Watt Time in hours / Battery voltage <br />
Total Amp hour per day =  Watt Hours per day / Battery voltage <br />
<br />
Enter the values then press Calculate<br />
<br />
I use a KILL A WATT P440 meter from <a target="_blank" href="http://www.p3international.com">
http://www.p3international.com</a><br />
<br />
	  </td>
	</tr>
</table>
</td>
</tr>
</table>
