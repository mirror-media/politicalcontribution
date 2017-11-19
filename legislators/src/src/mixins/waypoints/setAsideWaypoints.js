import 'waypoints/lib/noframework.waypoints.js'

const setAsideWaypoints = {
  methods: {
    setAsideNavTrigger () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const landing = document.querySelector('.landing')
      const asideNav = document.querySelector('.aside-nav')
      new Waypoint({
        element: landing,
        handler: (direction) => {
          if (direction === 'down') {
            asideNav.classList.remove('fold')
            asideNav.classList.add('expand')
          } else if (direction === 'up') {
            asideNav.classList.remove('expand')
            asideNav.classList.add('fold')
          }
        },
        offset () {
          return -this.element.clientHeight
        }
      })
    }
  },
  mounted () {
    this.setAsideNavTrigger()
  }
}

export default setAsideWaypoints
