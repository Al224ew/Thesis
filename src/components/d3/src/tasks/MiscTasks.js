import * as d3 from 'd3'
import EntityStyler from '../stylers/EntityStyler'
import SelectionDataHandler from '../component-task-connectors/SelectionDataHandler'
import KeyEvents from '../events/KeyEvents'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
import FilterConnector from '../component-task-connectors/FilterConnector'
import DataHandler from '../../../Data/DataHandler'
const MiscTasks = {
  init () {
    OptionsConnector.addTask('Find adjacent nodes', () => this.adjacent())
    KeyEvents.addFunctionToKeyPress(10, () => this.findAdjacents())
    OptionsConnector.addTask('Filter', () => FilterConnector.show())
    KeyEvents.addFunctionToKeyPress(25, () => this.filter('nodes', 'age', '>', 10))
  },

  findAdjacents () {
    const nodes = []
    d3.selectAll('line')
      .filter(function (link) {
        SelectionDataHandler.getCurrentSelection('nodes').forEach(entity => {
          entity = entity.data()[0]
          if (link.target.id === entity.id || link.source.id === entity.id) {
            EntityStyler.hightLight('edges', d3.select(this))
            SelectionDataHandler.pushSelection('edges', d3.select(this))
            nodes[entity.id === link.target.id ? link.source.id : link.target.id] = true
          }
        })
      })
    d3.selectAll('circle')
      .filter(function (node) {
        nodes.forEach((fNode, index) => {
          if (node.id === index) {
            EntityStyler.hightLight('nodes', d3.select(this))
            SelectionDataHandler.pushSelection('nodes', d3.select(this))
          }
        })
      })
  },

  adjacent() {
    let nodes = []
    SelectionDataHandler.getCurrentSelection('nodes').forEach(entiy => {
      entiy = entiy.data()[0]
      DataHandler.newData[entiy.id].edges.forEach(edge => {
        console.log(edge)
        EntityStyler.hightLight('edges', edge.selection)
        SelectionDataHandler.pushSelection('edges', edge.selection)
        nodes.push(DataHandler.newData[edge.data.source.id === entiy.id ? edge.data.target.id : edge.data.source.id].selection)
      })
    })
    nodes.forEach(node => {
      EntityStyler.hightLight('nodes', node)
      SelectionDataHandler.pushSelection(node)
    })
  },

  filter (type, objectProperty, filterType, parameter) {
    const newSelection = SelectionDataHandler.getCurrentSelection(type).filter(entity => {
      entity = entity.data()[0]
      switch (filterType) {
        case '>': {
          if (entity[objectProperty] > parameter) {
            return true
          }
          break
        }
        case '<': {
          if (entity[objectProperty] < parameter) {
            return true
          }
          break
        }
        case '=': {
          if (entity[objectProperty] === parameter) {
            return true
          }
          break
        }
      }
      return false
    })
  }

}
export default MiscTasks
