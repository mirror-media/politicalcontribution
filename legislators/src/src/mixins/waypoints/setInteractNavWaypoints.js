import 'waypoints/lib/noframework.waypoints.js'

const setInteractNavWaypoints = {
  methods: {
    setCommentShareTrigger () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      /* eslint no-new: "off" */

      const landing = document.querySelector('.landing')

      // const subscribe = document.querySelector('.interact-nav #subscribe-button')
      const comment = document.querySelector('.interact-nav #comment-hamburger-button')
      // const share = document.querySelector('.interact-nav .nav--btn.share')
      new Waypoint({
        element: landing,
        handler: (direction) => {
          if (window.innerWidth <= 767) {
            if (direction === 'down') {
              // subscribe.classList.remove('subscribe-white')
              // subscribe.classList.add('subscribe-blue')

              comment.classList.remove('comment-hamburger-white')
              comment.classList.add('comment-hamburger-blue')

              // share.classList.remove('share-white')
              // share.classList.add('share-blue')
            } else if (direction === 'up') {
              // subscribe.classList.remove('subscribe-blue')
              // subscribe.classList.add('subscribe-white')

              comment.classList.remove('comment-hamburger-blue')
              comment.classList.add('comment-hamburger-white')

              // share.classList.remove('share-blue')
              // share.classList.add('share-white')
            }
          }
        },
        offset () {
          // return window.innerWidth > 767 ? -this.element.clientHeight + 36 * 3 + 10 * 3 : -this.element.clientHeight + 36 + 10
          return -this.element.clientHeight + 36 + 10
        }
      })
    }
  },
  mounted () {
    this.setCommentShareTrigger()
  }
}

export default setInteractNavWaypoints
