import 'waypoints/lib/noframework.waypoints.js'

const setMobileLogoShareWaypoints = {
  methods: {
    setMobileLogoShareTrigger () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const landing = document.querySelector('.landing')

      const logo = document.querySelector('.landing a[href="https://www.mirrormedia.mg"]')
      const share = document.querySelector('.share.share-mobile .nav--btn.share')
      new Waypoint({
        element: landing,
        handler: (direction) => {
          if (window.innerWidth <= 767) {
            if (direction === 'down') {
              logo.classList.remove('logo-white')
              logo.classList.add('logo-blue')

              share.classList.remove('share-white')
              share.classList.add('share-blue')
            } else if (direction === 'up') {
              logo.classList.remove('logo-blue')
              logo.classList.add('logo-white')

              share.classList.remove('share-blue')
              share.classList.add('share-white')
            }
          }
        },
        offset () {
          return -this.element.clientHeight + 36 + 10
        }
      })
    }
  },
  mounted () {
    this.setMobileLogoShareTrigger()
  }
}

export default setMobileLogoShareWaypoints
