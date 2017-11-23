<template>
  <a :href="href" target="_blank" class="related-card">
    <h3>{{ meta.title }}</h3>
    <img :src="imgsrc" alt="">
    <div class="meta">
      <p class="date">{{ meta.date }}</p>
      <p class="source">{{ meta.source }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: [ 'href', 'imgsrc', 'meta' ]
}
</script>


<style lang="stylus" scoped>
.related-card
  border 1px solid lightgray
  border-radius 5%
  padding 10px
  margin 10px 10px
  text-decoration none
  &:hover
    filter brightness(90%)
  h3
    color #0d87c9
    margin-top 0
  img
    width 100%
  .meta
    color #808080
    .date
      margin-bottom 0
    .source
      margin-top 0
      margin-bottom 0
</style>
