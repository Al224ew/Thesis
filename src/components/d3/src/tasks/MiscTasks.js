import * as d3 from 'd3'
import EntityStyler from './helper/EntityStyler'
import SelectionDataHandler from '../Util/SelectionDataHandler'
import KeyEvents from './helper/KeyEvents'
const MiscTasks = {
  init () {
    KeyEvents.addFunctionToKeyPress(10, () => this.findAdjacents())
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
