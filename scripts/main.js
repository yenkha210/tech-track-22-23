// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css'

// We can use node_modules directely in the browser!
import * as d3 from 'd3';

console.log(d3)

const data = new Array();

d3.csv('../data/disney_plus_titles.csv', (line) => {
	data.push(line);
})

console.log(data);

// fetch('https://github.com/prasertcbs/basic-dataset/commit/b9b3ea98d027ff6f29c41cbc1a8a7db79a747b44')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

