import 'waypoints/lib/noframework.waypoints.js'

const setStory3FaceWaypoints = {
  methods: {
    setStory3FaceTriggerTop () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const chart = document.querySelector('.chart-container-face')
      const tooltip = document.querySelectorAll('.tooltip-face')

      new Waypoint({
        element: chart,
        handler: (direction) => {
          if (direction === 'up') {
            tooltip.forEach(d => {
              d.style.display = 'none'
            })
          }
        },
        // Whe top of the content container hit the top of the window
        offset: '0%'
      })
    },
    setStory3FaceTriggerBottom () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const chart = document.querySelector('.chart-container-face')
      const tooltip = document.querySelectorAll('.tooltip-face')

      new Waypoint({
        element: chart,
        handler: (direction) => {
          if (direction === 'down') {
            tooltip.forEach(d => {
              d.style.display = 'none'
            })
          }
        },
        // Whe bottom of the content container hit the bottom of the window
        offset: 'bottom-in-view'
      })
    },
    setStory3FaceTriggerBottomHitTop () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const chart = document.querySelector('.chart-container-face')
      const tooltip = document.querySelectorAll('.tooltip-face')

      new Waypoint({
        element: chart,
        handler: (direction) => {
          if (direction === 'down') {
            tooltip.forEach(d => {
              d.style.display = 'none'
            })
          }
        },
        // Whe bottom of the content container hit the bottom of the window
        offset () {
          return -this.element.clientHeight
        }
      })
    }
  },
  updated () {
    if (window.innerWidth <= 767 && document.querySelectorAll('.tooltip-face')[0]) {
      this.setStory3FaceTriggerTop()
      this.setStory3FaceTriggerBottom()
      this.setStory3FaceTriggerBottomHitTop()
    }
  }
}

export default setStory3FaceWaypoints
