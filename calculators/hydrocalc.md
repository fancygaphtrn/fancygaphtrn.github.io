---
title: "Hydro Power Calculator"
layout: default
parent: Calculators
permalink: /calculators/hydrocalc
---
# {{page.title}}
<script src="{{ base.url | prepend: site.url }}/assets/js/hydrocalc.js"></script>
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="temps">
<table align="center">
    <tr>
      <th valign="top">Head(feet)</th>
      <th valign="top">Flow(gallons per minute)</th>
      <th valign="top">Efficiency(%)</th>
      <th valign="top">Watts</th>
      <th valign="top">&nbsp;</th>
  	</tr>
    <tr>
  	  <td valign="top"><input type="text" name="head2" onChange="docalc2()" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top"><input type="text" name="flow2" onChange="docalc2()" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top"><input type="text" name="efficiency2" onChange="docalc2()" style="width:3em" value="50" maxlength="3" size="3" />	</td>
  	  <td valign="top"><input type="text" name="watts2" disabled="disabled" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top"><input type="button"  value="Clear" onClick="clearForm2()" />	</td>
    </tr>
    <tr>
      <th valign="top">Head(feet)</th>
      <th valign="top">Flow(Cubic Feet per Second)</th>
      <th valign="top">&nbsp;</th>
      <th valign="top">Watts</th>
      <th valign="top">&nbsp;</th>
  	</tr>
    <tr>
  	  <td valign="top"><input type="text" name="head3" onChange="docalc3()" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top"><input type="text" name="flow3" onChange="docalc3()" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top">&nbsp;</td>
  	  <td valign="top"><input type="text" name="watts3" disabled="disabled" style="width:6em" value="" maxlength="6" size="6" />	</td>
  	  <td valign="top"><input type="button"  value="Clear" onClick="clearForm3()" />	</td>
    </tr>
</table>
<table align="center">
    <tr>
      <th valign="top">Static Pressure(psi)</th>
      <th valign="top">Head(feet)</th>
      <th valign="top">Head(meters)</th>
      <th valign="top">&nbsp;</th>
  	</tr>
    <tr>
  	  <td valign="top"><input type="text" name="pressure4" onChange="docalc4()" style="width:6em" value="" maxlength="6" size="4" />	</td>
  	  <td valign="top"><input type="text" name="headfeet4" disabled="disabled" style="width:6em" value="" maxlength="6" size="4" />	</td>
  	  <td valign="top"><input type="text" name="headmeters4" disabled="disabled" style="width:6em" value="" maxlength="6" size="4" />	</td>
  	  <td valign="top"><input type="button"  value="Clear" onClick="clearForm4()" />	</td>
    </tr>
</table>
</form>
<table align="center">
	<tr>
	  <td>
      <b>{{ page.title }}</b><br />
These calculations are intended to help in the surveying or assessment of a site to generate 
hydro electricity.
<br /><br />
The two vital factors to consider are the flow and the head of the stream or river. 
The flow is the volume of water which can be captured and re-directed to turn the 
turbine generator, and the head is the distance the water will fall on its way to the 
generator. The larger the flow - i.e. the more water there is, and the higher the head 
- i.e. the higher the distance the water falls - the more energy is available for conversion 
to electricity. Double the flow and double the power, double the head and double the power 
again.<br />
A low head site has a head of below 30 feet. In this case you need to have a large volume 
of water flow if you are to generate much electricity. A high head site has a head of above 
60 feet. In this case you can get away with not having a large flow of water, because 
gravity will give what you have an energy boost.<br /><br />
The key equation to remember is the following:
<br />Power = Head x Flow x Gravity - System Effiency<br /><br />
where power is measured in Watts, head in meters or feet, flow in liters per second or 
gallons per minute, and acceleration due to gravity.  Effiency depends on the many factors.
typical values are between 50% and 75%.<br /><br />
When evaluating a site it may be difficult to measure the head.  If possible you could use
water hose.   Run the hose between the water source and the turbine location.  Make sure the 
water is not flowing or static, and there are is not any air in the line.  You can then measure 
the pressure and convert that to the head, using the calculator above. '
	  </td>
	</tr>
</table>
</td>
</tr>
</table>
