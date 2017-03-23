function Slider(){
    var element;
    var images;
    var delay;
    var cursor;
    var interval;


    this.create = function (slideElement, slideImages, slideParams){
        element = document.querySelector('#' + slideElement);
        images = slideImages;
        params = Object.assign({
            delay : 500,
            height : 300,
            width : 500
        }, slideParams)

        cursor = 0;
        createSlider();
    }

    var createSlider = function () {
        //creation de l'image
        var img = document.createElement("img");
        img.setAttribute("src", images[cursor]);
        img.id = "img";
        img.setAttribute("height", params.height);
        img.setAttribute("width", params.width);

        //creation de la div contenant les Boutons
        var div = document.createElement("div");

        //creation des boutons
        createButton(div, "fa fa-play", play.bind(this));
        createButton(div, "fa fa-pause", pause.bind(this));
        createButton(div, "fa fa-backward", previous.bind(this));
        createButton(div, "fa fa-forward", next.bind(this));
        createButton(div, "fa fa-random", random.bind(this));

        element.appendChild(img);
        element.appendChild(div);
    };

    var createButton = function (parent, text, callFunction) {
        var button = document.createElement("button");
        var icon = document.createElement("i");
        icon.className = text;
        button.addEventListener('click', callFunction);
        button.appendChild(icon);
        parent.appendChild(button);
    };

    var show = function () {
        element.querySelector("#img").src = images[cursor];
    };

    var play = function () {
        pause();
        interval = setInterval(next.bind(this, "toto"),params.delay)
    };

    var pause = function () {
        clearInterval(interval);
    };

    var next = function (tre) {
        alert(tre);
        if (cursor === images.length-1){
            cursor = 0;
        } else {
            cursor++;
        }
        show();
    };

    var previous = function () {
        if (cursor === 0){
            cursor = images.length-1;
        } else {
            cursor--;
        }
        show();
    };

    var random = function () {
        do {
            rand = Math.floor(Math.random() * images.length);
        } while(rand === cursor);
        cursor = rand;
        show();

    };
}
