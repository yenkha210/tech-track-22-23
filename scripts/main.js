import '../styles/style.css';
import * as d3 from 'd3';

//import data
/*
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

]*/

//const data = new Array();
//d3.csv('../data/disney_plus_titles.csv', (line) => {
	//data.push(line);
	//doeHet(data);
//})
//console.log(data);

let data = d3.json('../data/disneyplustitles.json')
    .then(d => data = d)
    .then(d => actueleFilms(d))
    .catch(e => console.log("dataophalenmislukt"));


function actueleFilms(data) {
	const dataFilter = data.map(item =>{ // Met .map kan je ieder item uit de array aanpassen
		// return {
		// 	release_year: parseInt(item.release_year, 10)
		// return alle titels van films uit het jaar 2021
		// if release_year > 2018, dan return een object met de titel van de film
		// vertaal bovenste rij naar code!!!
		
		return {
			release_year : Number(item.release_year),
			title: item.title
		}

		});
		
		console.log(dataFilter);

		const filter = dataFilter
		.filter(item => {
			return parseInt(item.release_year) === 2021;
		})
		// .map(item => {
		// 	return {
		// 		title: item.title
		// 	}
		// })
		
		// 61
		// 69
		// 65
		// 99
		// 114
		// 125

		console.log(filter)

		 const dataset [
		 	{
		 		"2016": 61
				
		 	}
		 ]
		

		// if(release_year > 2018){
		// 	return{release_year: Number(item.release_year),
		// 			title: item.title}
		// };

	//console.log(dataFilter[2])
	//console.log() de titel van de tweede film
}


