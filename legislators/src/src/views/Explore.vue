<template>
  <div id="tool">
    <template v-if="!dataFetchingComplete">
      <div class="loading-page">
        <p>Loading...</p>
      </div>
    </template>
    <template v-if="dataFetchingComplete">
      <List :abstractData="abstractData" @clickCandidate="clickCandidate" @sortList="sortList"></List>
      <div id="modal" class="ui fullscreen modal">
        <img class="close-modal-button" src="~assets/images/x.png" alt="" @click="closeModal">
        <div class="scrolling content">
          <Modal :abstractData="abstractData" :detailData="detailData" :clickedCandidateName="clickedCandidateName"></Modal>
        </div>
      </div>
      <PK :abstractData="abstractData" :sortWathcer="sortType"></PK>
    </template>
    <!-- <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div> -->
  </div>
</template>

<script>
import List from './explore/List'
import Modal from './explore/Modal'
import PK from './explore/PK'

// import * as d3 from 'd3'
import $ from 'jquery'

$.fn.modal = require('semantic-ui-modal')
$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.transition = require('semantic-ui-transition')

export default {
  components: {
    List,
    Modal,
    PK
  },
  data () {
    return {
      clickedCandidateName: null,
      sortType: '政黨'
    }
  },
  computed: {
    dataFetchingComplete () {
      return this.$store.getters.exist.abstractData && this.$store.getters.exist.detailData
    },
    abstractData () {
      return this.$store.state.abstractData
    },
    detailData () {
      return this.$store.state.detailData
    }
  },
  methods: {
    clickCandidate (name) {
      this.clickedCandidateName = name
      $('#modal')
      .modal({
        onShow: () => {
          document.querySelector('body').style.height = 'auto'
          // document.querySelector('body').style.overflow = 'hidden'
        },
        onHide: () => {
          this.clickedCandidateName = null
        },
        context: 'body'
      })
      .modal('show')
    },
    sortList (type) {
      this.sortType = type
    },
    closeModal () {
      this.clickedCandidateName = null
      $('#modal').modal('hide')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!from.name) {
        vm.$scrollTo('.content')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    $('#modal').remove()
    next()
  },
  created () {
    if (!this.$store.getters.exist.abstractData && !this.$store.getters.exist.detailData) {
      this.$store.dispatch('FETCH_CSV_DATA')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../node_modules/semantic-ui-modal/modal.min.css"
@import "../../node_modules/semantic-ui-dimmer/dimmer.min.css"
@import "../../node_modules/semantic-ui-transition/transition.min.css"
@import "~@/styles/util.styl"

#tool
  .loading-page
    height 100vh
    flex(row, center, center)
    
*:not(i)
  font-family 'Montserrat', 'Noto Sans TC', 'Avenir', Helvetica, Arial, sans-serif !important
  -webkit-font-smoothing antialiased !important
  -moz-osx-font-smoothing grayscale !important

button:focus 
  outline 0
  
.ui.fullscreen.modal
  .scrolling.content
    padding 0 !important
    max-height 100vh !important

.close-modal-button
  position absolute
  top -25px
  right -25px
  width 50px
  border 1px solid white
  border-radius 0 !important
  cursor pointer
  z-index 10
  &:hover
    filter brightness(90%)

.fb-comments
  display none

// For iPhone 6+
@media (max-width: 767px)
  .ui.fullscreen.modal
    // max-height 90% !important
    // overflow scroll
    // top 5%
    min-height 100% !important
    height 100% !important
    width 100% !important
    .close-modal-button
      top 0
      right 0
      width 25px
  .fb-comments
    display block
    padding 0 15px
    box-sizing border-box
</style>


