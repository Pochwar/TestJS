function Slider(element, images, params){
    this.element = document.querySelector('#' + element);
    this.images = images;
    this.params = params || {};
    this.delay = this.params.delay || 500;
    this.height = this.params.height || 300;
    this.width = this.params.width || 500;

    this.cursor = 0;
    this.createSlider();
}

Slider.prototype.createSlider = function () {
    //creation de l'image
    var img = document.createElement("img");
    img.setAttribute("src", this.images[this.cursor]);
    img.id = "img";
    img.setAttribute("height", this.height);
    img.setAttribute("width", this.width);

    //creation de la div contenant les Boutons
    var div = document.createElement("div");

    //creation des boutons
    this.createButton(div, "fa fa-play", this.play.bind(this));
    this.createButton(div, "fa fa-pause", this.pause.bind(this));
    this.createButton(div, "fa fa-backward", this.previous.bind(this));
    this.createButton(div, "fa fa-forward", this.next.bind(this));
    this.createButton(div, "fa fa-random", this.random.bind(this));

    this.element.appendChild(img);
    this.element.appendChild(div);
};

Slider.prototype.createButton = function (parent, text, callFunction) {
    var button = document.createElement("button");
    var icon = document.createElement("i");
    icon.className = text;
    button.addEventListener('click', callFunction);
    button.appendChild(icon);
    parent.appendChild(button);





};

Slider.prototype.show = function () {
    this.element.querySelector("#img").src = this.images[this.cursor];
};

Slider.prototype.play = function () {
    this.pause();
    this.interval = setInterval(this.next.bind(this),this.delay)
};

Slider.prototype.pause = function () {
    clearInterval(this.interval);
};

Slider.prototype.next = function () {
    if (this.cursor === this.images.length-1){
        this.cursor = 0;
    } else {
        this.cursor++;
    }
    this.show();
};

Slider.prototype.previous = function () {
    if (this.cursor === 0){
        this.cursor = this.images.length-1;
    } else {
        this.cursor--;
    }
    this.show();
};

Slider.prototype.random = function () {
    function randomize(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    do {rand = randomize(0, this.images.length-1);}
    while(rand === this.cursor);
    this.cursor = rand;
    this.show();

};
