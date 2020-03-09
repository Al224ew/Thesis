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
    this.stateFunc(this.currentSelection.nodes)
  },

  revertSelection () {
    this.currentSelection = this.previousSelection.pop()
    if (typeof this.currentSelection === 'undefined') {
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
    if (Array.isArray(item)) {
      item.forEach(currentItem => {
        this.currentSelection[type][currentItem.data()[0].index] = currentItem
      })
    } else {
      this.currentSelection[type][item.data()[0].index] = item
    }
    console.log(item.data()[0].index)
    console.log(item.data()[0])
    this.setCurrentSelection()
  },

  newSelection (type, item) {
    if (item === null) return
    if (!this.isCurrentSelectionEmpty()) {
      this.previousSelection.push(Object.assign({}, this.currentSelection))
    }
    this.currentSelection.nodes = []
    this.currentSelection.edges = []
    if (Array.isArray(item)) {
      item.forEach(currentItem => {
        this.currentSelection[type][currentItem.data()[0].index] = currentItem
      })
    } else {
      this.currentSelection[type][item.data()[0].index] = item
    }
    this.setCurrentSelection()
  },
  isCurrentSelectionEmpty () {
    return (this.currentSelection.nodes.length < 1) && (this.currentSelection.edges.length < 1)
  }
}

export default SelectionDataHandler
