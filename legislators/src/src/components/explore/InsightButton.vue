<template>
  <div class="insight-button-container">
    <div class="title-container">
      <h2>{{ heading1 }}</h2>
      <h2>{{ heading2 }}</h2>
    </div>

    <!-- For non-mobile-phone  -->
    <div class="white-trangle"></div>
    <div class="colored-trangle"></div>
    
    <!-- For mobile-phone  -->
    <!-- Deprecated design -->
    <!-- <div class="horizontal-grayline"></div>
    <div class="separator--bottom-left"></div>
    <div class="separator--top-right"></div> -->
  </div>
</template>

<script>
import { checkTruncate } from '@/util'

export default {
  name: 'insightButton',
  props: [ 'type', 'searchValue' ],
  computed: {
    heading1 () {
      if (this.type === 'rank') {
        return `${this.checkTruncate(this.searchValue.replace(/[股份]*有限公司/, ''))}的`
      } else {
        return `誰跟${this.checkTruncate(this.searchValue.replace(/[股份]*有限公司/, ''), 4)}的`
      }
    },
    heading2 () {
      if (this.type === 'rank') {
        return `營利事業捐贈排名`
      } else {
        return `政商關係最接近`
      }
    }
  },
  methods: {
    checkTruncate (string, length = 6) {
      return checkTruncate(string, length)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

drawTrangle(border-width, border-color)
  width 0
  height 0
  border-style solid
  border-width border-width
  border-color border-color

.insight-button-container
  flex 0 1 auto
  cursor pointer
  width 100%
  min-height 60px
  background #9e005d
  margin 0.5rem 0
  position relative
  // display flex
  // justify-content flex-start
  // align-items center
  flex(row, flex-start, center)
  border 1px solid #9e005d
  box-shadow 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19)
  .title-container
    display flex
    flex-direction column
    h2
      // max-width 60%
      user-select none
      font-size 1.2rem
      font-weight 400
      color white
      padding-left 1.2rem
      margin 0
      line-height 1.35
  .white-trangle
    position absolute
    right 0
    bottom 0
    drawTrangle(0 0 60px 60px, transparent transparent #fff transparent)
  .colored-trangle
    position absolute
    right 5px
    bottom 5px
    drawTrangle(17.3px 10px 0 10px, #9e005d transparent transparent transparent)
  &:hover
    filter brightness(90%)
  &.active
    background white
    .title-container
      h2
        color #9e005d
    .white-trangle
      border-color transparent transparent #9e005d transparent
    .colored-trangle
      border-color white transparent transparent transparent

@media (max-width: 1440px)
  .insight-button-container
    .title-container
      h2
        font-size 1rem

@media (max-width: 1280px)
  .insight-button-container
    min-height 40px
    .title-container
      h2
        font-size 0.8rem
        padding-left 0.8rem
    .white-trangle
      border-width 0 0 40px 40px
    .colored-trangle
      right 3px
      bottom 3px
      border-width 11.3px 6px 0 6px

@media (max-width: 767px)
  .insight-button-container
    width calc(50%)
    background #666
    border none
    border-top 3px solid #666
    margin-right 0px
    box-shadow none
    min-height 65px
    &:hover
      filter none
    .title-container
      h2
        padding-left 20px
        font-size 1.2rem
    .white-trangle
      display none
    .colored-trangle
      display none
    // .horizontal-grayline
    //   width 20px
    //   height 5px
    //   background-color #666
    //   position absolute
    //   top -5px
    //   right -20px
    // .separator
    //   &--bottom-left
    //     position absolute
    //     right -20px
    //     drawTrangle(65px 0 0 20px, transparent transparent transparent #666)
    //   &--top-right
    //     position absolute
    //     right -20px
    //     drawTrangle(0 20px 65px 0, transparent #fff transparent transparent)
    &.active
      .title-container
        h2
          color #666
      // .separator
      //   &--bottom-left
      //     position absolute
      //     right -20px
      //     drawTrangle(65px 0 0 20px, transparent transparent transparent #fff)
      //   &--top-right
      //     position absolute
      //     right -20px
      //     drawTrangle(0 20px 65px 0, transparent #666 transparent transparent)
    &.blank
      .title-container
        h2
          background #666
          color #666
      // .separator
      //   &--bottom-left
      //     position absolute
      //     right -20px
      //     drawTrangle(65px 0 0 20px, transparent transparent transparent #666)
      //   &--top-right
      //     position absolute
      //     right -20px
      //     drawTrangle(0 22px 65px 0, transparent #666 transparent transparent)

@media (max-width: 413px)
  .insight-button-container
    min-height 55px
    .title-container
      h2
        font-size 1rem
    // .separator
    //   &--bottom-left
    //     drawTrangle(55px 0 0 20px, transparent transparent transparent #666)
    //   &--top-right
    //     drawTrangle(0 20px 55px 0, transparent #fff transparent transparent)
    // &.active
    //   .separator
    //     &--bottom-left
    //       drawTrangle(55px 0 0 20px, transparent transparent transparent #fff)
    //     &--top-right
    //       drawTrangle(0 20px 55px 0, transparent #666 transparent transparent)
    // &.blank
    //   .separator
    //     &--bottom-left
    //       drawTrangle(55px 0 0 20px, transparent transparent transparent #666)
    //     &--top-right
    //       drawTrangle(0 22px 55px 0, transparent #666 transparent transparent)

@media (max-width: 374px)
  .insight-button-container
    min-height 45px
    .title-container
      h2
        font-size 0.8rem
    // .separator
    //   &--bottom-left
    //     drawTrangle(45px 0 0 20px, transparent transparent transparent #666)
    //   &--top-right
    //     drawTrangle(0 20px 45px 0, transparent #fff transparent transparent)
    // &.active
    //   .separator
    //     &--bottom-left
    //       drawTrangle(45px 0 0 20px, transparent transparent transparent #fff)
    //     &--top-right
    //       drawTrangle(0 20px 45px 0, transparent #666 transparent transparent)
    // &.blank
    //   .separator
    //     &--bottom-left
    //       drawTrangle(45px 0 0 20px, transparent transparent transparent #666)
    //     &--top-right
    //       drawTrangle(0 22px 45px 0, transparent #666 transparent transparent)
</style>


