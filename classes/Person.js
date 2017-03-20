function Person(name, elementId){
    this.name = name;
    this.elementId = document.querySelector('#' + elementId);
    this.elementId.querySelector('.name').innerText = this.name;
}

Person.prototype.sayHi = function(){
    this.elementId.querySelector('.message').innerText = 'Bonjour je m\'apelle ' + this.name;
}
Person.prototype.sayBye = function(){
    this.elementId.querySelector('.message').innerText = 'Au revoir';
}
