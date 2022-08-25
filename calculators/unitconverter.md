---
title: "Unit coverter"
layout: default
parent: Calculators
permalink: /calculators/unitconvertermd
---
# {{page.title}}
<style type="text/css"> 

*.type   { width:200px;            text-align:center;   color:#000000;     background-color:#99ff99;
           margin:0px;             border-color:black;  border-width:1px;  border-style:solid;  }
*.value  { width:200px;            text-align:center;   color:#000000;     background-color:#99ff99;
           margin:0px;             border-color:black;  border-width:1px;  border-style:solid;  }
*.base   { width:200px;            text-align:left;     color:#000000;     background-color:#99ff99;
           margin:0px;             border-color:black;  border-width:1px;  border-style:solid;  }
*.result { width:200px;            text-align:center;   color:#000000;     background-color:#cccccc;
           margin:0px;             border-color:black;  border-width:1px;  border-style:solid;  }
*.target { width:200px;            text-align:left;     color:#000000;     background-color:#cccccc;
           margin:0px;             border-color:black;  border-width:1px;  border-style:solid;  }

</style> 
 
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="converter" summary="converter" onsubmit="enter(); return false;"> 
  <table align="left"> 
    <tr><td style="text-align:right">Convert</td> 
        <td><select id="type"  onchange="newType()"> 
                <option id="temperature">         Temperature</option> 
                <option id="telephony">     Telephony traffic</option> 
                <option id="numbersystem">      Number system</option> 
                <option id="angle">                     Angle</option> 
                <option id="length">                   Length</option> 
                <option id="area">                       Area</option> 
                <option id="volume">                   Volume</option> 
                <option id="time">                       Time</option> 
                <option id="frequency">             Frequency</option> 
                <option id="speed">                     Speed</option> 
                <option id="acceleration">       Acceleration</option> 
                <option id="mass">                       Mass</option> 
                <option id="density">                 Density</option> 
                <option id="force">                     Force</option> 
                <option id="moment">                   Moment</option> 
                <option id="forcePerLength"> Force per length</option> 
                <option id="forcePerArea">     Force per area</option> 
                <option id="power">                     Power</option> 
                <option id="energy">                   Energy</option> 
                <option id="massFlux">              Mass flux</option> 
                <option id="volumeFlux">          Volume flow</option> 
            </select></td></tr> 
    <tr><td>&nbsp;</td> 
        <td>&nbsp;</td></tr> 
    <tr><td style="text-align:right">From Value</td> 
        <td><input  type="number" id="value"   onkeyup="newValue()" /></td></tr> 
    <tr><td style="text-align:right">From Unit</td> 
        <td><select id="base"  onchange="newBase()"></select></td></tr> 
    <tr><td></td><td style="text-align:center">=</td></tr> 
    <tr><td style="text-align:right">To</td> 
        <td><input  id="result"  readonly="readonly" /></td></tr> 
    <tr><td style="text-align:right">To Unit</td> 
        <td><select id="target"  onchange="newTarget()"></select></td></tr> 
  </table> 
 <!-- Undisplayed image needed to catch enter key -> Onsubmit form with the routine 'enter()', see above --> 
 <input type="image" src=""
        style="display:none; border-width:0; border-style:none; margin:0; padding:0; width:0; height:0;"> 
</form> 
</td>
</tr>
</table>
<script type="text/javascript"> 
  initialize();
</script> 
