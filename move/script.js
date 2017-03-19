//on définit les proprietés CSS "top" et left" du carré
document.querySelector('.square').style.top = "150px";
document.querySelector('.square').style.left = "150px";

function moveIt(direction,distance){
    switch (direction){
        case "top" :
            var property = "top"
            var negative = true
            break;

        case "bottom" :
            var property = "top"
            var negative = false
            break;

        case "left" :
            var property = "left"
            var negative = true
            break;

        case "right" :
            var property = "left"
            var negative = false
            break;
    }
    var coord = document.querySelector('.square').style[property];
    coord = coord.replace("px", "");
    coord = parseInt(coord);
    //top & left
    if (negative){
        if (coord > 0){
            coord -= distance;
        }
    }
    //bottom & right
    if(!negative){
        if (coord < 300){
            coord += distance;
        }
    }
    coord = coord + "px";
    document.querySelector('.square').style[property] = coord;
}


function move(e) {
    //top
    if (e.keyCode == 38 && !e.shiftKey) {moveIt("top", 5);}
    if (e.keyCode == 38 && e.shiftKey) {moveIt("top", 10);}
    //bottom
    if (e.keyCode == 40 && !e.shiftKey) {moveIt("bottom", 5);}
    if (e.keyCode == 40 && e.shiftKey) {moveIt("bottom", 10);}
    //left
    if (e.keyCode == 37 && !e.shiftKey) {moveIt("left", 5);}
    if (e.keyCode == 37 && e.shiftKey) {moveIt("left", 10);}
    //right
    if (e.keyCode == 39 && !e.shiftKey) {moveIt("right", 5);}
    if (e.keyCode == 39 && e.shiftKey) {moveIt("right", 10);}
}
