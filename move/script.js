function createElement(type, id, top, left){
    var elements = document.querySelector(".area").innerHTML;
    elements += "<div class=\"" + type + "\" id=\"" + id + "\" style=\"top:" + top + "px; left:" + left + "px\"></div>";
    document.querySelector(".area").innerHTML = elements;
}

function move(id, direction, distance){
    switch (direction){
        case "top" :
        var property = "top"
        var negative = true
        break;

        case "bottom" :
        var property = "top"
        var negative = false
        break;

        case "left" :
        var property = "left"
        var negative = true
        break;

        case "right" :
        var property = "left"
        var negative = false
        break;
    }
    var top = document.querySelector('#' + id).style.top;
    var left = document.querySelector('#' + id).style.left;
    if (property === "top"){var coordToChange = top;}
    if (property === "left"){var coordToChange = left;}
    coordToChange = coordToChange.replace("px", "");
    coordToChange = parseInt(coordToChange);

    //top & left
    if (negative){
        if (coordToChange > 0){
            coordToApply = coordToChange-distance;
        }
    }
    //bottom & right
    if(!negative){
        if (coordToChange < 300){
            coordToApply = coordToChange+distance;
        }
    }
    //verification de présence de mur pour empecher le déplacement
    if (property === "top"){var verifTop = coordToApply; var verifLeft = parseInt(left.replace("px", ""));}
    if (property === "left"){var verifTop = parseInt(top.replace("px", "")); var verifLeft = coordToApply;}
    if (!detectWall(verifTop, verifLeft)){
        coordToApply = coordToApply + "px";
        document.querySelector('#' + id).style[property] = coordToApply;
    }
}

function detectWall(top, left){
    for(var i = 0; i < walls.length; i++){
        if ((top == walls[i]["top"]) && (left == walls[i]["left"])){
            return true;
        }
    }
};
//Creation du player
createElement("player", "perso1", 150, 150);

//définition des murs
var walls = [
    {type : "wall", num : "0", top : 30, left : 0},
    {type : "wall", num : "1", top : 0, left : 0},
    {type : "wall", num : "2", top : 0, left : 10},
    {type : "wall", num : "3", top : 150, left : 120},
    {type : "wall", num : "4", top : 70, left : 30},
    {type : "wall", num : "5", top : 80, left : 120}
];
//creation des murs
for(var i = 0; i < walls.length; i++){
    createElement (walls[i]["type"], walls[i]["num"], walls[i]["top"], walls[i]["left"]);
}


function movePlayer(e) {
    //top
    if (e.keyCode == 38 && !e.shiftKey) {move("perso1", "top", 10);}
    if (e.keyCode == 38 && e.shiftKey) {move("perso1", "top", 20);}
    //bottom
    if (e.keyCode == 40 && !e.shiftKey) {move("perso1", "bottom", 10);}
    if (e.keyCode == 40 && e.shiftKey) {move("perso1", "bottom", 20);}
    //left
    if (e.keyCode == 37 && !e.shiftKey) {move("perso1", "left", 10);}
    if (e.keyCode == 37 && e.shiftKey) {move("perso1", "left", 20);}
    //right
    if (e.keyCode == 39 && !e.shiftKey) {move("perso1", "right", 10);}
    if (e.keyCode == 39 && e.shiftKey) {move("perso1", "right", 20);}
}
