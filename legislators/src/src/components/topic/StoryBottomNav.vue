<template>
  <ul>
    <h2>相關文章</h2>
    <router-link class="nav-router-link" id="story1-bottom" v-scroll-to="'.content'" to="/story1" onclick="ga('send', 'event', 'projects', 'click', 'end to article', { nonInteraction: false })"><p>選一次立委，金流超過 28 億！</p></router-link>
    <router-link class="nav-router-link" id="story2-bottom" v-scroll-to="'.content'" to="/story2" onclick="ga('send', 'event', 'projects', 'click', 'end to article', { nonInteraction: false })"><p>立委篇／老鳥與新秀，募款能力差了 6.6 倍</p></router-link>
    <router-link class="nav-router-link" id="story3-bottom" v-scroll-to="'.content'" to="/story3" onclick="ga('send', 'event', 'projects', 'click', 'end to article', { nonInteraction: false })"><p>企業篇／金權遊戲？翻開金主的投資名冊</p></router-link>
    <router-link class="nav-router-link" id="story4-bottom" v-scroll-to="'.content'" to="/story4" onclick="ga('send', 'event', 'projects', 'click', 'end to article', { nonInteraction: false })"><p>政治獻金開放了嗎？</p></router-link>
    <a class="nav-router-link" id="related-bottom" @click="$store.commit('OPEN_RELATED_MODAL')" onclick="ga('send', 'event', 'projects', 'click', 'end to related', { nonInteraction: false })"><p>相關討論</p></a>
  </ul>
</template>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'
ul
  flex(column, flex-start, flex-start)
  padding 0
  a
    color #C31C5C
    text-decoration none
    font-weight 600
    &:hover
      text-decoration underline
    &#story1-bottom
      p
        margin 0 !important
        flex(row, flex-start, center)
        &::before
          display inline-block
          content ''
          background-size 26px 26px
          width 26px
          height 26px
          background-repeat no-repeat
          background-image url('~assets/images/landing-nav/1.png')
          margin-right 10px
      &.router-link-active
        p
          &::before
            box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
            border-radius 50%
            background-image url('~assets/images/landing-nav/1-blue.png')
    &#story2-bottom
      p
        margin 0 !important
        flex(row, flex-start, center)
        &::before
          display inline-block
          content ''
          background-size 26px 26px
          width 26px
          height 26px
          background-repeat no-repeat
          background-image url('~assets/images/landing-nav/2.png')
          margin-right 10px
      &.router-link-active
        p
          &::before
            box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
            border-radius 50%
            width 26px !important
            background-image url('~assets/images/landing-nav/2-blue.png')
    &#story3-bottom
      p
        margin 0 !important
        flex(row, flex-start, center)
        &::before
          display inline-block
          content ''
          background-size 26px 26px
          width 26px
          height 26px
          background-repeat no-repeat
          background-image url('~assets/images/landing-nav/3.png')
          margin-right 10px
      &.router-link-active
        p
          &::before
            box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
            border-radius 50%
            width 26px !important
            background-image url('~assets/images/landing-nav/3-blue.png')
    &#story4-bottom
      p
        margin 0 !important
        flex(row, flex-start, center)
        &::before
          display inline-block
          content ''
          background-size 26px 26px
          width 26px
          height 26px
          background-repeat no-repeat
          background-image url('~assets/images/landing-nav/4.png')
          margin-right 10px
      &.router-link-active
        p
          &::before
            box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
            border-radius 50%
            width 26px !important
            background-image url('~assets/images/landing-nav/4-blue.png')
    &#related-bottom
      color black
      cursor pointer
      p
        margin 0 !important
        flex(row, flex-start, center)
        color black
        &::before
          display inline-block
          content ''
          background-size 26px 26px
          width 26px
          height 26px
          background-repeat no-repeat
          background-image url('~assets/images/page-nav/related-blue.png')
          margin-right 10px
          box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
          border-radius 50%

@media (max-width: 374px)
  ul
    a
      &#story2-bottom
        p
          &::before
            width 31px
        &.router-link-active
          p
            &::before
              width 31px !important
      &#story3-bottom
        p
          &::before
            width 31px
        &.router-link-active
          p
            &::before
              width 29px !important
</style>
