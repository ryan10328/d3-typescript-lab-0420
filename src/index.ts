import * as d3 from 'd3';
import './styles/style.scss';

const dummyData = [
    { id: 'd1', value: 1, region: 'USA' },
    { id: 'd2', value: 5, region: 'India' },
    { id: 'd3', value: 12, region: 'China' },
    { id: 'd4', value: 6, region: 'Germany' },
];

const container = d3.select('svg')
    .classed('container', true);

const xScale = d3.scaleBand().domain(dummyData.map(g => g.region)).rangeRound([0, 250]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0])

const bars = container.selectAll('.bar')
    .data(dummyData)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => 200 - yScale(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => yScale(data.value));


setInterval(() => {
    for (let item of dummyData) {
        item.value = Math.floor(Math.random() * 15);
    }
    bars.data(dummyData).transition().duration(500).ease(d3.easeLinear)
        .attr('width', xScale.bandwidth())
        .attr('height', data => 200 - yScale(data.value))
        .attr('x', data => xScale(data.region))
        .attr('y', data => yScale(data.value))
        .attr('fill', getColor);
}, 1000);


function getColor(data: any) {
    return `rgb(${Math.round(data.value * 17)}, ${Math.round(data.value * 3)}, ${Math.round(data.value * 8)})`;
}