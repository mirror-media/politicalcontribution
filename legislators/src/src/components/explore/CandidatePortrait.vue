<template>
  <!-- Use 'a' tag due to flexbox issue in 'button' tag with safari -->
  <a role="button" :class="party" :id="`candidate-portrait-${name}`">
    <img :src="portrait"></img>
  </a>
</template>

<script>
export default {
  props: [ 'party', 'name' ],
  computed: {
    portrait () {
      return require(`../../assets/images/candidate-portrait/${this.name}.png`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

$candidates-portrait-block
  flex(row, center, center)
  cursor pointer
  margin 0 5px 10px 5px
  width calc(calc((100vw - 600px) / 12) - 10px)
  height calc(calc((100vw - 600px) / 12) - 10px)
  border none 
  padding 0
  overflow hidden

a[role = 'button']
  @extends $candidates-portrait-block
  setPartyColorScheme('background-color', 'light')
  img
    height calc(calc((100vw - 600px) / 12))
    filter grayscale(100%)
    margin-top -5px
    // clip-path polygon(5px 5px, 5px calc(100% - 5px) ,calc(100% - 5px) calc(100% - 5px),calc(100% - 5px) 5px)

@media (max-width: 1440px)
  a[role = 'button']
    flex(row, center, center)
    cursor pointer
    margin 0 5px 10px 5px
    width calc(calc((100vw - 300px) / 12) - 10px)
    height calc(calc((100vw - 300px) / 12) - 10px)
    border none 
    padding 0
    overflow hidden
    setPartyColorScheme('background-color', 'light')
    img
      height calc(calc((100vw - 300px) / 12))
      filter grayscale(100%)
      margin-top -5px
      // clip-path polygon(5px 5px, 5px calc(100% - 5px) ,calc(100% - 5px) calc(100% - 5px),calc(100% - 5px) 5px)

// For iPad
@media (max-width: 1100px)
  a[role = 'button']
    width calc(calc((100vw - 100px) / 7) - 10px)
    height calc(calc((100vw - 100px) / 7) - 10px)
    img
      height calc(calc((100vw - 100px) / 7))

// For Iphone 6+
@media (max-width: 767px)
  a[role = 'button']
    margin 0px 4px 8px 4px
    width calc(calc((100vw - 30px) / 5) - 8px)
    height calc(calc((100vw - 30px) / 5) - 8px)
    img
      height calc(calc(100vw - 30px) / 5)
</style>


