/*
 * Prototypal inheritance
 */

var Animal = function(name) {
    this.name = name;
};

Animal.prototype.say = function() {
    return (this.name ? this.name : '') + ' says something inaudible..';
};

var Dog = function() {
    this.name = 'Dog';
};
Dog.prototype = Animal.prototype;

Dog.prototype.say = function() {
    return "woof!";
};

var a = new Animal("Kito");
console.log(a.say());  // woof!

/*
 * What happend here? Wasn't Kito supposed to say something inaudible?
 * Since objects are passed by reference in Javascript,
 * Dog.protoype is just points to to Animal.ptototype.
 * Accessing or modifying Dog.protoype is equivalent to access
 * and modifications on Animal.prototype.
 */

// reset .say on Animal
Animal.prototype.say = function() {
    return (this.name ? this.name : '') + ' says something inaudible..';
};

var BetterDog = function() {
    this.name = "Bdog";
};

/*
 * The prototype is set to an instance of Animal.
 * Changes on an instance do not propagate to other instances
 * or the prototype. Which is what we want.
 * See: See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 */
BetterDog.protoype = new Animal();
/*
 * An unintended side-effect of the above technique is calling the constructor.
 * A modern (equivalent, minus the side-effect) way of doing the same is:
 * BetterDog.prototype = Object.create(Animal.prototype);  // (no < IE9 support)
 * Object.create(proto) internally sets the [[Prototype]] of the newly creted
 * object to proto (Animal.prototype), essentially cloning the prototype.
 */
BetterDog.protoype.constructor = BetterDog;

BetterDog.prototype.say = function() {
    /*
     * A way to call the parent method, but it requires knowledge of what the parent is.
     * See: http://joshgertzen.com/object-oriented-super-class-method-calling-with-javascript/
     */
    console.log(Animal.prototype.say.call(this));
    return this.name + " says woofwoof!";
};

var bDog = new BetterDog();
console.log(bDog.say());  // woofwoof! as expected

var newAnimal = new Animal("oyu");
console.log(newAnimal.say());  // oyu says something inaudible..
