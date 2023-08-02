
/* ## Improvised modules */


const weekDay = function() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"];
  return {
    name(number) { return names[number]; },
    number(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday
/* ## Evaluating data as code */

let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));
// → 5
/* module */

const {formatDate} = require("./format-date");
console.log(formatDate(new Date(2017, 9, 13),
                       "dddd the Do"));
// → Friday the 13th

const { parse } = require("ini")
console.log( parse( "x = 10\ny = 20"));

