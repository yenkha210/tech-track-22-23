import '../styles/style.css';
import * as d3 from 'd3';
import gsap from "gsap";

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

const groepjes = {
	group_1920_1929: [],
	group_1930_1939: [],
	group_1940_1949: [],
	group_1950_1959: [],
	group_1960_1969: [],
	group_1970_1979: [],
	group_1980_1989: [],
	group_1990_1999: [],
	group_2000_2009: [],
	group_2010_2019: [],
	group_2020_2022: []
}

function filterFilms(alleFilms) {

	alleFilms.forEach(film => {
		if (film.release_year > 1919 && film.release_year < 1930) {
			groepjes.group_1920_1929.push(film)

		} else if (film.release_year > 1929 && film.release_year < 1940) {
			groepjes.group_1930_1939.push(film)

		} else if (film.release_year > 1939 && film.release_year < 1950) {
			groepjes.group_1940_1949.push(film)
			
		}else if (film.release_year > 1949 && film.release_year < 1960) {
			groepjes.group_1950_1959.push(film)

		}else if (film.release_year > 1959 && film.release_year < 1970) {
			groepjes.group_1960_1969.push(film)

		}else if (film.release_year > 1969 && film.release_year < 1980) {
			groepjes.group_1970_1979.push(film)

		}else if (film.release_year > 1979 && film.release_year < 1990) {
			groepjes.group_1980_1989.push(film)

		}else if (film.release_year > 1989 && film.release_year < 2000) {
			groepjes.group_1990_1999.push(film)

		}else if (film.release_year > 1999 && film.release_year < 2009) {
			groepjes.group_2000_2009.push(film)

		}else if (film.release_year > 2009 && film.release_year < 2019) {
			groepjes.group_2010_2019.push(film)

		}else if (film.release_year > 2019 && film.release_year < 2022) {
			groepjes.group_2020_2022.push(film)
		}
	})

	console.log('groepjes')

	console.log(groepjes);
}


let data = d3.json('../data/disneyplustitles.json')
    .then(d => data = d)
    .then(d => {
		filterFilms(d);
		actueleFilms(d)
		return d;
	})
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

		// const filter = dataFilter
		// .filter(item => {
		// 	return parseInt(item.release_year) === 2021;
		// })
		// .map(item => {
		// 	return {
		// 		title: item.title
		// 	}
		// });
		// console.log(filter)
		

		//console.log(filter)
		
		const legeObject = {}

		for(const film of dataFilter){
			//if that releaseyear exists
			if(film.release_year in legeObject ){
			
			//up the prev count
			legeObject[film.release_year] = legeObject[film.release_year] + 1; 
			
			}else{
			legeObject[film.release_year] = 1;
			}
		}
		console.log(legeObject)
		//now we will iterate through those keys of the Map and format it for Array 2

		const outputArray = []
		Object.keys(legeObject).forEach(jaar => {
		
		outputArray.push({
			jaar,
			count: legeObject[jaar]
		})
		})

		console.log(outputArray)
		
		countMovie(outputArray)

		// if(release_year > 2018){
		// 	return{release_year: Number(item.release_year),
		// 			title: item.title}
		// };

	//console.log(dataFilter[2])
	//console.log() de titel van de tweede film
}


function countMovie(outputArray) {
	
	const chartWidth = 700
	const chartHeight = 2000
	
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(outputArray, d => d.count)])
		.range([0, chartWidth]);
	
	const yScale = d3.scaleBand()
		.domain(d3.map(outputArray, d => d.jaar))
		.range([0, chartHeight])
		  .paddingInner(0.10);
	

	function update(){
		
	}



	d3.select('#bars')
	  .selectAll('rect')
	  .data(outputArray)
	  .join('rect')
	  .attr('height', yScale.bandwidth())
	  .attr('width', d => xScale(d.count))
	  .attr('y', d => yScale(d.jaar))
	  .attr("id","bars")
	  .on("mouseover touchstart", (e, d) =>
		d3
		  .select("#tooltip")
		  .transition()
		  .duration(175)
		  .style("opacity", 1)
		  .text(`${d.jaar}: ${d.count}`)
	  )
	  .on("mousemove", (e) =>
		d3
		  .select("#tooltip")
		  .style("left", e.pageX - 170 + "px")
		  .style("top", e.pageY - 120 + "px")
	  )
	  .on("mouseout", e => d3.select("#tooltip").style("opacity", 0)
	  );
	  
	
	d3.select('#labels')
	  .selectAll('text')
	  .data(outputArray)
	  .join('text')
	  .style("fill", "white")
	  .attr('y', d => yScale(d.jaar) + 15)
	  .text(d => d.jaar);

}


function updateChart(countMovie){
	countMovie = Number(countMovie);
	const dataSet = a  (countMovie);
}

window.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('button');
	buttons.forEach(button => {
		button.addEventListener('click', handleClick);
	})
})

function handleClick(event) {
	console.log(groepjes[event.target.value]);
}



