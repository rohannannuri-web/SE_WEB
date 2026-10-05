const { add, subtract, multiply, divide } = require('./src/calculator');

console.log("=== Web Project Demo ===");
console.log(`5 + 3 = ${add(5, 3)}`);
console.log(`10 - 4 = ${subtract(10, 4)}`);
console.log(`6 * 7 = ${multiply(6, 7)}`);
console.log(`20 / 4 = ${divide(20, 4)}`);
console.log("Web Project Running Successfully!");
