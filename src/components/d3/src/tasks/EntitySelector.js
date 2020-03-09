import SelectionDataHandler from '../component-task-connectors/SelectionDataHandler'
import EntityStyler from '../stylers/EntityStyler'
import StateHandler from '../handlers/StateHandler'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
const EntitySelector = {
  init (node, edge) {
    const pointer = () => { document.body.style.cursor = 'pointer' }
    const normal = () => { document.body.style.cursor = 'default' }
    // Statehandler
    StateHandler.addState('nodeClick', 'default', (node) => this.select('nodes', node))
    StateHandler.addState('edgeClick', 'default', (edge) => this.select('edges', edge))
    StateHandler.addState('nodeClick', 'multiSelect', (node) => this.multiSelect('nodes', node))
    StateHandler.addState('edgeClick', 'multiSelect', (edge) => this.multiSelect('edges', edge))
    StateHandler.addState('click', 'default', () => this.deselect())
    // OptionsConnector
    OptionsConnector.addTask('Deselect all', () => this.deselectCurrentSelection(true))
    OptionsConnector.addTask('Previous selection', () => this.previousSelection())
    OptionsConnector.addTask('Multiselect mode', () => {
      if (StateHandler.getCurrentState('nodeClick') === 'multiSelect') {
        StateHandler.revertDefaultState('nodeClick')
        StateHandler.revertDefaultState('edgeClick')
      } else {
        StateHandler.stateChange('nodeClick', 'multiSelect')
        StateHandler.stateChange('edgeClick', 'multiSelect')
      }
    })
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
    if (typeof cSelection === 'undefined') {
      return
    }
    cSelection.nodes.forEach(node => {
      EntityStyler.hightLight('nodes', node)
    })
    cSelection.edges.forEach(edge => {
      EntityStyler.hightLight('edges', edge)
    })
  },

  /**
   * Used to select entitys and utilize the SelectionDataHandler to store the selection
   * @param {} type - nodes or edges
   * @param {} entity - the selection of the node/edge.
   */
  select (type, entity) {
    console.log(type)
    console.log(entity.data()[0].index)
    this.deselectCurrentSelection(false)
    SelectionDataHandler.newSelection(type, entity)
    EntityStyler.hightLight(type, entity)
  },
  multiSelect (type, entity) {
    SelectionDataHandler.pushSelection(type, entity)
    EntityStyler.hightLight(type, entity)
  }
}

export default EntitySelector
