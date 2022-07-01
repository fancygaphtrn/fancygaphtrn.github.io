---
title: "Unit coverter"
layout: page
---
<style type="text/css"> 
<!--
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
-->
</style> 
 
<script type="text/javascript"> 
<!--
function initialize() {                                                         //>Initialize
 fillLists();                                                                   // FillLists (base, target)
 document.getElementById("value").value = "";                              // Write 'popup' into value-field
 document.getElementById("value").focus();                                      // Set focus to value-field
 document.getElementById("value").select();                                     // Select 'popup' in value field
 calculate();  }                                                                // Calculate -> '- - - - -' in result
 
function newType()   { clearLists();                 fillLists();               //>NewType
                       calculate();                  setFocus();  }             //
function newValue()  { calculate();                  setFocus();  }             //>NewValue
function newBase()   { calculate();                  setFocus();  }             //>NewBase
function newTarget() { calculate();                  setFocus();  }             //>NewTarget
function setFocus()  { document.getElementById("value").focus();  }             //>SetFocus
 
function clearLists() {                                                         //>ClearLists (base, target)
 var base   = document.getElementById("base");                                  // Get Html-element of the base
 var target = document.getElementById("target");                                // Get Html-element of the target
 for (var i=base.length-1; i>=0; i--) {                                         // Loop: content of the lists
   base.options[i]   = null;                                                    //   Void base-item
   target.options[i] = null;  } }                                               //   Void target-item
 
function enter() {                                                              //>Enter pressed
 var input = document.getElementById("value").value;                            // Value of the input-field
 if (input=="popup")                                                            // On 'popup'
   var pop = window.open("/index.php?option=com_calculators&view=unitconverter&tmpl=component","",                                       // -> Open converter in a popup
       "resizable=yes,scrollbars=no,width=400,height=240,left=50,top=8"); }     //    with several window options
 
function calculate() {                                                          //>Calculate
 var type        = document.getElementById("type");                             // Html-Element of type (category)
 var typeID      = type.options[type.selectedIndex].id;                         // ID of the choosen type
 var input       = document.getElementById("value").value;                      // Content (text) of input-value
 var white       = input.match(/\s*/);                                          // White spaces in input (for opera)
 var value       = parseFloat(input.replace(/,/,'.'));                          // Parsed string with ','->'.' or NaN
 var baseValue   = document.getElementById("base").value;                       // Base-value
 var targetValue = document.getElementById("target").value;                     // Target-value
 if (typeID=="numbersystem") {                                                  // On Numbersystem:
     calculateNumbersystem(input, baseValue, targetValue);    return; }         //    -> Calculate Numbersystem
 if (isNaN(value) || (white && input==white)) {                                 // No valid number or only whitespaces
     document.getElementById("result").value="- - - - - -";   return; }         //    -> Clear result value
 if (typeID=="temperature") {                                                   // On Temperature:
     calculateTemperature(value, baseValue, targetValue);     return; }         //    -> Calculate Temperature
 var result = value * baseValue / targetValue;                                  // Else: Convert value to result
 document.getElementById("result").value = result;  }                           //       Write result in text-field
 
function calculateNumbersystem(input, base, target) {                           //>CalculateNumbersystem
 var valid   = validateInput(input, base);                                      // Validate the input-field (value)
 var decimal = parseInt(valid, base);                                           // Convert input-value to decimal
 var result  = decimal.toString(target);                                        // Convert decimal-value to target syst.
 document.getElementById("result").value = result;  }                           // Write target-value to result field
 
function validateInput(input, base) {                                           //>ValidateInput (for number systems)
 var decimal = parseInt(input, base);                                           // Convert input-value->decimal-integer
 if (isNaN(decimal)) decimal = "";                                              // No decimal number  ->void input-field
 var valid = decimal.toString(base);                                            // Convert decimal back to base-system
 document.getElementById("value").value = valid;                                // Write validated value to input field
 return valid; }                                                                // Return validated value
 
function calculateTemperature(value, base, target) {                            //>CalculateTemperature
 var celsius = Number.NaN;                                                      // Convert base to celsius
 if      (base=="[F]")    celsius = (value-32)*5/9;                             //     [F] -> [C]
 else if (base=="[C]")    celsius =  value;                                     //     [C] -> [C]
 else if (base=="[K]")    celsius =  value-273.15;                              //     [K] -> [C]
 else if (base=="[R]")    celsius = (value*5/9)-273.15;                         //     [R] -> [C]
 var result = Number.NaN;                                                       // Convert celsius to target
 if      (target=="[F]")  result  = (celsius*9/5)+32                            //     [C] -> [F]
 else if (target=="[C]")  result  =  celsius;                                   //     [C] -> [C]
 else if (target=="[K]")  result  =  celsius+273.15;                            //     [C] -> [K]
 else if (target=="[R]")  result  = (celsius+273.15)*9/5;                       //     [C] -> [R]
 document.getElementById("result").value = result;  }                           // Write result in text-field
 
function enlist(text, value) {                                                  //>Enlist given items to base & target
 var base   = document.getElementById("base");                                  // Html-Element for Base-Unit
 var target = document.getElementById("target");                                //                  Target-Unit
 base.options[base.length]     = new Option(text, value);                       // Set Html-Properties to base
 target.options[target.length] = new Option(text, value); }                     //                        target
 
function fillLists() {                                                          //>FillLists
 var type   = document.getElementById("type");                                  // Get Html-Element of the 'type'
 var typeID = type.options[type.selectedIndex].id;                              // Get the ID of the selected type
 if      (typeID=="temperature") {                                              // Temperatures:
   enlist("[C] Celsius",                            "[C]");                     //   [C] is base
   enlist("[F] Fahrenheit",                         "[F]");                     //   [F] = [C]*9/5 + 32
   enlist("[K] Kelvin",                             "[K]");                     //   [K] = [C] + 273.15
   enlist("[R] Rankin",                             "[R]"); }                   //   [R] = [K]*9/5
 else if (typeID=="telephony") {                                                // Telephony traffic:
   enlist("[erlang] Erlang",                          1.0);                     //   [erlang] is base
   enlist("[ccs] Centum call seconds",0.027777777777777777777777777777778); }   //   [ccs] = [erlang]*36
 else if (typeID=="numbersystem") {                                             // Number systems:
   enlist("[2]  Binary | Dual",                      "2");                      //   0 1                   (Dual)
   enlist("[3]  Radix = Basis = 3",                  "3");                      //   0 1 2
   enlist("[4]  Radix = Basis = 4",                  "4");                      //   0 1 2 3
   enlist("[5]  Radix = Basis = 5",                  "5");                      //   0 1 2 3 4
   enlist("[6]  Radix = Basis = 6",                  "6");                      //   0 1 2 3 4 5
   enlist("[7]  Radix = Basis = 7",                  "7");                      //   0 1 2 3 4 5 6
   enlist("[8]  Octal | Oktal",                      "8");                      //   0 1 2 3 4 5 6 7       (Octal)
   enlist("[9]  Radix = Basis = 9",                  "9");                      //   0 1 2 3 4 5 6 7 8
   enlist("[10] Decimal | Dezimal",                 "10");                      //   0 1 2 3 4 5 6 7 8 9   (Decimal)
   enlist("[11] Radix = Basis = 11",                "11");                      //   0 1 ... 9 A
   enlist("[12] Radix = Basis = 12",                "12");                      //   0 1 ... 9 A B
   enlist("[13] Radix = Basis = 13",                "13");                      //   0 1 ... 9 A B C
   enlist("[14] Radix = Basis = 14",                "14");                      //   0 1 ... 9 A B C D
   enlist("[15] Radix = Basis = 15",                "15");                      //   0 1 ... 9 A B C D E
   enlist("[16] Hexadecimal | Hexadezimal",         "16");                      //   0 1 ... 9 A B C D E F (Hexadecimal)
   enlist("[17] Radix = Basis = 17",                "17");                      //   0 1 ... 9 A B ..... G
   enlist("[18] Radix = Basis = 18",                "18");                      //   0 1 ... 9 A B ..... H
   enlist("[19] Radix = Basis = 19",                "19");                      //   0 1 ... 9 A B ..... I
   enlist("[20] Radix = Basis = 20",                "20");                      //   0 1 ... 9 A B ..... J
   enlist("[21] Radix = Basis = 21",                "21");                      //   0 1 ... 9 A B ..... K
   enlist("[22] Radix = Basis = 22",                "22");                      //   0 1 ... 9 A B ..... L
   enlist("[23] Radix = Basis = 23",                "23");                      //   0 1 ... 9 A B ..... M
   enlist("[24] Radix = Basis = 24",                "24");                      //   0 1 ... 9 A B ..... N
   enlist("[25] Radix = Basis = 25",                "25");                      //   0 1 ... 9 A B ..... O
   enlist("[26] Radix = Basis = 26",                "26");                      //   0 1 ... 9 A B ..... P
   enlist("[27] Radix = Basis = 27",                "27");                      //   0 1 ... 9 A B ..... Q
   enlist("[28] Radix = Basis = 28",                "28");                      //   0 1 ... 9 A B ..... R
   enlist("[29] Radix = Basis = 29",                "29");                      //   0 1 ... 9 A B ..... S
   enlist("[30] Radix = Basis = 30",                "30");                      //   0 1 ... 9 A B ..... T
   enlist("[31] Radix = Basis = 31",                "31");                      //   0 1 ... 9 A B ..... U
   enlist("[32] Radix = Basis = 32",                "32");                      //   0 1 ... 9 A B ..... V
   enlist("[33] Radix = Basis = 33",                "33");                      //   0 1 ... 9 A B ..... V
   enlist("[34] Radix = Basis = 34",                "34");                      //   0 1 ... 9 A B ..... X
   enlist("[35] Radix = Basis = 35",                "35");                      //   0 1 ... 9 A B ..... Y
   enlist("[36] Radix = Basis = 36",                "36");                      //   0 1 ... 9 A B ..... Z
   document.getElementById("base").options[8].selected   = true;                //   Preselect Decimal-system for base
   document.getElementById("target").options[8].selected = true; }              //   Preselect Decimal-system for target
 else if (typeID=="angle") {                                                    // Angles:
   enlist("[deg] Degrees | Grad",                   1.0);                       //   1 [deg] is base
   enlist("[rad] Radians | Radiant",                180/3.141592653589793);     //   1 [rad] = 180 / PI  [deg]
   enlist("[gon] Grade | Neugrad",                  90/100); }                  //   1 [gon] =  90 / 100 [deg]
 else if (typeID=="length") {                                                   // Lengths:
   enlist("[m] Meter",                              1.0);                       //   1 [m]  is base
   enlist("[km] Kilometer",                         1000.0);                    //   1 [km]   = 1000             [m]
   enlist("[dm] Decimeter",                         0.1);                       //   1 [dm]   = 0.1              [m]
   enlist("[cm] Zentimeter",                        0.01);                      //   1 [cm]   = 0.01             [m]
   enlist("[mm] Millimeter",                        0.001);                     //   1 [mm]   = 0.001            [m]
   enlist("[um] Micron | Micrometer",               0.000001);                  //   1 [um]   = 0.000001         [m]
   enlist("[nm] Nanometer",                         1e-9);                      //   1 [nm]   = 1e-9             [m]
   enlist("[A] Angström",                           1e-10);                     //   1 [A]    = 1e-10            [m]
   enlist("[pm] Picometer| Pikometer",              1e-12);                     //   1 [pm]   = 1e-12            [m]
   enlist("[fm] Fermi | Femtometer",                1e-15);                     //   1 [fm]   = 1e-15            [m]
   enlist("[in] Inch = 1/36 yd | Zoll",             0.0254);                    //   1 [in]   = 0.0254           [m]
   enlist("[Mil, thou] Mil | Milli-Inch",           0.0000254);                 //   1 [Mil]  = 0.0000254        [m]
   enlist("[ft] Feet | Fuß",                        0.3048);                    //   1 [ft]   = 0.3048           [m]
   enlist("[yd] Yard | Schritt",                    0.9144);                    //   1 [yd]   = 0.9144           [m]
   enlist("[ha] Hands (Br.) | Handbreit",           0.1016);                    //   1 [ha]   = 0.1016           [m]
   enlist("[sp] Span (Br.) | Spanne",               0.2286);                    //   1 [sp]   = 0.2286           [m]
   enlist("[mi] Mile (Br.) | Meile",                1609.344);                  //   1 [mi]   = 1609.344         [m]
   enlist("[mi-u] Mile (U.S. Survey)",              1609.347219);               //   1 [mi-u] = 1609.347219      [m]
   enlist("[NM, n mi] Nautical mile | Seemeile",    1852.0);                    //   1 [n mi] = 1852             [m]
   enlist("[NM-a] Naut. mile = 6080ft (admirality)",1853.184);                  //   1 [nm-a] = 1853.184         [m]
   enlist("[ch] Chain (Br.) | Ketten",              20.1168);                   //   1 [ch]   = 20.1168          [m]
   enlist("[li] Links (Br.) | Kettenglieder",       0.201168);                  //   1 [li]   = 0.201168         [m]
   enlist("[BC] Barleycorn (Br.)",                  0.008467);                  //   1 [BC]   = 0.008467         [m]
   enlist("[rd] Rod, pole, perch | Rute",           5.0292);                    //   1 [rd]   = 5.0292           [m]
   enlist("[fur] Furlong (Br.) | Achtelmeile",      201.168);                   //   1 [fur]  = 201.168          [m]
   enlist("[fth] Fathom (Br.) | Faden",             1.8288);                    //   1 [fth]  = 1.8288           [m]
   enlist("[ftu] Fathom (Hungary | Ungarn)",        1.8964838);                 //   1 [ftu]  = 1.8964838        [m]
   enlist("[pi] Pica | Cicero = 12pt",              0.004217);                  //   1 [pi]   = 0.004217         [m]
   enlist("[pt-a] Point ATA | Punkt",               0.0003514598);              //   1 [pt-a] = 0.0003514598     [m]
   enlist("[pt-p] Point postscript = 1/72 in",      0.000352778);               //   1 [pt-p] = 0.000352778      [m]
   enlist("[pt-e] Point  (Didot; European)",        0.000376065);               //   1 [pt-e] = 0.000376065      [m]
   enlist("[pt-m] Point metric",                    0.000375);                  //   1 [pt-m] = 0.000375         [m]
   enlist("[AU] Astronomical unit (Sun->Earth)",    149597870691);              //   1 [AU]   = 149597870691     [m]
   enlist("[pc] Parsec | Parallaxensekunde",        30856775813057300);         //   1 [pc]   = 30856775813057300[m]
   enlist("[LY] Light year",                        9460730472580800);          //   1 [LY]   = 9460730472580800 [m]
   enlist("[Bu] Bu (China)",                        1.666667);                  //   1 [Bu]   = 1.666667         [m]
   enlist("[Ch] Chi (China)",                       0.3333333);                 //   1 [Ch]   = 0.3333333        [m]
   enlist("[Cho] Chou, cho (Japan)",                109.09);                    //   1 [Cho]  = 109.09           [m]
   enlist("[Chr] Chr (Taiwan)",                     0.30303);                   //   1 [Chr]  = 0.30303          [m]
   enlist("[Cun] Cun (China)",                      0.03333333);                //   1 [Cun]  = 0.03333333       [m]
   enlist("[fe] Fen (China)",                       0.003333333);               //   1 [fe]   = 0.003333333      [m]
   enlist("[Ha] Hao (China)",                       0.00003333333);             //   1 [Ha]   = 0.00003333333    [m]
   enlist("[hu] Hu (China)",                        3.333333e-7);               //   1 [hu]   = 3.333333e-7      [m]
   enlist("[Gan] Gan (Korea)",                      1.818);                     //   1 [Gan]  = 1.818            [m]
   enlist("[Hu] Hunh (Thailand)",                   0.002604167);               //   1 [Hu]   = 0.002604167      [m]
   enlist("[Ja] Ja (Korea)",                        0.303);                     //   1 [Ja]   = 0.303            [m]
   enlist("[Je] Jeong (Korea)",                     109.091);                   //   1 [Je]   = 109.091          [m]
   enlist("[jy] Jyo (Japan)",                       3.030324);                  //   1 [jy]   = 3.030324         [m]
   enlist("[ka] Kabiet (Thailand)",                 0.005208333);               //   1 [ka]   = 0.005208333      [m]
   enlist("[Ka] Kairi (Japan)",                     1852.0);                    //   1 [Ka]   = 1852             [m]
   enlist("[Ke] Ken (Japan)",                       1.81818);                   //   1 [Ke]   = 1.81818          [m]
   enlist("[Kb] Keub (Thailand)",                   0.25);                      //   1 [Kb]   = 0.25             [m]
   enlist("[La] Lar (Thailand)",                    0.91432);                   //   1 [La]   = 0.91432          [m]
   enlist("[Li] Li (China)",                        500.0);                     //   1 [Li]   = 500.0            [m]
   enlist("[Li-sm] Li-small (China)",               0.0003333333);              //   1 [Li-sm]= 0.0003333333     [m]
   enlist("[mo] Mon (Japan)",                       0.024);                     //   1 [mo]   = 0.024            [m]
   enlist("[Ni] Nieu (Thailand",                    0.0208333);                 //   1 [Ni]   = 0.0208333        [m]
   enlist("[Ri] Ri (Japan)",                        3927.27);                   //   1 [Ri]   = 3927.27          [m]
   enlist("[Rk] Ri (Korea)",                        392.727);                   //   1 [Rk]   = 392.727          [m]
   enlist("[Sa] Sawk (Thailand)",                   0.5);                       //   1 [Sa]   = 0.5              [m]
   enlist("[Sh] Shaku, shyaku (Japan)",             0.30303);                   //   1 [Sh]   = 0.30303          [m]
   enlist("[Se] Sen (Thailand)",                    40.0);                      //   1 [Se]   = 40               [m]
   enlist("[si] Si (China)",                        0.000003333333);            //   1 [si]   = 0.000003333333   [m]
   enlist("[Su] Sun (Japan)",                       0.030303);                  //   1 [Su]   = 0.030303         [m]
   enlist("[Ts] Tsuen (Taiwan)",                    0.030303);                  //   1 [Ts]   = 0.030303         [m]
   enlist("[Va] Va (Thailand)",                     2.0);                       //   1 [Va]   = 2                [m]
   enlist("[Yi] Yin (China)",                       33.33333);                  //   1 [Vi]   = 33.33333         [m]
   enlist("[Yo] Yote (Thailand)",                   16000.0);                   //   1 [Yo]   = 16000            [m]
   enlist("[Zh] Zhang (China)",                     3.33333);  }                //   1 [Zh]   = 3.33333          [m]
 else if (typeID=="area") {                                                     // Areas:
   enlist("[m^2] Square meter",                     1.0);                       //   1 [m^2] S is base
   enlist("[km^2] Square kilometer",                1000000.0);                 //   1 [km^2]  = 1000000         [m^2]
   enlist("[dm^2] Square decimeter",                0.01);                      //   1 [dm^2]  = 0.01            [m^2]
   enlist("[cm^2] Square centimeter",               0.0001);                    //   1 [cm^2]  = 0.0001          [m^2]
   enlist("[mm^2] Square millimeter",               0.000001);                  //   1 [mm^2]  = 0.000001        [m^2]
   enlist("[a] Are | Ar",                           100.0);                     //   1 [a]     = 100             [m^2]
   enlist("[ha] Hectare | Hektar",                  10000.0);                   //   1 [ha]    = 10000           [m^2]
   enlist("[acre] Acre (Br.) | Morgen",             4046.8564224);              //   1 [acre]  = 4046.8564224    [m^2]
   enlist("[Mg-Wü] Morgen (Württemberg)",           3152.0);                    //   1 [Mg-Wü] = 3152            [m^2]
   enlist("[Mg-Pr] Morgen (Preussen)",              2553.22);                   //   1 [Mg-Pr] = 2553.22         [m^2]
   enlist("[Mg-Ba] Morgen (Baden)",                 3600.0);                    //   1 [Mg-Ba] = 3600            [m^2]
   enlist("[Mg-Ha] Morgen (Hannover)",              2621.0);                    //   1 [Mg-Ha] = 2621            [m^2]
   enlist("[Mg-He] Morgen (Hessen) [vha]",          2500.0);                    //   1 [Mg-He] = 2500            [m^2]
   enlist("[Mg-Fr] Morgen (Franken)",               2000.0);                    //   1 [Mg-Fr] = 2000            [m^2]
   enlist("[Mg-Ol] Morgen (Oldenburg)",             2256.0);                    //   1 [Mg-Ol] = 2256            [m^2]
   enlist("[Mg-OJ] Morgen (Oldenburg-Jück)",        4538.0);                    //   1 [Mg-OJ] = 4538            [m^2]
   enlist("[Mg-Ka] Morgen (Kassel)",                2386.0);                    //   1 [Mg-Ka] = 2386            [m^2]
   enlist("[Mg-Ka] Morgen (Bremen)",                2572.0);                    //   1 [Mg-Ka] = 2572            [m^2]
   enlist("[Mg-Kn] Morgen (Köln)",                  3176.0);                    //   1 [Mg-Kn] = 3176            [m^2]
   enlist("[Mg-By] Morgen (Bayern)",                3407.0);                    //   1 [Mg-By] = 3407            [m^2]
   enlist("[Mg-HH] Morgen (Hamburg)",               9658.0);                    //   1 [Mg-HH] = 9658            [m^2]
   enlist("[Mg-HH] Morgen (HH: Geest-Scheffel)",    4205.0);                    //   1 [Mg-HH] = 4205            [m^2]
   enlist("[Mg-KM] Morgen (Kehdinger Marschmorgen)",10477.0);                   //   1 [Mg-KM] = 10477           [m^2]
   enlist("[Mg-Hd] Morgen (Hadeln)",                11780.0);                   //   1 [Mg-Hd] = 11780           [m^2]
   enlist("[Mg-Ho] Morgen (Holstein)",              5046.0);                    //   1 [Mg-Ho] = 5046            [m^2]
   enlist("[Mg-SH] Morgen (Schleswig-Holstein)",    5466.0);                    //   1 [Mg-SH] = 5466            [m^2]
   enlist("[Mg-Ku] Morgen (Kulmischer Morgen)",     5601.17);                   //   1 [Mg-Ku] = 5601.17         [m^2]
   enlist("[Mg-Of] Morgen (Ostfriesland)",          5674.0);                    //   1 [Mg-Of] = 5674            [m^2]
   enlist("[Mg-Me] Morgen (Mecklenburg)",           6500.0);                    //   1 [Mg-Me] = 6500            [m^2]
   enlist("[Mg-Me] Morgen (Harburg & Stade)",       8185.0);                    //   1 [Mg-Me] = 8185            [m^2]
   enlist("[Mg-Br] Morgen (Brasil)",                4046.8564224);              //   1 [Mg-Br] = 4046.8564224    [m^2]
   enlist("[Mg-Fr] Morgen (France)",                5200.0);                    //   1 [Mg-Fr] = 5200            [m^2]
   enlist("[Mg-Un] Morgen (Hungary)",               5754.6412858599);           //   1 [Mg-Un] = 5754.6412858599 [m^2]
   enlist("[in^2] Square Inch | Quadratzoll",       0.00064516);                //   1 [in^2]  = 0.00064516      [m^2]
   enlist("[ft^2] Square feet | Quadratfuß",        0.09290304);                //   1 [ft^2]  = 0.09290304      [m^2]
   enlist("[yd^2] Square yard | Quadratschritt",    0.83612736);                //   1 [yd^2]  = 0.83612736      [m^2]
   enlist("[mi^2] Square mile (Br.)",               2589988.110336);            //   1 [mi^2]  = 2589988.110336  [m^2]
   enlist("[NM^2] Square naut. mile",               3429904);                   //   1 [nm^2]  = 3429904         [m^2]
   enlist("[sq rd] Square rod (Br. & Am.)",         25.29285264);               //   1 [sq rd] = 25.29285264     [m^2]
   enlist("[ro] Rood (Br. & Am.)",                  1011.7141056);              //   1 [ro]    = 1011.7141056    [m^2]
   enlist("[se] Section = square mile",             2589988.110336);            //   1 [se]    = 2589988.110336  [m^2]
   enlist("[sq-ch] Square chain (Br.)",             404.68564224);              //   1 [sq-ch] = 404.68564224    [m^2]
   enlist("[ts] Township = 36 [mi-u]^2",            93239944.96690923);         //   1 [ts]    = 93239944.9669092[m^2]
   enlist("[b] Barn (nuclear physics)",             1e-28);                     //   1 [b]     = 1e-28           [m^2]
   enlist("[sFtu] Square Fathom (Hungary)",         3.5966508036624396);        //   1 [sFtu]  = 3.59665080366244[m^2]
   enlist("[sch] Square chi (China)",               0.1111111);                 //   1 [sch]   = 0.1111111       [m^2]
   enlist("[sChr] Square Chr (Taiwan)",             0.091827);                  //   1 [sChr]  = 0.091827        [m^2]
   enlist("[scu] Square cun (China)",               0.001111111);               //   1 [scu]   = 0.001111111     [m^2]
   enlist("[sLa] Square Lar (Thailand)",            0.8359810624);              //   1 [sLa]   = 0.8359810624    [m^2]
   enlist("[sTs] Square Tsuen (Taiwan)",            0.000918271809);            //   1 [sTs]   = 0.000918271809  [m^2]
   enlist("[sVa] Square Va (Thailand)",             4.0);                       //   1 [sVa]   = 4               [m^2]
   enlist("[szh] Square zhang (China)",             11.11111);                  //   1 [szh]   = 11.11111        [m^2]
   enlist("[Ch] Chou, cho (Japan)",                 9917.355);                  //   1 [Ch]    = 9917.355        [m^2]
   enlist("[Da] Danbo (Korea)",                     991.74);                    //   1 [Da]    = 991.74          [m^2]
   enlist("[fe] Fen (China)",                       66.66667);                  //   1 [fe]    = 66.66667        [m^2]
   enlist("[HS] Heilhou Shaku (Japan)",             0.091827);                  //   1 [HS]    = 0.091827        [m^2]
   enlist("[Je] Jeongbo (Korea)",                   9917.40);                   //   1 [Je]    = 9917.40         [m^2]
   enlist("[li] Li (China)",                        6.666667);                  //   1 [li]    = 6.666667        [m^2]
   enlist("[Mu] Mu (China)",                        666.6667);                  //   1 [Mu]    = 666.6667        [m^2]
   enlist("[ng] Ngan (Thailand)",                   400.0);                     //   1 [ng]    = 400             [m^2]
   enlist("[Pi] Ping (Taiwan)",                     3.3058);                    //   1 [Pi]    = 3.3058          [m^2]
   enlist("[Py] Pyeong (Korea)",                    3.3058);                    //   1 [Py]    = 3.3058          [m^2]
   enlist("[Pb] Pyeongbangja (Korea)",              0.09182);                   //   1 [Pb]    = 0.09182         [m^2]
   enlist("[qi] Qing (China)",                      66666.67);                  //   1 [Qi]    = 66666.67        [m^2]
   enlist("[Rai] Rai (Thailand)",                   1600.0);                    //   1 [Rai]   = 1600            [m^2]
   enlist("[Se] Se (Japan)",                        99.17355);                  //   1 [Se]    = 99.17355        [m^2]
   enlist("[tw] Talang Wah (Thailand)",             4.0);                       //   1 [tw]    = 4               [m^2]
   enlist("[Tan] Tan, tann (Japan)",                991.7355);                  //   1 [Tan]   = 991.7355        [m^2]
   enlist("[Tsu] Tsubo (Japan)",                    3.30578); }                 //   1 [Tsu]   = 3.30578         [m^2]
 else if (typeID=="volume") {                                                   // Volumes:
   enlist("[m^3] Cubic meter",                      1.0);                       //   1 [m^3] is base
   enlist("[km^3] Cubic kilometer",                 1000000000.0);              //   1 [km^3]    = 1000000000      [m^3]
   enlist("[dm^3] Liter",                           0.001);                     //   1 [dm^3]    = 0.001           [m^3]
   enlist("[cm^3] Milliliter",                      0.000001);                  //   1 [cm^3]    = 0.000001        [m^3]
   enlist("[mm^3] Microliter",                      1e-9);                      //   1 [mm^3]    = 1e-9            [m^3]
   enlist("[in^3] Cubic inch | Kubikzoll",          0.000016387064);            //   1 [in^3]    = 0.000016387064  [m^3]
   enlist("[ft^3] Cubic foot | Kubikfuß",           0.028316846592);            //   1 [ft^3]    = 0.028316846592  [m^3]
   enlist("[yd^3] Cubic yard | Kubikschritt",       0.764554857984);            //   1 [yd^3]    = 0.764554857984  [m^3]
   enlist("[gal-b] Gallons (Br.) | Brit. Gallone",  0.00454609);                //   1 [gal-b]   = 0.00454609      [m^3]
   enlist("[gal-u] Gallons (Am.) | US. Gallone",    0.003785411784);            //   1 [gal-u]   = 0.003785411784  [m^3]
   enlist("[gal-r] Gallons (beer) | Bier-Gallone",  0.004621152048);            //   1 [gal-r]   = 0.004621152048  [m^3]
   enlist("[gal-d] US dry gallons",                 0.00440488377086);          //   1 [gal-d]   = 0.00440488377086[m^3]
   enlist("[bl-br] Barrel (Br.) | Fass",            0.16365924);                //   1 [bl-br]   = 0.16365924      [m^3]
   enlist("[bl-fl] Barrel (Br., petrol) | Öl-Fass", 0.159113);                  //   1 [bl-fl]   = 0.159113        [m^3]
   enlist("[bl-us] Barrel (Am. petrol)",            0.158987294928);            //   1 [bl-us]   = 0.158987294928  [m^3]
   enlist("[fl-bl] Barrel (Am. fluid)",             0.119240471196);            //   1 [fl-bl]   = 0.119240471196  [m^3]
   enlist("[dr-bl] Barrel (Am. dry)",               0.115628198985075);         //   1 [dr-bl]   = 0.11562819898508[m^3]
   enlist("[bu-br] Bushel (Br.) | Scheffel",        0.03636872);                //   1 [bu-br]   = 0.03636872      [m^3]
   enlist("[bu-us] Bushel (Am. dry level)",         0.03523907016688);          //   1 [bu-us]   = 0.03523907016688[m^3]
   enlist("[bu-he] Bushel (Am. dry heaped)",        0.0440488377086);           //   1 [bu-he]   = 0.0440488377086 [m^3]
   enlist("[c-us] Cup (Am.)",                       0.0002365882365);           //   1 [c-us]    = 0.0002365882365 [m^3]
   enlist("[c-ca] Cup (Canada)",                    0.0002273045);              //   1 [c-ca]    = 0.0002273045    [m^3]
   enlist("[c-me] Cup (metric)",                    0.000250);                  //   1 [c-me]    = 0.000250        [m^3]
   enlist("[c-br] Breakfast cup (Br.)",             0.000284130625);            //   1 [c-br]    = 0.000284130625  [m^3]
   enlist("[da-br] Dash (Br.)",                     0.36996175130208e-6);       //   1 [da-br]   = 0.36996175130e-6[m^3]
   enlist("[da-us] Dash (Am.)",                     0.308057599609375e-6);      //   1 [da-us]   = 0.30805759961e-6[m^3]
   enlist("[gtt-br] Drop (Br.)",                    0.098656467014e-6);         //   1 [gtt-br]  = 0.09865646701e-6[m^3]
   enlist("[gtt-us] Drop (Am.)",                    0.0821486932292e-6);        //   1 [gtt-us]  = 0.08214869323e-6[m^3]
   enlist("[gtt-me] Drop (medical)",                0.0833333333333e-6);        //   1 [gtt-me]  = 0.08333333333e-6[m^3]
   enlist("[gi-br] Gill (Br. wet)",                 0.0001420653125);           //   1 [gi-br]   = 0.0001420653125 [m^3]
   enlist("[gi-us] Gill (Am. fluid)",               0.00011829411825);          //   1 [gi-us]   = 0.00011829411825[m^3]
   enlist("[fl.oz-br] Ounce (Br. fluid)",           0.0000284130625);           //   1 [fl.oz-br]= 0.0000284130625 [m^3]
   enlist("[fl.oz-us] Ounce (Am. fluid)",           0.0000295735295625);        //   1 [fl.oz-us]= 0.00002957352956[m^3]
   enlist("[pi-br] Pinch (Br.)",                    0.7399235026042e-6);        //   1 [pi-br]   = 0.73992350260e-6[m^3]
   enlist("[pi-us] Pinch (Am.)",                    0.61611519921875e-6);       //   1 [pi-us]   = 0.61611519922e-6[m^3]
   enlist("[pt-br] Pint (Br. wet)",                 0.00056826125);             //   1 [pt-br]   = 0.00056826125   [m^3]
   enlist("[pt-us] Pint (Am. fluid)",               0.000473176473);            //   1 [pt-us]   = 0.000473176473  [m^3]
   enlist("[pt-dr] Pint (Am. dry)",                 0.0005506104713575);        //   1 [pt-dr]   = 0.00055061047136[m^3]
   enlist("[po-br] Pottle, quartern (Br.)",         0.002273045);               //   1 [po-br]   = 0.002273045     [m^3]
   enlist("[po-us] Pottle, quartern (Am.)",         0.0018925);                 //   1 [po-us]   = 0.0018925       [m^3]
   enlist("[qt-br] Quart (Br.)",                    0.0011365225);              //   1 [qt-br]   = 0.0011365225    [m^3]
   enlist("[qt-dr] Quart (Am., dry)",               0.001101220942715);         //   1 [qt-dr]   = 0.00110122094272[m^3]
   enlist("[qt-us] Quart (Am., fluid)",             0.000946352946);            //   1 [qt-us]   = 0.000946352946  [m^3]
   enlist("[sa-br] Sack, bag (Br.) = 3 [bu-br]",    0.10910616);                //   1 [sa-br]   = 0.10910616      [m^3]
   enlist("[sa-us] Sack (Am.) = 3 [bu-us]",         0.10571721050064);          //   1 [sa-us]   = 0.10571721050064[m^3]
   enlist("[st-br] Strike (Br.) = 2 [bu-br]",       0.07273744);                //   1 [st-br]   = 0.07273744      [m^3]
   enlist("[st-us] Strike (Am.) = 2 [bu-us]",       0.07047814033376);          //   1 [st-us]   = 0.07047814033376[m^3]
   enlist("[tbsp-br] Table spoon (Br.)",            17.7581640625e-6);          //   1 [tbsp-br] = 17.7581640625e-6[m^3]
   enlist("[tbsp-us] Table spoon (Am.)",            14.7867647825e-6);          //   1 [tbsp-us] = 14.7867647825e-6[m^3]
   enlist("[tbsp-ca] Table spoon (Canada)",         14.20653125e-6);            //   1 [tbsp-ca] = 14.20653125e-6  [m^3]
   enlist("[tbsp-me] Table spoon (metric)",         15e-6);                     //   1 [tbsp-me] = 15e-6);         [m^3]
   enlist("[dsp-br] Dessert spoon (Br.)",           11.838776041e-6);           //   1 [dsp-br]  = 11.838776041e-6 [m^3]
   enlist("[tsp-br] Tea spoon (Br.)",               5.91938802083e-6);          //   1 [tsp-br]  = 5.91938802083e-6[m^3]
   enlist("[tsp-us] Tea spoon (Am.)",               4.928921595e-6);            //   1 [tsp-us]  = 4.928921595e-6  [m^3]
   enlist("[tsp-me] Tea spoon (metric)",            5.0e-6);                    //   1 [tsp-me]  = 5.0e-6          [m^3]
   enlist("[ic] Icce (Hungary)",                    0.0008483999989211746);     //   1 [ic]      = 0.00084839999892[m^3]
   enlist("[bun] Bun, ban (Thailand)",              1.0);                       //   1 [bun]     = 1               [m^3]
   enlist("[cu] Cuo (China)",                       0.000001);                  //   1 [cu]      = 0.000001        [m^3]
   enlist("[dan] Dan (China)",                      0.1);                       //   1 [dan]     = 0.1             [m^3]
   enlist("[doe] Doe (Korea)",                      0.001803);                  //   1 [doe]     = 0.001803        [m^3]
   enlist("[dou] Dou (China)",                      0.01);                      //   1 [dou]     = 0.01            [m^3]
   enlist("[ge] Ge (China)",                        0.0001);                    //   1 [ge]      = 0.0001          [m^3]
   enlist("[gou] Gou, go (Japan)",                  0.00018039);                //   1 [gou]     = 0.00018039      [m^3]
   enlist("[hop] Hop (Korea)",                      0.0001803);                 //   1 [hop]     = 0.0001803       [m^3]
   enlist("[kok] Koku (Japan)",                     0.1803899);                 //   1 [kok]     = 0.1803899       [m^3]
   enlist("[kw] Kwian, kwien (Thailand)",           2.0);                       //   1 [kw]      = 2               [m^3]
   enlist("[ma] Mal (Korea)",                       0.01803);                   //   1 [ma]      = 0.01803         [m^3]
   enlist("[sa] Sat (Thailand)",                    0.02);                      //   1 [sa]      = 0.02            [m^3]
   enlist("[se] Seki (Japan)",                      0.18039);                   //   1 [se]      = 0.18039         [m^3]
   enlist("[sh] Shao (China)",                      0.00001);                   //   1 [sh]      = 0.18039         [m^3]
   enlist("[she] Sheng (China)",                    0.001);                     //   1 [she]     = 0.001           [m^3]
   enlist("[sy] Syou, sho (Japan)",                 0.0018039);                 //   1 [sy]      = 0.0018039       [m^3]
   enlist("[ta] Tanan, tananloung (Thailand)",      0.001);                     //   1 [ta]      = 0.001           [m^3]
   enlist("[tg] Tang (Thailand)",                   0.02);                      //   1 [tg]      = 0.02            [m^3]
   enlist("[to] To (Japan)",                        0.018039); }                //   1 [to]      = 0.018039        [m^3]
 else if (typeID=="time") {                                                     // Time:
   enlist("[s] Second",                             1.0);                       //   1 [s] is base
   enlist("[min] Minute = 60 [s]",                  60.0);                      //   1 [min]  = 60          [s]
   enlist("[h] Hour = 60 [min]",                    3600.0);                    //   1 [h]    = 3600        [s]
   enlist("[d] Day = 24 [h]",                       86400.0);                   //   1 [d]    = 86400       [s]
   enlist("[wk] Week = 7 [d]",                      604800.0);                  //   1 [wk]   = 604800      [s]
   enlist("[fn] Fortnight = 2 [wk]",                1209600.0);                 //   1 [fn]   = 1209600     [s]
   enlist("[mo-h] Month hollow = 29 [d]",           2505600.0);                 //   1 [mo-h] = 2505600     [s]
   enlist("[mo-f] Month full = 30 [d]",             2592000.0);                 //   1 [mo-f] = 2592000     [s]
   enlist("[qt] Quarter = 365[d] / 4",              7884000.0);                 //   1 [qt]   = 7884000     [s]
   enlist("[a-c] Year calender = 365 [d]",          31536000.0);                //   1 [a-c]  = 31536000    [s]
   enlist("[a-g] Year gregorian = 365.2425 [d]",    31556952.0);                //   1 [a-g]  = 31556952    [s]
   enlist("[a-j] Year julian = 365.25 [d]",         31557600.0);                //   1 [a-j]  = 31557600    [s]
   enlist("[dec] Decade = 10*365 [d]",              315360000.0);               //   1 [dec]  = 315360000   [s]
   enlist("[c-c] Century calendar = 100*365 [d]",   3153600000.0);              //   1 [c-c]  = 3153600000  [s]
   enlist("[c-g] Century greg. = 100*365.2425[d]",  3155695200.0);              //   1 [c-g]  = 3155695200  [s]
   enlist("[c-j] Century julian = 100*365.25[d]",   3155760000.0);              //   1 [c-j]  = 3155760000  [s]
   enlist("[m-c] Millenium calendar = 1000*365[d]", 31536000000.0);             //   1 [m-c]  = 31536000000 [s]
   enlist("[m-g] Millenium greg.= 1000*365.2425[d]",31556952000.0);             //   1 [m-g]  = 31556952000 [s]
   enlist("[m-j] Millenium julian = 1000*365.25[d]",31557600000.0); }           //   1 [m-j]  = 31557600000 [s]
 else if (typeID=="frequency") {                                                // Frequency:
   enlist("[1/s] 1/Second",                         1.0);                       //   1 [1/s] is base
   enlist("[Hz] Hertz",                             1.0);                       //   1 [Hz]   = 1                  [1/s]
   enlist("[kHz] Kilohertz",                        1000.0);                    //   1 [kHz]  = 1000               [1/s]
   enlist("[MHz] Megahertz",                        1000000.0);                 //   1 [MHz]  = 1000000            [1/s]
   enlist("[GHz] Gigahertz",                        1000000000.0);              //   1 [GHz]  = 1000000000         [1/s]
   enlist("[THz] Terahertz",                        1000000000000.0);           //   1 [THz]  = 1000000000000      [1/s]
   enlist("[PHz] Petahertz",                        1000000000000000.0);        //   1 [PHz]  = 1000000000000000   [1/s]
   enlist("[EHz] Exahertz",                         1000000000000000000.0);     //   1 [EHz]  = 1000000000000000000[1/s]
   enlist("[cyc/s] Rotations (cycles) per second",  1.0);                       //   1 [cyc/s]= 1                  [1/s]
   enlist("[RPM] Rotations (cycles) per minute",    1.0/60.0);                  //   1 [RPM]  = 1/60               [1/s]
   enlist("[r/h] Rotations (cycles) per hour",      1.0/3600.0);                //   1 [r/h]  = 1/3600             [1/s]
   enlist("[rad/s] Radians per second",             1.0/6.283185307179586);     //   1 [rad/s]= 1/6.283185307179586[1/s]
   enlist("[rad/m] Radians per minute",             1.0/376.99111843077515);    //   1 [rad/m]= 1/376.9911184307751[1/s]
   enlist("[rad/h] Radians per hour",               1.0/22619.46710584651);     //   1 [rad/h]= 1/22619.46710584651[1/s]
   enlist("[deg/s] Degrees per second",             1.0/360.0);                 //   1 [deg/s]= 1/360              [1/s]
   enlist("[deg/m] Degrees per minute",             1.0/21600.0);               //   1 [deg/m]= 1/21600            [1/s]
   enlist("[deg/h] Degrees per hour",               1.0/1296000.0);             //   1 [deg/h]= 1/1296000          [1/s]
   enlist("[gon/s] Grade (Neugrad) per second",     1.0/400.0);                 //   1 [gon/s]= 1/400              [1/s]
   enlist("[gon/m] Grade (Neugrad) per minute",     1.0/24000.0);               //   1 [gon/m]= 1/24000            [1/s]
   enlist("[gon/h] Grade (Neugrad) per hour",       1.0/1440000.0);  }          //   1 [gon/h]= 1/1440000          [1/s]
 else if (typeID=="speed") {                                                    // Speed:
   enlist("[m/s] Meter per second",                 1.0);                       //   1 [m/s] is base
   enlist("[m/min] Meter per minute",               1.0/60.0);                  //   1 [m/min]  = 1/60          [m/s]
   enlist("[m/h] Meter per hour",                   1.0/3600.0);                //   1 [m/h]    = 1/3600        [m/s]
   enlist("[km/s] Kilometer per second",            1000.0);                    //   1 [km/s]   = 1000          [m/s]
   enlist("[km/min] Kilometer per minute",          1000.0/60.0);               //   1 [km/min] = 1000/60       [m/s]
   enlist("[km/h] Kilometer per hour",              1000.0/3600.0);             //   1 [km/h]   = 1000/3600     [m/s]
   enlist("[mps] Miles per second",                 1609.344);                  //   1 [mps]    = 1609.344      [m/s]
   enlist("[mpm] Miles per minute",                 1609.344/60.0);             //   1 [mpm]    = 1609.344/60   [m/s]
   enlist("[mph] Miles per hour",                   1609.344/3600.0);           //   1 [mph]    = 1609.344/3600 [m/s]
   enlist("[fps] Feet per second",                  0.3048);                    //   1 [fps]    = 0.3048        [m/s]
   enlist("[fpm] Feet per minute",                  0.3048/60.0);               //   1 [fpm]    = 0.3048/60     [m/s]
   enlist("[fph] Feet per hour",                    0.3048/3600.0);             //   1 [fph]    = 0.3048/3600   [m/s]
   enlist("[ips] Inch per second",                  0.0254);                    //   1 [ips]    = 0.0254        [m/s]
   enlist("[ipm] Inch per minute",                  0.0254/60.0);               //   1 [ipm]    = 0.0254/60     [m/s]
   enlist("[iph] Inch per hour",                    0.0254/3600.0);             //   1 [iph]    = 0.0254/3600   [m/s]
   enlist("[kn] Sea miles per hour = knot | Knoten",1852.0/3600.0);             //   1 [kn]     = 1852.0/3600   [m/s]
   enlist("[c-air] Sound speed in the air",         340.2933);                  //   1 [c-air]  = 340.2933      [m/s]
   enlist("[c-h2o] Sound speed in water",           1484.0);                    //   1 [c-h2o]  = 1484          [m/s]
   enlist("[c-ice] Sound speed in ice",             3250.0);                    //   1 [c-ice]  = 3250          [m/s]
   enlist("[c-oil] Sound speed in oil",             1740.0);                    //   1 [c-oil]  = 1740          [m/s]
   enlist("[c-gla] Sound speed in glass",           5300.0);                    //   1 [c-gla]  = 5300          [m/s]
   enlist("[c-ccr] Sound speed in concrete",        3100.0);                    //   1 [c-ccr]  = 3100          [m/s]
   enlist("[c-tim] Sound speed in timber (beech)",  3300.0);                    //   1 [c-tim]  = 3300          [m/s]
   enlist("[c-alu] Sound speed in aluminium",       6300.0);                    //   1 [c-alu]  = 6300          [m/s]
   enlist("[c-cop] Sound speed in copper",          4660.0);                    //   1 [c-cop]  = 4660          [m/s]
   enlist("[c-ste] Sound speed in steel",           5920.0);                    //   1 [c-ste]  = 5920          [m/s]
   enlist("[c-tit] Sound speed in titanium",        6100.0);                    //   1 [c-tit]  = 6100          [m/s]
   enlist("[c] Light speed",                        299792458.0); }             //   1 [c]      = 299792458     [m/s]
 else if (typeID=="acceleration") {                                             // Acceleration:
   enlist("[m/s^2] Meter/second per second",        1.0);                       //   1 [m/s^2] is base
   enlist("[m/m/s] Meter/minute per second",        1.0/60.0);                  //   1 [m/m/s]  = 1/60          [m/s^2]
   enlist("[m/h/s] Meter/hour per second",          1.0/3600.0);                //   1 [m/h/s]  = 1/3600        [m/s^2]
   enlist("[km/s^2] Kilometer/second per second",   1000.0);                    //   1 [km/s^2] = 1000          [m/s^2]
   enlist("[km/m/s] Kilometer/minute per second",   1000.0/60.0);               //   1 [km/m/s] = 1000/60       [m/s^2]
   enlist("[km/h/s] Kilometer/hour per second",     1000.0/3600.0);             //   1 [km/h/s] = 1000/3600     [m/s^2]
   enlist("[mps^2] Miles/second per second",        1609.344);                  //   1 [mps^2]  = 1609.344      [m/s^2]
   enlist("[mpm/s] Miles/minute per second",        1609.344/60.0);             //   1 [mpm/s]  = 1609.344/60   [m/s^2]
   enlist("[mph/s] Miles/hour per second",          1609.344/3600.0);           //   1 [mph/s]  = 1609.344/3600 [m/s^2]
   enlist("[fps^2] Feet/second per second",         0.3048);                    //   1 [fps^2]  = 0.3048        [m/s^2]
   enlist("[fpm/s] Feet/minute per second",         0.3048/60.0);               //   1 [fpm/s]  = 0.3048/60     [m/s^2]
   enlist("[fph/s] Feet/hour per second",           0.3048/3600.0);             //   1 [fph/s]  = 0.3048/3600   [m/s^2]
   enlist("[ips^2] Inch/second per second",         0.0254);                    //   1 [ips^2]  = 0.0254        [m/s^2]
   enlist("[ipm/s] Inch/minute per second",         0.0254/60.0);               //   1 [ipm/s]  = 0.0254/60     [m/s^2]
   enlist("[iph/s] Inch/hour per second",           0.0254/3600.0);             //   1 [iph/s]  = 0.0254/3600   [m/s^2]
   enlist("[kn/s]  Knot/second | Knoten/second",    1852.0/3600.0);             //   1 [kn/s]   = 1852.0/3600 [m/s^2]
   enlist("[Gal] Galileo = 0.01m/s^2",              0.01);                      //   1 [Gal]    = 0.01          [m/s^2]
   enlist("[g] Gravity | Erdbeschleunigung",        9.80665); }                 //   1 [g]      = 9.80665       [m/s^2]
 else if (typeID=="mass") {                                                     // Mass:
   enlist("[kg] Kilogram | Kilogramm",              1.0);                       //   1 [kg] is base
   enlist("[g] Gram | Gramm",                       0.001);                     //   1 [g]     = 0.001          [kg]
   enlist("[t] Ton | Tonne",                        1000.0);                    //   1 [t]     = 1000           [kg]
   enlist("[tn] Long ton (Br.)",                    1016.0469088);              //   1 [tn]    = 1016.0469088   [kg]
   enlist("[sh tn] Short ton (Am.)",                907.18474);                 //   1 [sh tn] = 907.18474      [kg]
   enlist("[oz] Ounce = [lb]/16 (Br.) | Unze",      0.028349523125);            //   1 [oz]    = 0.028349523125 [kg]
   enlist("[oz t] Ounce (troy) | Feinunze",         0.0311034768);              //   1 [oz t]  = 0.0311034768   [kg]
   enlist("[lb] Pound (Br.) = 7000 [gr]",           0.45359237);                //   1 [lb]    = 0.45359237     [kg]
   enlist("[lb-t] Pound (troy) = 5760 [gr]",        0.3732417216);              //   1 [lb-t]  = 0.3732417216   [kg]
   enlist("[lb-m] Pound (metric)",                  0.500);                     //   1 [lb-m]  = 0.500          [kg]
   enlist("[st] Stone | Stein",                     6.35029318);                //   1 [st]    = 6.35029318     [kg]
   enlist("[qt] Quarter = 2 stone",                 12.70058636);               //   1 [qt]    = 12.70058636    [kg]
   enlist("[gr] Grain (Br.) | Korn",                0.00006479891);             //   1 [gr]    = 0.00006479891  [kg]
   enlist("[sl] Slug, geepound",                    14.593903);                 //   1 [sl]    = 14.593903      [kg]
   enlist("[q] Quintal (metric)",                   100.0);                     //   1 [q]     = 100            [kg]
   enlist("[kt] Carat (metric) | Karat",            0.0002);                    //   1 [kt]    = 0.0002         [kg]
   enlist("[ba] Baht (Thailand)",                   0.015);                     //   1 [ba]    = 0.015          [kg]
   enlist("[ch] Chung (Thailand)",                  1.2);                       //   1 [ch]    = 1.2            [kg]
   enlist("[do] Don (Korea)",                       0.00375);                   //   1 [do]    = 0.00375        [kg]
   enlist("[ge] Geun (Korea)",                      0.600);                     //   1 [ge]    = 0.600          [kg]
   enlist("[gw] Gwan (Korea)",                      3.75);                      //   1 [gw]    = 3.75           [kg]
   enlist("[ha] Harb (Thailand)",                   60.0);                      //   1 [ha]    = 60             [kg]
   enlist("[jn] Jin (China)",                       0.500);                     //   1 [jn]    = 0.500          [kg]
   enlist("[Jn] Jin (Taiwan)",                      0.600);                     //   1 [Jn]    = 0.600          [kg]
   enlist("[ka] Kan (Japan)",                       3.75);                      //   1 [ka]    = 3.75           [kg]
   enlist("[ki] Kin, kinn (Japan)",                 0.600);                     //   1 [ki]    = 0.600          [kg]
   enlist("[li] Liang (China)",                     0.0500);                    //   1 [li]    = 0.0500         [kg]
   enlist("[Li] Liang (Taiwan)",                    0.0375);                    //   1 [Li]    = 0.0375         [kg]
   enlist("[mo] Monme (Japan)",                     0.00375);                   //   1 [mo]    = 0.00375        [kg]
   enlist("[sa] Saloung (Thailand)",                0.00375);                   //   1 [sa]    = 0.00375        [kg]
   enlist("[ta] Tamlung (Thailand)",                0.06); }                    //   1 [ta]    = 0.06           [kg]
 else if (typeID=="density") {                                                  // Density:
   enlist("[kg/m^3] Kilogram per cubic meter",      1.0);                       //   1 [kg/m^3] is base
   enlist("[kg/dm^3] Kilogram per liter",           1000.0);                    //   1 [kg/dm^3] = 1000         [kg/m^3]
   enlist("[kg/cm^3] Kilogram per milliliter",      1000000.0);                 //   1 [kg/cm^3] = 1000000      [kg/m^3]
   enlist("[kg/ft^3] Kilogram per cubic feet",      1.0/0.028316846592);        //   1 [kg/ft^3] = 1/(0.3048^3) [kg/m^3]
   enlist("[kg/in^3] Kilogram per cubic inch",      1.0/0.000016387064);        //   1 [kg/in^3] = 1/(0.0254^3) [kg/m^3]
   enlist("[kg/yd^3] Kilogram per cubic yard",      1.0/0.764554857984);        //   1 [kg/yd^3] = 1/(0.9144^3) [kg/m^3]
   enlist("[g/m^3] Gram per cubic meter",           0.001);                     //   1 [g/m^3]   = 0.001        [kg/m^3]
   enlist("[g/dm^3] Gram per liter",                1.0);                       //   1 [g/dm^3]  = 1            [kg/m^3]
   enlist("[g/cm^3] Gram per milliliter",           1000.0);                    //   1 [g/cm^3]  = 1000         [kg/m^3]
   enlist("[g/ft^3] Gram per cubic feet",           0.001/0.028316846592);      //   1 [g/ft^3]  = 0.001/(0.3048^3) [..]
   enlist("[g/in^3] Gram per cubic inch",           0.001/0.000016387064);      //   1 [g/in^3]  = 0.001/(0.0254^3) [..]
   enlist("[g/yd^3] Gram per cubic yard",           0.001/0.764554857984);      //   1 [g/yd^3]  = 0.001/(0.9144^3) [..]
   enlist("[t/m^3] Ton per cubic meter",            1000.0);                    //   1 [t/m^3]   = 1000         [kg/m^3]
   enlist("[t/dm^3] Ton per liter",                 1000000.0);                 //   1 [t/dm^3]  = 1000000      [kg/m^3]
   enlist("[t/cm^3] Ton per milliliter",            1000000000.0);              //   1 [t/cm^3]  = 1000000000   [kg/m^3]
   enlist("[t/ft^3] Ton per cubic feet",            1000.0/0.028316846592);     //   1 [t/ft^3]  = 1000/(0.3048^3)  [..]
   enlist("[t/in^3] Ton per cubic inch",            1000.0/0.000016387064);     //   1 [t/in^3]  = 1000/(0.0254^3)  [..]
   enlist("[t/yd^3] Ton per cubic yard",            1000.0/0.764554857984);     //   1 [t/yd^3]  = 1000/(0.9144^3)  [..]
   enlist("[lb/m^3] Pounds per cubic meter",        0.45359237);                //   1 [lb/m^3]  = 0.45359237   [kg/m^3]
   enlist("[lb/dm^3] Pounds per liter",             453.59237);                 //   1 [lb/dm^3] = 453.59237    [kg/m^3]
   enlist("[lb/cm^3] Pounds per milliliter",        453592.37);                 //   1 [lb/cm^3] = 453592.37    [kg/m^3]
   enlist("[lb/ft^3] Pounds per cubic feet",        16.018463373960138);        //   1 [lb/ft^3] = 16.0184633740[kg/m^3]
   enlist("[lb/in^3] Pounds per cubic inch",        27679.904710203125);        //   1 [lb/in^3] = 27679.9047102[kg/m^3]
   enlist("[lb/yd^3] Pounds per cubic yard",        0.5932764212577829);        //   1 [lb/yd^3] = 0.59327642126[kg/m^3]
   enlist("[sl/m^3] Slug per cubic meter",          14.593903);                 //   1 [sl/m^3]  = 14.593903    [kg/m^3]
   enlist("[sl/dm^3] Slug per liter",               14593.903);                 //   1 [sl/dm^3] = 14593.903    [kg/m^3]
   enlist("[sl/cm^3] Slug per milliliter",          14593903.0);                //   1 [sl/cm^3] = 14593903.0   [kg/m^3]
   enlist("[sl/ft^3] Slug per cubic feet",          515.3788206107324);         //   1 [sl/ft^3] = 515.378820611[kg/m^3]
   enlist("[sl/in^3] Slug per cubic inch",          890574.6020153457);         //   1 [sl/in^3] = 890574.602015[kg/m^3]
   enlist("[sl/yd^3] Slug per cubic yard",          19.088104467064166);        //   1 [sl/yd^3] = 19.0881044671[kg/m^3]
   enlist("[gr/m^3] Grain per cubic meter",         0.00006479891);             //   1 [gr/m^3]  = 0.00006479891[kg/m^3]
   enlist("[gr/dm^3] Grain per liter",              0.06479891);                //   1 [gr/dm^3] = 0.06479891   [kg/m^3]
   enlist("[gr/cm^3] Grain per milliliter",         64.79891);                  //   1 [gr/cm^3] = 64.79891     [kg/m^3]
   enlist("[gr/ft^3] Grain per cubic feet",         0.0022883519105657336);     //   1 [gr/ft^3] = 0.00228835191[kg/m^3]
   enlist("[gr/in^3] Grain per cubic inch",         3.9542721014575886);        //   1 [gr/in^3] = 3.95427210146[kg/m^3]
   enlist("[gr/in^3] Grain per cubic yard",         0.00008475377446539755); }  //   1 [gr/in^3] = 0.00008475377[kg/m^3]
 else if (typeID=="force") {                                                    // Force:
   enlist("[N] Newton = 1 kgm/s^2",                 1.0);                       //   1 [N] is base
   enlist("[kN] Kilonewton",                        1000.0);                    //   1 [kN]  = 1000             [N]
   enlist("[MN] Meganewton",                        1000000.0);                 //   1 [MN]  = 1000000          [N]
   enlist("[kgf, kp] Kilogram-force | Kilopond",    9.80665);                   //   1 [kp]  = 9.80665          [N]
   enlist("[MP] Ton-force | Megapond",              9806.65);                   //   1 [MP]  = 9806.65          [N]
   enlist("[lbf] Pound force",                      4.4482216152605);           //   1 [lbf] = 4.4482216152605  [N]
   enlist("[kip, klb] Kilopound force",             4448.2216152605);           //   1 [kip] = 4448.2216152605  [N]
   enlist("[pdl] Poundal = 1 lb*ft/s^2",            0.138254954376);            //   1 [pdl] = 0.138254954376   [N]
   enlist("[dyn] Dyne = 1 g*cm/s^2",                0.00001);                   //   1 [dyn] = 0.00001          [N]
   enlist("[jpm] Joule per meter",                  1.0); }                     //   1 [jpm] = 1                [N]
 else if (typeID=="moment") {                                                   // Moment:
   enlist("[Nm] Newton meter",                      1.0);                       //   1 [Nm] is base
   enlist("[Ndm] Newton decimeter",                 0.1);                       //   1 [Ndm]    = 0.1              [Nm]
   enlist("[Ncm] Newton centimeter",                0.01);                      //   1 [Ncm]    = 0.01             [Nm]
   enlist("[Nmm] Newton millimeter",                0.001);                     //   1 [Nmm]    = 0.001            [Nm]
   enlist("[Nft] Newton feet",                      0.3048);                    //   1 [Nft]    = 0.3048           [Nm]
   enlist("[Nin] Newton inch",                      0.0254);                    //   1 [Nin]    = 0.0254           [Nm]
   enlist("[Nyd] Newton yard",                      0.9144);                    //   1 [Nyd]    = 0.9144           [Nm]
   enlist("[kNm] Kilonewton meter",                 1000.0);                    //   1 [kNm]    = 1000.0           [Nm]
   enlist("[kNdm] Kilonewton decimeter",            100.0);                     //   1 [kNdm]   = 100.0            [Nm]
   enlist("[kNcm] Kilonewton centimeter",           10.0);                      //   1 [kNcm]   = 10.0             [Nm]
   enlist("[kNmm] Kilonewton millimeter",           1.0);                       //   1 [kNmm]   = 1.0              [Nm]
   enlist("[kNft] Kilonewton feet",                 304.8);                     //   1 [kNft]   = 304.8            [Nm]
   enlist("[kNin] Kilonewton inch",                 25.4);                      //   1 [kNin]   = 25.4             [Nm]
   enlist("[kNyd] Kilonewton yard",                 914.4);                     //   1 [kNyd]   = 914.4            [Nm]
   enlist("[MNm] Meganewton meter",                 1000000.0);                 //   1 [MNm]    = 1000000.0        [Nm]
   enlist("[MNdm] Meganewton decimeter",            100000.0);                  //   1 [MNdm]   = 100000.0         [Nm]
   enlist("[MNcm] Meganewton centimeter",           10000.0);                   //   1 [MNcm]   = 10000.0          [Nm]
   enlist("[MNmm] Meganewton millimeter",           1000.0);                    //   1 [MNmm]   = 1000.0           [Nm]
   enlist("[MNft] Meganewton feet",                 304800.0);                  //   1 [MNft]   = 304800           [Nm]
   enlist("[MNin] Meganewton inch",                 25400.0);                   //   1 [MNin]   = 25400            [Nm]
   enlist("[MNyd] Meganewton yard",                 914400.0);                  //   1 [MNyd]   = 914400           [Nm]
   enlist("[kpm] Kilopond meter",                   9.80665);                   //   1 [kpm]    = 9.80665          [Nm]
   enlist("[kpdm] Kilopond decimeter",              0.980665);                  //   1 [kpdm]   = 0.980665         [Nm]
   enlist("[kpcm] Kilopond centimeter",             0.0980665);                 //   1 [kpcm]   = 0.0980665        [Nm]
   enlist("[kpmm] Kilopond millimeter",             0.00980665);                //   1 [kpmm]   = 0.00980665       [Nm]
   enlist("[kpft] Kilopond feet",                   9.80665*0.3048);            //   1 [kpft]   = 9.80665*0.3048   [Nm]
   enlist("[kpin] Kilopond inch",                   9.80665*0.0254);            //   1 [kpin]   = 9.80665*0.0254   [Nm]
   enlist("[kpyd] Kilopond yard",                   9.80665*0.9144);            //   1 [kpyd]   = 9.80665*0.9144   [Nm]
   enlist("[MPm] Megapond meter",                   9806.65);                   //   1 [MPm]    = 9806.65          [Nm]
   enlist("[MPdm] Megapond decimeter",              980.665);                   //   1 [MPdm]   = 980.665          [Nm]
   enlist("[MPcm] Megapond centimeter",             98.06650);                  //   1 [MPcm]   = 98.06650         [Nm]
   enlist("[MPmm] Megapond millimeter",             9.806650);                  //   1 [MPmm]   = 9.806650         [Nm]
   enlist("[MPft] Megapond feet",                   9806.65*0.3048);            //   1 [MPft]   = 9806.65*0.3048   [Nm]
   enlist("[MPin] Megapond inch",                   9806.65*0.0254);            //   1 [MPin]   = 9806.65*0.0254   [Nm]
   enlist("[MPyd] Megapond yard",                   9806.65*0.9144);            //   1 [MPyd]   = 9806.65*0.9144   [Nm]
   enlist("[lbf*m] Pound force meter",              4.4482216152605);           //   1 [lbf*m]  = 4.4482216152605  [Nm]
   enlist("[lbf*dm] Pound force decimeter",         0.44482216152605);          //   1 [lbf*dm] = 0.44.4822161526  [Nm]
   enlist("[lbf*cm] Pound force centimeter",        0.044482216152605);         //   1 [lbf*cm] = 0.0444.82216153  [Nm]
   enlist("[lbf*mm] Pound force millimeter",        0.0044482216152605);        //   1 [lbf*mm] = 0.004448.221615  [Nm]
   enlist("[lbf*ft] Pound force feet",              4.4482216152605*0.3048);    //   1 [lbf*ft] = 4.4482216*0.3048 [Nm]
   enlist("[lbf*in] Pound force inch",              4.4482216152605*0.0254);    //   1 [lbf*in] = 4.4482216*0.0254 [Nm]
   enlist("[lbf*yd] Pound force yard",              4.4482216152605*0.9144);    //   1 [lbf*yd] = 4.4482216*0.9144 [Nm]
   enlist("[kip*m] Kilopound force meter",          4448.2216152605);           //   1 [kip*m]  = 4448.2216152605  [Nm]
   enlist("[kip*dm] Kilopound force decimeter",     444.82216152605);           //   1 [kip*dm] = 444.82216152605  [Nm]
   enlist("[kip*cm] Kilopound force centimeter",    44.482216152605);           //   1 [kip*cm] = 44.482216152605  [Nm]
   enlist("[kip*mm] Kilopound force millimeter",    4.4482216152605);           //   1 [kip*mm] = 4.4482216152605  [Nm]
   enlist("[kip*ft] Kilopound force feet",          4448.2216152605*0.3048);    //   1 [kip*ft] = 4448.2216*0.3048 [Nm]
   enlist("[kip*in] Kilopound force inch",          4448.2216152605*0.0254);    //   1 [kip*in] = 4448.2216*0.0254 [Nm]
   enlist("[kip*yd] Kilopound force yard",          4448.2216152605*0.9144);    //   1 [kip*yd] = 4448.2216*0.9144 [Nm]
   enlist("[pdl*m] Poundal meter",                  0.138254954376);            //   1 [pdl*m]  = 0.138254954376   [Nm]
   enlist("[pdl*dm] Poundal decimeter",             0.0138254954376);           //   1 [pdl*dm] = 0.0138254954376  [Nm]
   enlist("[pdl*cm] Poundal centimeter",            0.00138254954376);          //   1 [pdl*cm] = 0.00138254954376 [Nm]
   enlist("[pdl*mm] Poundal millimeter",            0.000138254954376);         //   1 [pdl*mm] = 0.00013825495438 [Nm]
   enlist("[pdl*ft] Poundal feet",                  0.138254954376*0.3048);     //   1 [pdl*ft] = 0.1382550*0.3048 [Nm]
   enlist("[pdl*in] Poundal inch",                  0.138254954376*0.0254);     //   1 [pdl*in] = 0.1382550*0.0254 [Nm]
   enlist("[pdl*yd] Poundal yard",                  0.138254954376*0.9144);     //   1 [pdl*yd] = 0.1382550*0.9144 [Nm]
   enlist("[dyn/m] Dyne meter",                     0.00001);                   //   1 [dyn/m]  = 0.00001          [Nm]
   enlist("[dyn/dm] Dyne decimeter",                0.000001);                  //   1 [dyn/dm] = 0.000001         [Nm]
   enlist("[dyn/cm] Dyne centimeter",               0.0000001);                 //   1 [dyn/cm] = 0.0000001        [Nm]
   enlist("[dyn/mm] Dyne millimeter",               0.00000001);                //   1 [dyn/mm] = 0.00000001       [Nm]
   enlist("[dyn/ft] Dyne feet",                     0.00001*0.3048);            //   1 [dyn/ft] = 0.00001/0.3048   [Nm]
   enlist("[dyn/in] Dyne inch",                     0.00001*0.0254);            //   1 [dyn/in] = 0.00001/0.0254   [Nm]
   enlist("[dyn/yd] Dyne yard",                     0.00001*0.9144); }          //   1 [dyn/yd] = 0.00001/0.9144   [Nm]
 else if (typeID=="forcePerLength") {                                           // Force per Length:
   enlist("[N/m] Newton per meter",                 1.0);                       //   1 [N/m] is base
   enlist("[N/dm] Newton per decimeter",            10.0);                      //   1 [N/dm]   = 10               [N/m]
   enlist("[N/cm] Newton per centimeter",           100.0);                     //   1 [N/cm]   = 100              [N/m]
   enlist("[N/mm] Newton per millimeter",           1000.0);                    //   1 [N/mm]   = 1000             [N/m]
   enlist("[N/ft] Newton per feet",                 1.0/0.3048);                //   1 [N/ft]   = 1/0.3048         [N/m]
   enlist("[N/in] Newton per inch",                 1.0/0.0254);                //   1 [N/in]   = 1/0.0254         [N/m]
   enlist("[N/yd] Newton per yard",                 1.0/0.9144);                //   1 [N/yd]   = 1/0.9144         [N/m]
   enlist("[kN/km] Kilonewton per kilometer",       1.0);                       //   1 [kN/m]   = 1                [N/m]
   enlist("[kN/m] Kilonewton per meter",            1000.0);                    //   1 [kN/m]   = 1000             [N/m]
   enlist("[kN/dm] Kilonewton per decimeter",       10000.0);                   //   1 [kN/dm]  = 10000            [N/m]
   enlist("[kN/cm] Kilonewton per centimeter",      100000.0);                  //   1 [kN/cm]  = 100000           [N/m]
   enlist("[kN/mm] Kilonewton per millimeter",      1000000.0);                 //   1 [kN/mm]  = 1000000          [N/m]
   enlist("[kN/ft] Kilonewton per feet",            1000.0/0.3048);             //   1 [kN/ft]  = 1000/0.3048      [N/m]
   enlist("[kN/in] Kilonewton per inch",            1000.0/0.0254);             //   1 [kN/in]  = 1000/0.0254      [N/m]
   enlist("[kN/yd] Kilonewton per yard",            1000.0/0.9144);             //   1 [kN/yd]  = 1000/0.9144      [N/m]
   enlist("[MN/km] Meganewton per kilometer",       1000.0);                    //   1 [MN/m]   = 1000             [N/m]
   enlist("[MN/m] Meganewton per meter",            1000000.0);                 //   1 [MN/m]   = 1000000          [N/m]
   enlist("[MN/dm] Meganewton per decimeter",       10000000.0);                //   1 [MN/dm]  = 10000000         [N/m]
   enlist("[MN/cm] Meganewton per centimeter",      100000000.0);               //   1 [MN/cm]  = 100000000        [N/m]
   enlist("[MN/mm] Meganewton per millimeter",      1000000000.0);              //   1 [MN/mm]  = 1000000000       [N/m]
   enlist("[MN/ft] Meganewton per feet",            1000000.0/0.3048);          //   1 [MN/ft]  = 1000000/0.3048   [N/m]
   enlist("[MN/in] Meganewton per inch",            1000000.0/0.0254);          //   1 [MN/in]  = 1000000/0.0254   [N/m]
   enlist("[MN/yd] Meganewton per yard",            1000000.0/0.9144);          //   1 [MN/yd]  = 1000000/0.9144   [N/m]
   enlist("[kp/m] Kilopond per meter",              9.80665);                   //   1 [kp/m]   = 9.80665          [N/m]
   enlist("[kp/dm] Kilopond per decimeter",         98.0665);                   //   1 [kp/dm]  = 98.0665          [N/m]
   enlist("[kp/cm] Kilopond per centimeter",        980.665);                   //   1 [kp/cm]  = 980.665          [N/m]
   enlist("[kp/mm] Kilopond per millimeter",        9806.65);                   //   1 [kp/mm]  = 9806.65          [N/m]
   enlist("[kp/ft] Kilopond per feet",              9.80665/0.3048);            //   1 [kp/ft]  = 9.80665/0.3048   [N/m]
   enlist("[kp/in] Kilopond per inch",              9.80665/0.0254);            //   1 [kp/in]  = 9.80665/0.0254   [N/m]
   enlist("[kp/yd] Kilopond per yard",              9.80665/0.9144);            //   1 [kp/yd]  = 9.80665/0.9144   [N/m]
   enlist("[MP/m] Megapond per meter",              9806.65);                   //   1 [MP/m]   = 9806.65          [N/m]
   enlist("[MP/dm] Megapond per decimeter",         98066.5);                   //   1 [MP/dm]  = 98066.5          [N/m]
   enlist("[MP/cm] Megapond per centimeter",        980665.0);                  //   1 [MP/cm]  = 980665.0         [N/m]
   enlist("[MP/mm] Megapond per millimeter",        9806650.0);                 //   1 [MP/mm]  = 9806650          [N/m]
   enlist("[MP/ft] Megapond per feet",              9806.65/0.3048);            //   1 [MP/ft]  = 9806.65/0.3048   [N/m]
   enlist("[MP/in] Megapond per inch",              9806.65/0.0254);            //   1 [MP/in]  = 9806.65/0.0254   [N/m]
   enlist("[MP/yd] Megapond per yard",              9806.65/0.9144);            //   1 [MP/yd]  = 9806.65/0.9144   [N/m]
   enlist("[lbf/m] Pound force per meter",          4.4482216152605);           //   1 [lbf/m]  = 4.4482216152605  [N/m]
   enlist("[lbf/dm] Pound force per decimeter",     44.482216152605);           //   1 [lbf/dm] = 44.482216152605  [N/m]
   enlist("[lbf/cm] Pound force per centimeter",    444.82216152605);           //   1 [lbf/cm] = 444.82216152605  [N/m]
   enlist("[lbf/mm] Pound force per millimeter",    4448.2216152605);           //   1 [lbf/mm] = 4448.2216152605  [N/m]
   enlist("[lbf/ft] Pound force per feet",          4.4482216152605/0.3048);    //   1 [lbf/ft] = 4.4482216/0.3048 [N/m]
   enlist("[lbf/in] Pound force per inch",          4.4482216152605/0.0254);    //   1 [lbf/in] = 4.4482216/0.0254 [N/m]
   enlist("[lbf/yd] Pound force per yard",          4.4482216152605/0.9144);    //   1 [lbf/yd] = 4.4482216/0.9144 [N/m]
   enlist("[kip/m] Kilopound force per meter",      4448.2216152605);           //   1 [kip/m]  = 4448.2216152605  [N/m]
   enlist("[kip/dm] Kilopound force per decimeter", 44482.216152605);           //   1 [kip/dm] = 44482.216152605  [N/m]
   enlist("[kip/cm] Kilopound force per centimeter",444822.16152605);           //   1 [kip/cm] = 444822.16152605  [N/m]
   enlist("[kip/mm] Kilopound force per millimeter",4448221.6152605);           //   1 [kip/mm] = 4448221.6152605  [N/m]
   enlist("[kip/ft] Kilopound force per feet",      4448.2216152605/0.3048);    //   1 [kip/ft] = 4448.2216/0.3048 [N/m]
   enlist("[kip/in] Kilopound force per inch",      4448.2216152605/0.0254);    //   1 [kip/in] = 4448.2216/0.0254 [N/m]
   enlist("[kip/yd] Kilopound force per yard",      4448.2216152605/0.9144);    //   1 [kip/yd] = 4448.2216/0.9144 [N/m]
   enlist("[pdl/m] Poundal per meter",              0.138254954376);            //   1 [pdl/m]  = 0.138254954376   [N/m]
   enlist("[pdl/dm] Poundal per decimeter",         1.38254954376);             //   1 [pdl/dm] = 1.38254954376    [N/m]
   enlist("[pdl/cm] Poundal per centimeter",        13.8254954376);             //   1 [pdl/cm] = 13.8254954376    [N/m]
   enlist("[pdl/mm] Poundal per millimeter",        138.254954376);             //   1 [pdl/mm] = 138.254954376    [N/m]
   enlist("[pdl/ft] Poundal per feet",              0.138254954376/0.3048);     //   1 [pdl/ft] = 0.1382550/0.3048 [N/m]
   enlist("[pdl/in] Poundal per inch",              0.138254954376/0.0254);     //   1 [pdl/in] = 0.1382550/0.0254 [N/m]
   enlist("[pdl/yd] Poundal per yard",              0.138254954376/0.9144);     //   1 [pdl/yd] = 0.1382550/0.9144 [N/m]
   enlist("[dyn/m] Dyne per meter",                 0.00001);                   //   1 [dyn/m]  = 0.00001          [N/m]
   enlist("[dyn/dm] Dyne per decimeter",            0.0001);                    //   1 [dyn/dm] = 0.0001           [N/m]
   enlist("[dyn/cm] Dyne per centimeter",           0.001);                     //   1 [dyn/cm] = 0.001            [N/m]
   enlist("[dyn/mm] Dyne per millimeter",           0.01);                      //   1 [dyn/mm] = 0.01             [N/m]
   enlist("[dyn/ft] Dyne per feet",                 0.00001/0.3048);            //   1 [dyn/ft] = 0.00001/0.3048   [N/m]
   enlist("[dyn/in] Dyne per inch",                 0.00001/0.0254);            //   1 [dyn/in] = 0.00001/0.0254   [N/m]
   enlist("[dyn/yd] Dyne per yard",                 0.00001/0.9144);            //   1 [dyn/yd] = 0.00001/0.9144   [N/m]
   enlist("[J/m^2] Joule per square meter",         1.0);  }                    //   1 [J/m^2]  = 1.0              [N/m]
 else if (typeID=="forcePerArea") {                                             // Force per Area:
   enlist("[N/m^2] Newton per meter^2",             1.0);                       //   1 [N/m^2] is base
   enlist("[N/dm^2] Newton per decimeter^2",        100.0);                     //   1 [N/dm^2]   = 100          [N/m^2]
   enlist("[N/cm^2] Newton per centimeter^2",       10000.0);                   //   1 [N/cm^2]   = 10000        [N/m^2]
   enlist("[N/mm^2] Newton per millimeter^2",       1000000.0);                 //   1 [N/mm^2]   = 1000000      [N/m^2]
   enlist("[N/ft^2] Newton per feet^2",             1.0/0.3048/0.3048);         //   1 [N/ft^2]   = 1/0.3048^2   [N/m^2]
   enlist("[N/in^2] Newton per inch^2",             1.0/0.0254/0.0254);         //   1 [N/in^2]   = 1/0.0254^2   [N/m^2]
   enlist("[N/yd^2] Newton per yard^2",             1.0/0.9144/0.9144);         //   1 [N/yd^2]   = 1/0.9144^2   [N/m^2]
   enlist("[kN/km^2] Kilonewton per kilometer^2",   0.001);                     //   1 [kN/m^2]   = 0.001        [N/m^2]
   enlist("[kN/m^2] Kilonewton per meter^2",        1000.0);                    //   1 [kN/m^2]   = 1000         [N/m^2]
   enlist("[kN/dm^2] Kilonewton per decimeter^2",   100000.0);                  //   1 [kN/dm^2]  = 100000       [N/m^2]
   enlist("[kN/cm^2] Kilonewton per centimeter^2",  10000000.0);                //   1 [kN/cm^2]  = 10000000     [N/m^2]
   enlist("[kN/mm^2] Kilonewton per millimeter^2",  1000000000.0);              //   1 [kN/mm^2]  = 1000000000   [N/m^2]
   enlist("[kN/ft^2] Kilonewton per feet^2",        1000.0/0.3048/0.3048);      //   1 [kN/ft^2]  = 1000/0.3048^2[N/m^2]
   enlist("[kN/in^2] Kilonewton per inch^2",        1000.0/0.0254/0.0254);      //   1 [kN/in^2]  = 1000/0.0254^2[N/m^2]
   enlist("[kN/yd^2] Kilonewton per yard^2",        1000.0/0.9144/0.9144);      //   1 [kN/yd^2]  = 1000/0.9144^2[N/m^2]
   enlist("[MN/km^2] Meganewton per kilometer^2",   1.0);                       //   1 [MN/m^2]   = 1            [N/m^2]
   enlist("[MN/m^2] Meganewton per meter^2",        1000000.0);                 //   1 [MN/m^2]   = 1000000      [N/m^2]
   enlist("[MN/dm^2] Meganewton per decimeter^2",   100000000.0);               //   1 [MN/dm^2]  = 100000000    [N/m^2]
   enlist("[MN/cm^2] Meganewton per centimeter^2",  10000000000.0);             //   1 [MN/cm^2]  = 10000000000  [N/m^2]
   enlist("[MN/mm^2] Meganewton per millimeter^2",  1000000000000.0);           //   1 [MN/mm^2]  = 1000000000000[N/m^2]
   enlist("[MN/ft^2] Meganewton per feet^2",        1000000.0/0.3048/0.3048);   //   1 [MN/ft^2]  = 1000000/0.3048^2 [.]
   enlist("[MN/in^2] Meganewton per inch^2",        1000000.0/0.0254/0.0254);   //   1 [MN/in^2]  = 1000000/0.0254^2 [.]
   enlist("[MN/yd^2] Meganewton per yard^2",        1000000.0/0.9144/0.9144);   //   1 [MN/yd^2]  = 1000000/0.9144^2 [.]
   enlist("[kp/m^2] Kilopond per meter^2",          9.80665);                   //   1 [kp/m^2]   = 9.80665      [N/m^2]
   enlist("[kp/dm^2] Kilopond per decimeter^2",     980.665);                   //   1 [kp/dm^2]  = 980.665      [N/m^2]
   enlist("[kp/cm^2] Kilopond per centimeter^2",    98066.5);                   //   1 [kp/cm^2]  = 98066.5      [N/m^2]
   enlist("[kp/mm^2] Kilopond per millimeter^2",    9806650.0);                 //   1 [kp/mm^2]  = 9806650      [N/m^2]
   enlist("[kp/ft^2] Kilopond per feet^2",          9.80665/0.3048/0.3048);     //   1 [kp/ft^2]  = 9.81/0.3048^2[N/m^2]
   enlist("[kp/in^2] Kilopond per inch^2",          9.80665/0.0254/0.0254);     //   1 [kp/in^2]  = 9.81/0.0254^2[N/m^2]
   enlist("[kp/yd^2] Kilopond per yard^2",          9.80665/0.9144/0.9144);     //   1 [kp/yd^2]  = 9.81/0.9144^2[N/m^2]
   enlist("[MP/m^2] Megapond per meter^2",          9806.65);                   //   1 [MP/m^2]   = 9806.65      [N/m^2]
   enlist("[MP/dm^2] Megapond per decimeter^2",     980665.0);                  //   1 [MP/dm^2]  = 980665.0     [N/m^2]
   enlist("[MP/cm^2] Megapond per centimeter^2",    98066500.0);                //   1 [MP/cm^2]  = 98066500.0   [N/m^2]
   enlist("[MP/mm^2] Megapond per millimeter^2",    9806650000.0);              //   1 [MP/mm^2]  = 9806650000.0 [N/m^2]
   enlist("[MP/ft^2] Megapond per feet^2",          9806.65/0.3048/0.3048);     //   1 [MP/ft^2]  = 9807/0.3048^2[N/m^2]
   enlist("[MP/in^2] Megapond per inch^2",          9806.65/0.0254/0.0254);     //   1 [MP/in^2]  = 9807/0.0254^2[N/m^2]
   enlist("[MP/yd^2] Megapond per yard^2",          9806.65/0.9144/0.9144);     //   1 [MP/yd^2]  = 9807/0.9144^2[N/m^2]
   enlist("[lbf/m^2] Pound force per meter^2",      4.4482216152605);           //   1 [lbf/m^2]  = 4.44822161526[N/m^2]
   enlist("[lbf/dm^2] Pound force per decimeter^2", 444.82216152605);           //   1 [lbf/dm^2] = 444.822161526[N/m^2]
   enlist("[lbf/cm^2] Pound force per centimeter^2",44482.216152605);           //   1 [lbf/cm^2] = 44482.2161526[N/m^2]
   enlist("[lbf/mm^2] Pound force per millimeter^2",4448221.6152605);           //   1 [lbf/mm^2] = 4448221.61526[N/m^2]
   enlist("[lbf/ft^2] Pound force per feet^2",      47.880258980335835);        //   1 [lbf/ft^2] = 47.8802589803[N/m^2]
   enlist("[lbf/in^2] Pound force per inch^2",      6894.757293168361);         //   1 [lbf/in^2] = 6894.75729317[N/m^2]
   enlist("[lbf/yd^2] Pound force per yard^2",      5.3200287755928715);        //   1 [lbf/yd^2] = 5.32002877559[N/m^2]
   enlist("[kip/m^2] Kilopound force per meter^2",  4448.2216152605);           //   1 [kip/m^2]  = 4448.22161526[N/m^2]
   enlist("[kip/dm^2] Kilopound force per dm^2",    444822.16152605);           //   1 [kip/dm^2] = 444822.161526[N/m^2]
   enlist("[kip/cm^2] Kilopound force per cm^2",    44482216.152605);           //   1 [kip/cm^2] = 44482216.1526[N/m^2]
   enlist("[kip/mm^2] Kilopound force per mm^2",    4448221615.2605);           //   1 [kip/mm^2] = 4448221615.26[N/m^2]
   enlist("[kip/ft^2] Kilopound force per feet^2",  47880.258980335835);        //   1 [kip/ft^2] = 47880.2589803[N/m^2]
   enlist("[kip/in^2] Kilopound force per inch^2",  6894757.293168361);         //   1 [kip/in^2] = 6894757.29317[N/m^2]
   enlist("[kip/yd^2] Kilopound force per yard^2",  5320.0287755928715);        //   1 [kip/yd^2] = 5320.02877559[N/m^2]
   enlist("[pdl/m^2] Poundal per meter^2",          0.138254954376);            //   1 [pdl/m^2]  = 0.13825495438[N/m^2]
   enlist("[pdl/dm^2] Poundal per decimeter^2",     13.8254954376);             //   1 [pdl/dm^2] = 13.8254954376[N/m^2]
   enlist("[pdl/cm^2] Poundal per centimeter^2",    1382.54954376);             //   1 [pdl/cm^2] = 1382.54954376[N/m^2]
   enlist("[pdl/mm^2] Poundal per millimeter^2",    138254.954376);             //   1 [pdl/mm^2] = 138254.954376[N/m^2]
   enlist("[pdl/ft^2] Poundal per feet^2",          1.4881639435695537);        //   1 [pdl/ft^2] = 1.48816394357[N/m^2]
   enlist("[pdl/in^2] Poundal per inch^2",          214.29560787401576);        //   1 [pdl/in^2] = 214.295607874[N/m^2]
   enlist("[pdl/yd^2] Poundal per yard^2",          0.16535154928550597);       //   1 [pdl/yd^2] = 0.16535154929[N/m^2]
   enlist("[dyn/m^2] Dyne per meter^2",             0.00001);                   //   1 [dyn/m^2]  = 0.00001      [N/m^2]
   enlist("[dyn/dm^2] Dyne per decimeter^2",        0.001);                     //   1 [dyn/dm^2] = 0.001        [N/m^2]
   enlist("[dyn/cm^2] Dyne per centimeter^2",       0.1);                       //   1 [dyn/cm^2] = 0.1          [N/m^2]
   enlist("[dyn/mm^2] Dyne per millimeter^2",       10.0);                      //   1 [dyn/mm^2] = 10           [N/m^2]
   enlist("[dyn/ft^2] Dyne per feet^2",             0.00001/0.3048/0.3048);     //   1 [dyn/ft^2] = 0.00001/0.3048^2 [.]
   enlist("[dyn/in^2] Dyne per inch^2",             0.00001/0.0254/0.0254);     //   1 [dyn/in^2] = 0.00001/0.0254^2 [.]
   enlist("[dyn/yd^2] Dyne per yard^2",             0.00001/0.9144/0.9144);     //   1 [dyn/yd^2] = 0.00001/0.9144^2 [.]
   enlist("[Pa] Pascal = 1 N/m^2",                  1.0);                       //   1 [Pa]       = 1.0);        [N/m^2]
   enlist("[hPa] Hectopascal = 100 N/m^2",          100.0);                     //   1 [hPa]      = 100);        [N/m^2]
   enlist("[psi] Pound (force) per square inch",    6894.757293168361);         //   1 [psi]      = 6894.75729317[N/m^2]
   enlist("[mmHg] mm quicksilver, Torr",            133.322387415);             //   1 [mmHg]     = 133.322387415[N/m^2]
   enlist("[inch Hg] Inch quicksilver",             3386.38864034);             //   1 [inch      = 3386.38864034[N/m^2]
   enlist("[mmWC] Millimeter water column",         9.80665);                   //   1 [mmWC]     = 9.80665      [N/m^2]
   enlist("[mWC] Meter water column",               9806.65);                   //   1 [mWC]      = 9806.65      [N/m^2]
   enlist("[bar] Bar = 10.0 N/cm^2",                100000.0);                  //   1 [bar]      = 100000       [N/m^2]
   enlist("[mbar] Millibar",                        100.0);                     //   1 [mbar]     = 100          [N/m^2]
   enlist("[atm] Standard atmosphere = 760 Torr",   101325.0144354);            //   1 [atm]      = 101325.014435[N/m^2]
   enlist("[at] Technical atmosphere = 1 kp/cm^2",  98066.5);                   //   1 [at]       = 98066.5      [N/m^2]
   enlist("[atü] = 1 kg/cm^2",                      98066.5); }                 //   1 [atü]      = 98066.5      [N/m^2]
 else if (typeID=="power") {                                                    // Power:
   enlist("[Nm/s] Newtonmeter per second",          1.0);                       //   1 [Nm/s] is base
   enlist("[J/s] Joule per second",                 1.0);                       //   1 [J/s]   = 1.0              [Nm/s]
   enlist("[kJ/h] Kilojoule per hour",              1000.0/3600.0);             //   1 [kJ/h]  = 1000.0/3600.0    [Nm/s]
   enlist("[W] Watt",                               1.0);                       //   1 [W]     = 1.0              [Nm/s]
   enlist("[kW] Kilowatt",                          1000.0);                    //   1 [kW]    = 1000.0           [Nm/s]
   enlist("[MW] Megawatt",                          1000000.0);                 //   1 [MW]    = 1000000.0        [Nm/s]
   enlist("[kcal/h] Kilocalorie per hour",          4186.8/3600.0);             //   1 [kcal/h]= 1.16263888888889 [Nm/s]
   enlist("[PS] Pferdestärke",                      735.4987);                  //   1 [PS]    = 735.4987         [Nm/s]
   enlist("[HP] Hoursepower (Br.)",                 745.69987158227022);        //   1 [HP]    = 745.699871582270 [Nm/s]
   enlist("[MP] Manpower = 1/10 HP",                74.569987158227022);        //   1 [MP]    = 74.5699871582270 [Nm/s]
   enlist("[BTU/s] British thermal unit per second",1055.05585262);             //   1 [BTU/s] = 1055.0558526     [Nm/s]
   enlist("[BTU/m] British thermal unit per minute",1055.05585262/60.0);        //   1 [BTU/m] = 1055.055852/60.0 [Nm/s]
   enlist("[BTU/h] British thermal unit per hour",  1055.05585262/3600.0); }    //   1 [BTU/h] = 1055.0559/3600.0 [Nm/s]
 else if (typeID=="energy") {                                                   // Energy:
   enlist("[Nm] Newtonmeter",                       1.0);                       //   1 [Nm] is base
   enlist("[J] Joule = 1 kg*m^2/s^2",               1.0);                       //   1 [J]      = 1.0               [Nm]
   enlist("[kJ] Kilojoule",                         1000.0);                    //   1 [kJ]     = 1000.0            [Nm]
   enlist("[Ws] Watt second",                       1.0);                       //   1 [Ws]     = 1.0               [Nm]
   enlist("[Wh] Watt hour",                         3600.0);                    //   1 [Wh]     = 3600.0            [Nm]
   enlist("[kWh] Kilowatt hour",                    3600000.0);                 //   1 [kWh]    = 3600000.0         [Nm]
   enlist("[cal] calorie | Kalorie (Nährwert)",     4.1868);                    //   1 [cal]    = 4.1855            [Nm]
   enlist("[C, kcal] Calorie | Kilokalorie",        4186.8);                    //   1 [C, kcal]= 4185.5            [Nm]
   enlist("[PSh] Pferdestärke-hour",                2647795.32);                //   1 [PSh]    = 2647795.32        [Nm]
   enlist("[HPh] Hoursepower-hour",                 2684519.537696173);         //   1 [HPh]    = 2684519.537696173 [Nm]
   enlist("[MPh] Manpower-hour = HPh/10",           268451.9537696173);         //   1 [MPh]    = 268451.9537696173 [Nm]
   enlist("[kpm] Kilopond meter",                   9.80665);                   //   1 [kpm]    = 9.80665           [Nm]
   enlist("[lbf.ft] Pound-force feet",              1.3558179483314003);        //   1 [lbf.ft] = 1.355817948331400 [Nm]
   enlist("[pdl.ft] Poundal-force feet",            0.042140110093804806);      //   1 [pdl.ft] = 0.042140110093805 [Nm]
   enlist("[BTU] British thermal unit",             1055.05585262);             //   1 [BTU]    = 1055.05585262     [Nm]
   enlist("[th] Therm = 100000BTU",                 105505585.262);             //   1 [th]     = 105505585.262     [Nm]
   enlist("[qd] Quad = BTU * 1e15",                 1055.05585262e15);          //   1 [qd]     = 1055.05585262e15  [Nm]
   enlist("[eV] Electronvolt",                      1.602176e-19); }            //   1 [eV]     = 1.602176e-19      [Nm]
 else if (typeID=="massFlux") {                                                 // Mass flux:
   enlist("[kg/s] Kilogram per second",             1.0);                       //   1 [kg/s] is base
   enlist("[kg/m] Kilogram per minute",             1.0/60.0);                  //   1 [kg/m]   = 1/60            [kg/s]
   enlist("[kg/h] Kilogram per hour",               1.0/3600.0);                //   1 [kg/h]   = 1/3600          [kg/s]
   enlist("[kg/h] Kilogram per day",                1.0/86400.0);               //   1 [kg/h]   = 1/86400         [kg/s]
   enlist("[g/s] Gram per second",                  0.001);                     //   1 [g/s]    = 0.001           [kg/s]
   enlist("[g/m] Gram per minute",                  0.001/60.0);                //   1 [g/m]    = 0.001/60        [kg/s]
   enlist("[g/h] Gram per hour",                    0.001/3600.0);              //   1 [g/h]    = 0.001/3600      [kg/s]
   enlist("[g/d] Gram per day",                     0.001/86400.0);             //   1 [g/d]    = 0.001/86400     [kg/s]
   enlist("[lb/s] Pound per second",                0.45359237);                //   1 [lb/s]   = 0.45359237      [kg/s]
   enlist("[lb/m] Pound per minute",                0.45359237/60.0);           //   1 [lb/m]   = 0.45359237/60   [kg/s]
   enlist("[lb/h] Pound per hour",                  0.45359237/3600.0);         //   1 [lb/h]   = 0.45359237/3600 [kg/s]
   enlist("[lb/d] Pound per day",                   0.45359237/86400.0);        //   1 [lb/d]   = 0.45359237/86400[kg/s]
   enlist("[t/s] Ton per second",                   1000.0);                    //   1 [t/s]    = 1000            [kg/s]
   enlist("[t/m] Ton per minute",                   1000.0/60.0);               //   1 [t/m]    = 1000/60         [kg/s]
   enlist("[t/h] Ton per hour",                     1000.0/3600.0);             //   1 [t/h]    = 1000/3600       [kg/s]
   enlist("[t/d] Ton per day",                      1000.0/86400.0);            //   1 [t/d]    = 1000/86400      [kg/s]
   enlist("[tn/s] Long ton (Br.) per second",       1016.0469088);              //   1 [tn/s]   = 1016.0469088    [kg/s]
   enlist("[tn/m] Long ton (Br.) per minute",       1016.0469088/60.0);         //   1 [tn/m]   = 1016.0469088/60 [kg/s]
   enlist("[tn/h] Long ton (Br.) per hour",         1016.0469088/3600.0);       //   1 [tn/h]   = 1016.046909/3600[kg/s]
   enlist("[tn/d] Long ton (Br.) per day",          1016.0469088/86400.0);      //   1 [tn/d]   = 1016.04691/86400[kg/s]
   enlist("[sh tn/s] Short ton (Am.) per second",   907.18474);                 //   1 [sh tn/s]= 907.18474       [kg/s]
   enlist("[sh tn/m] Short ton (Am.) per minute",   907.18474/60.0);            //   1 [sh tn/m]= 907.18474/60    [kg/s]
   enlist("[sh tn/h] Short ton (Am.) per hour",     907.18474/3600.0);          //   1 [sh tn/h]= 907.18474/3600  [kg/s]
   enlist("[sh tn/d] Short ton (Am.) per day",      907.18474/86400.0); }       //   1 [sh tn/d]= 907.18474/86400 [kg/s]
 else if (typeID=="volumeFlux") {                                               // Volume flux:
   enlist("[m^3/s] Cubic meter per second",         1.0);                       //   1 [m^3/s] is base           [m^3/s]
   enlist("[m^3/m] Cubic meter per minute",         1.0/60.0);                  //   1 [m^3/m]  = 1/60           [m^3/s]
   enlist("[m^3/h] Cubic meter per hour",           1.0/3600.0);                //   1 [m^3/h]  = 1/3600         [m^3/s]
   enlist("[m^3/d] Cubic meter per day",            1.0/86400.0);               //   1 [m^3/d]  = 1/86400        [m^3/s]
   enlist("[gal/s] US gallons per second",0.0037850113550340651021953065859198);
   enlist("[gal/m] US gallons per minute",6.3091482649842271293375394321767e-5);
   enlist("[gal/h] US gallons per hour",1.051503702870289657725029678692e-6);
   enlist("[gal/d] US gallons per day",             4.381e-08);
   enlist("[dm^3/s] Liter per second",              0.001);                     //   1 [dm^3/s] = 0.001          [m^3/s]
   enlist("[dm^3/m] Liter per minute",              0.001/60.0);                //   1 [dm^3/m] = 0.001/60       [m^3/s]
   enlist("[dm^3/h] Liter per hour",                0.001/3600.0);              //   1 [dm^3/h] = 0.001/3600     [m^3/s]
   enlist("[dm^3/d] Liter per day",                 0.001/86400.0);             //   1 [dm^3/d] = 0.001/86400    [m^3/s]
   enlist("[cm^3/s] Milliliter per second",         0.000001);                  //   1 [cm^3/s] = 0.000001);     [m^3/s]
   enlist("[cm^3/m] Milliliter per minute",         0.000001/60.0);             //   1 [cm^3/m] = 0.000001/60    [m^3/s]
   enlist("[cm^3/h] Milliliter per hour",           0.000001/3600.0);           //   1 [cm^3/h] = 0.000001/3600  [m^3/s]
   enlist("[cm^3/d] Milliliter per day",            0.000001/86400.0);          //   1 [cm^3/d] = 0.000001/86400 [m^3/s]
   enlist("[mi^3/s] Cubic mile per second",         4168181825.44058);          //   1 [mi^3/s] = 4168181825.4405[m^3/s]
   enlist("[mi^3/m] Cubic mile per minute",         4168181825.44058/60.0);     //   1 [mi^3/m] = 4168181825.4/60[m^3/s]
   enlist("[mi^3/h] Cubic mile per hour",           4168181825.44058/3600.0);   //   1 [mi^3/h] = 4168181825/3600[m^3/s]
   enlist("[mi^3/d] Cubic mile per day",            4168181825.44058/86400.0);  //   1 [mi^3/d] = 4168181825/86400[....]
   enlist("[ft^3/s] Cubic feet per second",         0.028316846592);            //   1 [ft^3/s] = 0.028316846592 [m^3/s]
   enlist("[ft^3/m] Cubic feet per minute",         0.028316846592/60.0);       //   1 [ft^3/m] = 0.0283168466/60[m^3/s]
   enlist("[ft^3/h] Cubic feet per hour",           0.028316846592/3600.0);     //   1 [ft^3/h] = 0.02831685/3600[m^3/s]
   enlist("[ft^3/d] Cubic feet per day",            0.028316846592/86400.0);    //   1 [ft^3/d] = 0.0283168/86400[m^3/s]
   enlist("[in^3/s] Cubic inch per second",         0.000016387064);            //   1 [in^3/s] = 0.000016387064 [m^3/s]
   enlist("[in^3/m] Cubic inch per minute",         0.000016387064/60.0);       //   1 [in^3/m] = 0.0000163871/60[m^3/s]
   enlist("[in^3/h] Cubic inch per hour",           0.000016387064/3600.0);     //   1 [in^3/h] = 0.00001639/3600[m^3/s]
   enlist("[in^3/d] Cubic inch per day",            0.000016387064/86400.0);    //   1 [in^3/d] = 0.0000164/86400[m^3/s]
   enlist("[yd^3/s] Cubic yard per second",         0.764554857984);            //   1 [yd^3/s] = 0.764554857984 [m^3/s]
   enlist("[yd^3/m] Cubic yard per minute",         0.764554857984/60.0);       //   1 [yd^3/m] = 0.7645548579/60[m^3/s]
   enlist("[yd^3/h] Cubic yard per hour",           0.764554857984/3600.0);     //   1 [yd^3/h] = 0.76455486/3600[m^3/s]
   enlist("[yd^3/d] Cubic yard per day",            0.764554857984/86400.0);} } //   1 [yd^3/d] = 0.7645549/86400[m^3/s]
//-->
</script> 
<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center" class="contentpane">
<tr>
<td>
<form name="converter" summary="converter" onsubmit="enter(); return false;"> 
  <table align="left"> 
    <tr><td style="text-align:right">Convert</td> 
        <td><select id="type" class="inputbox" onchange="newType()"> 
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
        <td><input  type="number" id="value"  class="inputbox" onkeyup="newValue()" /></td></tr> 
    <tr><td style="text-align:right">From Unit</td> 
        <td><select id="base" class="inputbox" onchange="newBase()"></select></td></tr> 
    <tr><td></td><td style="text-align:center">=</td></tr> 
    <tr><td style="text-align:right">To</td> 
        <td><input  id="result" class="inputbox" readonly="readonly" /></td></tr> 
    <tr><td style="text-align:right">To Unit</td> 
        <td><select id="target" class="inputbox" onchange="newTarget()"></select></td></tr> 
  </table> 
 <!-- Undisplayed image needed to catch enter key -> Onsubmit form with the routine 'enter()', see above --> 
 <input type="image" src=""
        style="display:hidden; border-width:0; border-style:none; margin:0; padding:0; width=0; height:0;"> 
</form> 
</td>
</tr>
</table>
<script type="text/javascript"> 
<!--
  initialize();
//-->
</script> 
