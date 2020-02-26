const SelectionDataHandler = {
  stateFunc: null,
  currentSelection: {
    nodes: [],
    edges: []
  },
  previousSelection: [],

  init (func) {
    this.stateFunc = func
  },

  getCurrentSelection (type) {
    return this.currentSelection[type]
  },

  setCurrentSelection () {
    if (this.currentSelection.nodes.length < 1) { return }
    this.stateFunc(this.currentSelection.nodes)
  },

  revertSelection () {
    console.log('reverthing.')
    this.currentSelection = this.previousSelection.pop()
    if (typeof this.currentSelection === 'undefined') {
      console.log('undefined')
      this.currentSelection = {
        nodes: [],
        edges: []
      }
    }
    console.log(this.currentSelection)
    this.setCurrentSelection()
    return this.currentSelection
  },

  pushSelection (type, item) {
    if (item === null) return
    this.currentSelection[type].push(item)
    this.setCurrentSelection()
  },

  newSelection (type, item) {
    if (item === null) return
    if (!this.isCurrentSelectionEmpty()) {
      this.previousSelection.push(Object.assign({}, this.currentSelection))
    }
    this.currentSelection.nodes = type === 'nodes' ? (Array.isArray(item) ? item : [item]) : []
    this.currentSelection.edges = type === 'edges' ? (Array.isArray(item) ? item : [item]) : []
    this.setCurrentSelection()
  },
  isCurrentSelectionEmpty () {
    return (this.currentSelection.nodes.length < 1) && (this.currentSelection.edges.length < 1)
  }
}

export default SelectionDataHandler
