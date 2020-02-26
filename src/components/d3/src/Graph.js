import * as d3 from 'd3'
import Tasks from './Tasks'
import DataHandler from '../../Data/DataHandler'
/**
     * Class for SVG
     * @param {*} ref - Reference to where the Graph Container should be appended
     * @param {*} data - The data holding information about nodes and links
     * @param {*} width - Width of the Graph container. By default 100vw
     * @param {*} height - Height of the Graph container. By default 100vh
*/
export default class Graph {
  constructor (ref, width = '100vw', height = '100vh') {
    this.ref = ref
    this.width = width
    this.height = height
  }

  /**
   * Generates a graph with the given data.
   */
  generate () {
    this.points = '0,0 '
    this.state = 0
    this.start = ''
    this.pointsa = []
    var svg = d3.select(this.ref)
      .append('svg')
      .attr('width', '100vw')
      .attr('height', '100vh')
      .style('border', '2px')
      .append('g')
    // Initialize the links
    this.link = svg
      .selectAll('line')
      .data(DataHandler.data.links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')
      .style('stroke-width', '2')
    // Initialize the nodes
    this.node = svg
      .selectAll('circle')
      .data(DataHandler.data.nodes)
      .enter()
      .append('circle')
      .attr('r', 20) // --
      .style('fill', '#69b3a2')
      .style('stroke', '#000')
      .style('opacity', 0.8)
      .style('stroke-width', '0')

    this.text = svg.selectAll('text')
      .data(DataHandler.data.nodes)
      .enter()
      .append('text')
      .attr('font-size', '20px')
      .attr('font-family', 'sans-serif')
      .attr('fill', 'red')
      .text(function (d) {
        return 'ID' + d.id
      })

    // Put as seperate data, do same with links. Easy selection by id
    this.tasks = new Tasks(this.node, this.link, this.ref, svg)
  }

  /**
   * Applies a force simulation upon the graph.
   */
  applyForce () {
    const ticked = () => {
      this.link
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      this.node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })

      this.text
        .attr('x', function (d) { return d.x })
        .attr('y', function (d) { return d.y })
    }

    // This part handles all the force
    d3.forceSimulation(DataHandler.data.nodes)
      .force('link', d3.forceLink() // This force provides links between nodes
        .id(function (d) { return d.id }) // This provide  the id of a node
        .links(DataHandler.data.links) // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-500)) // Basically wants the nodes to get away from eachother.
      .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)) // Make the node come to the center
      .on('tick', ticked) // Everytime it needs to rerender.
  }

  setData (data) {
    this.data = data
  }

  getLinks () {
    console.log(this.links)
    return this.links
  }

  getHeight () {
    return this.height === '100vh' ? window.height : this.height
  }

  getWidth () {
    return this.width === '100vh' ? window.width : this.width
  }

  getNodes () {
    return this.nodes
  }

  ticked (links, nodes) {
    links
      .attr('x1', function (d) {
        return d.source.x
      })
      .attr('y1', function (d) { return d.source.y })
      .attr('x2', function (d) { return d.target.x })
      .attr('y2', function (d) { return d.target.y })
    nodes
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
  }
}
