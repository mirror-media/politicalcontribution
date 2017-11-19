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
        <AsideNav @toggleSubscribe="toggleSubscribe"></AsideNav>
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

// Vue mixins
import registerMailChimpPopup from '@/mixins/registerMailChimpPopup'
import setRightSidebar from '@/mixins/setRightSidebar'
import setAsideWaypoints from '@/mixins/waypoints/setAsideWaypoints'
import setInteractNavWaypoints from '@/mixins/waypoints/setInteractNavWaypoints'
import setMobileLogoShareWaypoints from '@/mixins/waypoints/setMobileLogoShareWaypoints'

export default {
  name: 'app',
  components: {
    Landing,
    InteractNav,
    RightSidebarContent,
    AsideNav
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
@import '~@/styles/rightSidebar.styl'
@import '~@/styles/font.styl'
button:focus
  outline 0
#fb-comments-mobile
  display none

@media (max-width: 767px)
  #fb-comments-mobile
    display block
    padding 0 5%
    box-sizing border-box
</style>
