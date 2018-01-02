<template>
  <nav>
    <ul>
      <router-link to="/explore" @click.native="scroll('explore', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to explore', { nonInteraction: false })">
        <img src="~assets/images/landing-nav/tool.png" alt="查找政商關係"><h2>查找政商關係</h2>
      </router-link>
      <router-link to="/story4" class="story" @click.native="scroll('story4', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
        <div class="story__heading"><img src="~assets/images/landing-nav/pen.png" alt="獻金解析文章"><h2>獻金解析文章</h2></div>
        <nav v-if="storyPublishedCount >= 2" class="story__nav">
          <router-link to="/story1" class="story" @click.native="scroll('story1', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
            <img v-if="storyPublishedCount >= 2" src="~assets/images/landing-nav/1-blue.png" alt="獻金解析文章1">
          </router-link>
          <router-link to="/story2" class="story" @click.native="scroll('story2', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
            <img v-if="storyPublishedCount >= 2" src="~assets/images/landing-nav/2-blue.png" alt="獻金解析文章2">
          </router-link>
          <router-link to="/story3" class="story" @click.native="scroll('story3', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
            <img v-if="storyPublishedCount >= 3" src="~assets/images/landing-nav/3-blue.png" alt="獻金解析文章3">
          </router-link>
          <router-link to="/story4" class="story" @click.native="scroll('story4', $event)" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
            <img v-if="storyPublishedCount >= 4" src="~assets/images/landing-nav/4-blue.png" alt="獻金解析文章4">
          </router-link>
          <!-- <router-link to="/story5" class="story" @click.native="scroll('story1')" onclick="ga('send', 'event', 'projects', 'click', 'master to article', { nonInteraction: false })">
            <img v-if="storyPublishedCount >= 5" src="~assets/images/landing-nav/5-blue.png" alt="獻金解析文章5">
          </router-link> -->
        </nav>
      </router-link>
      <a href="https://campaign-finance.g0v.ctiml.tw/" target="_blank" onclick="ga('send', 'event', 'projects', 'click', 'master to event2.0', { nonInteraction: false })">
        <img src="~assets/images/landing-nav/revolution.png" alt="鍵盤救國一起來"><h2>鍵盤救國<br>一起來</h2>
      </a>
      <a href="https://github.com/mirror-media/politicalcontribution" target="_blank" onclick="ga('send', 'event', 'projects', 'click', 'master to data', { nonInteraction: false })">
        <img src="~assets/images/landing-nav/paper.png" alt="原始素材資料"><h2>原始素材資料</h2>
      </a>
    </ul>
  </nav>
</template>

<script>

export default {
  data () {
    return {
      storyPublishedCount: this.$store.state.storyPublishedCount
    }
  },
  methods: {
    scroll (to, event) {
      if (this.$route.name === to) {
        event.stopPropagation()
        this.$scrollTo('.content')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

@keyframes fadeIn
  from
    opacity 0
  to
    opacity 1
@keyframes pulse
  from
    transform scale(1)
  to
    transform scale(1.1)

$sectionNavPosition
  position absolute
  top 50%
  left 10%
$sectionNavAnimation
  opacity 0
  animation-name fadeIn
  animation-delay 0.5s
  animation-duration 1s
  animation-fill-mode forwards

$sectionIconDimensions
  width calc(1.17em * 2)
  height calc(1.17em * 2)
$storyIconDimensions
  width 32px
  height 32px

$reset-h2-style
  display inline
  margin 0 0 0 0.5rem
  font-weight normal

nav
  // @extends $sectionNavPosition
  @extends $sectionNavAnimation
  ul
    padding 0
    a
      flex(row, center, center)
      list-style none
      color white
      // border 1px solid white
      box-sizing border-box
      padding 0.5rem
      text-decoration none
      background-color #152538
      box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
      &[href="https://campaign-finance.g0v.ctiml.tw/"]
        background-color #F5A623
        color black
      img
        @extends $sectionIconDimensions
        &[alt="鍵盤救國一起來"]
          width calc(1.17em * 4)
          height calc(1.17em * 4)
      h2
        @extends $reset-h2-style
      &:hover
        cursor pointer
        // filter brightness(90%)
        transform scale(1)
        animation-name pulse
        animation-duration 0.2s
        animation-fill-mode forwards
    .story
      flex(column, center, flex-end)
      &__heading
        flex(row, center, center)
      &__nav
        margin-top 0.5rem
        position static
        width 80%
        flex(row, space-around, center)
        a
          box-shadow none
          padding 0
          margin 0
          width auto
          height auto
          img
            @extends $storyIconDimensions
            &:hover
              cursor pointer
              filter brightness(50%)
              transform scale(1)
              animation-name pulse
              animation-duration 0.2s
              animation-fill-mode forwards
    a + a
      margin-top 1rem

@media (max-width: 767px)
  nav
    top 50%
    left 0
    width 100vw
    flex(column, center, center)
    ul
      width 50%
      padding 0
      a
        img
          width 22px
          height 22px
          &[alt="鍵盤救國一起來"]
            width calc(1.17em * 2)
            height calc(1.17em * 2)
      .story
        flex(column, center, center)
@media (max-width: 413px)
  nav
    ul
      width 60%
@media (max-width: 374px)
  nav
    ul
      a
        img
          width 16px
          height 16px
</style>


