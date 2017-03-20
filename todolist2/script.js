function addElement(){
    //récupération du texte à inserer
    var todo = document.querySelector('#addElement').value;
    //si tot n'est pas vide
    if(todo !== ""){
        //création d'un objet texte
        var textnode = document.createTextNode(todo);

        //création d'un nouvel element <p>
        var newP = document.createElement("P");

        //insertion de l'objet texte dans le <p>
        newP.appendChild(textnode);

        //creation de la checkbox "done"
        var checkDone = document.createElement("input");
        checkDone.type = 'checkbox';
        checkDone.className = 'done';
        checkDone.addEventListener('click', doneTask);
        newP.insertBefore(checkDone, textnode);

        //création et ajour du bouton de supression
        var buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "X";
        buttonDelete.className = "del";
        buttonDelete.addEventListener('click', removeTask);
        newP.appendChild(buttonDelete);

        //création et ajour du bouton montée
        var buttonUp = document.createElement("button");
        buttonUp.innerHTML = "UP";
        buttonUp.className = "up";
        buttonUp.addEventListener('click', upTask);
        newP.appendChild(buttonUp);

        //création et ajour du bouton montée
        var buttonDown = document.createElement("button");
        buttonDown.innerHTML = "Down";
        buttonDown.className = "down";
        buttonDown.addEventListener('click', downTask);
        newP.appendChild(buttonDown);

        //récupération de la liste
        var list = document.querySelector('#list');

        //ajout en début de liste
        //list.insertBefore(newP, list.childNodes[0]);
        //ajout en fin de liste
        list.appendChild(newP);
    }
    //
    document.querySelector('#addElement').value = "";
}

//validation de l'insertion avec touche "Enter"
function validForm(e) {
    if (e.keyCode == 13) {
        addElement();
        return false;
    } else {
        return true;
    }
}

//decendre une tache
function doneTask(e){
    var text = e.target.parentElement;
    var style = text.style.textDecoration;
    if (style === "line-through"){text.style.textDecoration = "none";}
    else {text.style.textDecoration = "line-through";}
}

//suppression d'une tache
function removeTask(e){
    e.target.parentElement.remove();
}

//remonter une tache
function upTask(e){
    var parent = e.target.parentElement.parentElement;
    var previous = e.target.parentElement.previousElementSibling;
    parent.insertBefore(e.target.parentElement, previous);
}

//decendre une tache
function downTask(e){
    var parent = e.target.parentElement.parentElement;
    var next = e.target.parentElement.nextElementSibling.nextElementSibling;
    parent.insertBefore(e.target.parentElement, next);
}

//trigger de la fonction addElement
document.querySelector('#valid').addEventListener('click', addElement);
