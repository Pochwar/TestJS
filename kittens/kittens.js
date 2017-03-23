function Kittens(images, params){
    this.images = images;
    this.params = params || {};
    this.delay = this.params.delay || 1000;
    this.height = this.params.height || 150;
    this.width = this.params.width || 150;
    this.createKittens();
}

Kittens.prototype.createKittens = function () {
    //creation de la div contenant les Boutons
    var parent = $("#kittenImages");

    //duplication du tableau
    var images2 = this.images;
    var kittens = this.images.concat(images2);

    //creation d'un tableau d'images en doubles mélangées aléatoirement
    var cloneKittens = []
    var usedIndex = []
    var i = 0;
    while (cloneKittens.length !== kittens.length){
        do {
            var rand = Math.floor(Math.random()*kittens.length);
        } while (usedIndex.indexOf(rand) !== -1)
        cloneKittens[i] = kittens[rand];
        usedIndex.push(rand);
        i++;
    }




    // creation des images
    cloneKittens.forEach(this.createImg.bind(this, parent));


    // this.images.forEach((function(i){
    //     this.createImg(parent, this, i);
    //     // this.createImg(parent, this, i);
    // }).bind(this));
};


Kittens.prototype.createImg = function (parent, image) {
    var index = this.images.indexOf(image);
    var img = document.createElement("img");
    img.setAttribute("src", image);
    img.classeName = "img";
    img.id = "img-" + index;
    img.setAttribute("height", this.height);
    img.setAttribute("width", this.width);
    // img.addEventListener('click', reveal);
    console.log(parent);
    parent.append(img);
};

Kittens.prototype.show = function () {
    this.element.querySelector("#img").src = this.images[this.cursor];
};



Kittens.prototype.random = function () {
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
