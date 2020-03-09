import * as d3 from 'd3'
import StateHandler from '../handlers/StateHandler'
import EntityStyler from '../stylers/EntityStyler'
import DataHandler from '../../../Data/DataHandler'
import SelectionDataHandler from '../component-task-connectors/SelectionDataHandler'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
import KeyEvents from '../events/KeyEvents'
const AreaSelection = {
  selectedPoints: [],
  pointsString: '',
  svg: null,
  gSelect: null,
  init (svg) {
    this.svg = svg
    this.gSelect = d3.selectAll(svg)._groups[0]._groups[0][0]

    StateHandler.addState('mousemove', 'areaSelection', (d3Event) => this.selecting(d3Event))
    StateHandler.addState('mouseup', 'areaSelection', (d3Event) => this.doneSelecting(d3Event))
    this.poly = svg.append('polyline')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('points', '0,0')
      .style('fill', 'blue')
      .style('opacity', '0.2')

    KeyEvents.addFunctionToKeyPress(28, () => {
      document.body.style.cursor = 'crosshair'
      this.selectedPoints = []
      StateHandler.stateChange('mousemove', 'areaSelection')
      StateHandler.stateChange('mouseup', 'areaSelection')
    })
    OptionsConnector.addTask('Area Selection', () => {
      document.body.style.cursor = 'crosshair'
      this.selectedPoints = []
      StateHandler.stateChange('mousemove', 'areaSelection')
      StateHandler.stateChange('mouseup', 'areaSelection')
    })
  },

  selecting (d3Event) {
    const x = d3.mouse(this.gSelect)[0]
    const y = d3.mouse(this.gSelect)[1]
    this.selectedPoints.push({ x, y })
    this.pointsString += x + ', ' + y + ' '
    EntityStyler.polySetPoints(this.poly, this.pointsString)
  },

  doneSelecting (d3Event) {
    document.body.style.cursor = 'default'
    this.pointsString = ''
    EntityStyler.polySetPoints(this.poly, this.pointsString)
    this.getNodesWithinSelection()
  },
  getNodesWithinSelection () {
    const cordinates = { minX: NaN, minY: NaN, maxX: NaN, maxY: NaN }

    // We iterate to find the max and min x/y values.
    this.selectedPoints.forEach(point => {
      cordinates.minY = isNaN(cordinates.minY) ? point.y : (cordinates.minY > point.y) ? point.y : cordinates.minY
      cordinates.minX = isNaN(cordinates.minX) ? point.x : (cordinates.minX > point.x) ? point.x : cordinates.minX

      cordinates.maxY = isNaN(cordinates.maxY) ? point.y : (cordinates.maxY < point.y) ? point.y : cordinates.maxY
      cordinates.maxX = isNaN(cordinates.maxX) ? point.x : (cordinates.maxX < point.x) ? point.x : cordinates.maxX
    })
    // Here we controll all nodes to see if they are withtin, we then push them to a seperate table.
    const nodesWithin = this.getEntitysWithinMaxMin('nodes', cordinates)

    const selectedNodes = this.getEntitysToSelect(nodesWithin)

    this.resetPastSelection()

    const nodes = this.selectMultiEntitys('nodes', selectedNodes)
    const edges = this.selectMultiEntitys('edges', selectedNodes)

    SelectionDataHandler.newSelection('nodes', nodes)
    SelectionDataHandler.pushSelection('edges', edges)
  },
  getEntitysWithinMaxMin (type, cordinates) {
    const entitysWithinSelection = []
    DataHandler.data[type].forEach(entity => {
      let withIn = true
      if (entity.x < cordinates.minX || entity.x > cordinates.maxX) {
        withIn = false
      }
      if (entity.y < cordinates.minY || entity.y > cordinates.maxY) {
        withIn = false
      }
      if (withIn) {
        entitysWithinSelection.push(entity)
      }
    })
    return entitysWithinSelection
  },
  getEntitysToSelect (entitysWithinSelection) {
    const selectedEntitys = []
    entitysWithinSelection.forEach(entity => {
      const x = []
      this.selectedPoints.forEach(point => {
        if (point.y >= entity.y && point.y <= entity.y + 10) {
          x.push(point.x)
        } else if (point.y <= entity.y && point.y >= entity.y - 10) {
          x.push(point.x)
        }
      })
      x.sort((a, b) => a - b)
      if (entity.x >= x[0] && entity.x < x[x.length - 1]) {
        selectedEntitys.push(entity.index)
      }
    })
    return selectedEntitys
  },
  resetPastSelection () {
    SelectionDataHandler.currentSelection.nodes.forEach(node => {
      EntityStyler.normalize('nodes', node)
    })
    SelectionDataHandler.currentSelection.edges.forEach(edge => {
      console.log(edge)
      EntityStyler.normalize('edges', edge)
    })
  },
  selectMultiEntitys (type, ids) {
    if (typeof ids === 'undefined') return
    const selection = []
    d3.selectAll(type === 'nodes' ? 'circle' : 'line')
      .filter(function (d) {
        ids.forEach(id => {
          switch (type) {
            case 'nodes' :
              if (id === d.index) {
                selection.push(d3.select(this))
                EntityStyler.hightLight(type, d3.select(this))
              }
              break
            case 'edges':
              if (id === d.target.index || id === d.source.index) {
                selection.push(d3.select(this))
                EntityStyler.hightLight(type, d3.select(this))
              }
              break
          }
        })
      })
    return selection
  }
}

export default AreaSelection
