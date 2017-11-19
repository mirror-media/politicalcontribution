import $ from 'jquery'
$.fn.sidebar = require('semantic-ui-sidebar')

const setRightSidebar = {
  methods: {
    toggleSidebar () {
      $('#comment-hamburger-sidebar').sidebar('toggle')
    },
    setSidebar () {
      $('#comment-hamburger-sidebar')
      .sidebar({
        onVisible () {
          document.body.style.overflow = 'hidden'
        },
        onHide () {
          document.body.style.overflow = 'scroll'
        },
        // dimPage: false,
        transition: 'overlay',
        mobileTransition: 'overlay',
        context: '#app'
      })
    }
  },
  mounted () {
    this.setSidebar()
  }
}

export default setRightSidebar
