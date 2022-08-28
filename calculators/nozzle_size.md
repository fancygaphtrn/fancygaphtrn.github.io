---
title: "Hydro nozzle size"
layout: default
parent: Calculators
permalink: /calculators/nozzle_size
---
# {{page.title}}
<script src="{{ base.url | prepend: site.url }}/assets/js/nozzle_size.js"></script>

<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form  action="">
<table align="center">
  <tr>
    <td>Pressure</td>
	  <td><input type="text" name="pressure"  onchange="nozzleDischarge( this.form )" style="width:150px" value="30" maxlength="10" size="10" />	</td>
    <td>
       <select name="pressureUnits" onchange="nozzleDischarge( this.form )">
       <option value="1" selected="selected">psi</option>
       <option value=".433528">ft of water</option>
       <option value="1.422336">m of water</option>
       <option value="14.503773773">bars</option>
       <option value=".145038">kPa</option>
       <option value="14.695949">atm</option>
       <option value=".491154">in of Mercury</option>
       </select>
    </td>  
  </tr>
  <tr>
    <td>Diameter</td>
    <td><input type="text" name="diameter"  onchange="nozzleDischarge( this.form )" style="width:150px" value=".25" size="10" maxlength="10" />	</td>
    <td>
      <select name="diameterUnits" onchange="nozzleDischarge( this.form )">
      <option value="1" selected="selected">in</option>
      <option value="128">128ths in</option>
      <option value="64">64ths in</option>
      <option value="32">32nds in</option>
      <option value="16">16ths in</option>
      <option value="8">8ths in</option>
      <option value="25.4">mm</option>
      <option value="2.54">cm</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>Flow rate</td>
      <td><input type="text" name="flowRate" style="width:150px" value="" size="10" maxlength="10" disabled="disabled" />	</td>
    <td>
       <select name="flowRateUnits" onchange="nozzleDischarge( this.form )">
       <option value="1" selected="selected">gpm</option>
       <option value="15.850323074">lps</option>
       <option value="448.8311688">cfs</option>
       <option value=".264172051">lpm</option>
       </select>
    </td>
  </tr>
  <tr>
    <td><input type="button" onclick="nozzleDischarge( this.form )" value="Calculate"/></td>
    <td></td>
    <td></td>
  </tr>
</table>
</form>
<form  action="">
<table align="center">
  <tr>
    <td>Pressure</td>
	  <td><input type="text" name="pressure"  onchange="nozzleDischarge( this.form )" style="width:150px" value="30" maxlength="10" size="10" />	</td>
    <td>
       <select name="pressureUnits" onchange="nozzleDischarge( this.form )">
       <option value="1" selected="selected">psi</option>
       <option value=".433528">ft of water</option>
       <option value="1.422336">m of water</option>
       <option value="14.503773773">bars</option>
       <option value=".145038">kPa</option>
       <option value="14.695949">atm</option>
       <option value=".491154">in of Mercury</option>
       </select>
    </td>  
  </tr>
  <tr>
    <td>Flow rate</td>
      <td><input type="text" name="flow" onchange="nozzleDiameter( this.form )" style="width:150px" value="10" size="10" maxlength="10" />	</td>
    <td>
       <select name="flowUnits" onchange="nozzleDiameter( this.form )">
       <option value="1" selected="selected">gpm</option>
       <option value="15.850323074">lps</option>
       <option value="448.8311688">cfs</option>
       <option value=".264172051">lpm</option>
       </select>
    </td>
  </tr>
  <tr>
    <td>Diameter</td>
    <td><input type="text" name="diameter" style="width:150px" value="" size="10" maxlength="10"  disabled="disabled"/>	</td>
    <td>
      <select name="diameterUnits" onchange="nozzleDiameter( this.form )">
      <option value="1" selected="selected">in</option>
      <option value="128">128ths in</option>
      <option value="64">64ths in</option>
      <option value="32">32nds in</option>
      <option value="16">16ths in</option>
      <option value="8">8ths in</option>
      <option value="25.4">mm</option>
      <option value="2.54">cm</option>
      </select>
    </td>
  </tr>
  <tr>
    <td><input type="button" onclick="nozzleDiameter( this.form )" value="Calculate"/></td>
    <td></td>
    <td></td>
  </tr>
</table>
</form>
<table align="center">
	<tr>
	  <td>
      <b>{{ page.title }}</b><br />
Calculates Flow rate from a given water pressure and nozzle diameter or the nozzle diameter given the water pressure and flow rate.
		  
Formula for calculation is:<br />
Flow(gpm) = 28.9 x Diamter(in) squared x sqrt Pressure(psi)<br />
	  </td>
	</tr>
</table>
</td>
</tr>
</table>
