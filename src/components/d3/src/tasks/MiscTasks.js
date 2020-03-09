import * as d3 from 'd3'
import EntityStyler from '../stylers/EntityStyler'
import SelectionDataHandler from '../component-task-connectors/SelectionDataHandler'
import KeyEvents from '../events/KeyEvents'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
import FilterConnector from '../component-task-connectors/FilterConnector'
import DataHandler from '../../../Data/DataHandler'
const MiscTasks = {
  init () {
    OptionsConnector.addTask('Find adjacent nodes', () => this.findAdjacents())
    KeyEvents.addFunctionToKeyPress(10, () => this.findAdjacents())
    OptionsConnector.addTask('Filter', () => FilterConnector.show())
    KeyEvents.addFunctionToKeyPress(25, () => this.filter('nodes', 'age', '>', 10))
  },

  findAdjacents () {
    const nodes = []
    SelectionDataHandler.getCurrentSelection('nodes').forEach(entiy => {
      entiy = entiy.data()[0]
      DataHandler.newData[entiy.id].edges.forEach(edge => {
        EntityStyler.hightLight('edges', edge.selection)
        SelectionDataHandler.pushSelection('edges', edge.selection)
        nodes.push(DataHandler.newData[edge.data.source.id === entiy.id ? edge.data.target.id : edge.data.source.id].selection)
      })
    })
    nodes.forEach(node => {
      EntityStyler.hightLight('nodes', node)
      SelectionDataHandler.pushSelection('nodes', node)
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
