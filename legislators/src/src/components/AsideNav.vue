<template>
  <aside class="aside-nav">
    <a href="https://www.mirrormedia.mg" target="_blank" onclick="ga('send', 'event', 'projects', 'click', 'back to home', { nonInteraction: false })"><img src="~assets/images/page-nav/logo-white.png" alt=""></a>
    <router-link class="nav-router-link" id="tool" to="/explore" @click.native="scroll('explore')" onclick="ga('send', 'event', 'projects', 'click', 'side to explore', { nonInteraction: false })"><span class="tooltiptext">查找政商關係</span></router-link>
    <router-link :class="['nav-router-link', {'router-link-active': $route.name === 'story1' || $route.name === 'story2' || $route.name === 'story3' || $route.name === 'story4'}]" id="text" to="/story4" @click.native="scroll('story4')" onclick="ga('send', 'event', 'projects', 'click', 'side to article', { nonInteraction: false })"><span class="tooltiptext">獻金解析文章</span></router-link>
    <router-link class="nav-router-link" id="story1" to="/story1" @click.native="scroll('story1')" onclick="ga('send', 'event', 'projects', 'click', 'side to article', { nonInteraction: false })"><span class="tooltiptext">選一次立委，金流超過 28 億！</span></router-link>
    <router-link class="nav-router-link" id="story2" to="/story2" @click.native="scroll('story2')" onclick="ga('send', 'event', 'projects', 'click', 'side to article', { nonInteraction: false })"><span class="tooltiptext">立委篇／老鳥與新秀，募款能力差了 6.6 倍</span></router-link>
    <router-link class="nav-router-link" id="story3" to="/story3" @click.native="scroll('story3')" onclick="ga('send', 'event', 'projects', 'click', 'side to article', { nonInteraction: false })"><span class="tooltiptext">企業篇／金權遊戲？翻開金主的投資名冊</span></router-link>
    <router-link class="nav-router-link" id="story4" to="/story4" @click.native="scroll('story4')" onclick="ga('send', 'event', 'projects', 'click', 'side to article', { nonInteraction: false })"><span class="tooltiptext">政治獻金開放了嗎？</span></router-link>
    <a id="paper" href="https://github.com/mirror-media/politicalcontribution" target="_blank" onclick="ga('send', 'event', 'projects', 'click', 'side to data', { nonInteraction: false })"><span class="tooltiptext">原始素材資料</span></a>
    <!-- <a class="nav-router-link subscribe" id="notice" to="/notice" @click="toggleSubscribe"></a> -->
  </aside>
</template>

<script>
export default {
  methods: {
    toggleSubscribe () {
      this.$emit('toggleSubscribe')
    },
    scroll (to) {
      if (this.$route.name === to) {
        this.$scrollTo('.content')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

landing-gradient = linear-gradient(to bottom, rgba(43,65,85,1) 0%, rgba(105,121,134,1) 50%, rgba(169,178,186,1) 100%)

@keyframes expand
  from
    left -50px
  to
    left 0
@keyframes fold
  from
    left 0
  to
    left -50px

.aside-nav
  flex(column, flex-start, center)
  width 50px
  height 100vh
  position fixed
  top 0
  left -50px
  background landing-gradient
  padding 10px 0
  z-index 100
  box-shadow 2px 0px 18px 0px rgba(0,0,0,0.33)
  &.expand
    animation-name expand
    animation-duration .2s
    animation-delay 0s
    animation-fill-mode forwards
  &.fold
    animation-name fold
    animation-duration .2s
    animation-delay 0s
    animation-fill-mode forwards
  a
    width 36px
    height 36px
    cursor pointer
    background-size 36px 36px
    background-repeat no-repeat
    position relative
    img
      width 36px
      height 36px
    &#paper
      background-image url('~assets/images/page-nav/paper-white.png')
      &:hover
        background-image url('~assets/images/page-nav/paper-blue.png')
      &.router-link-active
        background-image url('~assets/images/page-nav/paper-blue.png')
    &:hover
      .tooltiptext
        visibility visible
        opacity 1
    .tooltiptext
      visibility hidden
      width 120px
      background-color #555
      color white
      text-align center
      padding 5px 0
      // border-radius 6px

      /* Position the tooltip text */
      position absolute
      z-index 10
      top 3px
      left 300%
      margin-left -60px

      /* Fade in tooltip */
      opacity 0
      transition opacity 1s

    .tooltiptext::after
      content ""
      position absolute
      top 50%
      right 100%
      margin-top -5px
      border-width 5px
      border-style solid
      border-color transparent #555 transparent transparent
    &#tool
      background-image url('~assets/images/page-nav/tool-white.png')
      &:hover
        background-image url('~assets/images/page-nav/tool-blue.png')
      &.router-link-active
        background-image url('~assets/images/page-nav/tool-blue.png')
    // &#paper
    //   background-image url('~assets/images/page-nav/paper-white.png')
    //   &:hover
    //     background-image url('~assets/images/page-nav/paper-blue.png')
    //   &.router-link-active
    //     background-image url('~assets/images/page-nav/paper-blue.png')
    &#text
      background-size 36px 44px
      height 44px
      background-image url('~assets/images/page-nav/pencil.png')
      &:hover
        background-image url('~assets/images/page-nav/text-arrow.png')
      &.router-link-active
        background-image url('~assets/images/page-nav/text-arrow.png')
    &#story1
      margin-top 10px
      background-size 26px 26px
      width 26px
      height 26px
      background-image url('~assets/images/landing-nav/1.png')
      &:hover
        background-image url('~assets/images/landing-nav/1-blue.png')
      &.router-link-active
        background-image url('~assets/images/landing-nav/1-blue.png')
      .tooltiptext
        width max-content
        padding 5px 5px
        top 0
        margin-left -35px
    &#story2
      margin-top 10px
      background-size 26px 26px
      width 26px
      height 26px
      background-image url('~assets/images/landing-nav/2.png')
      &:hover
        background-image url('~assets/images/landing-nav/2-blue.png')
      &.router-link-active
        background-image url('~assets/images/landing-nav/2-blue.png')
      .tooltiptext
        width max-content
        padding 5px 5px
        top 0
        margin-left -35px
    &#story3
      margin-top 10px
      background-size 26px 26px
      width 26px
      height 26px
      background-image url('~assets/images/landing-nav/3.png')
      &:hover
        background-image url('~assets/images/landing-nav/3-blue.png')
      &.router-link-active
        background-image url('~assets/images/landing-nav/3-blue.png')
      .tooltiptext
        width max-content
        padding 5px 5px
        top 0
        margin-left -35px
    &#notice
      background-image url('~assets/images/page-nav/notice-white.png')
      &:hover
        background-image url('~assets/images/page-nav/notice-blue.png')
      &.router-link-active
        background-image url('~assets/images/page-nav/notice-blue.png')
    &#story4
      margin-top 10px
      background-size 26px 26px
      width 26px
      height 26px
      background-image url('~assets/images/landing-nav/4.png')
      &:hover
        background-image url('~assets/images/landing-nav/4-blue.png')
      &.router-link-active
        background-image url('~assets/images/landing-nav/4-blue.png')
      .tooltiptext
        width max-content
        padding 5px 5px
        top 0
        margin-left -35px
    &#notice
      background-image url('~assets/images/page-nav/notice-white.png')
      &:hover
        background-image url('~assets/images/page-nav/notice-blue.png')
      &.router-link-active
        background-image url('~assets/images/page-nav/notice-blue.png')
  a + a
    margin-top 20px

@media (max-width: 767px)
  .aside-nav
    display none
</style>


