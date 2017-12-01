<template>
  <main id="story1">
    <header>
      <h1>選一次立委，金流超過 28 億！</h1>
      <div class="credit-container">
        <p class="credit">文：李又如 設計：陳怡蒨</p>
        <p class="credit">網站製作：熊凱文 資料整理：李又如、熊凱文</p>
        <p class="credit credit--date">發布日期：2017/11/9</p>
      </div>
    </header>
    <article>
      <p>2016 年，台灣剛結束一場熱鬧的選舉，緊接著 2018 年的選舉又將到來。民主制度是台灣人驕傲的資產，但如何讓手中的這一票，發揮它最大的價值？近幾年來，人民對於政治開放的訴求愈來愈高，但卻有一項重要的資料被技術性地「鎖」在政府機關，那就是政治獻金。</p>
      <p>根據資料統計， 2016 年的選舉，光是區域立委候選人<span class="highlight" @click="toggleAdditionalInfo(1)">（註）</span>就收到了 28 億元的捐贈。倘若人們想要知道這 28 億金流的細節，要付出什麼樣的代價？</p>
      <section class="additional" v-show="AdditionalInfo[1]">
        <p>註：</p>
        <p>本政治獻金專案統計的範圍是「有開設政治獻金專戶」且「有登記參選」的候選人，不分區立委是按照政黨票得票比率來決定當選與否，沒有個人的政治獻金專戶。所以只有區域立委候選人、原住民立委候選人共計 261 人為此次的統計樣本。</p>
      </section>
      <p>雖然台灣有規定候選人必須依《政治獻金法》申報政治獻金，資料也會在選舉結束後被公開檢視，但與其說是「公開」，不如說是像文物一樣被「典藏」。上網公開的只有各項政治獻金的統計，想知道明細，必須先向監察院提出申請，付小額的查閱費用，但最多也只能把資料印在一張張的 A4 紙上，完全無法應用。</p>
      <p>正因如此，在 2014 年，著名的公民社群 g0v 零時政府發起了一項<a href="https://g0v.hackpad.tw/8ow2GnliH48" class="highlight" target="_blank">「政治獻金透明化」</a>專案，將從監察院印出的候選人政治獻金資料，以「字」為單位切成小塊的圖檔，利用文字辨識（OCR, Optical Character Recognition）的概念，讓網友來參與，結果在 24 小時之內，就完成了將近 31 萬格的文字辨識，成功數位化 7 個政治獻金專戶、 2637 份文件資料。</p>
      <p>當時獲得的熱烈迴響，還包括多位立委提出《政治獻金法》修法，讓專案發起人之一王向榮覺得「效果已達到，等修完法就有乾淨的數位檔可以用了」，沒想到這麼一等，等到立委又再選了一輪，政治獻金明細公開的法源仍然沒有下文。</p>
      <p>也就是說，儘管這些金流完全合法，卻無法公開被檢視。《鏡傳媒》與從事政治獻金研究的中研院副研究員李宗榮合作，鎖定 2016 年立委選舉的「營利事業捐贈」捐獻明細，把資料從監察院帶出來、數位化、並開發成工具，希望能透過資料實際被應用的過程，彰顯公開這份資料的重要性。</p>
      <!-- chart7 -->
      <figure class="desktop">
        <figcaption><h2>本次政治獻金的組成</h2></figcaption>
        <Chart11Desktop></Chart11Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>本次政治獻金的組成</h2></figcaption>
        <Chart11Mobile></Chart11Mobile>
      </figure>
      <p>我們發現，這 261 位候選人共收入政治獻金 2,817,453,078 元。其中營利事業的政治獻金捐贈佔了 32%，分別捐給 208 位候選人。這 5797 筆明細分別由 4162 家公司捐贈，但只有 255 家有捐超過 100 萬，最後一名是捐 100 塊。</p>
      <p>再比對母公司與集團資料後，有 432 家公司隸屬於 254 個集團，掌握了 40％ 的營利事業政治獻金，第一名是徐旭東的遠東集團，共捐了 5 千 400 萬，是第二名裕隆集團的 1.6 倍。</p>
      <p>這份資料當然有它的侷限，檯面下的利益交換、或是否有刻意不被申報的金流，都不在我們能夠檢視的範圍內。候選人在資料裡收入數字的多寡，最理想的情況，能夠直接代表他的募款能力；但以現實來講，則是候選人願意誠實申報的內容。</p>
      <p>那，我們應該怎麼來解讀這些合法的政治金流呢？</p>
      <p>在《政治獻金法》的定義裡，政治獻金指的是國民對「競選活動或其他政治相關活動」無償提供的資產，不能有對價、或其他經濟利益的掛鉤。</p>
      <p>實際上呢？我們節錄了一些訪問，或許可以提供給讀者一些閱讀的面向：</p>
      <section class="quote">
        <p>「國外的學者認為，政治獻金不一定是直接的影響力，但是是一種影響的管道。不是我給你錢，就可以命令你做什麼，但跟其他人比起來，至少多了一個管道。他（捐贈者）要怎麼運用這個管道是另一回事，但我們一般人就沒有這個管道。</p>
        <p>而台灣有些研究認為，政治獻金是一種買保險的概念。我現在用不到，就是灑錢，但我需要的時候、有困難的時候，至少有人可以幫我解決問題。錢灑得愈多、愈廣，保險的網就愈大。」</p>
        <p class="quote-by">（中研院社會所副研究員李宗榮）</p>
      </section>
      <section class="quote">
        <p>「選舉的時候，真的永遠都覺得錢不夠，多一點錢、多掛幾個看板、多買幾份廣告，多找幾個工讀生，選到後來就覺得差一點點了。對於選舉的人來說，這些政治獻金就是無止盡的『即時雨』，很難拒絕的。」</p>
        <p class="quote-by">（助選志工）</p>
      </section>
      <section class="quote">
        <p>「企業可以選我，我也可以選企業啊，我不收總可以吧。但通常沒去要，他們也不會主動給，沒有私人關係，是不會給的。」</p>
        <p class="quote-by">（立委助理）</p>
      </section>
      <section class="quote">
        <p>「政治獻金只是競選經費的一個來源，假設你是一個沒有錢的候選人，政治獻金的多寡就很關鍵。但對自有財產的候選人，政治獻金可能只是錦上添花。</p>
        <p>企業捐款，通常會事先計算抵稅需求，可以撥出多少錢來捐款。由於捐款有上限，針對一個候選人是 100 萬、多位候選人則是 200 萬。如果要做公關的話，捐給多位候選人，一個人頂多 20 萬。如果針對個人捐超過 50 萬、或是捐到滿（ 100 萬），就需要特別關注。」</p>
        <p class="quote-by">（中正大學政治系副教授、2016 年社民黨候選人陳尚志）</p>
      </section>
      <section class="quote">
        <p>「我覺得還是要鼓勵政治人物申報政治獻金。除非真的被抓到對價關係，不然只有沒錢或乖乖申報的人被檢視。很多人會成立公司、基金會、協會去規避，通常沒錢的人，募多少，花多少。帳面上少的人，花的才可怕。」</p>
        <p class="quote-by">（立委助理）</p>
      </section>
      <p>接下來幾天，我們還會就立委、企業、政黨等面向作更進一步的分析<span class="highlight" @click="toggleSubscribe">（歡迎點此訂閱通知追蹤後續報導）</span>！如果你也對這份資料有什麼好奇，歡迎你留言告訴我們，<router-link class="highlight" to="/explore">或是透過我們製作的工具來挖掘看看吧！</router-link></p>
    </article>
    <StoryBottomNav></StoryBottomNav>
    <!-- <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div> -->
  </main>
</template>

<script>
import Chart11Desktop from '@/components/topic/desktop/Chart1-1'
import Chart11Mobile from '@/components/topic/mobile/Chart1-1'
import StoryBottomNav from '@/components/topic/StoryBottomNav'
import registerMailChimpPopup from '@/mixins/registerMailChimpPopup'

export default {
  components: {
    Chart11Desktop,
    Chart11Mobile,
    StoryBottomNav
  },
  mixins: [ registerMailChimpPopup ],
  data () {
    return {
      AdditionalInfo: {
        1: false
      }
    }
  },
  methods: {
    toggleAdditionalInfo (name) {
      this.AdditionalInfo[name] = !this.AdditionalInfo[name]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!from.name) {
        vm.$scrollTo('.content')
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/util.styl'

#story1
  flex(column, center, center)
  padding 5% 20%
  header
    h1
      text-align center
      margin-bottom 1rem
    .credit-container
      .credit
        text-align center
        color #808080
  article
    .highlight
      color #C31C5C
      font-weight bold
      border-bottom 2px solid #C31C5C
      text-decoration none
      cursor pointer
    .additional
      flex(row, center, flex-start)
      border 1px solid #808080
      box-sizing border-box
      padding 0 1.5rem
      color #808080
    .quote
      border-left 10px solid gray
      padding-left 2rem
      p:nth-of-type(n)
        margin-bottom 0
      .quote-by
        position relative
        right 0
        text-align end
        margin-top 0
        color #808080
    figure
      width 50%
      margin 0 auto
      figcaption
        h2
          text-align center
          margin-bottom 1rem
      &.desktop
        display block
      &.mobile
        display none
  .fb-comments
    display none

@media (max-width: 767px)
  #story1
    padding 5%
    display block
    article
      figure
        width 100%
        &.desktop
          display none
        &.mobile
          display block
    .fb-comments
      display block
</style>

