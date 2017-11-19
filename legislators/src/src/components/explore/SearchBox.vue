<template>
  <div class="search-container">
    <div class="ui fluid search">
      <div class="ui mini left icon input">
        <input class="prompt" type="text" placeholder="輸入立委或企業名稱">
        <i class="large horizontally flipped search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
$.fn.transition = require('semantic-ui-transition')
$.fn.search = require('semantic-ui-search')

export default {
  name: 'searchBox',
  props: [ 'options' ],
  computed: {
    setSemanticUiSearchSource () {
      let content = []
      this.options.forEach(option => {
        content.push({ title: option })
      })
      return content
    }
  },
  watch: {
    setSemanticUiSearchSource () {
      this.initSearch()
    }
  },
  methods: {
    submitSearch (value) {
      $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=search-${value}`)
      this.$emit('submitSearch', value)
    },
    initSearch () {
      let vm = this
      $('.ui.fluid.search')
      .search({
        source: vm.setSemanticUiSearchSource,
        selectFirstResult: true,
        searchOnFocus: false,
        onSelect (result, response) {
          vm.submitSearch(result.title)
        },
        showNoResults: true,
        templates: {
          message (message, type) {
            var html = ''
            if (message !== undefined && type !== undefined) {
              html += '' + '<div class="message ' + type + '">'
              // message type
              if (type === 'empty') {
                html += '' + '<div class="header">查無資料！</div class="header">' + '<div class="description">' + message + '</div class="description">'
              } else {
                html += ' <div class="description">' + message + '</div>'
              }
              html += '</div>'
            }
            return html
          }
        },
        error: {
          noResults: '沒有任何立委或企業名稱包含您所輸入的字詞'
        }
      })
    }
  },
  mounted () {
    this.initSearch()
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../node_modules/semantic-ui-search/search.min.css"
@import "../../../node_modules/semantic-ui-transition/transition.min.css"
@import "../../../node_modules/semantic-ui-input/input.min.css"
@import "../../../node_modules/semantic-ui-icon/icon.min.css"

.search-container
  position absolute
  right 0
  .ui.search
    .prompt
      border-radius 0
      min-height 36px
      box-sizing border-box
      padding-left 3rem !important
      background white
</style>


