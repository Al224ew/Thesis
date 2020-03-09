import SelectionDataHandler from '../component-task-connectors/SelectionDataHandler'
import EntityStyler from '../stylers/EntityStyler'
import KeyEvents from '../events/KeyEvents'
import StateHandler from '../handlers/StateHandler'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
import * as d3 from 'd3'
const EntitySelector = {
  init (node, edge) {
    const pointer = () => { document.body.style.cursor = 'pointer' }
    const normal = () => { document.body.style.cursor = 'default' }
    OptionsConnector.addTask('Deselect all', () => this.deselectCurrentSelection(true))
    OptionsConnector.addTask('Previous selection', () => this.previousSelection())
    OptionsConnector.addTask('Multiselect mode', () => {
      if (KeyEvents.getKey() === 17) {
        KeyEvents.setKey(-1)
      } else { KeyEvents.setKey(17) }
    })
    KeyEvents.addFunctionToKeyPress(26, () => this.previousSelection())
    const _this = this
    node
      .on('click', function () {
        _this.select('nodes', d3.select(this))
        d3.event.stopPropagation()
      })
      .on('mouseenter', pointer)
      .on('mouseout', normal)

    edge
      .on('click', function () {
        _this.select('edges', d3.select(this))
        d3.event.stopPropagation()
      })
      .on('mouseenter', pointer)
      .on('mouseout', normal)

    StateHandler.addState('click', 'default', () => this.deselect())
  },
  /**
   * Resets the current selection, by normalizing the style of each current selection.
   * @param {} emptyCurrent - If the selection should be emptied inside the selection handler aswell.
   */
  deselectCurrentSelection (emptyCurrent) {
    if (SelectionDataHandler.isCurrentSelectionEmpty()) return
    SelectionDataHandler.getCurrentSelection('nodes').forEach(entity => {
      EntityStyler.normalize('nodes', entity)
    })
    SelectionDataHandler.getCurrentSelection('edges').forEach(entity => {
      EntityStyler.normalize('edges', entity)
    })
    if (emptyCurrent) {
      SelectionDataHandler.newSelection('nodes', [])
      SelectionDataHandler.newSelection('edges', [])
    }
  },

  /**
   * Double click to reset selection.
   */
  deselectionClicks: 0,
  deselect () {
    if (this.deselectionClicks === 1) {
      this.deselectCurrentSelection(true)
    } else {
      this.deselectionClicks++
      setTimeout(() => {
        this.deselectionClicks = 0
      }, 500)
    }
  },

  /**
   * Will set the current selection to the previous selection.
   */
  previousSelection () {
    this.deselectCurrentSelection(false)
    const cSelection = SelectionDataHandler.revertSelection()
    console.log(cSelection)
    if (typeof cSelection === 'undefined') {
      console.log('returining')
      return
    }
    cSelection.nodes.forEach(node => {
      console.log(node)
      EntityStyler.hightLight('nodes', node)
    })
    cSelection.edges.forEach(edge => {
      EntityStyler.hightLight('edges', edge)
    })
  },

  /**
   * Will push the node selected to the selection stack.
   * If ctrl is pressed it's counted as multiple selection.
   * @param {} node
   */
  select (type, entity) {
    if (KeyEvents.getKey() === 17) {
      SelectionDataHandler.pushSelection(type, entity)
    } else {
      this.deselectCurrentSelection(false)
      SelectionDataHandler.newSelection(type, entity)
    }

    EntityStyler.hightLight(type, entity)
  }
}

export default EntitySelector
