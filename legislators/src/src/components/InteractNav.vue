<template>
  <nav class="interact-nav">
    <button id="subscribe-button" class="interact-nav__button subscribe-white" @click="toggleSubscribe"></button>
    <button id="comment-hamburger-button" class="interact-nav__button comment-hamburger-white" @click="toggleSidebar"></button>
    <Share class="share-desktop bottom"></Share>
  </nav>
</template>

<script>
import Share from '@/components/Share'

export default {
  components: {
    Share
  },
  methods: {
    toggleSubscribe () {
      /* eslint-disable no-undef */
      ga('send', 'event', 'projects', 'click', 'subscription', { nonInteraction: false })
      this.$emit('toggleSubscribe')
    },
    toggleSidebar () {
      /* eslint-disable no-undef */
      if (window.innerWidth > 767) {
        ga('send', 'event', 'projects', 'click', 'comments', { nonInteraction: false })
      } else {
        ga('send', 'event', 'projects', 'click', 'open drawer', { nonInteraction: false })
      }
      this.$emit('toggleSidebar')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

.interact-nav
  position fixed
  right 7px
  top 10px
  flex(column, center, center)
  z-index 1002
  // #comment-button
  &__button
    border none
    cursor pointer
    width 36px
    height 36px
    background-size 36px 36px
    background-repeat no-repeat
    background-color transparent
  #subscribe-button
    &.subscribe-white
      background-image url('~assets/images/page-nav/landing-notice.png')
      &:hover
        filter brightness(80%)
    // &.subscribe-blue
    //   background-image url('~assets/images/page-nav/notice-blue-frame.png')
    //   &:hover
    //     filter brightness(300%)
  #comment-hamburger-button
    margin-top 10px
    &.comment-hamburger-white
      background-image url('~assets/images/page-nav/landing-message.png')
      &:hover
        filter brightness(80%)
    // &.comment-hamburger-blue
    //   background-image url('~assets/images/page-nav/message-blue.png')
    //   &:hover
    //     filter brightness(300%)
  .share-desktop
    top calc(10px + 36px + 10px + 36px + 10px)
    right 7px

@media (max-width: 767px)
  .interact-nav
    #subscribe-button
      display none
    #comment-hamburger-button
      margin 0
      &.comment-hamburger-white
        background-image url('~assets/images/page-nav/hamburger-white.png')
      &.comment-hamburger-blue
        background-image url('~assets/images/page-nav/hamburger-blue-frame.png')
    .share-desktop
      display none
</style>


