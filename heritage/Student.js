function Student(name, subject){
    Person.call(this, name);
    this.subject = subject;
    // option 1
    this.hello += ' et j\'étudie la matière ' + this.subject;
}

// Student.prototype = Object.create(Person.prototype);
// //optionnel
// Student.prototype.constructor = Student;


//option 2
// Student.prototype.sayHi = function() {
//     Person.prototype.sayHi.call(this, ' et j\'étudie la matière ' + this.subject);
// }
