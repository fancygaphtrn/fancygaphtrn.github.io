function nozzleDischarge(form){
var pressureUnits=parseFloat(form.pressureUnits.value);
var diameterUnits=parseFloat(form.diameterUnits.value);
var flowRateUnits=parseFloat(form.flowRateUnits.value);
var pressure=parseFloat(form.pressure.value)*pressureUnits;
var diameter=parseFloat(form.diameter.value)/diameterUnits;
var precision = 2;
var flowRate=Math.pow(diameter,2);flowRate=Math.sqrt(pressure)*flowRate;
flowRate=(28.925*flowRate)/flowRateUnits;

switch(flowRateUnits){case 1:precision=1;break;case 15.850323074:precision=3;break;case 448.8311688:precision=4;break;case .264172051:precision=1;break;default:precision=2;}
form.flowRate.value=flowRate.toFixed(precision);}

function nozzleDiameter(form){
var pressureUnits=parseFloat(form.pressureUnits.value);
var diameterUnits=parseFloat(form.diameterUnits.value);
var flowUnits=parseFloat(form.flowUnits.value);
var pressure=parseFloat(form.pressure.value)*pressureUnits;
var flow=parseFloat(form.flow.value)*flowUnits;
var diameter=Math.sqrt(pressure);
diameter=28.925*diameter;
diameter=Math.sqrt(flow/diameter)*diameterUnits;

switch(diameterUnits){case 1:precision=3;break;case 128:precision=2;break;case 64:precision=3;break;case 32:precision=0;break;case 16:precision=0;break;case 8:precision=0;break;case 25.4:precision=1;break;case 2.54:precision=1;break;default:precision=2;}
form.diameter.value=diameter.toFixed(precision);
}
