var walls = getWalls();

//création d'élements (perso, walls, enemis...)
function createElement(type, id, top, left){
    var elements = document.querySelector(".area").innerHTML;
    elements += "<div class=\"" + type + "\" id=\"" + id + "\" style=\"top:" + top + "px; left:" + left + "px\"></div>";
    document.querySelector(".area").innerHTML = elements;
}

//déplacement
function move(id, direction, distance){
    var moveOk = true;
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
        } else {
            moveOk = false;
        }
    }
    //bottom & right
    if(!negative){
        if ((property === "top" && coordToChange+elementsSize < areaHeight) || (property === "left" && coordToChange+elementsSize < areaWidth)){
            coordToApply = coordToChange+distance;
        } else {
            moveOk = false;
        }
    }
    //verification de présence de mur pour empecher le déplacement
    if (property === "top"){var verifTop = coordToApply; var verifLeft = parseInt(left.replace("px", ""));}
    if (property === "left"){var verifTop = parseInt(top.replace("px", "")); var verifLeft = coordToApply;}
    if (!checkWall4Move(id, verifTop, verifLeft)){
        coordToApply = coordToApply + "px";
        document.querySelector('#' + id).style[property] = coordToApply;
    } else {
        moveOk = false;
    }
    return moveOk;
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
function checkWall4Move(id, top, left){
    //recupération des coordonnées du joueur
    var playerX1 = top;
    var playerX2 = top + elementsSize;
    var playerY1= left;
    var playerY2 = left + elementsSize;
    //tableau d'enregistremetn des coordonnées interdites
    var forbiddenCoords = [];
    for(var i = 0; i < walls.length; i++){
        //récupération des coordonnées des murs
        var wallX1 = walls[i]["top"];
        var wallX2 = wallX1 + elementsSize;
        var wallY1 = walls[i]["left"];
        var wallY2 = wallY1 + elementsSize;

        forbiddenCoords.push({coordX1 : wallX1, coordY1 : wallY1, coordX2 : wallX2, coordY2 : wallY2})

    }
    //coordonnées du player
    var selfX1 = document.querySelector("#perso1").offsetTop;
    var selfX2 = selfX1 + elementsSize;
    var selfY1 = document.querySelector("#perso1").offsetLeft;
    var selfY2 = selfY1 + elementsSize;

    //tableau d'enregistrement de collisions
    var wallCollision = [];
    for (var i = 0; i < forbiddenCoords.length; i++){
        //forbiddenCoords
        if ((playerX1 === forbiddenCoords[i]["coordX1"]) && (playerX2 === forbiddenCoords[i]["coordX2"]) && (playerY1 === forbiddenCoords[i]["coordY1"]) && (playerY2 === forbiddenCoords[i]["coordY2"])) {
            wallCollision.push("mur!");
        }
        //self
        if(id !== "perso1"){
            if((playerX1 === selfX1) && (playerX2 === selfX2) && (playerY1 === selfY1) && (playerY2 === selfY2)) {
                wallCollision.push("self");
            }
        }
    }
    if (wallCollision.length > 0){return true;}

    //TARGET
    var targetX1 = document.querySelector(".target").offsetTop;
    var targetX2 = targetX1 + elementsSize;
    var targetY1 = document.querySelector(".target").offsetLeft;
    var targetY2 = targetY1 + elementsSize;
    console.log("###");
    console.log(targetX1);
    console.log(targetX2);
    console.log(targetY1);
    console.log(targetY2);
    console.log(playerX1);
    console.log(playerX2);
    console.log(playerY1);
    console.log(playerY2);
    if(id !== "perso1"){
        if((playerX1 === targetX1) && (playerX2 === targetX2) && (playerY1 === targetY1) && (playerY2 === targetY2)) {
            alert("win !!");
        }
    }
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

//fonction pour entrer dans le mode édition
var edit = true;
var interval = false
document.querySelector('.buttons span').style.visibility = "visible";
function toggleEdit(){
    if (!edit){
        edit = true;
        clearInterval(interval);
        document.querySelector('#edit').innerText = "PLAY";
        document.querySelector('.buttons span').style.visibility = "visible";
    } else {
        document.querySelector('#edit').innerText = "PAUSE";
        document.querySelector('.buttons span').style.visibility = "hidden";
        edit = false;
        interval = setInterval(moveEnemies,100);
    }

}

//Fonction pour recupèrer les murs depuis le localStorage
function getWalls() {
    var walls = [];
    var wallsStorage = localStorage.getItem('walls');
    if (wallsStorage !== null) {
        walls = JSON.parse(wallsStorage);
    }
    return walls;
}

//création des murs #1 click par click
function createWall(event){
    if(edit){
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
            var wallItem = {type : "wall", num : i, top : y, left : x};
            walls.push(wallItem);
            localStorage.setItem('walls', JSON.stringify(walls));
            createElement ("wall", i, y, x);
            wallSize();
        }
    }
}

//création des murs # en dessinant avec la souris
var mouseIsDown = false;
function drawWalls(event){
    if (mouseIsDown){
        createWall(event);
    }
}

//fonction pour générer des murs depuis un tableau d'objets mur
function generateWalls(array){
    localStorage.removeItem('walls');
    walls = getWalls();
    for(var i = 0; i < array.length; i++){
        var wallItem = {type : array[i]["type"], num : array[i]["num"], top : array[i]["top"], left : array[i]["left"]};
        walls.push(wallItem);
        localStorage.setItem('walls', JSON.stringify(walls));
    }
    buildWalls();
    location.reload();
}

//fonction pour créer les murs depuis les infos du localStorage
function buildWalls(){
    if (walls.length > 0){
        for(var i = 0; i < walls.length; i++){
            createElement ("wall", walls[i]["num"], walls[i]["top"], walls[i]["left"]);
        }
        wallSize();
    }
}

//Fonction pour supprimer les murs
function clearWalls() {
    localStorage.removeItem('walls');
    location.reload();
}

//fonction pour faire se déplacer les enemis
var goTop = true;
var goBottom = true;
var goLeft = true;
var goRight = true;
function moveEnemies(){
    //go Right !
    if(goRight){
        if(!move("enemy1", "right", elementsSize)){
            goRight = false;
        }
    } else {
        if(goBottom){
            if(!move("enemy1", "bottom", elementsSize)){
                goBottom = false;
            }
        } else {
            if(goLeft){
                if(!move("enemy1", "left", elementsSize)){
                    goLeft = false;
                }
            } else {
                if(goTop){
                    if(!move("enemy1", "top", elementsSize)){
                        goRight = true;
                        goBottom = true;
                        goLeft = true;
                    }
                }
            }
        }
    }
}
