<template>
  <div class="container">
    <div :class="['portrait', partyEngName]">
      <img :src="portrait"></img>
    </div>
    <img v-if="won" class="stamp" src="~assets/images/elected.png" alt="">
  </div>
</template>

<script>
export default {
  props: [ 'party', 'name', 'won' ],
  computed: {
    partyEngName () {
      if (this.party === '中國國民黨' || this.party === 'kmt') {
        return 'kmt'
      } else if (this.party === '民主進步黨' || this.party === 'dpp') {
        return 'dpp'
      } else if (this.party === '時代力量' || this.party === 'npp') {
        return 'npp'
      } else if (this.party === '無黨團結聯盟') {
        return 'npsu'
      } else if (this.party === '無黨籍') {
        return 'indie'
      } else {
        return 'default'
      }
    },
    portrait () {
      return require(`../assets/images/candidate-portrait/${this.name}.png`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position relative
  .stamp
    position absolute
    right 0
    bottom 5px
    width 20px
    height 20px
  .portrait
    display inline-block
    border-radius 50%
    // overflow hidden
    position relative
    background white
    // z-index 1001
    &.dpp
      border 2px solid #53a66f
    &.kmt
      border 2px solid #0071bc
    &.npp
      border 2px solid #fcc037
    &.npsu
      border 2px solid #c7195c
    &.indie
      border 2px solid #736357
    &.default
      border 2px solid black
    img
      transform translate(0px, 5px)
      width 70px
      height 70px
      clip-path circle(35px at center)
</style>

