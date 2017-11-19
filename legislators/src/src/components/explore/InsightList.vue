<template>
  <section class="insight-list-container">
    <div class="rank-list" v-if="type === 'rank'">
      <template v-for="(identity, i) in getRank">
        <p :key="i" v-if="isCandidate(searchValue)" class="rank-list__item" :id="`rank-list__item--${identity['key']}`"
           @click="updateSearchValue(identity['key'], 'rank')"
           @mouseover="highlightLinks(identity['key'], 'company')"
           @mouseout="resumeLinks(identity['key'])">
          {{ i + 1 }}. {{ checkTruncate(identity['key'].replace(/[股份]*有限公司/, ''))}}
          <i class="desktop caret right icon" v-if="identity['type'] === 'parentCompany'" @click="clickCaret(identity, $event)"></i>
          <i class="mobile caret down icon" v-if="identity['type'] === 'parentCompany'"></i>
          <span class="rank-list__number">${{ rankValue(identity) }}</span>
        </p>
        <div class="dropdown" :id="`dropdown-${searchValue}-${identity['key']}-container`" v-if="identity['type'] === 'parentCompany'">
          <p v-for="child in identity['values']" class="rank-list__item" :id="`rank-list__item--${child['key']}`"
            @click="updateSearchValue(child['key'], 'rank')"
            @mouseover="highlightLinks(identity['key'], 'company', child['key'])"
            @mouseout="resumeLinks(identity['key'], child['key'])">
            {{ checkTruncate(child['key'].replace(/[股份]*有限公司/, '')) }}<span class="rank-list__number">${{ child['value']['values'].toLocaleString() }}</span>
          </p>
        </div>
        <p :key="i" v-if="isCompany(searchValue)" class="rank-list__item" :id="`rank-list__item--${identity['key']}`" 
           @click="updateSearchValue(identity['key'], 'rank')"
           @mouseover="highlightForceNodeAndItem(identity['key'], 'company')"
           @mouseout="resumeForceNodeAndItem(identity['key'])">
          {{ i + 1 }}. {{ checkTruncate(identity['key'])}} <span class="rank-list__number">${{ (+identity['value']).toLocaleString() }}</span>
        </p>
      </template>
    </div>
    <div class="candidates-overlap-list" v-if="type === 'overlap'">
      <template v-for="(candidate, i) in getOverlapCandidates">
        <p :key="i" v-if="isCandidate(searchValue)" class="candidates-overlap-list__item" :id="`candidates-overlap-list__item--${candidate[0]}`" 
           @click="updateSearchValue(candidate[0], 'overlap')"
           @mouseover="highlightForceNodeAndItem(candidate[0], 'candidate')" 
           @mouseout="resumeForceNodeAndItem(candidate[0])">
          {{ i + 1 }}. <span :style="{ color: setOverlapCandidateNameColor(candidate[2]) }">{{ candidate[0] }}</span> 重複 <span class="candidates-overlap-list__number">{{ candidate[1] }}</span> 家子公司
        </p>
      </template>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'
import $ from 'jquery'

import { checkTruncate } from '@/util'

export default {
  name: 'insightList',
  props: [ 'type', 'getRank', 'getOverlapCandidates', 'searchValue', 'getCandidatesNameList', 'getCompaniesNameList' ],
  methods: {
    isCandidate (name) {
      return _.includes(this.getCandidatesNameList, name)
    },
    isCompany (name) {
      return _.includes(this.getCompaniesNameList, name)
    },
    checkTruncate (string) {
      return checkTruncate(string, 6)
    },
    updateSearchValue (value, by) {
      $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=${by}-${value}`)
      this.$emit('updateSearchValue', value)
      d3.selectAll('.rank-list__item').style('opacity', '1')
      d3.selectAll('.candidates-overlap-list__item').style('opacity', '1')
    },
    clickCaret (identity, event) {
      event.stopPropagation()
      event.currentTarget.classList.toggle('right')
      event.currentTarget.classList.toggle('down')
      document.getElementById(`dropdown-${this.searchValue}-${identity['key']}-container`).classList.toggle('active')
    },
    rankValue (identity) {
      return d3.sum(identity['values'], d => d['value']['values']).toLocaleString()
    },
    setOverlapCandidateNameColor (party) {
      if (party === '中國國民黨') {
        return '#0071bc'
      } else if (party === '民主進步黨') {
        return '#53a66f'
      } else if (party === '時代力量') {
        return '#fcc037'
      } else if (party === '無黨團結聯盟') {
        return '#c7195c'
      } else if (party === '無黨籍') {
        return '#736357'
      }
    },
    highlightForceNodeAndItem (name, type) {
      let event = new MouseEvent('mouseover', {})
      document.querySelector(`#${name}-circle`).dispatchEvent(event)
      document.querySelector(`#${name}-image`).dispatchEvent(event)
      if (type === 'company') {
        d3.selectAll('.rank-list__item').style('opacity', '0.5')
        d3.select(`#rank-list__item--${name}`).style('opacity', '1')
      } else if (type === 'candidate') {
        d3.selectAll('.candidates-overlap-list__item').style('opacity', '0.5')
        d3.select(`#candidates-overlap-list__item--${name}`).style('opacity', '1')
      }
    },
    resumeForceNodeAndItem (name) {
      let event = new MouseEvent('mouseout', {})
      document.querySelector(`#${name}-circle`).dispatchEvent(event)
      document.querySelector(`#${name}-image`).dispatchEvent(event)
      d3.selectAll('.rank-list__item').style('opacity', '1')
      d3.selectAll('.candidates-overlap-list__item').style('opacity', '1')
    },
    highlightLinks (name, type, childName = null) {
      let event = new MouseEvent('mouseover', {})
      document.querySelector(`#${this.searchValue}-${name}-link`).dispatchEvent(event)
      if (type === 'company') {
        d3.selectAll('.rank-list__item').style('opacity', '0.5')
        d3.selectAll('.dropdown p').style('opacity', '0.5')
        childName ? d3.select(`#rank-list__item--${childName}`).style('opacity', '1') : d3.select(`#rank-list__item--${name}`).style('opacity', '1')
      } else if (type === 'candidate') {
        d3.selectAll('.candidates-overlap-list__item').style('opacity', '0.5')
        d3.select(`#candidates-overlap-list__item--${name}`).style('opacity', '1')
      }
    },
    resumeLinks (name, childName = null) {
      let event = new MouseEvent('mouseout', {})
      document.querySelector(`#${this.searchValue}-${name}-link`).dispatchEvent(event)
      d3.selectAll('.rank-list__item').style('opacity', '1')
      d3.selectAll('.candidates-overlap-list__item').style('opacity', '1')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../node_modules/semantic-ui-icon/icon.min.css"
.insight-list-container
  overflow scroll
  flex 1 1 0px
  .rank-list
    // overflow scroll
    // flex 1 1 0px
    p
      // margin .5em 0
      margin 0
      line-height 1.7
      position relative
      cursor pointer
    .mobile.caret.down.icon
      display none
    .dropdown
      display none
      margin-left 1rem
      &.active
        display block
    &__number
      color #9e005d
      position absolute
      right 11px
  .candidates-overlap-list
    // overflow scroll
    // flex 1 1 0px
    // font-size 1.2rem
    p
      // margin .5em 0
      margin 0
      line-height 1.7
      position relative
      cursor pointer
    .right
      position absolute
      right 0
    &__number
      color #9e005d

@media (max-width: 1280px)
  .insight-list-container
    .rank-list
      p
        font-size 0.8rem
    .candidates-overlap-list
      p
        font-size 0.8rem

@media (max-width: 767px)
  .insight-list-container
    overflow initial
    .rank-list
      margin 0 20px
      p
        font-size 1.2rem
      .desktop.caret.right.icon
        display none
      .mobile.caret.down.icon
        display inline
      .dropdown
        display block
    .candidates-overlap-list
      margin 0 20px
      p
        font-size 1.2rem

// @media (max-width: 413px)
//   .insight-list-container
//     .rank-list
//       p
//         font-size 1rem
//     .candidates-overlap-list
//       p
//         font-size 1rem

@media (max-width: 374px)
  .insight-list-container
    .rank-list
      p
        font-size 1rem
    .candidates-overlap-list
      p
        font-size 1rem
</style>


