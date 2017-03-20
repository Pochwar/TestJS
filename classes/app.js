var john = new Person("John", "profile1");
document.querySelector('#profile1 .sayHi').addEventListener("click", john.sayHi.bind(john));
document.querySelector('#profile1 .sayBye').addEventListener("click", john.sayBye.bind(john));

var cynthia = new Person("Cynthia", "profile2");
document.querySelector('#profile2 .sayHi').addEventListener("click", cynthia.sayHi.bind(cynthia));
document.querySelector('#profile2 .sayBye').addEventListener("click", cynthia.sayBye.bind(cynthia));
