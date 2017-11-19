<template>
  <div class="basic-info-container">
    <!-- Candidate informations  -->
    <template v-if="type === 'candidate-basic'">
      <div class="non-tablet">
        <div class="info-portrait-container">
          <div class="infos">
            <h1>{{ data['姓名'] }} <span style="font-size: .5em">({{ calcAgeByBornYear(data['出生年次']) }} 歲)</span></h1>
            <h2>{{ data['推薦政黨'] }} {{ getElectionResult(data) }}</h2>
            <h2 v-show="data['委員會'] !== ''">{{ getCommitteeResult(data) }}</h2>
          </div>
          <div class="portrait">
            <candidatePortraitRound v-if="data['當選註記'] === '*' && !hidePortrait" :party="data['推薦政黨']" :name="data['姓名']"></candidatePortraitRound>
          </div>
        </div>
      </div>
      <div class="tablet">
        <h1>
          {{ data['姓名'] }} 
          <span style="font-size: 1rem">
            {{ calcAgeByBornYear(data['出生年次']) }} 歲／{{ data['推薦政黨'] }}／{{ getElectionResult(data) }}<span v-show="data['委員會'] !== ''">／{{ getCommitteeResult(data) }}</span>
          </span>
        </h1>
      </div>
    </template>
    <template v-if="type === 'candidate-detail'">
      <h2>總收入 <span class="highlight">{{ toTenThousandNotation(data['總收入']) }}</span> 萬元</h2>
      <h2>營利事業收入 <span class="highlight">{{ toTenThousandNotation(data['營利事業捐贈收入']) }}</span> 萬元</h2>
      <h2>捐贈公司數 <span class="highlight">{{ data['捐贈企業數'] }}</span> 家</h2>
      <h2>營利事業捐贈：{{ data['營利事業捐贈比例'] }}</h2>
      <h2>個人捐贈：{{ data['個人捐贈比例'] }}</h2>
      <h2>政黨捐贈：{{ data['政黨捐贈收入比例'] }}</h2>
      <h2>人民團體捐贈：{{ data['人民團體收入比例'] }}</h2>
      <h2>匿名捐贈：{{ data['匿名捐贈比例'] }}</h2>
      <h2>其他：{{ data['其他收入比例'] }}</h2>
    </template>
    
    <!-- Company informations  -->
    <template v-if="type === 'company-basic'">
      <h1>{{ data['公司名'] }}</h1>
      <!-- <h2>母集團名稱：{{ data['tej']['集團名'] }}</h2> -->
      <!-- <h2>董事長：{{ data['tej']['董事長'] }}</h2> -->
      <!-- <h2>核心公司：{{ data['tej']['核心公司(Y)'] }}</h2> -->
    </template>
    <template v-if="type === 'company-detail'">
      <h2 v-if="data['旗下核心公司']">旗下核心公司：{{ data['旗下核心公司'] }}</h2>
      <h2>代表人：{{ data['代表人姓名'] }}</h2>
      <h2>資本額 <span class="highlight">{{ isNaN(toOneHundredMillionNotation(data['資本總額(元)'])) ? data['資本總額(元)'] : toOneHundredMillionNotation(data['資本總額(元)']) }}</span> 億元</h2>
      <h2>營利事業捐贈 <span class="highlight">{{ typeof totalData === 'string' ? toTenThousandNotation(totalData) : sumMoneyFromObjects(totalData) }}</span> 萬元</h2>
    </template>

    <!-- Toolltips -->
    <!-- For Candiates'node, we have more informations below -->
    <template v-if="type === 'tooltip-node'">
      <!-- <h2>總收入 <span class="highlight">{{ toTenThousandNotation(data['總收入']) }}</span> 萬元</h2> -->
      <h2>本關係圖中收入共 <span class="highlight">{{ toTenThousandNotation(totalData) }}</span> 萬元</h2>
    </template>
    <!-- For links -->
    <template v-if="type === 'tooltip-link'">
      <h1>{{ tooltipTargetName }}</h1>
      <h2>以營利事業名義捐贈給</h2>
      <h1>{{ tooltipSourceName }}</h1>
      <h2><span class="highlight">{{ tooltipLinkMoney }}</span> 萬元</h2>
      <h2 v-show="tooltipDetailOfParent">子公司明細：</h2>
      <h2 v-show="tooltipDetailOfParent" v-for="d in tooltipDetailOfParent">{{ d['key'] }} 捐贈 <span class="highlight">{{ toTenThousandNotation(+d['value']['收入金額']) }}</span> 萬元</h2>
    </template>
  </div>
</template>

<script>
import { calcAgeByBornYear, toTenThousandNotation, toOneHundredMillionNotation } from '@/util'
import CandidatePortraitRound from '../CandidatePortraitRound'

export default {
  name: 'info',
  props: [ 'data', 'type', 'hidePortrait', 'totalData', 'tooltipSourceName', 'tooltipTargetName', 'tooltipLinkMoney', 'tooltipDetailOfParent', 'getTargetOnlyDetailData' ],
  components: {
    CandidatePortraitRound
  },
  methods: {
    calcAgeByBornYear (bornYear) {
      return calcAgeByBornYear(bornYear)
    },
    toTenThousandNotation (money) {
      return toTenThousandNotation(money)
    },
    toOneHundredMillionNotation (money) {
      return toOneHundredMillionNotation(money)
    },
    sumMoneyFromObjects (array) {
      let money = array.reduce((sum, object) => {
        let money = +(object['value'])
        return sum + money
      }, 0)

      return toTenThousandNotation(money)
    },
    getElectionResult (data) {
      return data['當選註記'] !== '' ? (data['是否現任'] === '是' ? '連任' : '現任') : '未當選'
    },
    getCommitteeResult (data) {
      return data['委員會'] !== '' ? `${data['委員會']}委員會` : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.basic-info-container
  margin 0 1rem
  padding 0.5rem 0
  // display flex
  // flex-direction column
  // justify-content flex-start
  // align-items flex-start
  .tablet
    display none
  .non-tablet
    display block
    .info-portrait-container
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      // .portrait
      //   width 40%
  h1
    font-size 2rem !important
    font-weight 500 !important
    // margin .5rem 0
    margin 0
    line-height 1.4
  h2
    font-size 1.2rem !important
    font-weight 400 !important
    // margin .5rem 0
    margin 0
    line-height 1.7
  .highlight
    font-size 2rem !important
    font-weight 700 !important
    color #9e005d
    line-height 1.2

@media (max-width: 1680px)
  .basic-info-container
    h1
      font-size 1.66rem !important
    h2
      font-size 1rem !important
    .highlight
      font-size 1.66rem !important

@media (max-width: 1440px)
  .basic-info-container
    h1
      font-size 1.45rem !important
    h2
      font-size 0.9rem !important
    .highlight
      font-size 1.45rem !important

@media (max-width: 1280px)
  .basic-info-container
    h1
      font-size 1.32rem !important
    h2
      font-size 0.8rem !important
    .highlight
      font-size 1.32rem !important

@media (max-width: 1116px)
  .basic-info-container
    h1
      font-size 1.2rem !important
    h2
      font-size 0.7rem !important
    .highlight
      font-size 1.2rem !important

// For iPad
@media (max-width: 1100px)
  .basic-info-container
    .tablet
      display block
    .non-tablet
      display none

// For iPhone 6+
@media (max-width: 767px)
  .basic-info-container
    h1
      font-size 2rem !important
    h2
      font-size 1.2rem !important
    .tablet
      display none
    .non-tablet
      display block

// For iPhone 5
@media (max-width: 374px)
  .basic-info-container
    h1
      font-size 1.66rem !important
    h2
      font-size 1rem !important
</style>
