<template>
  <main class="list-container">
    <!-- Sort list buttons -->
    <section class="list-container__description">
      <h1>查找政商關係</h1>
      <div class="credit-container">
        <p class="credit">文：李又如&nbsp&nbsp設計：陳怡蒨&nbsp&nbsp網站製作：熊凱文</p>
        <p class="credit">資料整理：李又如、熊凱文</p>
        <p class="credit">資料分析：李宗榮</p>
      </div>
      <div class="caveat-container">
        <p class="caveat">註：</p>
        <div>
          <p class="caveat">本站政治獻金資料收集僅供學術交流使用，嚴禁營利、徵信，或其他不正當目的之使用。</p>
          <p class="caveat">原始資料中民進黨立委李昆澤、劉世芳收受政治獻金清單中「國民黨集團」為資料處理錯誤，因其中「台北世界貿易中心國際貿易大樓股份有限公司」應屬元大集團，而非「國民黨集團」，特此致歉。</p>
        </div>
      </div>
      <p>選一個立委要花多少錢？是誰在資助我們的民意代表？要回答這些問題，要付出什麼樣的代價？依照台灣的法律，候選人必須申報選舉時政治獻金的來源，也應在選舉後公開讓人民檢視。但這些合法的政治金流與其說是公開，不如說是被放在監察院「典藏」，需要親赴政府機關才看得到，還只能印出一張張無法應用的 A4 紙。</p>
      <p>我們費了九牛二虎之力，把這些資料通通帶出來了！來看看 2016 年選舉時，區域立委候選人跟企業有什麼關係吧！</p>
    </section>

    <nav>
      <h1>排列方式</h1>
      <ul>
        <li>
          <SortListButton :class="{ 'active': sortButtonToggle === '政黨' }" :title="'政黨'" @click.native="sortList('政黨')"></SortListButton>
          <SortListButton :class="{ 'active': sortButtonToggle === '總收入' }" :title="'總收入'" @click.native="sortList('總收入')"></SortListButton>
        </li>
        <li>
          <SortListButton :class="{ 'active': sortButtonToggle === '營利事業收入' }" :title="'營利事業收入'" @click.native="sortList('營利事業收入')"></SortListButton>
          <SortListButton :class="{ 'active': sortButtonToggle === '捐贈公司數' }" :title="'捐贈公司數'" @click.native="sortList('捐贈公司數')"></SortListButton>
        </li>
      </ul>
    </nav>

    <header class="click-tip">
      <img src="~assets/images/finger.png" alt="">
      <p>點擊頭像看政商關係圖</p>
    </header>

    <!-- Sort by party layouts -->
    <section class="list-container__candidates" v-show="sortButtonToggle === '政黨'">
      <template v-for="(partyList, partyName) in wonCandidatesList.sortByParty">
        <header :key="partyName">
          <h1 :class="`${getPartyAbbr(partyName)}`">{{ partyName }}</h1>
          <h2 :class="`${getPartyAbbr(partyName)}`">{{ partyList.length }}</h2>
        </header>
        <ol :key="partyName">
          <!-- <router-link v-for="candidate in partyList" :to="`/tool/${candidate['姓名']}`" :key="candidate['姓名']"> -->
          <template v-for="candidate in partyList">
            <CandidatePortrait :party="getPartyAbbr(candidate['推薦政黨'])" :name="candidate['姓名']"
              @touchstart.native="isTouchMoving = false"
              @touchmove.native="isTouchMoving = true"
              @touchend.native="!isTouchMoving ? clickCandidate(candidate['姓名']) : null"
              @click.native="clickCandidate(candidate['姓名'])"
              @mouseover.native="handleTooltip(candidate['姓名'], $event)"
              @mousemove.native="handleTooltip(candidate['姓名'], $event)"
              @mouseout.native="handleTooltip(candidate['姓名'], $event)">
            </CandidatePortrait>
          </template>
          <!-- </router-link> -->
        </ol>
      </template>
    </section>

    <!-- Sort by other 3 layouts -->
    <section class="list-container__candidates" v-for="(list, key) in wonCandidatesList.notSortByParty" v-show="sortButtonToggle === key" :key="key">
      <ol>
        <CandidatePortrait v-for="candidate in list" :party="getPartyAbbr(candidate['推薦政黨'])" :name="candidate['姓名']" :key="candidate['姓名']"
          @touchstart.native="isTouchMoving = false"
          @touchmove.native="isTouchMoving = true"
          @touchend.native="!isTouchMoving ? clickCandidate(candidate['姓名']) : null"
          @click.native="clickCandidate(candidate['姓名'])" 
          @mouseover.native="handleTooltip(candidate['姓名'], $event)" 
          @mousemove.native="handleTooltip(candidate['姓名'], $event)" 
          @mouseout.native="handleTooltip(candidate['姓名'], $event)">
        </CandidatePortrait>
      </ol>
    </section>

    <div class="list-container__tooltip">
      <Info v-if="tooltipTargetName" class="list-container__tooltip--candidate-basic" :type="'candidate-basic'" :hidePortrait="true" :data="tooltipData"></Info>
      <Info v-if="tooltipTargetName" class="list-container__tooltip--candidate-detail" :type="'candidate-detail'" :data="tooltipData"></Info>
    </div>
  </main>
</template>

<script>
import * as d3 from 'd3'
import $ from 'jquery'

import { joinMoneyBySeparator, getPartyAbbr } from '@/util'
import CandidatePortrait from '@/components/explore/CandidatePortrait'
import Info from '@/components/explore/Info'
import SortListButton from '@/components/explore/SortListButton'

export default {
  components: {
    CandidatePortrait,
    Info,
    SortListButton
  },
  props: [ 'abstractData' ],
  data () {
    return {
      tooltipTargetName: null,
      sortButtonToggle: '政黨',
      isTouchMoving: false,
      wonCandidatesList: {
        'sortByParty': {
          '民主進步黨': this.getSortedCandidatesList('總收入', '民主進步黨'),
          '中國國民黨': this.getSortedCandidatesList('總收入', '中國國民黨'),
          '時代力量': this.getSortedCandidatesList('總收入', '時代力量'),
          '無黨團結聯盟': this.getSortedCandidatesList('總收入', '無黨團結聯盟'),
          '無黨籍': this.getSortedCandidatesList('總收入', '無黨籍')
        },
        'notSortByParty': {
          '總收入': this.getSortedCandidatesList('總收入'),
          '營利事業收入': this.getSortedCandidatesList('營利事業捐贈收入'),
          '捐贈公司數': this.getSortedCandidatesList('捐贈企業數')
        }
      }
    }
  },
  computed: {
    tooltipData () {
      return this.abstractData.filter(d => d['姓名'] === this.tooltipTargetName)[0]
    }
  },
  methods: {
    clickCandidate (name) {
      /* eslint-disable no-undef */
      this.$emit('clickCandidate', name)
      $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=list-${name}`)
      ga('send', 'event', 'projects', 'click', 'candidates', { nonInteraction: false })
    },
    sortList (type) {
      /* eslint-disable no-undef */
      this.sortButtonToggle = type
      this.$emit('sortList', type)
      if (type === '政黨') {
        ga('send', 'event', 'projects', 'click', 'filter party', { nonInteraction: false })
      } else if (type === '總收入') {
        ga('send', 'event', 'projects', 'click', 'filter income', { nonInteraction: false })
      } else if (type === '營利事業收入') {
        ga('send', 'event', 'projects', 'click', 'filter profit', { nonInteraction: false })
      } else if (type === '捐贈公司數') {
        ga('send', 'event', 'projects', 'click', 'filter company', { nonInteraction: false })
      }
    },
    getPartyAbbr (partyNameChinese) {
      return getPartyAbbr(partyNameChinese)
    },
    getSortedCandidatesList (filterByField, filterByParty = false) {
      let wonCandidates = this.abstractData.filter(d => d['當選註記'] !== '')
      if (filterByParty) {
        let wonCandidatesByParty = wonCandidates.filter(d => d['推薦政黨'] === filterByParty)
        wonCandidatesByParty.sort((a, b) => joinMoneyBySeparator(b[filterByField]) - joinMoneyBySeparator(a[filterByField]))
        return wonCandidatesByParty
      } else {
        let wonCandidatesByField = wonCandidates.sort((a, b) => joinMoneyBySeparator(b[filterByField]) - joinMoneyBySeparator(a[filterByField]))
        return wonCandidatesByField
      }
    },
    handleTooltip (candidate, event) {
      if (event.type === 'mouseover') {
        this.tooltipTargetName = candidate
        d3.select('.list-container__tooltip')
        .style('display', 'initial')
        .style('opacity', 1)
        .style('top', handleTooltipPosition('top'))
        .style('left', handleTooltipPosition('left'))
      } else if (event.type === 'mousemove') {
        d3.select('.list-container__tooltip')
        .style('top', handleTooltipPosition('top'))
        .style('left', handleTooltipPosition('left'))
      } else if (event.type === 'mouseout') {
        d3.select('.list-container__tooltip')
        .style('display', 'none')
        .style('opacity', 0)
      }

      function handleTooltipPosition (type) {
        if (type === 'top') {
          return function (d) {
            let tooltipHeight = parseInt(d3.select('.list-container__tooltip').style('height'), 10)
            if (!isCollide('bottom')) {
              return (event.pageY + 20) + 'px'
            } else {
              return (event.pageY - 10 - tooltipHeight) + 'px'
            }
          }
        } else if (type === 'left') {
          return function (d) {
            let tooltipWidth = parseInt(d3.select('.list-container__tooltip').style('width'), 10)
            if (!isCollide('right')) {
              return (event.pageX) + 'px'
            } else {
              return (event.pageX - tooltipWidth) + 'px'
            }
          }
        }
      }

      function isCollide (tooltipBorder) {
        let tooltipWidth = parseInt(d3.select('.list-container__tooltip').style('width'), 10)
        let tooltipHeight = parseInt(d3.select('.list-container__tooltip').style('height'), 10)
        let w = window
        let d = document
        let e = d.documentElement
        let g = d.getElementsByTagName('body')[0]
        let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
        let windowHeight = w.innerHeight || e.clientHeight || g.clientHeight
        // let containerOuterHeight = $('.list-container').outerHeight(true)

        if (tooltipBorder === 'right') {
          // console.log(`event.clientX: ${event.clientX}, tooltipWidth: ${tooltipWidth}, windowWidth: ${windowWidth}`)
          if (event.clientX + tooltipWidth >= windowWidth) {
            return true
          } else {
            return false
          }
        } else if (tooltipBorder === 'bottom') {
          // console.log(`event.clientY: ${event.clientY}, tooltipHeight: ${tooltipHeight}, windowHeight: ${windowHeight}`)
          // console.log(event.clientY + 20 + tooltipHeight >= windowHeight)
          // console.log(`event.pageY: ${event.pageY}, tooltipHeight: ${tooltipHeight}, containerOuterHeight: ${$('.list-container').position().top + $('.list-container').outerHeight(true)}`)
          // console.log(event.pageY + 20 + tooltipHeight >= $('.list-container').position().top + $('.list-container').outerHeight(true))
          if ((event.clientY + 20 + tooltipHeight >= windowHeight) || (event.pageY + 20 + tooltipHeight >= $('.list-container').position().top + $('.list-container').outerHeight(true))) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

.list-container
  flex(column, center, flex-start)
  margin 5% 300px
  &__description
    // padding-right 30%
    margin-bottom 60px
    .credit-container
      .credit
        color #808080
    .caveat-container
      flex(row, flex-start, flex-start)
      // margin 10px 0
      p
        margin-bottom 0 !important
      .caveat
        color #808080
        margin-bottom 0 !important
        &:nth-child(2)
          margin-top 0 !important
  nav
    flex(row, flex-start, flex-start)
    margin 0 0 20px 5px
    h1
      font-size 1rem !important
      font-weight normal !important
      margin 0 10px 0 0
      color #666
    ul
      flex(row, flex-start, flex-start)
      margin 0
      padding 0
      li
        flex(row, flex-start, flex-start)

  .click-tip
    // align-self center
    // margin-left 10px
    margin 1rem 0
    img
      vertical-align middle
      height 50px
      margin-right 10px
    p
      display inline
      color #666

  &__candidates
    header
      flex(row, flex-start, center)
      margin-left 5px
      h1
        margin 0
        padding 10px
        color white
        font-size 1.25em !important
        font-weight normal !important
        text-align start
        width 120px
        setPartyColorScheme('background-color', 'dark')
      h2
        margin 0 0 0 20px
        font-size calc(1.25em + 20px) !important
        font-weight 500 !important
        setPartyColorScheme('color', 'dark')
    ol
      flex(row, flex-start, flex-start)
      flex-wrap wrap
      margin 10px 0 20px 0
      padding 0
      a:focus
        outline 0

  &__tooltip
    position absolute
    background white
    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    &--candidate-basic
      margin-top 0.25rem
      border-bottom 2px solid #d3d3d3

@media (max-width: 1440px)
  .list-container
    margin 5% 150px

// For iPad
@media (max-width: 1100px)
  .list-container
    margin 50px
    nav
      margin-left 5px
    &__candidates
      header
        margin-left 5px

// For iPhone 6+
@media (max-width: 767px)
  .list-container
    margin 15px
    &__description
      margin-bottom 0
    nav
      flex-direction column
      margin 0 0 35px 4px
      h1
        font-size 1rem !important
      ul
        flex-direction column
        li:nth-child(1)
          margin 10px 0
    .click-tip
      display none
    &__candidates
      header
        margin-left 4px
        h1
          font-size 1.66rem !important
          width 170px

// For iPhone 5
@media (max-width: 374px)
  .list-container
    nav
      flex-direction column
      margin 0 0 35px 4px
      h1
        font-size 0.7rem !important
    &__candidates
      header
        h1
          font-size 1.2rem !important
          width 120px
</style>
