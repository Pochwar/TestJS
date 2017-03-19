document.querySelector('.square').style.top = "150px";
document.querySelector('.square').style.left = "150px";

function moveIt(direction){
    switch (direction){
        case "top" :
            var incr = -5;
            var property = "top"
            break;

        case "bottom" :
            var incr = 5;
            var property = "top"
            break;
    }
    var coord = document.querySelector('.square').style[property];
    coord = coord.replace("px", "");
    coord = parseInt(coord);
    if (coord > 0){
        coord += incr;
    }
    coord = coord + "px";
    document.querySelector('.square').style[property] = coord;
}


function move(e) {
    switch (e.keyCode){
        //haut
        case 38 :
            moveIt("top");
            break;

        //bas
        case 40 :
            moveIt("bottom");
            break;

        //gauche
        case 37 :
            var left = document.querySelector('.square').style.left;
            var leftValue = left.replace("px", "");
            leftValue = parseInt(leftValue);
            if (leftValue > 0){
                leftValue -= 5;
            }
            leftValue = leftValue + "px";
            document.querySelector('.square').style.left = leftValue;
            break;

        //droite
        case 39 :
            var left = document.querySelector('.square').style.left;
            var leftValue = left.replace("px", "");
            leftValue = parseInt(leftValue);
            if (leftValue < 300){
                leftValue += 5;
            }
            leftValue = leftValue + "px";
            document.querySelector('.square').style.left = leftValue;
            break;

        default :
            console.log('toto');
            break;
    }
}