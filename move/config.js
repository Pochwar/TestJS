//size of elements (minimum : 10)
var elementsSize = 15;

//creation de la zone
var cols = 50;
var rows = 30;
var areaWidth = cols*elementsSize;
var areaHeight = rows*elementsSize;
document.querySelector(".area").style.width = areaWidth + "px";
document.querySelector(".area").style.height = areaHeight + "px";

//position du personnage
var persoCol = 25;
var persoRow = 15;
var persoX = persoCol*elementsSize;
var persoY = persoRow*elementsSize;
