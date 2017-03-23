function Person(name) {
   this.name = name;
   this.hello = "Bonjour, je m'apelle "+ this.name;
}


//option 2 -> rajouter "text"
Person.prototype.sayHi = function (text) {
   console.log(this.hello + text)
};

Person.prototype.sayBye = function () {
   console.log("Au revoir")
};
