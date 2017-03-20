//Creation du player
createElement("player", "perso1", persoY, persoX);
document.querySelector("#perso1").style.width = elementsSize + "px";
document.querySelector("#perso1").style.height = elementsSize + "px";

//Creations des enemis
createElement("enemy", "enemy1", 90, 30);
document.querySelector(".enemy").style.width = elementsSize + "px";
document.querySelector(".enemy").style.height = elementsSize + "px";

//détecte si la souris clique ou pas
document.querySelector('.area').addEventListener("mousedown", function(e){
    mouseIsDown = true;
});
document.querySelector('.area').addEventListener("mouseup", function(e){
    mouseIsDown = false;
});

//passe en mode édition
document.querySelector('#edit').addEventListener("click", toggleEdit);

//efface tous les murs
document.querySelector('#clear').addEventListener("click", clearWalls);

//chargement du template
document.querySelector('#load').addEventListener("click", function () {generateWalls(template);});

//initie les fonctions de création de murs
document.querySelector('.area').addEventListener("mousemove", drawWalls);
document.querySelector('.area').addEventListener("click", createWall);

//initie la fonction de déplacement du joueur
document.querySelector('body').addEventListener("keydown", movePlayer);

buildWalls();
moveEnemies();
