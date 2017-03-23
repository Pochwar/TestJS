$(document).ready(function(){

    //validation du nom en cliquant sur Entrée
    // $("#name").keypress(validForm);

    //validation du nom
    $("#askname").click(function(){
        var name = $("#name").val();
        // name = name.dyslexia();
        console.log(name);
        $("#msg").changeName(name);
        $("#name").val("");
    });

    //fonction de création de boutons
    function createButton(color){
        var button = document.createElement('button');
        $(button).attr("data", color).addClass("color").text(color);
        $("#buttons").append(button);
    }

    //création des boutons
    createButton("red");
    createButton("green");
    createButton("blue");

    //application de la fonction colorize aux boutons
    $(".color").click(function(){
        $("#msg").colorize({colors : [$(this).attr('data')]})
    });


    console.log($(".test"));

    // affichage du nom en direct
    // $('#name').keyup(askName);


    //plugin de changement de nom
    (function($){
        $.fn.changeName = function(name){
            $(this).html(name);
        }
    })(jQuery);


    //valider formulaire en appuyant sur Enter
    function validForm(e) {
        if (e.keyCode == 13) {
            askName()
            return false;
        } else {
            return true;
        }
    }


    //plugin colorize

    $.fn.colorize = function(options){
        var settings = $.extend({
            colors : ["red", "blue"],
            success : null
        }, options)
        var tabLength = $(this).length-1;

        this.each(function(index){
            $(this).css("color", settings.colors[index] ? settings.colors[index] : settings.colors[index % settings.colors.length]);
            //si success est défini et que l'on est a la fin de la boucle on apelle success

            if (settings.success && index === tabLength){
                settings.success()
            }

            //background randomize
            var j = randomize(0,5);
            var r = randomize(0,255);
            var g = randomize(0,255);
            var b = randomize(0,255);
            if (j == 0) {
                $('body').css("backgroundColor","rgb("+r+","+g+","+b+")");
            } else {
                $('body').css("backgroundColor","#fff");
            }
        })
    }


$('#test').click(function(){
    $(".test").colorize({
        colors : ["red", "green", "blue"],
        success : function(){
            alert('bien joué !');
        }
    });
})




    //fonction dyslexia sur du texte
    String.prototype.dyslexia = function(){
        var wrod = alea(this,0).toLowerCase();
        wrod = ucfirst(wrod);
        return wrod;
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


});


// ///////////////EXEMPLES//////////////
// //Exemple de foreach sur tableau
// var tab=[1,5,4,6,9,2];
// tab.forEach(function(value, i){
//     console.log(i + "=>" + value);
// });
//
//
// //Exemple for sur un objet
// var obj = {
//     'nom' : 'dylan',
//     'prenom' : 'bob'
// };
// //option 1
// for (var key in obj) {
//     console.log(key + " => " + obj[key]);
// }
// //option 2
// Object.keys(obj).forEach(function(key){
//     console.log(key + " => " + obj[key]);
// });
//
// //exemple setTimeout
// var name = 'toto';
// setTimeout(function(){
//     console.log(name);
// },2000);
//
// setInterval(function(){
//     console.log(name);
// },1)
