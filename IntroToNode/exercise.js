// NODE EXERCISE
// Using the command line, create a file "echo.js"
//Inside the command line, write a function named echo that takes two arguments: a string and a number
//It should print out the string, number number of times.

function echo(string, number){
	for (var i = 0; i < number; i++){
		console.log(string);
	}	
}

//Add the above two examples to the end of your file
//Lastly, run the contents of "echo.js" using node
echo("Echo!!!", 10)//should print echo 10 times
echo("Tater Tots", 3)//should print tater tots 3 times