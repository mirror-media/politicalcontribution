<template>
  <main class="comparsion-container">
    <section class="comparsion-container__stage">
      <ul>
        <img src="~assets/images/explore-comparsion/pk-left.png" class="left" alt="">
        <li>{{ firstCandidateOnStage ? firstCandidateOnStage : '&nbsp' }} </li>
        <li>{{ firstCandidateAbstractData ? firstCandidateAbstractData['捐贈企業數'] : '&nbsp' }} </li>
        <li>{{ firstCandidateAbstractData ? toTenThousandNotation(firstCandidateAbstractData['營利事業捐贈收入']) : '&nbsp' }}</li>
        <li>{{ firstCandidateAbstractData ? firstCandidateAbstractData['推薦政黨'] : '&nbsp' }} </li>
        <li>{{ firstCandidateAbstractData ? calcAgeByBornYear(firstCandidateAbstractData['出生年次']) : '&nbsp' }} </li>
        <li v-html="firstCandidateAbstractData ? setMarkIcon(firstCandidateAbstractData['當選註記']) : '&nbsp'"></li>
        <li>{{ firstCandidateAbstractData ? toTenThousandNotation(firstCandidateAbstractData['總收入']) : '&nbsp' }}</li>
      </ul>
      <ul>
        <li>VS.</li>
        <li>捐贈公司數</li>
        <li>營利事業捐贈收入（萬元）</li>
        <li>政黨</li>
        <li>年齡</li>
        <li>當選</li>
        <li>總收入（萬元）</li>
      </ul>
      <ul>
        <img src="~assets/images/explore-comparsion/pk-right.png" class="right" alt="">
        <li>{{ secondCandidateOnStage ? secondCandidateOnStage : '&nbsp' }} </li>
        <li>{{ secondCandidateAbstractData ? secondCandidateAbstractData['捐贈企業數'] : '&nbsp' }} </li>
        <li>{{ secondCandidateAbstractData ? toTenThousandNotation(secondCandidateAbstractData['營利事業捐贈收入']) : '&nbsp' }}</li>
        <li>{{ secondCandidateAbstractData ? secondCandidateAbstractData['推薦政黨'] : '&nbsp' }} </li>
        <li>{{ secondCandidateAbstractData ? calcAgeByBornYear(secondCandidateAbstractData['出生年次']) : '&nbsp' }} </li>
        <li v-html="secondCandidateAbstractData ? setMarkIcon(secondCandidateAbstractData['當選註記']) : '&nbsp'"></li>
        <li>{{ secondCandidateAbstractData ? toTenThousandNotation(secondCandidateAbstractData['總收入']) : '&nbsp' }}</li>
      </ul>
    </section>

    <section class="comparsion-container__list">
      <header>
        <img src="~assets/images/finger.png" alt="">
        <h2>選兩位來 PK 吧</h2>
      </header>
      <section v-for="(cityList, cityName) in nestedDataByCity" :key="cityName">
        <h1>{{ cityName }}</h1>
        <ol>
          <li v-for="candidate in cityList" :key="candidate['姓名']">
            <button type="goOnStage" :class="{ 'longname': candidate['姓名'].length > 4 }" :id="`candidates-comparsion-${candidate['姓名']}`" @click="clickCandidate(candidate['姓名'])">
              {{ candidate['姓名'] }}
            </button>
          </li>
        </ol>
      </section>
    </section>

    <button type="anchorAndReset">
      <img v-show="!firstCandidateOnStage && !secondCandidateOnStage" class="normal" src="~assets/images/explore-comparsion/pk.png" alt="" v-scroll-to="'.comparsion-container'" @click="resetComparsion" onclick="ga('send', 'event', 'projects', 'click', 'go to pk', { nonInteraction: false })">
      <div v-show="firstCandidateOnStage || secondCandidateOnStage" class="reset" @click="resetComparsion">
        <i class="huge inverted undo icon" style="margin: 0"></i>
      </div>
    </button>
  </main>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'
import $ from 'jquery'
import 'waypoints/lib/noframework.waypoints.js'
import VueScrollTo from 'vue-scrollto'

import setPKButtonWaypoints from '@/mixins/waypoints/setPKButtonWaypoints'

import { calcAgeByBornYear, toTenThousandNotation } from '@/util'

export default {
  props: [ 'abstractData', 'sortWathcer' ],
  mixins: [ setPKButtonWaypoints ],
  watch: {
    sortWathcer () {
      Waypoint.refreshAll()
    }
  },
  data () {
    return {
      firstCandidateOnStage: null,
      secondCandidateOnStage: null,
      hasWaypointsRunning: false
    }
  },
  computed: {
    nestedDataByCity () {
      let locationComparator = function (d) {
        let location = d['地區']
        if (location.length === 8) {
          return location.substring(0, 3)
        } else {
          return location
        }
      }
      let sorted = _.sortBy(this.abstractData, [function (d) { return +d['地區排序'] }, locationComparator])
      let data = d3.nest()
                  .key(locationComparator)
                  .object(sorted)
      return data
    },
    isComparable () {
      if (this.firstCandidateOnStage && this.secondCandidateOnStage) {
        return true
      } else {
        return false
      }
    },
    firstCandidateAbstractData () {
      if (this.firstCandidateOnStage) {
        return this.abstractData.filter(d => d['姓名'] === this.firstCandidateOnStage)[0]
      }
    },
    secondCandidateAbstractData () {
      if (this.secondCandidateOnStage) {
        return this.abstractData.filter(d => d['姓名'] === this.secondCandidateOnStage)[0]
      }
    }
  },
  methods: {
    initWaypoints () {
      /* eslint no-unused-vars: "off" */
      /* eslint no-undef: "off" */
      this.hasWaypointsRunning = true

      let container = document.querySelector('.comparsion-container')
      let fixedElement = document.querySelector('.comparsion-container__stage')
      let scrollableElement = document.querySelector('.comparsion-container__list')
      let toggle = (fixed, bottom) => {
        if (fixed) {
          fixedElement.classList.add('is-fixed')
        } else {
          fixedElement.classList.remove('is-fixed')
        }
        if (bottom) {
          fixedElement.classList.add('is-bottom')
        } else {
          fixedElement.classList.remove('is-bottom')
        }
      }
      // enter (top) / exit (bottom) graphic (toggle fixed position)
      let enterWaypoint = new Waypoint({
        element: container,
        handler: function (direction) {
          let fixed = direction === 'down'
          let bottom = false
          toggle(fixed, bottom)
        }
      })

      // let exitWaypoint = new Waypoint({
      //   element: container,
      //   handler: function (direction) {
      //     let fixed = direction === 'up'
      //     let bottom = !fixed
      //     toggle(fixed, bottom)
      //   },
      //   offset: 'bottom-in-view' // waypoints convenience instead of a calculation
      // })
    },
    clickCandidate (name) {
      /* eslint-disable no-undef */
      ga('send', 'event', 'projects', 'click', 'pk', { nonInteraction: false })
      $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=pk-${name}`)
      if (this.firstCandidateOnStage === name) {
        d3.select(`#candidates-comparsion-${name}`).style('border', 'none').classed('on-stage', false)
        d3.selectAll('button[type="goOnStage"]').style('color', 'black').style('cursor', 'pointer')
        this.firstCandidateOnStage = null
      } else if (this.secondCandidateOnStage === name) {
        d3.select(`#candidates-comparsion-${name}`).style('border', 'none').classed('on-stage', false)
        d3.selectAll('button[type="goOnStage"]').style('color', 'black').style('cursor', 'pointer')
        this.secondCandidateOnStage = null
      } else if (!this.firstCandidateOnStage || !this.secondCandidateOnStage) {
        d3.select(`#candidates-comparsion-${name}`).style('border', '1px solid black').classed('on-stage', true)
        !this.firstCandidateOnStage ? this.firstCandidateOnStage = name : this.secondCandidateOnStage = name
        if (this.isComparable) {
          d3.selectAll('button[type="goOnStage"]:not(.on-stage)').style('color', 'gray').style('cursor', 'initial')
          if (window.innerWidth <= 1100) {
            VueScrollTo.scrollTo('.comparsion-container__stage')
          }
        }
      }
    },
    resetComparsion () {
      d3.select(`#candidates-comparsion-${this.firstCandidateOnStage}`).style('border', 'none').classed('on-stage', false)
      this.firstCandidateOnStage = null
      d3.select(`#candidates-comparsion-${this.secondCandidateOnStage}`).style('border', 'none').classed('on-stage', false)
      this.secondCandidateOnStage = null
      d3.selectAll('button[type="goOnStage"]').style('color', 'black').style('cursor', 'pointer')
    },
    calcAgeByBornYear (bornYear) {
      return calcAgeByBornYear(bornYear)
    },
    toTenThousandNotation (money) {
      return toTenThousandNotation(money)
    },
    setMarkIcon (electedStamp) {
      return electedStamp === '*' ? '<i class="checkmark icon"></i>' : '<i class="remove icon"></i>'
    },
    waypointsRWDHandler () {
      let width = window.innerWidth
      if (this.hasWaypointsRunning) {
        if (width <= 1100) {
          this.hasWaypointsRunning = false
          document.querySelector('.comparsion-container__stage').classList.remove('is-fixed')
          Waypoint.destroyAll()
        } else {
          if (!this.hasWaypointsRunning) {
            this.initWaypoints()
          }
        }
      } else {
        if (width > 1100) {
          this.initWaypoints()
        }
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.waypointsRWDHandler)
    this.waypointsRWDHandler()
  }
}
</script>
<style lang="stylus" scoped>
@import "../../../node_modules/semantic-ui-icon/icon.min.css"
@import "~@/styles/util.styl"

.comparsion-container
  padding-top 100px
  flex(row, flex-start, flex-start)
  position relative
  &__list
    width 50%
    margin-left calc(50% + calc(calc((100vw - 100px) / 16) - 10px))
    margin-right calc(calc((100vw - 100px) / 16) - 10px)
    header
      align-self center
      margin-left 10px
      img
        vertical-align middle
        height 50px
        margin-right 10px
      h2
        display inline
        color #666
        // font-weight 500 !important
        // font-size 2rem !important
    section
      flex(column, flex-start, flex-start)
      margin 1rem 0.5rem 0 0
      h1
        padding 10px
        color white
        font-size 1em !important
        text-align start
        width auto
        background #666
        margin-left 10px
      ol
        padding 0
        flex(row, flex-start, flex-start)
        flex-wrap wrap
        margin 1rem 0
        li
          list-style none
          // width 100px
          height 30px
          margin 0 10px
        button[type = "goOnStage"]
          cursor pointer
          border none
          background white
          padding 0
          text-align left
          &.longname
            width auto
  &__stage
    width calc(50% - 100px)
    height 100vh
    margin 0 calc(calc((100vw - 100px) / 16) - 10px)
    flex(row, center, center)
    position absolute
    top 0
    transform translateY(10%)
    &.is-fixed
      position fixed
      // top 0
    ul
      flex(column, center, center)
      width 30%
      position relative
      padding 0
      // margin 1px
      &:nth-child(2)
        width 40%
      img
        position absolute
        top -12vw
        width 15vw
        z-index -1
        &.left
          left 0
        &.right
          right 0
      li
        list-style none
        padding-bottom 1rem
        border-bottom 1px solid #ccc
        width 100%
        text-align center
        font-size 1.5rem !important
        margin-bottom 1rem
        margin-top 0rem
        &:nth-of-type(1)
          font-size 1.5rem !important
          font-weight 500 !important

  button[type = "anchorAndReset"]
    display none
    cursor pointer
    position fixed
    bottom 20px
    right 20px
    border none
    padding 0
    background white
    line-height 0
    &:hover
      filter brightness(80%)
    .normal
      width 80px
      height 80px
    .reset
      background-color black
      width 80px
      height 80px
      flex(row, center, center)
      
@media (max-width: 1680px)
  .comparsion-container
    &__stage
      ul
        li
          font-size 1.2rem !important
          &:nth-of-type(1)
            font-size 1rem !important

@media (max-width: 1366px)
  .comparsion-container
    &__stage
      ul
        li
          font-size 1rem !important
          &:nth-of-type(1)
            font-size 1rem !important

@media (max-width: 1280px)
  .comparsion-container
    &__stage
      ul
        li
          font-size 0.9rem !important
          &:nth-of-type(1)
            font-size 1rem !important

// For iPad
@media (max-width: 1100px)
  .comparsion-container
    padding-top 50px
    flex-direction column-reverse
    &__list
      width calc(100% - 100px)
      margin 50px
      header
        text-align center
    &__stage
      width calc(100% - 100px)
      height 650px
      position static
      ul
        img
          top -22vh
          width 32vw
        li
          font-size 1.2rem !important
          &:nth-of-type(1)
            font-size 1.7rem !important

// For Iphone 6+
@media (max-width: 767px)
  .comparsion-container
    display none
</style>


