import React from 'react'
import * as d3 from 'd3'
import fakeData from '../fakeData/nodeLinks'
export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.d3Ref = React.createRef()
    this.data = fakeData.data
    this.state = { height: window.innerHeight, width: window.innerWidth }
  }

  componentDidMount () {

    // append the svg element to our React ref created inside the constructor.
    var svg = d3.select(this.d3Ref.current)
      .append('svg')
      .attr('width', '100vw')
      .attr('height', '100vh')
      //zoom and panning added from below.
      .call(d3.zoom().on('zoom', function () {
        svg.attr('transform', d3.event.transform)
      }))
      .append('g')
      // Initialize the links
    var link = svg
      .selectAll('line')
      .data(this.data.links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')

    // Initialize the nodes
    var node = svg
      .selectAll('circle')
      .data(this.data.nodes)
      .enter()
      .append('circle')
      .attr('r', 20) // -- Radius
      .style('fill', '#69b3a2')
    // Called everytime the force needs to reRender.
    const ticked = () => {
      link
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
    }

    // This part handles all the force
    var simulation = d3.forceSimulation(this.data.nodes)
      .force('link', d3.forceLink() // This force provides links between nodes
        .id(function (d) { return d.id }) // This provide  the id of a node
        .links(this.data.links) // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-500)) // Basically wants the nodes to get away from eachother.
      .force('center', d3.forceCenter(this.state.width / 2, this.state.height / 2)) // Make the node come to the center
      .on('tick', ticked) //Everytime it needs to rerender.
  }

  render () {
    return (
      <div style={{ width: '100vw', height: '100vh' }} ref={this.d3Ref} />
    )
  }
}
