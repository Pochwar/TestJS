var mouseIsDown = false;

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
    if (!checkWall(verifTop, verifLeft)){
        coordToApply = coordToApply + "px";
        document.querySelector('#' + id).style[property] = coordToApply;
    }
}

function checkWall(top, left){
    var wallExist = [];
    for(var i = 0; i < walls.length; i++){
        if ((top == walls[i]["top"]) && (left == walls[i]["left"])){
            wallExist.push("mur!");
        }
    }
    if (wallExist.length > 0){return true;}
};
//Creation du player
createElement("player", "perso1", 150, 150);

//définition des murs
var walls = [];

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


function createWall(event){
    var parentX = document.querySelector(".content").offsetLeft;
    var parentY = document.querySelector(".content").offsetTop;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var x = mouseX - parentX;
    var y = mouseY - parentY;
    x = (Math.floor(x/10))*10;
    y = (Math.floor(y/10))*10;
    var i = walls.length;
    if(!checkWall(y, x)){
        walls.push({type : "wall", num : i, top : y, left : x});
    }
    createElement("wall", i, y, x);
    console.log(walls.length);
}

function drawWalls(event){
    if (mouseIsDown){
        createWall(event);
    }
}


document.querySelector('.area').addEventListener("mousedown", function(e){
    mouseIsDown = true;
});
document.querySelector('.area').addEventListener("mouseup", function(e){
    mouseIsDown = false;
});

document.querySelector('.area').addEventListener("mousemove", drawWalls);
document.querySelector('.area').addEventListener("click", createWall);
