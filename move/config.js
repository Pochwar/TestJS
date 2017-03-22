//size of elements (minimum : 10)
var elementsSize = 15;

//creation de la zone
var cols = 50;
var rows = 30;
var areaWidth = cols*elementsSize;
var areaHeight = rows*elementsSize;
document.querySelector(".area").style.width = areaWidth + "px";
document.querySelector(".area").style.height = areaHeight + "px";

//Positions de base des éléments
var baseElements = [
    {"type":"player","id":"player","top":105,"left":375},
    {"type":"dumbbot","id":"dumbbot","top":105,"left":180},
    {"type":"target","id":"target","top":240,"left":360}
]
