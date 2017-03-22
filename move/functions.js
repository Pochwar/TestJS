var walls = getStorage("walls");
var elements = getStorage("elements");

////UTILITIES

//Fonction pour recupèrer les murs depuis le localStorage
function getStorage(item) {
    var itemToGet = [];
    var itemStorage = localStorage.getItem(item);
    if (itemStorage !== null) {
        itemToGet = JSON.parse(itemStorage);
    }
    return itemToGet;
}

//création d'élements (player, walls, dumbBot, target)
function createElement(type, id, top, left){
    var elements = document.querySelector(".area").innerHTML;
    elements += "<div class=\"" + type + "\" id=\"" + id + "\" style=\"top:" + top + "px; left:" + left + "px\"></div>";
    document.querySelector(".area").innerHTML = elements;
    elementSize(id)
}

//supprimer elements player, target et bot
function clearElements() {
    localStorage.removeItem('elements');
}

//application de la taille des elements
function elementSize(id){
    var item = document.getElementById(id)
    item.style.width = elementsSize + "px";
    item.style.height = elementsSize + "px";
}

//Mode EDIT + PLAY
var edit = true;
var interval = false
document.querySelector('.buttons .options').style.visibility = "visible";
function toggleEdit(){
    if (!edit){
        edit = true;
        clearInterval(interval);
        document.querySelector('#edit').innerText = "PLAY";
        document.querySelector('.buttons .options').style.visibility = "visible";
    } else {
        document.querySelector('#edit').innerText = "PAUSE";
        document.querySelector('.buttons .options').style.visibility = "hidden";
        edit = false;
        interval = setInterval(moveBot,100);
    }

}

//Récupérer l'id ou la propriété d'un wall
function wallObjectByTopLeft(top, left, property) {
    for(var i = 0, len = walls.length; i < len; i++) {
        if (walls[i]["top"] === top && walls[i]["left"] === left){
            if(typeof(property) === 'undefined'){
                return i;
            } else {
                return walls[i][property];
            }
        }
    }
    return -1;
}

//Récupérer les coordonnées de la souris
function getMouseCoord(event){
    var parentX = document.querySelector(".content").offsetLeft;
    var parentY = document.querySelector(".content").offsetTop;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var x = mouseX - parentX;
    var y = mouseY - parentY;
    x = (Math.floor(x/elementsSize))*elementsSize;
    y = (Math.floor(y/elementsSize))*elementsSize;
    var mouse = [x,y];
    return mouse;
}

//détermine l'action du click en fonction des touches ctrl et alt
function getAction(event){
    if (!event.altKey && !event.ctrlKey){
        createWall(event);
    } else {
        if (event.ctrlKey && !event.altKey){
            setPosition(event, "player");
        }
        if (event.altKey && !event.ctrlKey){
            setPosition(event, "dumbbot");
        }
        if (event.altKey && event.ctrlKey){
            setPosition(event, "target");
        }
    }
}

//stockage d'infos dans le localStorage
function saveToStorage(sourceArray, targetArray, name){
    for(var i = 0; i < sourceArray.length; i++){
        var item = {type : sourceArray[i]["type"], id : sourceArray[i]["id"], top : sourceArray[i]["top"], left : sourceArray[i]["left"]};
        targetArray.push(item);
        localStorage.setItem(name, JSON.stringify(targetArray));
    }
}

//Créer les murs et les elements depuis le localStorage
function buildFromStorage(array){
    if (array.length > 0){
        for(var i = 0; i < array.length; i++){
            createElement (array[i]["type"], array[i]["id"], array[i]["top"], array[i]["left"]);
        }

    }
}

//Récupérer l'id d'un element
function elementObjectIndexByType(type) {
    for(var i = 0, len = elements.length; i < len; i++) {
        if (elements[i]["type"] === type){
                return i;
        }
    }
    return -1;
}

//Positionnement du player, bot et target
function setPosition(event, element){
    var mouse = getMouseCoord(event);
    var x = mouse[0];
    var y = mouse[1];
    if(edit){
        document.querySelector("#" + element).style.left = x + "px";
        document.querySelector("#" + element).style.top = y + "px";

        //suppression dans le local Storage
        var index = elementObjectIndexByType(element);
        console.log(index);
        elements.splice(index,1);

        //ajout dans le local storage
        var item = {type : element, id : element, top : y, left : x};
        elements.push(item);
        localStorage.setItem("elements", JSON.stringify(elements));
    }
}

//Sauvegarder le niveau
function saveLevel(){
    elements = getStorage("elements");
    var textElements = '[';
    for(var i = 0; i < elements.length; i++){
        textElements += '{type:"'+elements[i]["type"]+'",id:"'+elements[i]["id"]+'",top:'+elements[i]["top"]+',left:'+elements[i]["left"]+'}';
    }
    textElements += ']';
    walls = getStorage("walls");
    var textWalls = '[';
    for(var i = 0; i < walls.length; i++){
        textWalls += '{type:"'+walls[i]["type"]+'",id:'+walls[i]["id"]+',top:'+walls[i]["top"]+', left:'+walls[i]["left"]+'}';
    }
    textWalls += ']';
    alert("var elements = \n" + textElements + "\nvar walls = \n" + textWalls);
}



////MURS

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

//création des murs #1 click par click
function createWall(event){
    if(edit){
        var mouse = getMouseCoord(event);
        var x = mouse[0];
        var y = mouse[1];
        if (!event.shiftKey) {
            var i = walls.length;
            if(!checkWall4Construct(y, x)){
                var wallItem = {type : "wall", id : i, top : y, left : x};
                //Enregistrement dans le localStorage
                walls.push(wallItem);
                localStorage.setItem('walls', JSON.stringify(walls));
                //Création dans l'area
                createElement ("wall", i, y, x);
            }
        } else {//delete walls !
            var parent = document.querySelector('.area');
            var id = wallObjectByTopLeft(y, x, "id");
            var wallToDelete = document.getElementById(id);
            parent.removeChild(wallToDelete);
            walls.splice(wallObjectByTopLeft(y, x),1);
            localStorage.setItem('walls', JSON.stringify(walls));

        }
    }
}

//création des murs #2 en dessinant avec la souris
var mouseIsDown = false;
function drawWalls(event){
    if (mouseIsDown){
        getAction(event);
    }
}

//supprimer les murs
function clearWalls() {
    localStorage.removeItem('walls');
}


////DEPLACEMENT

//déplacement du player
function movePlayer(e) {
    //top
    if (e.keyCode == 38 && !e.shiftKey) {move("player", "top", elementsSize);}
    //bottom
    if (e.keyCode == 40 && !e.shiftKey) {move("player", "bottom", elementsSize);}
    //left
    if (e.keyCode == 37 && !e.shiftKey) {move("player", "left", elementsSize);}
    //right
    if (e.keyCode == 39 && !e.shiftKey) {move("player", "right", elementsSize);}
}

//déplacement du bot
var goTop = true;
var goBottom = true;
var goLeft = true;
var goRight = true;
function moveBot(){
    //go Right !
    if(goRight){
        if(!move("dumbbot", "right", elementsSize)){
            goRight = false;
        }
    } else {
        if(goBottom){
            if(!move("dumbbot", "bottom", elementsSize)){
                goBottom = false;
            }
        } else {
            if(goLeft){
                if(!move("dumbbot", "left", elementsSize)){
                    goLeft = false;
                }
            } else {
                if(goTop){
                    if(!move("dumbbot", "top", elementsSize)){
                        goRight = true;
                        goBottom = true;
                        goLeft = true;
                    }
                }
            }
        }
    }
}

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
    var selfX1 = document.querySelector(".player").offsetTop;
    var selfX2 = selfX1 + elementsSize;
    var selfY1 = document.querySelector(".player").offsetLeft;
    var selfY2 = selfY1 + elementsSize;

    //tableau d'enregistrement de collisions
    var wallCollision = [];
    for (var i = 0; i < forbiddenCoords.length; i++){
        //forbiddenCoords
        if ((playerX1 === forbiddenCoords[i]["coordX1"]) && (playerX2 === forbiddenCoords[i]["coordX2"]) && (playerY1 === forbiddenCoords[i]["coordY1"]) && (playerY2 === forbiddenCoords[i]["coordY2"])) {
            wallCollision.push("mur!");
        }
    }

    //self
    if(id !== "player"){
        if((playerX1 === selfX1) && (playerX2 === selfX2) && (playerY1 === selfY1) && (playerY2 === selfY2)) {
            wallCollision.push("self");
        }
    }

    if (wallCollision.length > 0){return true;}

    //TARGET
    var targetX1 = document.querySelector(".target").offsetTop;
    var targetX2 = targetX1 + elementsSize;
    var targetY1 = document.querySelector(".target").offsetLeft;
    var targetY2 = targetY1 + elementsSize;
    if(id !== "player"){
        if((playerX1 === targetX1) && (playerX2 === targetX2) && (playerY1 === targetY1) && (playerY2 === targetY2)) {
            toggleEdit();
            alert("Well done !\n Try next level !");
        }
    }
};

//function de déplacement
function move(id, direction, distance){
    if(!edit){
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
}
