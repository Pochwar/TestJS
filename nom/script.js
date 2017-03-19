/**
 * Created by poch on 16/03/2017.
 */
//ancienne fonction par prompt

//nouvelle fonction par formulaire
function askName(){
    var name = document.querySelector('#name').value;
    var enam = alea(name,0).toLowerCase();
    enam = ucfirst(enam);
    enam = enam === '' ? 'Anonyme' : enam;
    document.querySelector('#msg').innerHTML = "Bienvenue <span>" + enam + "</span> !";
    document.querySelector('#name').value = "";
}

// affichage du nom en direct
// document.querySelector('#name').addEventListener('keyup', askName);

// affichage du nom apres click sur le button
document.querySelector('#askname').addEventListener('click', askName);


//function colorize
function colorize(color){
    switch(color){
        case 'red':
            var color1 = "#f00";
            var color2 = "#00FFF0";
            break;

        case 'green':
            var color1 = "#11FF00";
            var color2 = "#E000FF";
            break;

        case 'blue' :
            var color1 = "#007CFF";
            var color2 = "#FF8E00";
            break;

        default :
            var color1 = "black";
            var color2 = "black";
            break;
    }
    var i = randomize(0,5);
    if (i == 0){
        document.querySelector('#msg>span').style.color = color2;
    } else {
        document.querySelector('#msg>span').style.color = color1;
    }
    var j = randomize(0,5);
    var r = randomize(0,255);
    var g = randomize(0,255);
    var b = randomize(0,255);
    if (j == 0) {
        document.querySelector('body').style.backgroundColor = "rgb("+r+","+g+","+b+")";
    } else {
        document.querySelector('body').style.backgroundColor = "#fff";
    }

}

//fonction aleacode
function alea(string, proba){
    var chances = randomize(0, proba);
    if (chances == 0){
        var chars = string.split('');
        invert2Indexes(chars);
        var returnString = chars.join('');
    } else {
        var returnString = string;
    }
    return returnString;
}


//Inverser 2 indexs d'un tableau
function invert2Indexes(a){
    var randomIndex = randomize(1, a.length-2);
    var temp;
    a.forEach(function(value, i){
        if (i === randomIndex && i < a.length){
            temp = a[i];
            a[i] = a[i+1];
            a[i+1] = temp;
        }
    });
}

//valider formulaire en appuyant sur Enter
function validForm(e) {
    if (e.keyCode == 13) {
        askName()
        return false;
    } else {
        return true;
    }
}





///////////////EXEMPLES//////////////
//Exemple de foreach sur tableau
var tab=[1,5,4,6,9,2];
tab.forEach(function(value, i){
    console.log(i + "=>" + value);
});


//Exemple for sur un objet
var obj = {
    'nom' : 'dylan',
    'prenom' : 'bob'
};
//option 1
for (var key in obj) {
    console.log(key + " => " + obj[key]);
}
//option 2
Object.keys(obj).forEach(function(key){
    console.log(key + " => " + obj[key]);
});

//exemple setTimeout
var name = 'toto';
setTimeout(function(){
    console.log(name);
},2000);

setInterval(function(){
    console.log(name);
},1)