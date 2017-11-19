<template>
  <div class="share">
    <a class="nav--btn share share-white" @click="toggleShare()"></a>
    <a id="share-line" class="share__icon share__icon--list share--line" :class="[isOpen ? 'open' : '']" @click="shareLine()" target="_blank" href="http://line.naver.jp/R/msg/text/?原住民人口佔台灣總數2.4%，重要國際場合和競賽中，他們的身影卻從不曾缺席；但⋯他們的傳統名字經常是缺席的⋯⋯%0D%0Ahttps://www.mirrormedia.mg/projects/political-contribution/"><img src="~assets/images/social-media-icon/line_white_v2.png" alt="Line"></a>
    <a id="share-fb" class="share__icon share__icon--list share--fb" :class="[isOpen ? 'open' : '']" @click="shareFacebook()" target="_blank" href="https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/political-contribution/" ><img src="~assets/images/social-media-icon/facebook_white.png" alt="Facebook"></a>
    <a id="share-google" class="share__icon share__icon--list share--google" :class="[isOpen ? 'open' : '']" @click="shareGooglePlus()" target="_blank" href="https://plus.google.com/share?url=https://www.mirrormedia.mg/projects/political-contribution/"><img src="~assets/images/social-media-icon/google-plus.png" alt="Google Plus"></a>
  </div>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    shareGooglePlus () {
      /* eslint-disable no-undef */
      ga('send', 'event', 'projects', 'click', 'share to gplus', { nonInteraction: false })
    },
    shareLine () {
      /* eslint-disable no-undef */
      ga('send', 'event', 'projects', 'click', 'share to line', { nonInteraction: false })
    },
    shareFacebook () {
      /* eslint-disable no-undef */
      ga('send', 'event', 'projects', 'click', 'share to fb', { nonInteraction: false })
    },
    toggleShare () {
      this.isOpen = !this.isOpen

      this.isOpen ? document.querySelector('.header__title-container').className += ' open' : document.querySelector('.header__title-container').classList.remove('open')
    }
  }
}
</script>

<style lang="stylus" scoped>

.share
  z-index 500
  cursor pointer
  width 36px
  height 36px
  background-size 36px 36px
  background-repeat no-repeat
  background-color transparent
  position fixed
  // top calc(10px + 36px + 10px + 36px + 10px)
  // right 7px
  &.share-white
    background-image url('~assets/images/page-nav/share-white.png')
    &:hover
      filter brightness(80%)
  &.share-blue
    background-image url('~assets/images/page-nav/share-blue.png')
    &:hover
      filter brightness(300%)
  &.bottom
    .share-white
      background-image url('~assets/images/page-nav/landing-share.png')
  &__icon
    opacity 0
    display flex
    justify-content center
    align-items center
    position fixed
    top auto
    left auto
    width 36px
    height 36px
    border-radius 36px
    font-size 0
    transition transform .2s ease-out
    > img
      width auto
      height 20px
      .share--list
        top calc(10px + 36px + 10px + 36px + 10px)
    &.right
      .share--list
        left calc(7px + 36px + 10px)

  &--toggle
    width 36px
    height 36px
    border-radius 36px
    z-index 500

  &--line
    z-index 400
    background-color #00c300
    &.open
      transition-duration .19s
      opacity 1
    > img
      width 20px
      height auto
      
  &--fb
    z-index 400
    background-color #3b5998
    &.open
      transition-duration .19s
      opacity 1
    > img
      width 15px
      height auto
      
  &--google
    z-index 400
    background-color #dd4b39
    &.open
      transition-duration .19s
      opacity 1
    > img
      width 20px
      height auto
.activity
    &__share
      display block
      z-index 999

.share
  &.top
    .share--line
      &.open
        transform translate3d(0,-150px,0)
    .share--fb
      &.open
        transform translate3d(0,-100px,0)
    .share--google
      &.open
        transform translate3d(0,-50px,0)
  &.right
    .share--line
      &.open
        transform translate3d(150px,0,0)
    .share--fb
      &.open
        transform translate3d(100px,0,0)
    .share--google
      &.open
        transform translate3d(50px,0,0)
  &.bottom
    .share--line
      &.open
        transform translate3d(0,150px,0)
    .share--fb
      &.open
        transform translate3d(0,100px,0)
    .share--google
      &.open
        transform translate3d(0,50px,0)
  &.left
    .share--line
      &.open
        transform translate3d(-150px,0,0)
    .share--fb
      &.open
        transform translate3d(-100px,0,0)
    .share--google
      &.open
        transform translate3d(-50px,0,0)

</style>
