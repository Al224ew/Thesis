/**
 * StateHandler is used whenever keyStrokes should enable different functions without the keys being held down.
 * States inside the array will hold values with name of the tasks being assciated with a state.
 */

const StateHandler = {

  states: {
    wheel: {
      states: [],
      currentState: 'default',
      defaultState: 'default'
    },
    mousemove: {
      states: [],
      currentState: 'default',
      defaultState: 'default'
    },
    mouseup: {
      states: [],
      currentState: 'default',
      defaultState: 'default'
    },
    contextmenu: {
      states: [],
      currentState: 'default',
      defaultState: 'default'
    },
    click: {
      states: [],
      currentState: 'default',
      defaultState: 'default'
    }
  },
  revertDefaultState (eventType) {
    const event = this.states[eventType.toLowerCase()]
    event.currentState = event.defaultState
  },
  setDefaultState (eventType, state) {
    this.states[eventType.toLowerCase()].defaultState = state
  },
  stateChange (eventType, state) {
    this.states[eventType.toLowerCase()].currentState = state
  },
  addState (eventType, task, func) {
    this.states[eventType.toLowerCase()].states[task] = func
  },
  functionFromState (eventType) {
    const event = this.states[eventType.toLowerCase()]
    return typeof event.states[event.currentState] === 'undefined' ? () => NaN : event.states[event.currentState]
  }

}
export default StateHandler
