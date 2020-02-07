import * as d3 from 'd3'
/**
     * Class for SVG
     * @param {*} ref - Reference to where the Graph Container should be appended
     * @param {*} data - The data holding information about nodes and links
     * @param {*} width - Width of the Graph container. By default 100vw
     * @param {*} height - Height of the Graph container. By default 100vh
*/
export default class Graph {
  constructor (ref, data1, width = '100vw', height = '100vh') {
    this.data = data1
    this.ref = ref
    this.width = width
    this.height = height
    this.data = data1
  }

  /**
   * Generates a graph with the given data.
   */
  generate () {
    var svg = d3.select(this.ref)
      .append('svg')
      .attr('width', '100vw')
      .attr('height', '100vh')
    // zoom and panning added from below.
      .call(d3.zoom().on('zoom', function () {
        svg.attr('transform', d3.event.transform)
      }))
      .append('g')
    // Initialize the links
    this.link = svg
      .selectAll('line')
      .data(this.data.links)
      .enter()
      .append('line')
      .style('stroke', '#aaa')

    // Initialize the nodes
    this.node = svg
      .selectAll('circle')
      .data(this.data.nodes)
      .enter()
      .append('circle')
      .attr('r', 20) // --
      .style('fill', '#69b3a2')
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
    }

    // This part handles all the force
    d3.forceSimulation(this.data.nodes)
      .force('link', d3.forceLink() // This force provides links between nodes
        .id(function (d) { return d.id }) // This provide  the id of a node
        .links(this.data.links) // and this the list of links
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
