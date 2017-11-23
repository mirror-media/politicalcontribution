<template>
  <div id="app">
    <!-- We using Semantic UI Sidebar as a container for facebook comment(desktop) and hamburger menu(mobile) -->
    <div class="ui right sidebar vertical menu" id="comment-hamburger-sidebar">
      <RightSidebarContent @toggleSubscribe="toggleSubscribe"></RightSidebarContent>
    </div>
    <div class="pusher">
      <Landing></Landing>
      <InteractNav @toggleSubscribe="toggleSubscribe" @toggleSidebar="toggleSidebar"></InteractNav>
      <section class="content">
        <AsideNav @toggleSubscribe="toggleSubscribe" @toggleRelated="toggleRelated"></AsideNav>
        <!-- Related Modal -->
        <div id="modal-related" class="ui fullscreen modal">
          <img class="close-modal-button" src="~assets/images/x.png" alt="" @click="closeModal">
          <div class="scrolling content">
            <h1>相關討論</h1>
            <section>
              <div class="column">
                <RelatedCard href="http://www.cw.com.tw/article/article.action?id=5086097" imgsrc="https://cw1.tw/CW/images/article/201711/article-5a0520593968d.jpg" :meta="{ title: '《數據看天下》揭露2016立委選舉5大金主：遠東、裕隆、台泥、潤泰、仰德 - 林佳賢', date: '2017-11-10', source: '天下雜誌' }"></RelatedCard>
                <RelatedCard href="https://www.facebook.com/notes/%E5%8D%9E%E4%B8%AD%E4%BD%A9/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E8%B3%87%E6%96%99%E6%8C%96%E5%87%BA%E4%BB%80%E9%BA%BC%E8%99%B9%E8%86%9C%E7%94%9F%E7%89%A9%E8%BE%A8%E8%AD%98%E8%8D%89%E6%A1%88%E8%83%8C%E5%BE%8C%E7%9A%84%E6%94%BF%E5%95%86%E9%97%9C%E4%BF%82%E9%96%80%E9%81%93/10155438440707639/" imgsrc="https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/23519056_10155438679272639_5620726681130512789_n.jpg?oh=e8648aeae08f43dbc0e5ea29c35a3456&oe=5AABD92E" :meta="{ title: '政治獻金資料挖出什麼〈虹膜生物辨識草案〉背後的政商關係門道 - 卞中佩', date: '2017-11-17', source: 'Facebook' }"></RelatedCard>
              </div>
              <div class="column">
                <RelatedCard href="https://www.facebook.com/notes/claire-tsao/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E4%B9%8B%E9%81%B8%E5%8D%80%E6%84%9B%E4%BD%A0%E6%9C%89%E5%A4%9A%E5%B0%91/1946938758655360/" imgsrc="https://scontent.ftpe7-4.fna.fbcdn.net/v/t31.0-0/p600x600/23669162_1947125261970043_1720772919611582672_o.jpg?oh=3c4fb520dfe5fe6be085c781e76f737d&oe=5A97001E" :meta="{ title: '政治獻金之選區愛你有多少 - Claire Tsao', date: '2017-11-19', source: 'Facebook' }"></RelatedCard>
                <RelatedCard href="https://medium.com/@amossclaire/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E4%B9%8B%E7%84%A1%E7%94%A8%E5%9C%96%E5%A4%A7%E5%85%A8-21890c23409b" imgsrc="https://cdn-images-1.medium.com/max/1200/1*YUL3AOUeNqU4hzMY2u1m2w.png" :meta="{ title: '政治獻金之無用圖大全 - Claire Tsao', date: '2017-11-21', source: 'Medium' }"></RelatedCard>
              </div>
              <div class="column">
                <RelatedCard href="https://medium.com/@austinwang_23988/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91-%E4%BD%A0%E6%8E%8C%E6%8F%A1%E4%BA%86%E5%B0%8F%E9%A1%8D%E6%8D%90%E6%AC%BE-%E7%84%B6%E5%BE%8C%E5%91%A2-b61086e46e28" imgsrc="https://cdn-images-1.medium.com/max/1200/0*jaMVitINX6v5m3sM." :meta="{ title: '政治獻金：你掌握了小額捐款，然後呢？ - 王宏恩', date: '2017-11-21', source: 'Medium' }"></RelatedCard>
                <RelatedCard href="https://www.facebook.com/photo.php?fbid=10207812115739143&set=a.1273921706451.32156.1782190861&type=3&theater" imgsrc="https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/23755170_10207812115739143_4812201328584751937_n.jpg?oh=ac7a24ce790f4939b3ea95068b0c4b5f&oe=5A947254" :meta="{ title: '個人捐款比例與實際得票率散布圖 - 王銘宏', date: '2017-11-22', source: 'Facebook' }"></RelatedCard>
              </div>
            </section>
          </div>
        </div>
        <!--  -->
        <router-view/>
        <div v-show="$route.name" id="fb-comments-mobile" class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div>
      </section>
    </div>
  </div>
</template>

<script>
import Landing from '@/views/Landing'
import InteractNav from '@/components/InteractNav'
import RightSidebarContent from '@/components/RightSidebarContent'
import AsideNav from '@/components/AsideNav'
import RelatedCard from '@/components/RelatedCard'

// Vue mixins
import registerMailChimpPopup from '@/mixins/registerMailChimpPopup'
import setRightSidebar from '@/mixins/setRightSidebar'
import setAsideWaypoints from '@/mixins/waypoints/setAsideWaypoints'
import setInteractNavWaypoints from '@/mixins/waypoints/setInteractNavWaypoints'
import setMobileLogoShareWaypoints from '@/mixins/waypoints/setMobileLogoShareWaypoints'

import $ from 'jquery'
$.fn.modal = require('semantic-ui-modal')
$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.transition = require('semantic-ui-transition')

export default {
  name: 'app',
  components: {
    Landing,
    InteractNav,
    RightSidebarContent,
    AsideNav,
    RelatedCard
  },
  mixins: [
    registerMailChimpPopup,
    setRightSidebar,
    setAsideWaypoints,
    setInteractNavWaypoints,
    setMobileLogoShareWaypoints
  ],
  watch: {
    '$route.name' () {
      /* eslint-disable no-undef */
      if (this.$route.name) {
        // this.$scrollTo('.content')
        ga('send', 'pageview', { 'location': `https://www.mirrormedia.mg/projects/political-contribution/${this.$route.name}` })
      }
    },
    '$store.state.isRelatedModalShow' () {
      if (this.$store.state.isRelatedModalShow) {
        $('#modal-related')
        .modal({
          onShow: () => {
            document.querySelector('body').style.height = 'auto'
          },
          onHide: () => {
            this.$store.commit('CLOSE_RELATED_MODAL')
          },
          context: 'body'
        })
        .modal('show')
      } else {
        $('#modal-related').modal('hide')
      }
    }
  },
  methods: {
    toggleRelated () {
      this.$store.commit('OPEN_RELATED_MODAL')
    },
    closeModal () {
      this.$store.commit('CLOSE_RELATED_MODAL')
    }
  },
  created () {
    this.$store.dispatch('FETCH_LANDING_DATA')
  },
  mounted () {
    /* eslint-disable no-undef */
    if (!this.$route.name) {
      ga('send', 'pageview', { 'location': 'https://www.mirrormedia.mg/projects/political-contribution/' })
    }
  }
}
</script>

<style lang="stylus">
@import "../node_modules/semantic-ui-sidebar/sidebar.min.css"
@import "../node_modules/semantic-ui-menu/menu.min.css"
@import "../node_modules/semantic-ui-modal/modal.min.css"
@import "../node_modules/semantic-ui-dimmer/dimmer.min.css"
@import "../node_modules/semantic-ui-transition/transition.min.css"
@import '~@/styles/rightSidebar.styl'
@import '~@/styles/font.styl'
button:focus
  outline 0
#fb-comments-mobile
  display none

// .ui.fullscreen.modal
#modal-related
  .scrolling.content
    // padding 0 !important
    max-height 100vh !important
    height 90vh
    padding 0 20% !important
    box-sizing border-box
    h1
      font-weight 400
      margin-left 15px
    section
      display flex
      flex-direction row
      justify-content flex-start
      align-items flex-start
      .column
        display flex
        flex-direction column
        justify-content flex-start
        align-items flex-start
        width 90%
        // padding 50px
        margin 0 5px

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

@media (max-width: 767px)
  #fb-comments-mobile
    display block
    padding 0 5%
    box-sizing border-box
  #modal-related
    min-height 100% !important
    height 100% !important
    width 100% !important
    .close-modal-button
      top 0
      right 0
      width 25px
    .scrolling.content
      // padding 0 !important
      max-height 100vh !important
      height 100vh
      padding 0 !important
      box-sizing border-box
      h1
        font-weight 400
        margin-left 30px
      section
        display flex
        flex-direction column
        justify-content flex-start
        align-items center
        .column
          display flex
          flex-direction column
          justify-content flex-start
          align-items flex-start
          width 90%
          // padding 50px
          margin 0 5px
</style>
