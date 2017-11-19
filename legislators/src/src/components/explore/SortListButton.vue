<template>
  <button type="sortList">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: [ 'title' ]
}
</script>

<style lang="stylus" scoped>
button
  cursor pointer
  text-align center
  width 145px
  padding 0 10px
  height 40px
  border 1px solid #666
  margin-right 10px
  color #666
  font-size 1rem
  font-weight 400
  background-color white
  &:hover
    filter brightness(90%)
  &.active
    background #666
    color white
    &:hover
      filter none

// For iPhone 6+
@media (max-width: 767px)
  button
    width 120px
    height 30px
    font-size 1rem

// For iPhone 5
@media (max-width: 374px)
  button
    width 100px
    height 30px
    font-size 0.8rem
</style>


