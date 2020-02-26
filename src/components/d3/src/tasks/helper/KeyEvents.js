const KeyEvents = {
  keyPressed: -1,
  keyPressedFunc: [],
  initEvents () {
    window.addEventListener('keydown', (e) => {
      if (this.getKey() !== 17) {
        this.setKey(e.keyCode)
      }
    })
    window.addEventListener('keypress', (e) => {
      this.keyPressedFunc.forEach(keyEvent => {
        if (e.keyCode === keyEvent.keyCode) {
          keyEvent.func()
          e.preventDefault()
        }
      })
    })
    window.addEventListener('keyup', (e) => {
      if (this.getKey() === e.keyCode) { this.setKey(-1) }
    })
  },
  addFunctionToKeyPress (keyCode, func) {
    this.keyPressedFunc.push({ keyCode, func })
  },
  getKey () { return this.keyPressed },
  setKey (key) { this.keyPressed = key }
}
export default KeyEvents
