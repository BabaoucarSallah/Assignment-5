// B-1 Hoisting Surprise

function test() {
  console.log(value); // Line 1
  if (true) {
    var value = 42;
  }
  console.log(value); // Line 2
}
test();

/*
    OUTPUT 

    undefined
    42

    EXPLANATION: 

    At Line 4, value is undefined because var declaration of the variable is hoisted (moved) to the top of the test function's scope and initialized with undefined,  but the initialization inside the if block is not hoisted, it stays there.

    At Line 8, value is "42" because the variable has been assigned the number "42" inside the if block at line 6.
*/

// B-2 The Temporal Dead Zone

{
  console.log(theme); // Line 1
  const { mode: theme = 'light' } = getSettings(); // Line 2
  function getSettings() {
    return { mode: 'dark' };
  }
}

/*
OUTPUT:

    console.log(theme); // Line ①
              ^

    ReferenceError: Cannot access 'theme' before initialization
        at Object.<anonymous> (C:\Users\HomePC\Desktop\UTG\Year 3 Sem 1\Web programming\assignments\Assignment 5\Registration Form\index.js:28:15)

EXPLANATION:

  The error occurs because "theme" is in the Temporal Dead Zone (TDZ), Variables declared with "let" and "const" are hoisted to the top of their block scope but are not initialized until their declaration is evaluated.

  Line 1 tries to access theme before it's been initialized at Line 2, which is why the ReferenceError occurs.

*/
