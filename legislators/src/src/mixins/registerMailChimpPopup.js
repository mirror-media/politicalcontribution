const registerMailChimpPopup = {
  data () {
    return {
      clickSubscribe: false
    }
  },
  methods: {
    toggleSubscribe () {
      /* eslint-disable */
      if (!this.clickSubscribe) {
        showMailingPopUp()
        this.clickSubscribe = true
        setTimeout(() => { this.clickSubscribe = false }, 1000)
      }
    }
  }
}

export default registerMailChimpPopup
