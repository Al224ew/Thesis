const FilterConnector = (function () {
  var showFunc = null
  function setShowFunc (func) {
    showFunc = func
  }

  function show () {
    showFunc()
  }

  return {
    setShowFunc: setShowFunc,
    show: show
  }
})()

export default FilterConnector
