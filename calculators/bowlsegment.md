---
title: "Bowl segment"
layout: default
parent: Calculators
permalink: /calculators/bowlsegment
my_js: |
---
# {{page.title}}

{% include assets/js/bowlsegment.js %}
	
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="temps" action="">
<table align="center">
     <tr>
        <td>&nbsp;</td>
        <td><label>Decimal</label></td>
        <td><label>~Fraction</label></td>
    </tr>
   <tr>
        <td><label>Number of Segments</label></td>
        <td><input type="number" name="segments" onchange="docalc()" step="1" value="12" maxlength="8" size="8" />	</td>
        <td><input type="text" name="segmentsfraction" disabled="disabled" size="8" />	</td>
   </tr>
    <tr>
        <td><label>Finished Outer diameter (in)</label></td>
        <td><input type="number" name="outerdiameter" onchange="doouter()" step="0.25"  value="11" maxlength="8" size="8" />	</td>
        <td><input type="text" name="outerdiameterfraction" disabled="disabled" size="8" />	</td>
   </tr>
    <tr>
        <td><label>Finished Inner diameter (in)</label></td>
        <td><input type="number" name="innerdiameter" onchange="doinner()" step="0.25" value="10.625" maxlength="8" size="8" />	</td>
        <td><input type="text" name="innerdiameterfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Finished Bowl thickness</label></td>
        <td><input type="number" name="bowlthickness" onchange="doouter()" step="0.125" value="0.375" maxlength="8" size="8" />	</td>
        <td><input type="text" name="bowlthicknessfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Fudge factor (in)</label></td>
        <td><input type="number" name="fudgefactor" onchange="docalc()" step="0.125" value="0.25" maxlength="8" size="8" />	</td>
        <td><input type="text" name="fudgefactorfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Long side length</label></td>
        <td><input type="text" name="longsidelengthdecimal" disabled="disabled" size="8" />	</td>
        <td><input type="text" name="longsidelengthfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Short side length</label></td>
        <td><input type="text" name="shortsidelengthdecimal" disabled="disabled" size="8" />	</td>
        <td><input type="text" name="shortsidelengthfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Board width</label></td>
        <td><input type="text" name="boardwidthdecimal" disabled="disabled" size="8" />	</td>
        <td><input type="text" name="boardwidthfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Cut method</label></td>
        <td>
			<select name="cutmethod"  onchange="docalc()">
				<option value="0">Grain Matching</option>
				<option value="1">Board flip</option>
			</select>
		</td>
        <td></td>
    </tr>
    <tr>
        <td><label>Saw blade width</label></td>
        <td><input type="number" name="sawwidthdecimal" onchange="docalc()" step="0.125" value="0.125" maxlength="8" size="8" />	</td>
        <td><input type="text" name="sawwidthfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td><label>Board length</label></td>
        <td><input type="text" name="boardlengthdecimal" disabled="disabled" size="8" />	</td>
        <td><input type="text" name="boardlengthfraction" disabled="disabled" size="8" />	</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td><label>Short side</label></td>
        <td><label>Long side</label></td>
    </tr>
    <tr>
        <td><label>Miter angle</label></td>
        <td><input type="text" name="shortsideangle" disabled="disabled" size="8" />	</td>
        <td><input type="text" name="longsideangle" disabled="disabled" size="8" />	</td>
    </tr>
</table>
</form>
<table align="center">
  <tr>
    <td align="center">
      <canvas id="canvas" width="300" height="300">
      <p>Sorry, but your browser does not support<code>&lt;canvas&gt;</code> :(</p>
      </canvas>
	  </td>
	</tr>
    <tr>
      <td>
      <b>{{ page.title }}</b><br />
This calculator is used to for automating the process of creating rings for a segmented bowls or vessels.
      </td>
      <td>
Another nice bowl segment calculator [Segmented Turning Calculator](https://www.blocklayer.com/woodturning-segments.aspx)
      </td>
	</tr>
</table>
</td>
</tr>
</table>

