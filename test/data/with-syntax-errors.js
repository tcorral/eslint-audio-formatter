return 42; // Return statement not inside a function

function f() {
  'use strict';

  // No more octal
  var x = 042;

  // Duplicate property
  var y = { x: 1, x: 2 };

  // With statement can't be used
  with (z) {}

}
