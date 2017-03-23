function Person(name, elementId) {
  this.name = name;
  this.element = document.querySelector('#' + elementId);
  this.element.querySelector('.name').innerText = this.name;

  // Pour this.name === 'Bob', affiche "Bonjour, je m'appelle"
  // car this référence le bouton 'Say Hi'.
  this.element.querySelector('.sayHi').addEventListener('click', function() {
    alert('Bonjour, je m\'appelle ' + this.name);
  });

  // Pour this.name === 'Bob', affiche "Bonjour, je m'appelle Bob"
  // car une arrow function ne redéfinie pas this.
  // this référence donc bien mon instance de Person.
  this.element.querySelector('.sayHi2').addEventListener('click', () => {
    alert('Bonjour, je m\'appelle ' + this.name);
  });
}
