function addElement(){
    //récupération du texte à inserer
    var todo = document.querySelector('#addElement').value;
    //si tot n'est pas vide
    if(todo !== ""){
        //création d'un objet texte
        var textnode = document.createTextNode(todo);

        //création d'un nouvel element <p>
        var newP = document.createElement("P");

        //creation du span contenant le texte et la checkbox
        var span1 = document.createElement("span");

        //creation de la checkbox "done"
        var checkDone = document.createElement("input");
        checkDone.type = 'checkbox';
        checkDone.className = 'done';
        checkDone.addEventListener('click', doneTask);
        span1.appendChild(checkDone);

        //insertion de l'objet texte dans le <p>
        span1.appendChild(textnode);

        //ajout du text et checkbox
        newP.appendChild(span1);

        //creation du span contenant les boutons
        var span2 = document.createElement("span");

        //création et ajour du bouton de supression
        var buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "X";
        buttonDelete.className = "del";
        buttonDelete.addEventListener('click', removeTask);
        span2.appendChild(buttonDelete);

        //création et ajour du bouton montée
        var buttonUp = document.createElement("button");
        buttonUp.innerHTML = "UP";
        buttonUp.className = "up";
        buttonUp.addEventListener('click', upTask);
        span2.appendChild(buttonUp);

        //création et ajour du bouton montée
        var buttonDown = document.createElement("button");
        buttonDown.innerHTML = "Down";
        buttonDown.className = "down";
        buttonDown.addEventListener('click', downTask);
        span2.appendChild(buttonDown);

        //ajout des boutons
        newP.appendChild(span2);

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

//valider une tache
function doneTask(){
    var text = this.parentElement;
    if (!this.checked){text.style.textDecoration = "none";}
    else {text.style.textDecoration = "line-through";}
}

//suppression d'une tache
function removeTask(){
    this.parentElement.parentElement.remove();
}

//remonter une tache
function upTask(){
    var parent = this.parentElement.parentElement.parentElement;
    var previous = this.parentElement.parentElement.previousElementSibling;
    if(previous !== null){
        parent.insertBefore(this.parentElement.parentElement, previous);
    }

}

//decendre une tache
function downTask(){
    var parent = this.parentElement.parentElement.parentElement;
    var next = this.parentElement.parentElement.nextElementSibling;
    if(next !== null){
        parent.insertBefore(next, this.parentElement.parentElement);
    }
}

//trigger de la fonction addElement
document.querySelector('#valid').addEventListener('click', addElement);
