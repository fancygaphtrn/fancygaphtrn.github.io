---
title: "Ohms law"
layout: default
parent: Calculators
permalink: /calculators/ohmslaw
---
# {{page.title}}
<script src="{{ base.url | prepend: site.url }}/assets/js/ohmslawcalc.js"></script>
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
