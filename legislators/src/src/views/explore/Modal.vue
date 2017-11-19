<template>
  <section class="modal-container">
    <main>
      <header>
        <h1>立委與營利事業捐贈關係圖</h1>
        <searchBox class="desktop" :options="getSearchOptions" @submitSearch="updateSearchValue"></searchBox>
      </header>
      <section id="graph-container">
        <searchBox class="tablet" :options="getSearchOptions" @submitSearch="updateSearchValue"></searchBox>
        <forceDirectedGraph v-if="searchValue" :target="searchValue" :data="getTargetRelatedDetailData" :abstractData="abstractData" @repaint="updateSearchValue"></forceDirectedGraph>
      </section>
    </main>
    
    <aside v-if="searchValue">
      <!-- Common informations blocks for candidates and companies -->
      <div class="modal-container__info">
        <info v-if="isCandidate(searchValue)" class="modal-container__info--candidate-basic" :type="'candidate-basic'" :data="getTargetRelatedAbstractData"></info>
        <info v-if="isCandidate(searchValue)" v-show="showDetailInfoHandler()" class="modal-container__info--candidate-detail" :type="'candidate-detail'" :data="getTargetRelatedAbstractData"></info>
        <info v-if="isCompany(searchValue)" class="modal-container__info--candidate-basic" :type="'company-basic'" :data="{ '公司名': searchValue, 'tej': tejData }"></info>
        <info v-if="isCompany(searchValue)" v-show="showDetailInfoHandler()" class="modal-container__info--candidate-detail" :type="'company-detail'" :data="{ '旗下核心公司': companyCoreChild, '代表人姓名': companyOwner, '資本總額(元)': companyCapital }" :totalData="getRank"></info>
      </div>
      <!--  -->
      <div class="modal-container__insight non-mobile-phone">
        <insightButton :class="{ 'active': insightButtonToggle === 'rank' }" @click.native="clickInsight('rank')" :type="'rank'" :searchValue="searchValue"></insightButton>
        <insightList :getRank="getRank" :type="'rank'" v-show="insightButtonToggle === 'rank'"
                     @updateSearchValue="updateSearchValue"
                     :searchValue="searchValue"
                     :getCandidatesNameList="getCandidatesNameList"
                     :getCompaniesNameList="getCompaniesNameList">
        </insightList>

        <insightButton v-show="isCandidate(searchValue)" :class="{ 'active': insightButtonToggle === 'overlap' }" @click.native="clickInsight('overlap')" :type="'overlap'" :searchValue="searchValue"></insightButton>
        <insightList :getOverlapCandidates="getOverlapCandidates" :type="'overlap'" v-show="insightButtonToggle === 'overlap'"
                     @updateSearchValue="updateSearchValue"
                     :searchValue="searchValue"
                     :getCandidatesNameList="getCandidatesNameList"
                     :getCompaniesNameList="getCompaniesNameList">
        </insightList>
      </div>
      <!--  -->
      <div class="modal-container__insight mobile-phone">
        <!-- <div>
          <button style="position: fixed; top: 20px; right: 20px; z-index: 10" @click="showSearchBoxMobile = !showSearchBoxMobile"></button>
          <searchBox v-show="showSearchBoxMobile" class="mobile" :options="getSearchOptions" @submitSearch="updateSearchValue"></searchBox>
        </div> -->

        <div class="insight-buttons-container">
          <insightButton :class="{ 'active': insightButtonToggle === 'rank' }" @click.native="clickInsight('rank')" :type="'rank'" :searchValue="searchValue"></insightButton>
          <insightButton :class="{ 'active': insightButtonToggle === 'overlap', 'blank': !isCandidate(searchValue) }" @click.native="!isCandidate(searchValue) ? null : clickInsight('overlap')" :type="'overlap'" :searchValue="searchValue"></insightButton>
        </div>

        <header>
          <img src="~assets/images/finger.png" class="finger" alt="">
          <span v-show="insightButtonToggle === 'rank'">
            {{ isCandidate(searchValue) ? '點選這些企業看捐給了誰' : '點選這些候選人看獻金資訊'}}
          </span>
          <span v-show="insightButtonToggle === 'overlap'">
            點選這些候選人看獻金資訊
          </span>
        </header>
        
        <insightList :getRank="getRank" :type="'rank'" v-show="insightButtonToggle === 'rank'"
                     @updateSearchValue="updateSearchValue"
                     :searchValue="searchValue"
                     :getCandidatesNameList="getCandidatesNameList"
                     :getCompaniesNameList="getCompaniesNameList">
        </insightList>
        <insightList :getOverlapCandidates="getOverlapCandidates" :type="'overlap'" v-show="insightButtonToggle === 'overlap'"
                     @updateSearchValue="updateSearchValue"
                     :searchValue="searchValue"
                     :getCandidatesNameList="getCandidatesNameList"
                     :getCompaniesNameList="getCompaniesNameList">
        </insightList>
      </div>
    </aside>
  </section>
</template>

<script>
import SearchBox from '@/components/explore/SearchBox'
import ForceDirectedGraph from '@/components/explore/ForceDirectedGraph'
import Info from '@/components/explore/Info'
import InsightButton from '@/components/explore/InsightButton'
import InsightList from '@/components/explore/InsightList'

import _ from 'lodash'
import * as d3 from 'd3'

export default {
  components: {
    SearchBox,
    ForceDirectedGraph,
    Info,
    InsightButton,
    InsightList
  },
  props: [ 'abstractData', 'detailData', 'clickedCandidateName' ],
  watch: {
    clickedCandidateName () {
      this.updateSearchValue(this.clickedCandidateName)
    },
    searchValue () {
      if (window.innerWidth > 767) {
        this.insightButtonToggle = null
      }
      if (this.isChildCompany(this.searchValue)) {
        this.companyCoreChild = null
        let companyId = _.find(this.getTargetRelatedDetailData, ['捐贈者／支出對象', this.searchValue])['統一編號']
        d3.request(`https://company.g0v.ronny.tw/api/show/${companyId}`)
        .get((err, res) => {
          if (err) {
            this.companyCapital = '查無資料'
            this.companyOwner = '查無資料'
          }
          this.companyCapital = JSON.parse(res.response).data['資本總額(元)']
          this.companyOwner = JSON.parse(res.response).data['代表人姓名']
        })
      } else if (this.isParentCompany(this.searchValue)) {
        this.companyOwner = this.getTargetOnlyDetailData[0]['董事長']
        this.companyCoreChild = this.getTargetOnlyDetailData[0]['旗下核心公司']
        let ids = _.uniq(this.getTargetOnlyDetailData.map(d => d['統一編號']))
        let queue = d3.queue()
        ids.forEach((id) => {
          queue.defer(d3.request, `https://company.g0v.ronny.tw/api/show/${id}`)
        })
        queue.awaitAll((error, XHRS) => {
          if (error) throw error
          let capital = 0
          XHRS.forEach((XHR) => {
            let eachCapital = +(JSON.parse(XHR.response).data['資本總額(元)'].split(',').join(''))
            capital += eachCapital
          })
          this.companyCapital = capital
        })
      }
    }
  },
  data () {
    return {
      searchValue: null,
      companyCapital: null,
      companyOwner: null,
      companyCoreChild: null,
      insightButtonToggle: null,
      showSearchBoxMobile: false
    }
  },
  computed: {
    nestedData () {
      if (this.detailData) {
        return {
          'byCandidate': d3.nest().key(d => d['候選人']).key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).object(this.detailData),
          // 'byCompany': d3.nest().key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).key(d => d['候選人']).object(this.detailData),
          'byParentCompany': d3.nest().key(d => { if (d['集團碼']) { return d['集團碼'] } }).key(d => d['候選人']).object(this.detailData),
          'byChildCompany': d3.nest().key(d => d['捐贈者／支出對象']).key(d => d['候選人']).object(this.detailData)
        }
      }
    },
    list () {
      if (this.nestedData) {
        return {
          'candidate': d3.keys(this.nestedData.byCandidate),
          // 'company': d3.keys(this.nestedData.byCompany),
          'parentCompany': d3.keys(this.nestedData.byParentCompany),
          'childCompany': d3.keys(this.nestedData.byChildCompany),
          'company': _.concat(d3.keys(this.nestedData.byParentCompany), d3.keys(this.nestedData.byChildCompany))
        }
      }
    },
    getTargetOnlyDetailData () {
      if (this.clickedCandidateName) {
        if (this.isCandidate(this.searchValue)) {
          let candidateName = this.searchValue
          let candidateData = this.detailData.filter(d => d['候選人'] === candidateName)
          return candidateData
        } else if (this.isCompany(this.searchValue)) {
          let companyName = this.searchValue
          if (this.isParentCompany(this.searchValue)) {
            let companyData = this.detailData.filter(d => d['集團碼'] === companyName)
            return companyData
          } else {
            let companyData = this.detailData.filter(d => d['捐贈者／支出對象'] === companyName)
            return companyData
          }
        }
      }
    },
    getTargetRelatedDetailData () {
      if (this.clickedCandidateName) {
        if (this.isCandidate(this.searchValue)) {
          let candidateName = this.searchValue
          let candidateData = this.detailData.filter(d => d['候選人'] === candidateName)

          let companies = []
          candidateData.forEach(d => {
            d['集團碼'] ? companies.push(d['集團碼']) : companies.push(d['捐贈者／支出對象'])
          })

          let data = this.detailData.filter(d => d['集團碼'] ? _.includes(companies, d['集團碼']) : _.includes(companies, d['捐贈者／支出對象']))
          return data
        } else if (this.isCompany(this.searchValue)) {
          let companyName = this.searchValue
          if (this.isParentCompany(this.searchValue)) {
            let companyData = this.detailData.filter(d => d['集團碼'] === companyName)
            return companyData
          } else {
            let companyData = this.detailData.filter(d => d['捐贈者／支出對象'] === companyName)
            return companyData
          }
        }
      }
    },
    getCandidatesNameList () {
      return this.list.candidate
    },
    getCompaniesNameList () {
      return this.list.company
    },
    getRank () {
      // if (this.getTargetOnlyDetailData) {
      if (this.isCandidate(this.searchValue)) {
        let data = this.getTargetOnlyDetailData.sort((a, b) => b['收入金額'] - a['收入金額'])
        let priorityOrder = d3.nest()
                             .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'])
                             .rollup(leaves => d3.sum(leaves, d => d['收入金額']))
                             .entries(data)
        priorityOrder.sort((a, b) => b.value - a.value)
        priorityOrder = priorityOrder.map(o => o.key)
        data = d3.nest()
               .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).sortKeys(function (a, b) { return priorityOrder.indexOf(a) - priorityOrder.indexOf(b) })
               .key(d => d['捐贈者／支出對象'])
               .rollup(leaves => { return { 'values': d3.sum(leaves, d => d['收入金額']) } })
               .entries(data)
        data = data.map(o => {
          return {
            'type': o.values[0].key === o.key ? 'childCompany' : 'parentCompany',
            'key': o.key,
            'values': o.values
          }
        })
        return data
      } else {
        // return this.getTargetOnlyDetailData
        return d3.nest()
               .key(d => d['候選人'])
               .rollup(leaves => d3.sum(leaves, d => d['收入金額']))
               .entries(this.getTargetOnlyDetailData)
               .sort((a, b) => +b['value'] - +a['value'])
      }
    },
    getOverlapCandidates () {
      if (this.getTargetRelatedDetailData) {
        let includesTarget = _.countBy(this.getTargetRelatedDetailData, candidate => candidate['候選人'])
        let excludesTarget = _.pickBy(includesTarget, (value, key) => !_.startsWith(key, this.searchValue))
        let sortable = []
        for (let candidate in excludesTarget) {
          let party = _.find(this.getTargetRelatedDetailData, { '候選人': candidate })['推薦政黨']
          sortable.push([candidate, excludesTarget[candidate], party])
        }
        sortable.sort(function (a, b) {
          return b[1] - a[1]
        })
        return sortable
      }
    },
    getSearchOptions () {
      return _.concat(this.getCandidatesNameList, this.getCompaniesNameList)
    },
    getTargetRelatedAbstractData () {
      let vm = this
      if (this.isCandidate(this.searchValue)) {
        let candidateName = this.searchValue
        vm.companyCapital = '查詢中'
        vm.companyOwner = '查詢中'
        return this.abstractData.filter(d => d['姓名'] === candidateName)[0]
      }
      // } else if (this.isCompany(this.searchValue)) {
      //   let companyId = _.find(this.getTargetRelatedDetailData, ['捐贈者／支出對象', this.searchValue])['統一編號']
      //   d3.request(`https://company.g0v.ronny.tw/api/show/${companyId}`)
      //   .get((err, res) => {
      //     if (err) {
      //       vm.companyCapital = '查無資料'
      //       vm.companyOwner = '查無資料'
      //     }
      //     vm.companyCapital = JSON.parse(res.response).data['資本總額(元)']
      //     vm.companyOwner = JSON.parse(res.response).data['代表人姓名']
      //   })
      //   return null
      // }
    },
    tejData () {
      if (this.isCompany(this.searchValue)) {
        if (this.isParentCompany(this.searchValue)) {
          if (_.find(this.detailData, ['集團碼', this.searchValue])['集團碼'] !== '') {
            return {
              '集團名': _.find(this.detailData, ['集團碼', this.searchValue])['集團碼'].substring(6),
              '董事長': _.find(this.detailData, ['集團碼', this.searchValue])['董事長'],
              '核心公司(Y)': _.find(this.detailData, ['集團碼', this.searchValue])['核心公司(Y)'] === '' ? '否' : '是'
            }
          } else {
            return '無'
          }
        } else {
          if (_.find(this.detailData, ['捐贈者／支出對象', this.searchValue])['集團碼'] !== '') {
            return {
              '集團名': _.find(this.detailData, ['捐贈者／支出對象', this.searchValue])['集團碼'].substring(6),
              '董事長': _.find(this.detailData, ['捐贈者／支出對象', this.searchValue])['董事長'],
              '核心公司(Y)': _.find(this.detailData, ['捐贈者／支出對象', this.searchValue])['核心公司(Y)'] === '' ? '否' : '是'
            }
          } else {
            return '無'
          }
        }
      }
    }
  },
  methods: {
    showDetailInfoHandler () {
      if (window.innerWidth > 1100) {
        return this.insightButtonToggle === null
      } else {
        return true
      }
    },
    updateSearchValue (value) {
      this.searchValue = value
    },
    isCandidate (name) {
      // return _.includes(this.getCandidatesNameList, name)
      return this.list.candidate.includes(name)
    },
    isCompany (name) {
      // return _.includes(this.getCompaniesNameList, name)
      return this.list.company.includes(name)
    },
    isParentCompany (name) {
      return this.list.parentCompany.includes(name)
    },
    isChildCompany (name) {
      // return _.includes(this.getCompaniesNameList, name)
      return this.list.childCompany.includes(name)
    },
    clickInsight (buttonName) {
      if (window.innerWidth <= 767) {
        if (buttonName === 'rank') {
          this.insightButtonToggle = 'rank'
        } else {
          this.insightButtonToggle = 'overlap'
        }
      } else {
        if (buttonName === 'rank') {
          this.insightButtonToggle === 'rank' ? this.insightButtonToggle = null : this.insightButtonToggle = 'rank'
        } else {
          this.insightButtonToggle === 'overlap' ? this.insightButtonToggle = null : this.insightButtonToggle = 'overlap'
        }
      }
    }
  },
  mounted () {
    if (window.innerWidth <= 767) {
      this.insightButtonToggle = 'rank'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

.modal-container
  width 100%
  height calc(100vh - 7rem)
  flex(row, flex-start, flex-start)
  padding 0.5em 0
  box-sizing border-box
  main
    width 80%
    height 100%
    display flex
    flex-direction column
    // margin 0.5rem 0
    // box-sizing border-box
    header
      // height calc(10vh - 0.5rem)
      height 6%
      flex(row, flex-start, center)
      position relative
      margin 0 1rem 0 2rem
      h1
        font-weight 500
        margin 0
    section
      position relative
      height 94%
      .tablet
        display none

  aside
    width 20%
    height 100%
    display flex
    flex-direction column
    border-left 2px solid #d3d3d3
    box-sizing border-box
    .modal-container__info
      &--candidate-basic
        // padding 0.5rem 0
        padding-top 0
        height auto
        border-bottom 2px solid #d3d3d3
      &--candidate-detail
        // padding 0.5rem 0
        height auto
        border-bottom 2px solid #d3d3d3
    .modal-container__insight
      padding 0.5rem 0
      margin 0 1rem
      height 100%
      display flex
      flex-direction column
      &.mobile-phone
        display none
    &__bar
      height 20vh

@media (max-width: 1680px)
  .modal-container
    main
      header
        h1
          font-size 1.66rem

@media (max-width: 1440px)
  .modal-container
    main
      header
        h1
          font-size 1.45rem

@media (max-width: 1280px)
  .modal-container
    main
      header
        h1
          font-size 1.32rem

@media (max-width: 1116px)
  .modal-container
    main
      header
        h1
          font-size 1.2rem

@media (max-width: 1100px)
  .modal-container
    flex-direction column
    main
      width 100%
      height calc(70% - 0.5rem)
      header
        .desktop
          display none
      .graph-container
        .tablet
          display block
    aside
      width calc(100% - 4rem)
      height calc(30% - 0.5rem)
      flex-direction row
      border-left none
      border-top 2px solid #d3d3d3
      margin 0 2rem
      .modal-container__info
        width 60%
        margin 1rem 1rem 1rem 0
        border-right 2px solid #d3d3d3
        &--candidate-basic
          border none
          margin 0
        &--candidate-detail
          border none
          margin 0
      .modal-container__insight
        width 40%

// For iPhone 6+
@media (max-width: 767px)
  .modal-container
    height 100vh
    overflow scroll
    main
      display none
    aside
      width 100%
      height 100%
      flex-direction column
      border none
      margin 0
      .modal-container__info
        width calc(100% - 40px)
        border none
        margin 0 20px
        &--candidate-basic
          border-bottom 2px solid #d3d3d3
      .modal-container__insight
        width 100%
        flex-direction column
        margin 0
        padding 0
        position relative
        // .mobile
        //   position fixed
        //   // bottom 40px
        //   // left 50px     
        //   top 10px
        //   right 50px
        //   z-index 10
        .insight-buttons-container
          min-height calc(65px + 1rem)
          display flex
          flex-direction row
        &.non-mobile-phone
          display none
        &.mobile-phone
          display flex
        header
          margin 5px 20px
          font-size 1.2rem
          img
            height 1.2rem

// For Iphone 6
@media (max-width: 413px)
  .modal-container
    aside
      .modal-container__insight
        header
          margin 5px 20px
          font-size 1rem
          img
            height 1rem
        .insight-buttons-container
          min-height calc(55px + 1rem)
          
// For iPhone 5
@media (max-width: 374px)
  .modal-container
    aside
      .modal-container__insight
        header
          margin 5px 20px
          font-size 1rem
          img
            height 1rem
        .insight-buttons-container
          min-height calc(45px + 1rem)

</style>
