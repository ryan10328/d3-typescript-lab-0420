import * as d3 from 'd3';
import './styles/style.scss';

const dummyData = [
    { id: 'd1', value: 1, region: 'USA' },
    { id: 'd2', value: 5, region: 'India' },
    { id: 'd3', value: 12, region: 'China' },
    { id: 'd4', value: 6, region: 'Germany' },
];

// x-axis = value, y-axis = region
const container = d3.select('svg')
    .classed('container', true);


const xScale = d3.scaleLinear()
    .domain([0, 15])
    .range([0, 200]);
const yScale = d3.scaleBand()
    .domain(dummyData.map(g => g.region))
    .range([0, 200])
    .padding(0.1);


let g = container.append('g');

const bars = g.selectAll('.bar')
    .data(dummyData)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', data => 200 - xScale(data.value))
    .attr('height', yScale.bandwidth() - 20)
    .attr('x', 0)
    .attr('y', data => yScale(data.region));

// x-axis
g.append('g')
    .attr('transform', `translate(${0}, ${180})`)
    .call(d3.axisBottom(xScale))
    .attr("text-anchor", "end")
    .append('text')
    .text('value');

// y-axis
g.append("g")
.call(d3.axisLeft(yScale).tickFormat((d) => `$${d}`).ticks(10))
.append('text')
.attr('transform', "rotate(-45)")
.attr("y", 10)
.attr('x', 10)
.attr("text-anchor", "end")
.attr("stroke", "black")
.text('Region');



setInterval(() => {
    for (let item of dummyData) {
        item.value = Math.floor(Math.random() * 15);
    }
    bars.data(dummyData).transition().duration(500).ease(d3.easeLinear)
        .attr('width', data => 200 - xScale(data.value))
        .attr('height', yScale.bandwidth() - 20)
        .attr('x', 0)
        .attr('y', data => yScale(data.region))
        .attr('fill', getColor);
}, 1000);


function getColor(data: any) {
    return `rgb(${Math.round(data.value * 17)}, ${Math.round(data.value * 3)}, ${Math.round(data.value * 8)})`;
}