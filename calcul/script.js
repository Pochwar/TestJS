function calc() {
    nb1 = document.querySelector('#nb1').value;
    nb2 = document.querySelector('#nb2').value;
    var result = parseFloat(nb1) + parseFloat(nb2);
    document.querySelector('#affich').innerText = 'le résultat de ' + nb1 +' et '+ nb2 + ' est ' + result;
}
calc();

document.querySelector('#nb1').addEventListener('click', calc);
document.querySelector('#nb2').addEventListener('click', calc);