function Meme(images, params){
    this.images = images;
    this.params = params || {};
    this.delay = this.params.delay || 1000;
    this.height = this.params.height || 150;
    this.width = this.params.width || 150;
    this.createMeme();
    this.imgCompare = [];
    this.imgOk = []
}

Meme.prototype.createMeme = function () {
    //creation de la div contenant les Boutons
    var parent = $("#kittenImages");

    //duplication du tableau
    var images2 = this.images;
    var Meme = this.images.concat(images2);

    //creation d'un tableau d'images en doubles mélangées aléatoirement
    var cloneMeme = []
    var usedIndex = []
    var i = 0;
    while (cloneMeme.length !== Meme.length){
        do {
            var rand = Math.floor(Math.random()*Meme.length);
        } while (usedIndex.indexOf(rand) !== -1)
        cloneMeme[i] = Meme[rand];
        usedIndex.push(rand);
        i++;
    }
    // cloneMeme.forEach(function(img){
    //     console.log(img)
    // });
    // creation des images
    cloneMeme.forEach(this.createImg.bind(this, parent));
};

//fonction de création des images
Meme.prototype.createImg = function (parent, image, id) {
    var div = document.createElement("div");
    div.addEventListener('click', this.show.bind(this, id));
    div.setAttribute("style", "height:"+this.height+"px;width:"+this.width+"px");
    div.className = "divimg";
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

Meme.prototype.show = function (id) {
    var ok = true;
    //test if img hasn't already been clicked
    this.imgCompare.forEach(function(imgId){
        if (id === imgId) {
            ok = false
        }
    });
    //or img has'nt already been validated
    this.imgOk.forEach(function(imgId){
        if (id === imgId) {
            ok = false
        }
    });
    if (ok && this.imgCompare.length < 2){
        document.querySelector("#img-"+id).setAttribute("style", "visibility:visible");
        this.imgCompare.push(id);
        console.log(this.imgCompare);
    }
    //compare two images clicked
    if (this.imgCompare.length === 2){
        var id0 = this.imgCompare[0];
        var id1 = this.imgCompare[1];
        //if images are différents, hide them
        if(document.querySelector("#img-"+id0).src !== document.querySelector("#img-"+id1).src){
            setTimeout(function(){
                this.hide(id0, id1);
            }.bind(this), 1000);
        } else {
            //else push them to this.imgOk[]
            this.imgOk.push(id0);
            this.imgOk.push(id1);
        }
        //clear this.imgCompare[]
        this.imgCompare = [];
    }

};

Meme.prototype.hide = function (id0,id1) {
    document.querySelector("#img-"+id0).setAttribute("style", "visibility:hidden");
    document.querySelector("#img-"+id1).setAttribute("style", "visibility:hidden");
}
