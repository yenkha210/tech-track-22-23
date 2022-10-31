// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

console.log('Hello, world!');

const data = [
	1,
	2,
	"3",
	"4",
	5
]

function convertArrayStringsToNumbers() {
	/* Your code here should convert the data array to an array containing only numbers and no strings and log the code to the console. */
  let newData = data.map(item => {
    return parseInt(item, 10);
  })
  
  console.log(newData);
}

convertArrayStringsToNumbers();
