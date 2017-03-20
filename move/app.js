//Creation du player
createElement("player", "perso1", persoY, persoX);
document.querySelector("#perso1").style.width = elementsSize + "px";
document.querySelector("#perso1").style.height = elementsSize + "px";

//définition des murs
var walls = [];

//creation des murs, décommenter les lignes suivantes sur le tableau walls ci dessus est renseigné
// for(var i = 0; i < walls.length; i++){
//     createElement (walls[i]["type"], walls[i]["num"], walls[i]["top"], walls[i]["left"]);
// }

//détecte si la souris clique ou pas
document.querySelector('.area').addEventListener("mousedown", function(e){
    mouseIsDown = true;
});
document.querySelector('.area').addEventListener("mouseup", function(e){
    mouseIsDown = false;
});

//lance les fonctions de création de murs
document.querySelector('.area').addEventListener("mousemove", drawWalls);
document.querySelector('.area').addEventListener("click", createWall);


document.querySelector('body').addEventListener("keydown", movePlayer);
