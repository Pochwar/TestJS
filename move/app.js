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
document.querySelector('#clear').addEventListener("click", function () {clearWalls();location.reload();});

//efface tous les murs
document.querySelector('#save').addEventListener("click", saveLevel);

//chargement du level 0
document.querySelector('#load0').addEventListener("click", function () {
    // console.log(elements);
    clearElements();
    elements = getStorage("elements");
    clearWalls();
    walls = getStorage("walls");
    saveToStorage(baseElements, elements, "elements");
    location.reload();
});

//chargement du level 1
document.querySelector('#load1').addEventListener("click", function () {
    // console.log(elements);
    clearElements();
    elements = getStorage("elements");
    clearWalls();
    walls = getStorage("walls");
    saveToStorage(lvlOneWalls, walls, "walls");
    saveToStorage(lvl1Elements, elements, "elements");
    location.reload();
});

//initie les fonctions de création de murs
document.querySelector('.area').addEventListener("mousemove", drawWalls);
document.querySelector('.area').addEventListener("click", getAction);

//initie la fonction de déplacement du joueur
document.querySelector('body').addEventListener("keydown", movePlayer);


//creation des éléments en position de base
if (elements.length === 0){
    saveToStorage(baseElements, elements, "elements");
    location.reload();
}

buildFromStorage(walls);
buildFromStorage(elements);
