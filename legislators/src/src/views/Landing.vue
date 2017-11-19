<template>
  <section class="landing">
    <a href="https://www.mirrormedia.mg" class="logo-white" target="_blank" onclick="ga('send', 'event', 'projects', 'click', 'back to home', { nonInteraction: false })"></a>
    <section class="intro">
      <h1 id="title">數讀<br>政治獻金</h1>
      <SectionNav></SectionNav>
    </section>
    <Share class="share-mobile right"></Share>
    <Force></Force>
  </section>
</template>

<script>
import Force from '@/components/landing/Force'
import SectionNav from '@/components/landing/SectionNav'
import Share from '@/components/Share'

export default {
  components: {
    Force,
    SectionNav,
    Share
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

@keyframes titleFadeIn
  from
    opacity 0
  to
    opacity 1

landing-gradient = linear-gradient(to bottom, rgba(43,65,85,1) 0%, rgba(105,121,134,1) 50%, rgba(169,178,186,1) 100%)

$landingSection
  width 100vw
  height 100vh
  background landing-gradient
  position relative
  overflow hidden

$logoLink
  width 36px
  height 36px
  cursor pointer
  position absolute
  top 10px
  left 7px
  img
    width 36px
    height 36px

.landing
  @extends $landingSection
  display flex
  .intro
    flex(column, center, flex-start)
    align-self center
    width 30%
    height 100vh
    position absolute
    left 10%
    z-index 1001
    #title
      // position absolute
      // top 20%
      // left 10%
      margin-bottom 1rem
      color white
      font-size 5rem
      font-weight 800
      z-index 1000
      opacity 0
      animation-name titleFadeIn
      animation-delay 0.5s
      animation-duration 1s
      animation-fill-mode forwards
  a[href="https://www.mirrormedia.mg"]
    @extends $logoLink
    z-index 1001
    background-size 36px 36px
    background-repeat no-repeat
    background-color transparent
    &.logo-white
      background-image url('~assets/images/page-nav/logo-white.png')
    &.logo-blue
      background-image url('~assets/images/page-nav/logo-mobile.png')
    &:hover
      filter brightness(80%)
  .share-mobile
    display none

@media (max-width: 767px)
  .landing
    .intro
      flex(column, center, flex-start)
      align-self center
      width 100vw
      height 100%
      position absolute
      left 0
      z-index 1001
      #title
        flex(column, center, center)
        text-shadow 1px 1px 8px rgba(0, 0, 0, 0.5)
        text-align center
        font-size 4rem
        width 100%
        top 10%
        left auto
    a[href="https://www.mirrormedia.mg"]
      position fixed
    .share-mobile
      display initial
      top 10px
      left calc(7px + 36px + 10px)
</style>
