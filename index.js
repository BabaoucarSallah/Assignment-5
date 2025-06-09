// B-1 Hoisting Surprise

function test() {
  console.log(value); // Line ①
  if (true) {
    var value = 42;
  }
  console.log(value); // Line ②
}
test();

/*
    OUTPUT 

    undefined
    42

    EXPLANATION: 

    At Line 4, value is undefined because var declaration of the variable is hoisted (moved) to the top of the test function's scope and initialized with undefined,  but the initialization inside the if block is not hoisted, it stays there.

    At Line 8, value is 42 because the variable has been assigned the number 42 inside the if block at line 6.
*/

// B-2 The Temporal Dead Zone

{
  console.log(theme); // Line ①
  const { mode: theme = 'light' } = getSettings(); // Line ②
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

*/
