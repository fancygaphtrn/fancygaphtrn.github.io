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

function calc_precipitation(form){
var diameterUnits=parseFloat(form.diameterUnits.value);
var pressureUnits=parseFloat(form.pressureUnits.value);
var headSpacingUnits=parseFloat(form.headSpacingUnits.value);
var lineSpacingUnits=parseFloat(form.lineSpacingUnits.value);
var nozzleFlowRateUnits=parseFloat(form.nozzleFlowRateUnits.value);
var nozzleAppRateUnits=parseFloat(form.nozzleAppRateUnits.value);
var diameter=parseFloat(form.diameter.value)*diameterUnits;
var pressure=parseFloat(form.pressure.value)/pressureUnits;
var headSpacing=parseFloat(form.headSpacing.value)/headSpacingUnits;
var lineSpacing=parseFloat(form.lineSpacing.value)/lineSpacingUnits;
var efficiency=parseFloat(form.efficiency.value);
var precisionF = 2;
var precisionA = 2;
var nozzleFlowRate=diameter/2.54;
nozzleFlowRate=28.925*Math.sqrt(pressure)*Math.pow(nozzleFlowRate,2);
nozzleFlowRate=nozzleFlowRate/nozzleFlowRateUnits;

switch(nozzleFlowRateUnits){case 1:precisionF=2;break;case .016666666666667:precisionF=1;break;case 448.8311688:precisionF=4;break;case 18.85714:precisionF=3;break;case 452.5714:precisionF=4;break;case 226.2857:precisionF=4;break;case 15.85032:precisionF=3;break;case .264172051:precisionF=2;break;case .004402868:precisionF=0;break;default:precisionF=2;}

form.nozzleFlowRate.value=nozzleFlowRate.toFixed(precisionF);

var nozzleAppRate=diameter/2.54;
nozzleAppRate=Math.pow(nozzleAppRate,2);
nozzleAppRate=28.925*Math.sqrt(pressure)*nozzleAppRate;
nozzleAppRate=nozzleAppRate/((lineSpacing*headSpacing)/efficiency*100);
nozzleAppRate=parseFloat(96.25025*nozzleAppRate*nozzleAppRateUnits);

switch(nozzleAppRateUnits){case 1:precisionA=3;break;case 24:precisionA=2;break;case 25.4:precisionA=2;break;case 609.6:precisionA=0;break;case 2.54:precisionA=3;break;case 60.96:precisionA=1;break;default:precisionA=2;}

form.nozzleAppRate.value=nozzleAppRate.toFixed(precisionA);
}
function calc_nozzleDiameter(form){ 
var applicationRateUnits=parseFloat(form.applicationRateUnits.value);
var pressureUnits=parseFloat(form.pressureUnits.value);
var headSpaceUnits=parseFloat(form.headSpaceUnits.value);
var lineSpaceUnits=parseFloat(form.lineSpaceUnits.value);
var nozzleFlowUnits=parseFloat(form.nozzleFlowUnits.value);
var nozzleDiameterUnits=parseFloat(form.nozzleDiameterUnits.value);
var applicationRate=parseFloat(form.applicationRate.value)/applicationRateUnits;
var efficiency=parseFloat(form.efficiency.value)/100;
var lineSpace=parseFloat(form.lineSpace.value)/lineSpaceUnits;
var headSpace=parseFloat(form.headSpace.value)/headSpaceUnits;
var pressure=parseFloat(form.pressure.value)/pressureUnits;
var nozzleFlow=applicationRate/96.25025;
var precisionF = 2;
var precision = 2;

nozzleFlow=nozzleFlow*lineSpace*headSpace;
nozzleFlow=nozzleFlow/efficiency;
nozzleFlow=nozzleFlow/nozzleFlowUnits;

switch(nozzleFlowUnits){case 1:precisionF=2;break;case .016666666666667:precisionF=1;break;case 448.8311688:precisionF=4;break;case 18.85714:precisionF=3;break;case 452.5714:precisionF=4;break;case 226.2857:precisionF=4;break;case 15.85032:precisionF=3;break;case .264172051:precisionF=2;break;case .004402868:precisionF=0;break;default:precisionF=2;}

form.nozzleFlow.value=nozzleFlow.toFixed(precisionF);
nozzleDiameter=applicationRate/96.25025;
nozzleDiameter=(nozzleDiameter*lineSpace*headSpace)/efficiency;
nozzleDiameter=nozzleDiameter/(Math.sqrt(pressure)*28.925);
nozzleDiameter=Math.sqrt(nozzleDiameter);
nozzleDiameter=nozzleDiameter*2.54;
nozzleDiameter=nozzleDiameter/nozzleDiameterUnits;

switch(nozzleDiameterUnits){case .01984375:precision=0;break;case .0396875:precision=0;break;case .079375:precision=0;break;case .15875:precision=1;break;case .3175:precision=1;break;case 2.54:precision=3;break;case 1:precision=3;break;case.1:precision=2;break;default:precision=2;}
form.nozzleDiameter.value=nozzleDiameter.toFixed(precision);}
function calc_nozzleDiameterSize(diameter){
var returnVal=0;
if(isNaN(diameter)||(diameter==0)||!isFinite(diameter)){returnVal="";return returnVal;}
if((diameter%2)>0){returnVal=diameter;}
else{if((diameter%4)>0){diameter=diameter/2;returnVal=diameter;}
else{if((diameter%8)>0){diameter=diameter/4;returnVal=diameter;}
else{if((diameter%16)>0){diameter=diameter/8;returnVal=diameter;}
else{if((diameter%32)>0){diameter=diameter/16;returnVal=diameter;}
else{diameter=diameter/32;returnVal=diameter;}}}}}
return returnVal;
}
function calc_handMoveValues(form){

var holdingCapacity=parseFloat(form.holdingCapacity.value);
var rootingDepthUnits=parseFloat(form.rootingDepthUnits.value);
var rootingDepth=parseFloat(form.rootingDepth.value)/rootingDepthUnits;
var allowableDeficit=parseFloat(form.allowableDeficit.value)/100;
var nozzleDiameterUnits=parseFloat(form.nozzleDiameterUnits.value);
var maxNetDepthUnits=parseFloat(form.maxNetDepthUnits.value);
var maxNetDepth=holdingCapacity*rootingDepth*allowableDeficit;
var precisionI = 2;

switch(maxNetDepthUnits){case 1:precisionI=2;break;case 0.03937:precisionI=1;break;case .39370078:precisionI=2;break;default:precisionI=2;}
form.maxNetDepth.value=(maxNetDepth/maxNetDepthUnits).toFixed(precisionI);

var maxETUnits=parseFloat(form.maxETUnits.value);
var maxET=parseFloat(form.maxET.value)*maxETUnits; //Set Units
var timeUnits=parseFloat(form.timeUnits.value);
var lineSpacingUnits=parseFloat(form.lineSpacingUnits.value);
var sprinklerSpacingUnits=parseFloat(form.sprinklerSpacingUnits.value);
var pressureUnits=parseFloat(form.pressureUnits.value);
var setsPerLine=parseFloat(form.setsPerLine.value);
var nextSetMoveTime=parseFloat(form.nextSetMoveTime.value)/timeUnits; //Set Units
var lineSpacing=parseFloat(form.lineSpacing.value)*lineSpacingUnits; //Set Units
var sprinklerSpacing=parseFloat(form.sprinklerSpacing.value)*sprinklerSpacingUnits; //Set Units
var efficiency=parseFloat(form.efficiency.value)/100;
var operatingPressure=parseFloat(form.operatingPressure.value)*pressureUnits; //Set Units
var moveInterval=setsPerLine*maxET;
moveInterval=maxNetDepth/moveInterval;
moveInterval=moveInterval*24;precisionM=1;

var precisionM = 2;
var precisionD = 2;

form.maxMoveInterval.value=moveInterval.toFixed(precisionM);
if(moveInterval < 10.5)
{
	document.getElementById("cropStress").style.display="block";document.getElementById("cropStress").style.color="red";
}
else
{	document.getElementById("cropStress").style.display="none";
	if((moveInterval%12)>10)
    {
        moveInterval=Math.floor(moveInterval/12)*12+12;
    }
    else{
        moveInterval=Math.floor(moveInterval/12)*12;
        }
}

var precisionS=3;
form.moveInterval.value=moveInterval.toFixed(precisionS);
var sprinklerRunTime=moveInterval-(nextSetMoveTime/60);
var systemNetCapacity=maxNetDepth/sprinklerRunTime;
var grossCapacity=systemNetCapacity/efficiency;
var flowRateReq=(grossCapacity*sprinklerSpacing*lineSpacing)/96.25025;
var nozzleDiameter=Math.sqrt(flowRateReq/(28.925*Math.sqrt(operatingPressure)));

switch(nozzleDiameterUnits){case .01984375:nozzleDiameter=nozzleDiameter*128;precisionD=0;break;case .0396875:precisionD=0;nozzleDiameter=nozzleDiameter*128/2;break;case.079375:precisionD=0;nozzleDiameter=nozzleDiameter*128/4;break;case.15875:precisionD=1;nozzleDiameter=nozzleDiameter*128/8;break;case.3175:precisionD=1;nozzleDiameter=nozzleDiameter*128/16;break;case 1:precisionD=3;nozzleDiameter=nozzleDiameter*nozzleDiameterUnits;break;case 2.54:precisionD=3;nozzleDiameter=nozzleDiameter*nozzleDiameterUnits;break;case 25.4:precisionD=2;nozzleDiameter=nozzleDiameter*nozzleDiameterUnits;break;default:precisionD=2;

nozzleDiameter=nozzleDiameter*nozzleDiameterUnits;
}
form.nozzleDiameter.value=nozzleDiameter.toFixed(precisionD);
var maxHeadsPerLine=parseFloat(form.maxHeadsPerLine.value);
var maxFlowPerLine=flowRateReq*maxHeadsPerLine;
var minInsideDiameter=Math.sqrt(0.4085*maxFlowPerLine/5);
var pipeSize=Math.ceil(minInsideDiameter);

form.pipeSize.value=pipeSize;
var elevationUnits=parseFloat(form.elevationUnits.value);
var pressureDiffUnits=parseFloat(form.pressureDiffUnits.value);
var elevationDifference=parseFloat(form.elevationDifference.value)*elevationUnits;
var frictionLoss=(sprinklerSpacing*maxHeadsPerLine)/100;
frictionLoss=frictionLoss*455.2*Math.pow((maxFlowPerLine/120),1.852)*Math.pow(pipeSize,-4.87);

var outletFactor=(2*maxHeadsPerLine)+0.923038/(6*Math.pow(maxHeadsPerLine,2));
outletFactor=1/outletFactor;
outletFactor=0.3050631+outletFactor;

frictionLoss=frictionLoss*outletFactor;

pressureDifference=(-1*frictionLoss)-(elevationDifference/2.30666);
pressureDifference=pressureDifference/pressureDiffUnits;

switch(pressureDiffUnits){case 1:precisionE=1;break;case.433528:precisionE=0;break;case 1.422336:precisionE=0;break;case 14.503773773:precisionE=2;break;case.145038:precisionE=0;break;default:precisionE=2;}

form.pressureDifference.value=pressureDifference.toFixed(precisionE);
}
function calc_sprinklerDischarge(form){

var can1Units=parseFloat(form.can1Units.value);
var can2Units=parseFloat(form.can2Units.value);
var can3Units=parseFloat(form.can3Units.value);
var can4Units=parseFloat(form.can4Units.value);
var timeUnits=parseFloat(form.timeUnits.value);
var sprinklerFlowUnits=parseFloat(form.sprinklerFlowUnits.value);
var can1=parseFloat(form.can1.value)/can1Units;
var can2=parseFloat(form.can2.value)/can2Units;
var can3=parseFloat(form.can3.value)/can3Units;
var can4=parseFloat(form.can4.value)/can4Units;
var time=parseFloat(form.time.value)/timeUnits;
var depth=can1+can2+can3+can4;depth=depth/4;
var rate=depth/time;sprinklerFlow=rate*60;
var precision = 2;

switch(sprinklerFlowUnits){case 1:precision=3;break;case 24:precision=2;break;case 25.4:precision=2;break;case 609.6:precision=0;break;case 2.54:precision=3;break;case 60.96:precision=1;break;default:precision=2;}

form.sprinklerFlow.value=(sprinklerFlow*sprinklerFlowUnits).toFixed(precision);
}
function calc_bigGunWaterApplication(form){
var flowRateUnits=parseFloat(form.flowRateUnits.value);
var widthUnits=parseFloat(form.widthUnits.value);
var speedUnits=parseFloat(form.speedUnits.value);
var netWaterAppUnits=parseFloat(form.netWaterAppUnits.value);
var flowRate=parseFloat(form.flowRate.value)*flowRateUnits;
var width=parseFloat(form.width.value)/widthUnits;
var speed=parseFloat(form.speed.value)/speedUnits;
var efficiency=parseFloat(form.efficiency.value)/100;
var precision = 2;
var netWaterApp=flowRate*1.6*efficiency;
netWaterApp=netWaterApp/(speed*width);
netWaterApp=netWaterApp/netWaterAppUnits;

switch(netWaterAppUnits){case 1:precision=2;break;case 12:precision=3;break;case.039361:precision=1;break;case.39361:precision=2;break;default:precision=2;}
form.netWaterApp.value=netWaterApp.toFixed(precision);
}
function calc_AcresPerPull(form){
var laneSpacingUnits=parseFloat(form.laneSpacingUnits.value);
var travelSpeedUnits=parseFloat(form.travelSpeedUnits.value);
var laneSpacing=parseFloat(form.laneSpacing.value)*laneSpacingUnits;
var travelSpeed=parseFloat(form.travelSpeed.value)*travelSpeedUnits;
var timeRate=travelSpeed*laneSpacing/726;
var precision=2;

form.timeRate.value=timeRate.toFixed(precision);}
function calc_lateralFrictionLoss(form){
//Call and Set Variables
var spacingUnits=parseFloat(form.spacingUnits.value);
var flowRateUnits=parseFloat(form.flowRateUnits.value);
var sizeUnits=parseFloat(form.sizeUnits.value);
var frictionUnits=parseFloat(form.frictionUnits.value);
var totalFlowRateUnits=parseFloat(form.totalFlowRateUnits.value);
var totalPipeLengthUnits=parseFloat(form.totalPipeLengthUnits.value);
var sprinklersPerLine=parseFloat(form.sprinklersPerLine.value);
var sprinklerSpacing=parseFloat(form.sprinklerSpacing.value)/spacingUnits; //Set Units
var flowRate=parseFloat(form.flowRate.value)*flowRateUnits; //Set Units
var pipeSize=parseFloat(form.pipeSize.value)*sizeUnits; //Set Units
var coupler=parseFloat(form.coupler.value);
var totalFlowRate=flowRate*sprinklersPerLine;
var precisionR = 2;

switch(totalFlowRateUnits){case 1:precisionR=3;break;case 15.850323074:precisionR=3;break;default:precisionR=3;}

form.totalFlowRate.value=(totalFlowRate/totalFlowRateUnits).toFixed(precisionR);

var totalPipeLength=sprinklerSpacing*sprinklersPerLine;
var precisionP = 2;

switch(totalPipeLengthUnits){case 1:precisionP=3;break;case.30487:precisionP=3;break;default:precisionP=3;}

form.totalPipeLength.value=(totalPipeLength*totalPipeLengthUnits).toFixed(precisionP);
var f=0.15384/Math.pow(sprinklersPerLine,2);
f=f+0.5/sprinklersPerLine;f=0.35063+f;

var frictionLoss=totalFlowRate/coupler;
var precisionF = 2;

frictionLoss=Math.pow(frictionLoss,1.852);
frictionLoss=frictionLoss*Math.pow(pipeSize,-4.87);
frictionLoss=4.552*frictionLoss*totalPipeLength*f;
frictionLoss=frictionLoss/frictionUnits;

switch(frictionUnits){case.433528:precisionF=0;break;case 1.422336:precisionF=0;break;case 14.503773773:precisionF=2;break;case.145038:precisionF=0;break;case 1:precisionF=1;break;default:precisionF=2;}

form.frictionLoss.value=frictionLoss.toFixed(precisionF);
}
function clearText(thefield){if(thefield.defaultValue==thefield.value)thefield.value="";}
