// prototype...

var myClass = function(){
  // console.log('hi');
  console.log(this);

  this.first = 'Jon';
  this.last = 'Snow'; 
};

// new myClass() returns empty object
//  myClass is also called
var foo = new myClass();
console.log(foo);

myClass.prototype.setName = function(_first, _last) {
  this.first = _first;
  this.last = _last;
};

foo.setName('Catelyn', 'Stark');
console.log(foo);

// when a function is called with 'new' in front of it,
//  `this` will point to a new object, which it will automatically return.
//  Functions used to create new objects like this are called constructors

function Presenter(name) {
  this.name = name;
  this.speak = function(line) {
    console.log(this.name,"says: '" + line +"'.");
  };
}

var stig = new Presenter('Stig');
stig.speak('...');


// Alternative?

function makePresenter(name) {
  return {
    name: name,
    speak: function(line) {
      console.log(this.name,"says: '" + line +"'.");
    }
  };
}

var stigsCousin = makePresenter('Stig\'s fat (american) cousin');

// new does a few things behind the scenes

// stig has property called constructor which points to Presenter function
console.log(stig.constructor);

// stigsCousin also has the property, but points to Object function
console.log(stigsCousin.constructor);

// constructor is a part of the prototype of a presenter.
// every object based on prototype which gives it set of inherent properties
// Object constructor: typing {} equivalent to new Object()

var myObject = {};
console.log(myObject.constructor);
console.log(myObject.toString);

// toString is method that is part of the Object prototype
// all simple objects have toString method

// presenter objects based on prototype associated with presenter constructor

console.log(Presenter.prototype);
console.log(Presenter.prototype.constructor);

// every function automatically gets prototype property, 
//  whose constructor property points back to the function

function Foo(x){
  this.x = x;
}
console.log(Foo.prototype.constructor);

// try changing Foo to foo,

// Presenter prototype itself is an object, therefore based on Object prototype
console.log(typeof(Presenter.prototype));

// shares the toString method of the Object prototype
console.log(stig.toString == Object.prototype.toString);


// one way sharing: 
// 
// The properties of the prototype influence the object based on it, 
//  but the properties of this object never change the prototype.
Presenter.prototype.teeth = "white unless clarkson";
console.log(stig.teeth);
stig.teeth = "no teeth";
console.log(stig.teeth);
console.log(Presenter.prototype.teeth);


// overriding inherited function
Presenter.prototype.toString = function(){
  return ("{" + this.name + "}");
};
console.log(stig.toString());

// toString is now overridden, 
console.log(stig.toString == Object.prototype.toString);


// Alternate approach to Presenter constructor

function Presenter2(name) {
  this.name = name;
}

Presenter2.prototype.speak = function(line) {
  console.log(this.name, "says: {", line, "}");
};

var may2 = new Presenter2("James May");
may2.speak("Clarkson!");

// ..?
var empty = {};
console.log("constructor" in empty); // true
