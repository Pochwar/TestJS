function Person(name, elementId){
    this.name = name;
    this.elementId = document.querySelector('#' + elementId);
    this.elementId.querySelector('.name').innerText = this.name;
    this.bindEvents();

}

Person.prototype.bindEvents = function () {
    this.elementId.querySelector('.sayHi').addEventListener("click", this.sayHi.bind(this));
    this.elementId.querySelector('.sayBye').onclick = this.sayBye.bind(this);
};

Person.prototype.sayHi = function(){
    this.elementId.querySelector('.message').innerText = 'Bonjour je m\'apelle ' + this.name;
}
Person.prototype.sayBye = function(){
    this.elementId.querySelector('.message').innerText = 'Au revoir';
}
