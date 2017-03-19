var date = new Date();
var interval = null;
var elHeure = document.querySelector('#heure');
var elMinutes = document.querySelector('#minutes');
var elSecondes = document.querySelector('#secondes');
displayHorloge(date);
function displayHorloge(){
    elHeure.innerText = addZeroToDateElement(date.getHours());
    elMinutes.innerText = addZeroToDateElement(date.getMinutes());
    elSecondes.innerText = addZeroToDateElement(date.getSeconds());
}

function modifTime(a){
    date.setSeconds(date.getSeconds()+a);
    displayHorloge()
}

function playStop(){
    if (!interval){
        interval = setInterval(function () { modifTime(1); },1000);
        document.querySelector('#playstop').innerText = "stop";
        console.log(interval);
    } else {
        clearInterval(interval);
        document.querySelector('#playstop').innerText = "play";
        console.log(interval);
        interval = null;
    }

}

function refresh(){
    date = new Date();
    displayHorloge();
}

playStop();
console.log(interval);