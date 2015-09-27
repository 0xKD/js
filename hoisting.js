// adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

// function declarations and variable declarations are always moved ('hoisted')
//  to the top of their containing scope (by the interpreter)

function foo() {
  bar();
  var x = 1;
}

// is interpreted as

function foo() {
  var x;
  bar();
  x = 1; // assignment is not hoisted, only declaration
}

// variable assignments are not hoisted but functions are, along with body

function test() {
  // z(); // error, undefined not a function
  x();
  var z = function() {
    console.log('Won\'t run');
  }; // function assignment won't be hoisted
  function x() {
    console.log('This will run!');
  } // function declaration will be
}

test();

// always use var to declare variables, declare variables just once per scope
//  at the top of the scope, to avoid hoisting related confusion


// http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/

// more with regards to execution context

(function() {
  /*
  when function is called, before it executes, an execution context is created
  - property is created in the variable object which has reference to function
  - variables are given value 'undefined'
  - if variable already exists in variable object, it is ignored
   */

  // these statements are encountered before everything else but after 
  //  the execution context is defined
  console.log(typeof foo); // function pointer
  console.log(typeof bar); // undefined

  // foo is already in the execution context, so it is ignored, the value
  //  isn't updated. bar is a variable, thus given initial value 'undefined'
  var foo = 'hi';
  var bar = function() {
    return 'nope';
  };

  // a property foo with reference pointer to this function is created
  function foo() {
    return 'yo';
  }

}());
