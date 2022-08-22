---
title: "Bowl segment"
layout: default
parent: Calculators
permalink: /calculators/bowlsegment
---
# {{page.title}}
<script type="text/javascript">

window.onload = function() {
	doouter();
};
function draw(){
    var id = document.temps;
    sides = parseInt(id.segments.value);
    var font = "sans";
    var fontsize = 16;
    var canvas = document.getElementById('canvas');;
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.clearRect( 0, 0, canvas.width,canvas.height );            
        ctx.strokeStyle = '#6688AA';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba( 170, 187, 204, 0.5 )';
        drawPoly(ctx,150,150,sides,150,90);
            
        ctx.strokeStyle = '#6688AA';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba( 255, 255, 255, 1 )';
        drawPoly(ctx,150,150,sides,100,90);
            
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 1;
        drawOval(ctx,150,150, 135);
            
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 1;
        drawOval(ctx,150,150, 110);
            
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = 'rgba( 0, 0, 0, 1 )';
        ctx.font = "normal 10px sans-serif";
        ctx.fillText('Fudge Factor', 160, 120);
        ctx.fillText('Outside dia.', 10, 20);
        ctx.fillText('Inside dia.', 100, 80);
        ctx.fillText('Bowl thickness', 115, 35);

        ctx.moveTo(190, 110);
        ctx.lineTo(275, 75); 
        ctx.moveTo(190, 110);
        ctx.lineTo(240, 105); 
        ctx.stroke();
    }
}
function drawOval( ctx, x, y, radius, yRadius )
{
    // init variables
    var theta = 0;
    var xrCtrl = 0;
    var yrCtrl = 0;
    var angle = 0;
    var angleMid = 0;
    var px = 0; 
    var py =0;
    var cx = 0;
    var cy = 0;
    
    // if only yRadius is undefined, yRadius = radius
    if( yRadius == undefined ) 
    {
        yRadius = radius;
    }
    
    // covert 45 degrees to radians for our calculations
    theta = Math.PI / 4;
    
    // calculate the distance for the control point
    xrCtrl = radius / Math.cos( theta / 2 );
    yrCtrl = yRadius / Math.cos( theta / 2 );
    
    // start on the right side of the circle
    angle = 0;
    
    ctx.beginPath();
    ctx.moveTo( x + radius, y );
    
    // this loop draws the circle in 8 segments
    for( var i = 0; i < 8; i++ ) 
    {
        // increment our angles
        angle += theta;
        angleMid = angle - ( theta / 2 );
        
        // calculate our control point
        cx = x + Math.cos( angleMid ) * xrCtrl;
        cy = y + Math.sin( angleMid ) * yrCtrl;
        
        // calculate our end point
        px = x + Math.cos( angle ) * radius;
        py = y + Math.sin( angle ) * yRadius;
        
        // draw the circle segment
        ctx.quadraticCurveTo( cx, cy, px, py );
    }
    
    ctx.stroke();
}
function drawPoly( ctx, x, y, sides, radius, angle ) 
{
    // convert sides to positive value
    var count = Math.abs( sides );
    
    // check that count is sufficient to build polygon
    if( count > 2 ) 
    {
        // init vars
        var step = 0;
        var start = 0; 
        var n = 0;
        var dx = 0;
        var dy = 0;
        
        // calculate span of sides
        step = ( Math.PI * 2 ) / sides;
        
        // calculate starting angle in radians
        start = ( angle / 180 ) * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo( x + ( Math.cos( start ) * radius ), y - ( Math.sin( start ) * radius ) );
        
        // draw the polygon
        for( n = 1; n <= count; n++ ) 
        {
            dx = x + Math.cos( start + ( step * n ) ) * radius;
            dy = y - Math.sin( start + ( step * n ) ) * radius;
            ctx.lineTo( dx, dy );
        }
        
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}
function tofraction(dec) {

 num = dec.toString().split('.',2);
 if (typeof num[1] === 'undefined') {
	num[1] = "0";
 }
 var dec = parseInt(num[1]);
 var div = Math.pow(10,num[1].toString().length);

 denominator = 16;
 divisor = div/denominator;
 numerator = parseInt((dec/divisor).toFixed(0));
 
 if (numerator == denominator) {
	num[0]++;
	numerator = 0;
 }
 while (numerator % 2 == 0 && numerator > 0) {
    numerator = numerator / 2;
    denominator = denominator / 2;
 }
 if (num[0] > 0) {
	if (numerator > 0) {
		retval = num[0] + ' ' + numerator.toString() + '/' + denominator.toString();
	} else {
		retval = num[0];
	}
 } else {
	if (numerator > 0) {
		retval = numerator.toString() + '/' + denominator.toString();
	} else {
		retval = num[0];
	}
 }
 return retval;
}
function doouter() {
    var id = document.temps;
    id.innerdiameter.value = parseFloat(id.outerdiameter.value) - parseFloat(id.bowlthickness.value);
    docalc();
}
function doinner() {
    var id = document.temps;
    id.bowlthickness.value = parseFloat(id.outerdiameter.value) - parseFloat(id.innerdiameter.value);
    docalc();
}
function docalc() {
    var id = document.temps;
    var segments = parseInt(id.segments.value);
    var outerdiameter = parseFloat(id.outerdiameter.value);
    var innerdiameter = parseFloat(id.innerdiameter.value);
    var fudge = parseFloat(id.fudgefactor.value);
    
    id.shortsideangle.value = (180/segments).toFixed(2);
    id.longsideangle.value = (90-parseFloat(id.shortsideangle.value)).toFixed(2);
    
    var outerradius = (outerdiameter + fudge) / 2.0;
    id.longsidelengthdecimal.value = (outerradius * 2.0 * Math.tan(Math.PI / segments)).toFixed(4);
    
    var innerradius = (innerdiameter - fudge) / 2.0;
    id.shortsidelengthdecimal.value = (innerradius * 2.0 * Math.sin(Math.PI / segments)).toFixed(4);

	parseFloat(id.shortsidelengthdecimal.value) / (2 * Math.tan(Math.PI / segments))
    id.boardwidthdecimal.value = (outerradius - parseFloat(id.shortsidelengthdecimal.value) / (2 * Math.tan(Math.PI / segments))).toFixed(4);

	if (id.cutmethod.value == '0') {
		id.boardlengthdecimal.value = ((parseFloat(id.longsidelengthdecimal.value) + parseFloat(id.sawwidthdecimal.value)) * segments).toFixed(4);
	} else {
		numlong = (segments / 2).toInt();
		numshort = segments - numlong;
		numlonglength = (parseFloat(id.longsidelengthdecimal.value) + parseFloat(id.sawwidthdecimal.value)) * numlong;
		numshortlength = (parseFloat(id.shortsidelengthdecimal.value) + parseFloat(id.sawwidthdecimal.value)) * numshort;
		id.boardlengthdecimal.value = (numlonglength + numshortlength).toFixed(4);
	}
    id.segmentsfraction.value = tofraction(parseFloat(id.segments.value));
    id.outerdiameterfraction.value = tofraction(parseFloat(id.outerdiameter.value));
    id.innerdiameterfraction.value = tofraction(parseFloat(id.innerdiameter.value));
    id.bowlthicknessfraction.value = tofraction(parseFloat(id.bowlthickness.value));
    id.fudgefactorfraction.value = tofraction(parseFloat(id.fudgefactor.value));
    id.longsidelengthfraction.value = tofraction(parseFloat(id.longsidelengthdecimal.value));
    id.shortsidelengthfraction.value = tofraction(parseFloat(id.shortsidelengthdecimal.value));
    id.boardwidthfraction.value = tofraction(parseFloat(id.boardwidthdecimal.value));
    id.sawwidthfraction.value = tofraction(parseFloat(id.sawwidthdecimal.value));
    id.boardlengthfraction.value = tofraction(parseFloat(id.boardlengthdecimal.value));
    
    draw();

}


</script>

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
