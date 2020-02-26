import Leap from 'leapjs'
export default class LeapHandler {
  run (func) {
    var controller = new Leap.Controller()
    controller.on('connect', function () {
      setInterval(() => {
        var frame = controller.frame()
        let string = ''

        if (frame.hands.length > 0) {
          frame.hands[0].fingers.forEach((finger, index) => {
            string += 'Finger - ' + finger.type + '\n' + finger.extended + ' ---  '
          })
        }
        // console.log(frame)
        func(string)
      }, 500)
    })
    controller.connect()
  }
}
