//Use faker to print out ten random products names and prices

var faker = require("faker");

console.log("===============================");
console.log("My list of products");
console.log("===============================");
for(var i = 1; i <= 10; i++){
	console.log(i + " " + faker.commerce.productName() + " - $" + faker.commerce.price()); 
}
