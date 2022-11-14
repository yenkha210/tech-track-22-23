import '../styles/style.css'
import * as d3 from 'd3';

//import data
const data = [
	{
		naam: "Pokemon",
		release_year: "1999"

	},
	{
		naam: "Pokemon",
		release_year: "2005"

	},
	{
		naam: "Pokemon",
		release_year: "2012"

	}

]

// new Array();
// d3.csv('../data/disney_plus_titles.csv', (line) => {
// 	data.push(line);
// })
console.log(data);


const changeNumber = data.map(item =>{
	// return {
	// 	release_year: parseInt(item.release_year, 10)
	// }
	return {release_year : Number(item.release_year) }
})


console.log(changeNumber);


