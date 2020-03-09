const OptionsHandler = (function () {
  var updateStateFunc = null
  var taskList = []
  function setUpdateStateFunc (func) {
    updateStateFunc = func
  }

  function updateState () {
    updateStateFunc(taskList)
  }

  function addTask (name, func) {
    taskList.push({ name, func })
    updateState()
  }

  return {
    addTask: addTask,
    setUpdateStateFunc: setUpdateStateFunc
  }
})()

export default OptionsHandler
