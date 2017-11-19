import 'waypoints/lib/noframework.waypoints.js'

const setPKButtonWaypoints = {
  methods: {
    setPKButtonTrigger () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const content = document.querySelector('.content')
      const PKButton = document.querySelector('.comparsion-container button[type="anchorAndReset"]')
      new Waypoint({
        element: content,
        handler: (direction) => {
          if (direction === 'down') {
            PKButton.style.display = 'initial'
          } else if (direction === 'up') {
            PKButton.style.display = 'none'
          }
        },
        // Whe top of the content container hit the bottom of the window
        offset: '100%'
      })
    }
  },
  mounted () {
    this.setPKButtonTrigger()
  }
}

export default setPKButtonWaypoints
