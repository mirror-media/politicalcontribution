<template>
  <div class="chart-container-face">
    <div class="legends-container">
      <div class="legends-column">
        <div class="legends">
          <img src="~assets/images/face-vis/normal.png" alt="">
          <h3>1~49萬</h3>
        </div>
        <div class="legends">
          <img src="~assets/images/face-vis/smile.png" alt="">
          <h3>50~199萬</h3>
        </div>
        <div class="legends">
          <img src="~assets/images/face-vis/lol.png" alt="">
          <h3>200萬以上</h3>
        </div>
      </div>
      <div class="legends-column">
        <div class="legends">
          <!-- <img src="~assets/images/face-vis/normal.png" alt=""> -->
          <div class="legends__circle legends__circle--kmt"></div>
          <h3>中國國民黨</h3>
        </div>
        <div class="legends">
          <!-- <img src="~assets/images/face-vis/smile.png" alt=""> -->
          <div class="legends__circle legends__circle--dpp"></div>
          <h3>民主進步黨</h3>
        </div>
        <div class="legends">
          <!-- <img src="~assets/images/face-vis/lol.png" alt=""> -->
          <div class="legends__circle legends__circle--npp"></div>
          <h3>時代力量</h3>
        </div>
      </div>
      <div class="legends-column">
        <div class="legends">
          <!-- <img src="~assets/images/face-vis/normal.png" alt=""> -->
          <div class="legends__circle legends__circle--none"></div>
          <h3>其他政黨</h3>
        </div>
        <div class="legends">
          <img src="~assets/images/elected.png" alt="">
          <h3>當選註記</h3>
        </div>
      </div>
    </div>
    <div class="company-container" v-if="nestedData" v-for="(company, i) in nestedData" :key="company['核心公司']">
      <aside>
        <h2>{{ company.key }} {{ company['董事長'] }}</h2>
        <h3 v-if="company['核心公司'][0]">核心公司：{{ company['核心公司'] }}</h3>
        <h2><span>{{ company['總金額'].toLocaleString() }}</span> 元</h2>
      </aside>
      <main>
        <div class="party-container" v-for="party in company.values" :key="party.key">
          <div v-for="candidate in party.values" :key="candidate.key"
              @mouseover="handleTooltip(company.key, party.key, candidate.key, $event)"
              @mousemove="handleTooltip(company.key, party.key, candidate.key, $event)" 
              @mouseout="handleTooltip(company.key, party.key, candidate.key, $event)">
            <img :class="candidate.key" v-if="party.key === '中國國民黨' && +candidate.value.value >= 2000000" src="~assets/images/face-vis/lol-blue.png"></img>
            <img :class="candidate.key" v-if="party.key === '中國國民黨' && +candidate.value.value <= 1999999 && +candidate.value.value >= 500000" src="~assets/images/face-vis/smile-blue.png"></img>
            <img :class="candidate.key" v-if="party.key === '中國國民黨' && +candidate.value.value <= 499999" src="~assets/images/face-vis/normal-blue.png"></img>
            <img :class="candidate.key" v-if="party.key === '民主進步黨' && +candidate.value.value >= 2000000" src="~assets/images/face-vis/lol-green.png"></img>
            <img :class="candidate.key" v-if="party.key === '民主進步黨' && +candidate.value.value <= 1999999 && +candidate.value.value >= 500000" src="~assets/images/face-vis/smile-green.png"></img>
            <img :class="candidate.key" v-if="party.key === '民主進步黨' && +candidate.value.value <= 499999" src="~assets/images/face-vis/normal-green.png"></img>
            <img :class="candidate.key" v-if="party.key === '時代力量' && +candidate.value.value >= 2000000" src="~assets/images/face-vis/lol-yellow.png"></img>
            <img :class="candidate.key" v-if="party.key === '時代力量' && +candidate.value.value <= 1999999 && +candidate.value.value >= 500000" src="~assets/images/face-vis/smile-yellow.png"></img>
            <img :class="candidate.key" v-if="party.key === '時代力量' && +candidate.value.value <= 499999" src="~assets/images/face-vis/normal-yellow.png"></img>
            <img :class="candidate.key" v-if="party.key !== '中國國民黨' && party.key !== '民主進步黨' && party.key !== '時代力量' && +candidate.value.value >= 2000000" src="~assets/images/face-vis/lol-grey.png"></img>
            <img :class="candidate.key" v-if="party.key !== '中國國民黨' && party.key !== '民主進步黨' && party.key !== '時代力量' && +candidate.value.value <= 1999999 && +candidate.value.value >= 500000" src="~assets/images/face-vis/smile-grey.png"></img>
            <img :class="candidate.key" v-if="party.key !== '中國國民黨' && party.key !== '民主進步黨' && party.key !== '時代力量' && +candidate.value.value <= 499999" src="~assets/images/face-vis/normal-grey.png"></img>
            <img v-if="candidate.value.stamp === '*'" class="stamp" src="~assets/images/elected.png"></img>
            <div :class="['tooltip-face', `tooltip-${company.key}-${candidate.key}`]">
              <p>姓名：{{ candidate.key }}</p>
              <p>被捐贈金額：{{ candidate.value.value.toLocaleString() }} 元</p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <p @click="companyLimit += 5" style="cursor: pointer; border-bottom: 1px solid black">看更多集團與公司...</p>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

import setStory3FaceWaypoints from '@/mixins/waypoints/setStory3FaceWaypoints'

export default {
  // components: {
  //   ChartTitle
  // },
  mixins: [ setStory3FaceWaypoints ],
  data () {
    return {
      // detailDataPath: 'static/data/political-contribution-detail-opendata-csv.csv',
      // detailData: null,
      // abstractDataPath: 'static/data/political-contribution-abstract-csv.csv',
      // abstractData: null,
      tooltipTargetCompanyName: null,
      tooltipTargetPartyName: null,
      tooltipTargetCandidateName: null,
      companyLimit: 21
    }
  },
  computed: {
    abstractData () {
      return this.$store.state.abstractData
    },
    detailData () {
      let data = this.$store.state.detailData
      data.forEach(d => {
        if (d['推薦政黨'] !== '中國國民黨' && d['推薦政黨'] !== '民主進步黨' && d['推薦政黨'] !== '時代力量') {
          d['推薦政黨'] = '其他政黨'
        }
      })
      return data
    },
    nestedData () {
      if (this.detailData) {
        let top20Index = this.companyLimit
        let companyDonateMoney = d3.nest()
            .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'])
            .rollup(leaves => d3.sum(leaves, d => +d['收入金額']))
            .entries(this.detailData)

        let companyNameOrderByDonateMoney = companyDonateMoney.sort((a, b) => b.value - a.value).map(obj => obj.key)

        let data = d3.nest()
            .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).sortKeys((a, b) => companyNameOrderByDonateMoney.indexOf(a) - companyNameOrderByDonateMoney.indexOf(b))
            .key(d => d['推薦政黨']).sortKeys((a, b) => ['民主進步黨', '中國國民黨', '時代力量', '其他政黨'].indexOf(a) - ['民主進步黨', '中國國民黨', '時代力量', '其他政黨'].indexOf(b))
            .key(d => d['候選人'])
            .rollup(leaves => {
              return {
                value: d3.sum(leaves, d => +d['收入金額']),
                party: leaves.map(d => d['推薦政黨'])[0],
                stamp: leaves.map(d => d['當選註記'])[0]
              }
            })
            .entries(this.detailData).slice(0, top20Index)

        data.forEach(d => {
          let groupExist = _.find(this.detailData, { '集團碼': d.key })
          d['董事長'] = groupExist ? groupExist['董事長'] : ''
          d['核心公司'] = groupExist ? groupExist['旗下核心公司'] : ''
          d['總金額'] = _.find(companyDonateMoney, { 'key': d.key }).value

          d.values.forEach(d2 => {
            d2.values.sort((a, b) => b.value.value - a.value.value)
          })
        })
        return data
      }
    }
  },
  methods: {
    handleTooltip (company, party, candidate, event) {
      if (event.type === 'mouseover') {
        this.tooltipTargetCandidateName = candidate
        this.tooltipTargetPartyName = party
        this.tooltipTargetCompanyName = company
        d3.select(`.tooltip-${company}-${candidate}`)
        .style('display', 'initial')
        .style('opacity', 1)
        .style('top', handleTooltipPosition('top'))
        .style('left', handleTooltipPosition('left'))
        .style('bottom', d => {
          if (window.innerWidth <= 767) {
            return '10px'
          }
        })
      } else if (event.type === 'mousemove') {
        d3.select(`.tooltip-${company}-${candidate}`)
        .style('top', handleTooltipPosition('top'))
        .style('left', handleTooltipPosition('left'))
      } else if (event.type === 'mouseout') {
        d3.select(`.tooltip-${company}-${candidate}`)
        .style('display', 'none')
        .style('opacity', 0)
      }

      function handleTooltipPosition (type) {
        if (type === 'top') {
          return function (d) {
            if (window.innerWidth > 767) {
              return (event.clientY + 20) + 'px'
            }
          }
        } else if (type === 'left') {
          return function (d) {
            if (window.innerWidth > 767) {
              return (event.clientX) + 'px'
            } else {
              return (window.innerWidth * 0.06) + 'px'
            }
          }
        }
      }

      // function isCollide (tooltipBorder) {
      //   let tooltipWidth = parseInt(d3.select(`.tooltip-${candidate}`).style('width'), 10)
      //   let tooltipHeight = parseInt(d3.select(`.tooltip-${candidate}`).style('height'), 10)
      //   let w = window
      //   let d = document
      //   let e = d.documentElement
      //   let g = d.getElementsByTagName('body')[0]
      //   let windowWidth = w.innerWidth || e.clientWidth || g.clientWidth
      //   let windowHeight = w.innerHeight || e.clientHeight || g.clientHeight
      //   let containerOuterHeight = $('.chart-container').outerHeight(true)

      //   if (tooltipBorder === 'right') {
      //     // console.log(`event.clientX: ${event.clientX}, tooltipWidth: ${tooltipWidth}, windowWidth: ${windowWidth}`)
      //     if (event.clientX + tooltipWidth >= windowWidth) {
      //       return true
      //     } else {
      //       return false
      //     }
      //   } else if (tooltipBorder === 'bottom') {
      //     // console.log(`event.clientY: ${event.clientY}, tooltipHeight: ${tooltipHeight}, windowHeight: ${windowHeight}`)
      //     if ((event.clientY + 20 + tooltipHeight >= windowHeight) || (event.pageY + 20 + tooltipHeight >= containerOuterHeight)) {
      //       return true
      //     } else {
      //       return false
      //     }
      //   }
      // }
    }
  },
  created () {
    if (!this.$store.getters.exist.abstractData && !this.$store.getters.exist.detailData) {
      this.$store.dispatch('FETCH_CSV_DATA')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/styles/util.styl"

.chart-container-face
  flex(column, flex-start, center)
  width 100%
  .legends-container
    background white
    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    padding 10px
    width 50%
    margin-bottom 50px
    flex(row, space-around, flex-start)
    .legends-column
      // width 33.3%
      .legends
        margin 10px 0
        img
          width 30px
          vertical-align middle
          margin-right 0.5rem
        .legends__circle
          display inline-block
          width 30px
          height 30px
          border-radius 50%
          margin-right 0.5rem
          vertical-align middle
          &--dpp
            // border 2px solid #53a66f
            background-color #dbed9a
          &--kmt
            // border 2px solid #0071bc
            background-color #a8dbef
          &--npp
            // border 2px solid #fcc037
            background-color #f7e5a9
          &--npsu
            // border 2px solid #722f37
            background-color #722f37
          &--none
            // border 2px solid #736357
            background-color darkgray
        h3
          display inline
          font-weight normal
  .company-container + .company-container
    border-top 1px solid gray
  .company-container
    flex(row, space-between, flex-start)
    // border-bottom 1px solid black
    width 100%
    padding 20px 0
    aside
      width 40%
      h2
        font-weight 500
        margin 10px 0
        span
          color #c7195c
          font-weight 600
      h3
        font-weight normal
        margin 10px 0
    main
      width 60%
      .party-container
        div
          display inline-block
          margin 0 5px 5px 0
          position relative
          img
            width 50px
          .stamp
            position absolute
            right 0px
            bottom 5px
            width 15px
        .tooltip-face
          position fixed
          background white
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
          display none
          z-index 10
          width auto
          padding 10px
          p
            margin 0 !important

@media (max-width: 767px)
  .chart-container-face
    .legends-container
      width 100%
      margin-bottom 25px
      .legends-column
        .legends
          img
            margin-right 0rem
          .legends__circle
            margin-right 0rem
          h3
            font-size 1rem
    .company-container
      flex(column, center, center)
      aside
        width 100%
        text-align center
        h2
          span
            font-size 1.5em
      main
        width 100%
        text-align center
        .party-container
          .tooltip-face
            width 83%
        // flex(column, center, flex-start)
        // .party-container
        //   flex(row, flex-start, center)
        //   flex-wrap wrap
        //   div
        //     img
        //       width 48px

@media (max-width: 374px)
  .chart-container-face
    .legends-container
      .legends-column
        .legends
          h3
            font-size .7rem
</style>
