//création d'élements (perso, walls, enemis...)
function createElement(type, id, top, left){
    var elements = document.querySelector(".area").innerHTML;
    elements += "<div class=\"" + type + "\" id=\"" + id + "\" style=\"top:" + top + "px; left:" + left + "px\"></div>";
    document.querySelector(".area").innerHTML = elements;
}

//déplacement
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
        if ((property === "top" && coordToChange+elementsSize < areaHeight) || (property === "left" && coordToChange+elementsSize < areaWidth)){
            coordToApply = coordToChange+distance;
        }
    }
    //verification de présence de mur pour empecher le déplacement
    if (property === "top"){var verifTop = coordToApply; var verifLeft = parseInt(left.replace("px", ""));}
    if (property === "left"){var verifTop = parseInt(top.replace("px", "")); var verifLeft = coordToApply;}
    if (!checkWall4Move(verifTop, verifLeft)){
        coordToApply = coordToApply + "px";
        document.querySelector('#' + id).style[property] = coordToApply;
    }
}

//vérification de l'existence d'un mur avant construction
function checkWall4Construct(top, left){
    var wallExist = [];
    for(var i = 0; i < walls.length; i++){
        if ((top == walls[i]["top"]) && (left == walls[i]["left"])){
            wallExist.push("mur!");
        }
    }
    if (wallExist.length > 0){return true;}
};

//vérification de l'existence d'un mur avant déplacement
function checkWall4Move(top, left){
    //recupération des coordonnées du joueur
    var playerTop = top;
    var playerBottom = top + elementsSize;
    var playerLeft = left;
    var playerRight = left + elementsSize;
    //tableau d'enregistremetn des coordonnées interdites
    var forbiddenCoords = [];
    for(var i = 0; i < walls.length; i++){
        //récupération des coordonnées des murs
        var wallTop = walls[i]["top"];
        var wallBottom = wallTop + elementsSize;
        var wallLeft = walls[i]["left"];
        var wallRight = wallLeft + elementsSize;
        for (var y = wallTop; y < wallBottom; y+=elementsSize) {
            for (var x = wallLeft; x < wallRight; x+=elementsSize) {
                forbiddenCoords.push({coordX : x, coordY : y})
            }
        }
    }
    //tableau d'enregistrement de collisions
    var wallCollision = [];
    for (var i = 0; i < forbiddenCoords.length; i++){

        if (
            (playerTop === forbiddenCoords[i]["coordY"]) && (playerLeft === forbiddenCoords[i]["coordX"])
            ||
            (playerTop === forbiddenCoords[i]["coordY"]) && (playerRight-elementsSize === forbiddenCoords[i]["coordX"])
            ||
            (playerBottom-elementsSize === forbiddenCoords[i]["coordY"]) && (playerLeft === forbiddenCoords[i]["coordX"])
            ||
            (playerBottom-elementsSize === forbiddenCoords[i]["coordY"]) && (playerRight-elementsSize === forbiddenCoords[i]["coordX"])
        ) {
            wallCollision.push("mur!");
        }
    }
    if (wallCollision.length > 0){return true;}
};

//déplacement du personnage
function movePlayer(e) {
    //top
    if (e.keyCode == 38 && !e.shiftKey) {move("perso1", "top", elementsSize);}
    //bottom
    if (e.keyCode == 40 && !e.shiftKey) {move("perso1", "bottom", elementsSize);}
    //left
    if (e.keyCode == 37 && !e.shiftKey) {move("perso1", "left", elementsSize);}
    //right
    if (e.keyCode == 39 && !e.shiftKey) {move("perso1", "right", elementsSize);}
}

//application de la taille des murs
function wallSize(){
    var allWalls = document.querySelectorAll(".wall")
    for(var i=0; i<allWalls.length; i++){
        allWalls[i].style.width = elementsSize + "px";
        allWalls[i].style.height = elementsSize + "px";
    }
}

//création des murs #1 click par click
function createWall(event){
    var parentX = document.querySelector(".content").offsetLeft;
    var parentY = document.querySelector(".content").offsetTop;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var x = mouseX - parentX;
    var y = mouseY - parentY;
    x = (Math.floor(x/elementsSize))*elementsSize;
    y = (Math.floor(y/elementsSize))*elementsSize;
    var i = walls.length;
    if(!checkWall4Construct(y, x)){
        walls.push({type : "wall", num : i, top : y, left : x});
    }
    createElement("wall", i, y, x);
    wallSize();
}

//création des murs # en dessinant avec la souris
var mouseIsDown = false;
function drawWalls(event){
    if (mouseIsDown){
        createWall(event);
    }
}
