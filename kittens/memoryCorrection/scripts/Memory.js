function Memory(elementId, images) {
  // Je récupère mon tableau de jeu
  this.element = document.querySelector('#' + elementId);

  // Je duplique mes images
  this.images = images.concat(images);

  // Je les mélanges
  this.shuffle();

  // Images retournées (0 à 2 images)
  this.revealed = [];

  // Paires trouvées (0 à this.images.length)
  this.found = [];

  // Je génère mon tableau de jeu
  this.createBoard();
}

// Mélanger mes images
Memory.prototype.shuffle = function() {
  // Je créer un tableau vide que je vais peupler avec des images
  // choisie aléatoirement dans this.images
  var clone = [];

  // Je garde une trace des index utilisés
  var usedIndices = [];
  var i = 0;
  // Tant que mon tableau clone n'est pas complètement rempli, je continue
  while(clone.length < this.images.length) {
    // Je génère un nombre aléatoire entre 0 et this.images.length
    // qui n'a pas déjà été généré
    do {
      var random = Math.floor(Math.random() * this.images.length);
    } while(usedIndices.indexOf(random) !== -1)

    // J'ajoute mon nombre aléatoire aux index utilisés
    usedIndices.push(random);
    // J'ajoute mon image à mon clone
    clone[i] = this.images[random];
    i++;
  }
  // Je set this.images à clone, qui contient les mêmes images mais mélangées
  this.images = clone;
}

Memory.prototype.createBoard = function() {
  // Je génère les images
  this.images.forEach(this.createImage.bind(this));
}

Memory.prototype.createImage = function(image) {
  // Chaque image est comprise dans un paragraphe
  // en display: inline-block
  var p = document.createElement('p');
  // Lorsque je clique sur mon p, j'affiche l'image à l'intérieur
  p.onclick = this.reveal.bind(this);

  // Je créé mon image
  var img = document.createElement('img');
  img.src = image;
  img.className = 'hidden';

  // J'insère tout ça dans mon HTML
  p.appendChild(img);
  this.element.appendChild(p);
}

Memory.prototype.reveal = function(ev) {
  // Si deux images sont déjà affiché, je ne fais rien
  if (this.revealed.length === 2) return;

  // J'évite que l'évènement soit propagé aux enfants
  // (le clic s'arrête au p et pas à l'img)
  ev.stopPropagation();

  // J'affiche l'img comprise dans mon p
  var p = ev.target;
  var img = p.querySelector('img');
  img.className = '';

  // J'ajoute l'image affichée à this.revealed
  this.revealed.push(img);

  // Je vérifie si j'ai trouvé une paire
  this.checkFound();

  // Si les images sont différentes, je les cache après une seconde
  if (this.revealed.length === 2) {
    setTimeout(this.hide.bind(this), 1000);
  }
}

Memory.prototype.hide = function() {
  // Je cache chaque image révélées
  this.revealed.forEach((function(image) {
    image.className = 'hidden';
  }).bind(this));

  // Je vide mon tableau d'images révélées
  this.revealed = [];
}

Memory.prototype.checkFound = function() {
  // Si je n'ai pas deux images affichées, je ne fais rien
  if (this.revealed.length !== 2) return;

  // Si les images sont les mêmes
  if (this.revealed[0].src === this.revealed[1].src) {
    // J'ajoute mes images à this.found
    this.found.push(this.revealed[0], this.revealed[1]);
    // Je vide mon tableau d'images révélées pour ne pas cacher les images trouvées
    this.revealed = [];
  }

  // Si toutes mes images sont trouvées, j'ai gagné
  if (this.found.length === this.images.length) {
    alert('BRAVO!');
  }
}