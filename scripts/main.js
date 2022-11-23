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

function filterFilms(alleFilms) {

	const groepjes = {
		group_10_15: [],
		group_16_20: [],
		group_21: []
		
	}

	alleFilms.forEach(film => {
		if (film.release_year > 2009 && film.release_year < 2016) {
			groepjes.group_10_15.push(film)
		} else if (film.release_year > 2015 && film.release_year < 2021) {
			groepjes.group_16_20.push(film)
		} else if (film.release_year > 2020 && film.release_year < 2022) {
		groepjes.group_21.push(film)
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

//ik wil nu dat alle release_year worden opgesplits in groepjes en dit gebeurt alleen als je op een van de filter knopjes drukt

function countMovie(outputArray) {
	
	const chartWidth = 700
	const chartHeight = 1200
	
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(outputArray, d => d.count)])
		.range([0, chartWidth]);
	
	const yScale = d3.scaleBand()
		.domain(d3.map(outputArray, d => d.jaar))
		.range([0, chartHeight])
		  .paddingInner(0.20);
	
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
	  .text(d => d.jaar)
	  ;
	

	// gsap.fromTo("rect",
	// {
	// 	opacity: 0
	// },
	// {
	// 	opacity: 1, 
	// 	duration: 1,
	// 	stagger: 1
	// }
	// )
}


