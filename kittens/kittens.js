function Kittens(images, params){
    this.images = images;
    this.params = params || {};
    this.delay = this.params.delay || 1000;
    this.height = this.params.height || 150;
    this.width = this.params.width || 150;
    this.createKittens();
    this.imgShown = [];
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
    // cloneKittens.forEach(function(img){
    //     console.log(img)
    // });
    // creation des images
    cloneKittens.forEach(this.createImg.bind(this, parent));
};

//fonction de création des images
Kittens.prototype.createImg = function (parent, image, id) {
    var div = document.createElement("div");
    div.addEventListener('click', this.show.bind(this, id));
    div.setAttribute("style", "background:#eeeeee");
    var img = document.createElement("img");
    img.setAttribute("src", image);
    img.classeName = "img";
    img.id = "img-" + id;
    img.setAttribute("height", this.height);
    img.setAttribute("width", this.width);
    img.setAttribute("style", "visibility:hidden");
    div.append(img);
    parent.append(div);
};

Kittens.prototype.show = function (id) {
    if (this.imgShown.length < 2){
        document.querySelector("#img-"+id).setAttribute("style", "visibility:visible");
        this.imgShown.push(id);
    }
    if (this.imgShown.length === 2){
        var id0 = this.imgShown[0];
        var id1 = this.imgShown[1];
        if(document.querySelector("#img-"+id0).src !== document.querySelector("#img-"+id1).src){
            setTimeout(function(){
                this.hide(id0, id1);
            }.bind(this), 1000);
        }
        this.imgShown = [];
    }

};

Kittens.prototype.hide = function (id0,id1) {
    document.querySelector("#img-"+id0).setAttribute("style", "visibility:hidden");
    document.querySelector("#img-"+id1).setAttribute("style", "visibility:hidden");
}


// Kittens.prototype.random = function () {
//     function randomize(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         return Math.floor(Math.random() * (max - min +1)) + min;
//     }
//     do {rand = randomize(0, this.images.length-1);}
//     while(rand === this.cursor);
//     this.cursor = rand;
//     this.show();
//
// };
