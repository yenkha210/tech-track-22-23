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
		

		console.log(filter)

		 const dataset = [
		 		
				{
					"2017": 69
				},
				{
					"2018": 65
				},
				{
					"2019": 99
				},
				{	
					"2020": 114
				},
				{
					"2021": 125
				},
		 ];

		
		

		// if(release_year > 2018){
		// 	return{release_year: Number(item.release_year),
		// 			title: item.title}
		// };

	//console.log(dataFilter[2])
	//console.log() de titel van de tweede film
}

const dataSet = [
	{"Jaar":2017,"Aantal":69},
	{"Jaar":2018,"Aantal":65},
	{"Jaar":2019,"Aantal":99},
	{"Jaar":2020,"Aantal":114},
	{"Jaar":2021,"Aantal":125},];


const chartWidth = 700
const chartHeight = 200

const xScale = d3.scaleLinear()
	.domain([0, d3.max(dataSet, d => d.Aantal)])
	.range([0, chartWidth]);

const yScale = d3.scaleBand()
	.domain(d3.map(dataSet, d => d.Jaar))
	.range([0, chartHeight])
  	.paddingInner(0.20);

d3.select('#bars')
  .selectAll('rect')
  .data(dataSet)
  .join('rect')
  .attr('height', yScale.bandwidth())
  .attr('width', d => xScale(d.Aantal))
  .attr('y', d => yScale(d.Jaar))
  .attr("id","bars")
  .on("mouseover touchstart", (e, d) =>
    d3
      .select("#tooltip")
      .transition()
      .duration(175)
      .style("opacity", 1)
      .text(`${d.Jaar}: ${d.Aantal}`)
  )
  .on("mousemove", (e) =>
    d3
      .select("#tooltip")
      .style("left", e.pageX - 180 + "px")
      .style("top", e.pageY - 120 + "px")
  )
  .on("mouseout", e => d3.select("#tooltip").style("opacity", 0)
  );
  

d3.select('#labels')
  .selectAll('text')
  .data(dataSet)
  .join('text')
  .style("fill", "white")
  .attr('y', d => yScale(d.Jaar) + 15)
  .text(d => d.Jaar)
  ;

gsap.fromTo("rect",
{
	opacity: 0
},
{
	opacity: 1, 
	duration: 1,
	stagger: 1
}
)


