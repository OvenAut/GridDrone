var Person = function(name){
  this.name = name;
  this.type = 'human';
}

Person.prototype.info = function(){
  console.log("Name:", this.name, "Type:", this.type);
}

var Robot = function(name){
  Person.apply(this,arguments)
  this.name = name;
  this.type = 'robot';
}

Robot.prototype = Person.prototype;        // Set prototype to Person's
Robot.prototype.constructor = Robot;   // Set constructor back to Robot

person = new Person("Bob");
robot = new Robot("Boutros");

person.info();
// Name: Bob Type: human

robot.info();
// Name: Boutros Type: robot