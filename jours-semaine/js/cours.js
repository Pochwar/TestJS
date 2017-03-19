// var ht = Number(prompt("Entrez un chiffre "));
// var ttc = ht + (ht *19.6/100);
//
// console.log("le prix TTC est : " + ttc);


// var celcius = Number(prompt("Entrez un chiffre "));
// var fahrenheit = celcius*9/5+32;
//
// console.log(celcius + "°C = " + fahrenheit +"°F");


//VARIABLES
//tableau des jours de la semaine
var semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
//Message a afficher
var message;
//saisie du jour de la semaine
var jour = prompt("Quel jour de la semaine sommes nous ?");


//PROGRAMME
//parcours du tableau de la semaine
for(var i=0; i<semaine.length; i++){
    //si le jour entré correspond a une entrée du taleau semaine
    if(jour === semaine[i]){
        //si on est sur le dernier index, alors on boucle
        if(i===semaine.length-1){
            i=0;
        //sinon on passe au jour suivant
        } else {
            i++;
        }
        //on détermine le message avec le jour suivant
        message = "demain nous serons " + semaine[i];
        break;
    //sinon on détermine un message d'erreur
    } else {
        message = "Jour inconnu";
    }
}
//on affiche le emssage
document.write(message);
