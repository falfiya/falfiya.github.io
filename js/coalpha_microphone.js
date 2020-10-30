var verbal_shitposting = "v̸̳̻e͍̮͠r̷b̯͜ą̥̰l͕̫͎ ͚̜͝s̛͉̬h͔̪͍į̰ͅt͕̭̗po҉̯̲̫s̰tin̢g̢";
var coalpha_microphone = "coalpha microphone";

verbal_shitposting
   .split(/[a-z]| /g)
   .map((zalgoPrior, indx) => zalgoPrior + (coalpha_microphone[indx] || "")).join("")
