<template>
  <main id="story2">
    <header>
      <h1>立委篇／老鳥與新秀，募款能力差了 6.6 倍</h1>
      <div class="credit-container">
        <p class="credit">文：李又如 設計：陳怡蒨</p>
        <p class="credit">網站製作：熊凱文 資料整理：李又如、熊凱文</p>
      </div>
    </header>
    <article>
      <p>以候選人自主申報的政治獻金資料來看，第九屆區域立委的政治獻金流還是集中在少數人身上，共計 261 位候選人中，收入前 48 位掌握了五成的政治獻金，數據也顯示，「現任」立委有較好的募款優勢。</p>
      <!-- chart21 -->
      <figure class="full">
        <figcaption><h2><span class="highlight-color">48 名候選人（20%）</span>掌握了 50% 的政治獻金</h2></figcaption>
        <figcaption><h3>點擊方塊看獻金資訊</h3></figcaption>
        <iframe src="https://plotdb.io/v/chart/14734" width="100%" height="500px" allowfullscreen="true" frameborder="0"></iframe>
      </figure>
      <p>從總收入、營利事業收入的排行中，前五名都是現任的立委。值得注意的是，營利事業收入排行榜中，位居第一、第二名的立委柯建銘與邱志偉，營利事業收入佔總收入的比例都超過五成。</p>
      <!-- chart22 -->
      <figure class="desktop">
        <figcaption><h2>誰收到最多政治獻金捐贈？（總收入）</h2></figcaption>
        <Chart22Desktop></Chart22Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>誰收到最多政治獻金捐贈？（總收入）</h2></figcaption>
        <Chart22Mobile></Chart22Mobile>
      </figure>
      <!-- chart23 -->
      <figure class="desktop">
        <figcaption><h2>誰收到最多營利事業政治獻金捐贈？</h2></figcaption>
        <Chart23Desktop></Chart23Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>誰收到最多營利事業政治獻金捐贈？</h2></figcaption>
        <Chart23Mobile></Chart23Mobile>
      </figure>
      <h2>台灣人捐款就像宗教信仰</h2>
      <p>現任立委有較高的募款能力，國內外皆然。如美國 2002 年的聯邦眾議員選舉，現任者的募款金額平均是挑戰者的 7 倍，獲勝率超過 90%；台灣政治學者王鼎銘針對第六屆立委做的政治獻金研究，連任者募款的平均金額超過新秀的 2 倍。而我們從第九屆的資料中看到，差距已經來到了 3.6 倍。</p>
      <p>從捐款者的角度而言，如美國的選舉資料顯示，利益團體的有八成的捐款會流向現任民代<span class="highlight" @click="toggleAdditionalInfo(1)">（註）</span>；時代力量黨團秘書長陳惠敏也以「宗教性」來形容台灣政治支持者的捐款動向，「台灣人傾向把錢投在他覺得會當選的人身上。選不上的他不投資，因為他（參選人）不會帶著你的政治理念往前走。」</p>
      <section class="additional" v-show="AdditionalInfo[1]">
        <p>註：</p>
        <p>2012 年內政部委託之<a class="highlight" href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf" target="_blank">《我國政治獻金制度改革之研究》</a></p>
      </section>
      <!-- chart24 -->
      <figure class="desktop full">
        <figcaption><h2>現任立委佔優勢（與非現任立委比較）</h2></figcaption>
        <Chart24Desktop></Chart24Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>現任立委佔優勢（與非現任立委比較）</h2></figcaption>
        <Chart24Mobile></Chart24Mobile>
      </figure>
      <p>若以四分位數來拆解政治獻金分布的狀況，可以看到資源過度集中在少數候選人身上，尤其在非現任立委身上更明顯。就像我們將非現任的 189 位參選人收到的政治獻金由小至大排行，並分成四組，金額分佈在前 1/4 位的新竹市立委參選人邱顯智 收入 9,475,771 元，但分佈在 3/4 位的新北市立委參選人董建一只有 260,110 元，兩人相差了 36 倍。</p>
      <p>細看資料，發現獻金收入愈高的非現任立委參選人，幾乎都不是政治新手，大多由現任議員挑戰，如收入前十名的排行榜中，只有時代力量的兩位候選人是第一次參選。</p>
      <!-- chart25 -->
      <figure class="desktop full">
        <figcaption><h2>非現任立委獻金收入前十名</h2></figcaption>
        <Chart25Desktop></Chart25Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>非現任立委獻金收入前十名</h2></figcaption>
        <Chart25Mobile></Chart25Mobile>
      </figure>
      <p>我們更進一步調查「第一次參選民選公職」的名單，發現不只募款能力與現任立委相差了 6.6 倍，連當選率都只有 9%。</p>
      <!-- chart26 -->
      <figure class="desktop full">
        <figcaption><h2>現任立委佔優勢（與第一次參選公職者比較）</h2></figcaption>
        <Chart26Desktop></Chart26Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>現任立委佔優勢（與第一次參選公職者比較）</h2></figcaption>
        <Chart26Mobile></Chart26Mobile>
      </figure>
      <p>但從四分位數拆解，同樣出現了資源集中在少數人的現象。細看名單，在收入前十名的排行榜中，有一半的人屬於政治世家<span class="highlight" @click="toggleAdditionalInfo(2)">（註）</span>。</p>
      <section class="additional" v-show="AdditionalInfo[2]">
        <p>註：</p>
        <p>此處引用《天下雜誌》<a class="highlight" href="http://topic.cw.com.tw/2015politicaldynasty/" target="_blank">「立委二代接班， 64 位政治世家全解析」</a>資料，定義為至少一位長輩、平輩或晚輩親屬從政。</p>
      </section>
      <!-- chart27 -->
      <figure class="desktop full">
        <figcaption><h2>第一次參選公職者獻金收入前十名</h2></figcaption>
        <Chart27Desktop></Chart27Desktop>
      </figure>
      <figure class="mobile">
        <figcaption><h2>現任立委佔優勢（與第一次參選公職者比較）</h2></figcaption>
        <Chart27Mobile></Chart27Mobile>
      </figure>
      <p>不過，2016 年的選舉，因為特殊的政治氛圍、以及新興政黨的出現，還是讓當選名單出現了新的氣象。位在收入前五名的丁守中、吳育昇連任挑戰失敗，代表砸錢並不一定就是選票的證明。我們也找出落選名單中捐獻收入最高的前五名：</p>
      <!-- chart28 -->
      <figure class="">
        <figcaption><h2>誰收到最多捐獻最後卻沒選上？</h2></figcaption>
        <Chart28Desktop></Chart28Desktop>
      </figure>
      <p>其中，丁守中敗給該區深耕多年的議員吳思瑤，吳育昇則敗給該選區曾連任八屆的議員之女呂孫綾。第三、第四名的對手，則是這次的新興勢力時代力量，分別是林昶佐、洪慈庸，第五名的楊麗環則僅以 160 票之差輸給民進黨的鄭寶清。</p>
      <p>若以政黨來看，從資料中可以發現，國、民兩大黨的營利事業收入差異不大，但國民黨有偏高的政黨補助，民進黨個人捐贈則突破五成。而時代力量主要的捐獻來源是個人捐贈，營利事業捐贈相較於兩大黨的比例也較少。</p>
      <!-- chart29 -->
      <figure class="">
        <figcaption><h2>不同政黨立委的政治獻金收入組成</h2></figcaption>
        <Chart29Desktop></Chart29Desktop>
      </figure>
      <p>另一個值得關注的角度是，這些由候選人自行申報的獻金資料，揭露了多少政治現實？我們的制度是否鼓勵政治人物誠實申報政治獻金？</p>
      <p>台灣目前的制度，主要分為捐款人的年度捐獻總額與資格限制。在資格限制上，如營利事業「政府投資 20％」、「與政府有鉅額採購或建設契約」、「虧損中的企業」不得捐贈。限制看來合理，但執行查證資金來源的責任是由候選人承擔，中正大學政治系副教授陳尚志就指出，「誠實申報的人必須負擔很高的成本，不打算誠實申報的人，就可以輕易逃避懲罰。」</p>
      <p>這些「不打算誠實申報的人」可以如何規避？像是《政治獻金法》第 21 條規定，收受捐款總額超過一千萬，才須委託會計師查核簽證。而 2016 年的區域立委選舉，就有 155 個候選人申報的政治獻金小於一千萬元，占全部候選人的 59%。陳尚志也提到，參選人申報的會計報告書缺少對候選人自有資金的揭露，許多政治人物透過基金會募款，皆不受《政治獻金法》管轄，監察院也不曾主動追查。</p>
      <p>至於現行的政治獻金制度還有什麼問題，又要如何讓它變得更好呢？<span class="highlight" @click="toggleSubscribe">請期待我們的追蹤報導喔！</span></p>
    </article>
    <StoryBottomNav></StoryBottomNav>
    <!-- <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div> -->
  </main>
</template>

<script>
import Chart22Desktop from '@/components/topic/desktop/Chart2-2'
import Chart22Mobile from '@/components/topic/mobile/Chart2-2'
import Chart23Desktop from '@/components/topic/desktop/Chart2-3'
import Chart23Mobile from '@/components/topic/mobile/Chart2-3'
import Chart24Desktop from '@/components/topic/desktop/Chart2-4'
import Chart24Mobile from '@/components/topic/mobile/Chart2-4'
import Chart25Desktop from '@/components/topic/desktop/Chart2-5'
import Chart25Mobile from '@/components/topic/mobile/Chart2-5'
import Chart26Desktop from '@/components/topic/desktop/Chart2-6'
import Chart26Mobile from '@/components/topic/mobile/Chart2-6'
import Chart27Desktop from '@/components/topic/desktop/Chart2-7'
import Chart27Mobile from '@/components/topic/mobile/Chart2-7'
import Chart28Desktop from '@/components/topic/desktop/Chart2-8'
import Chart29Desktop from '@/components/topic/desktop/Chart2-9'
import StoryBottomNav from '@/components/topic/StoryBottomNav'
import registerMailChimpPopup from '@/mixins/registerMailChimpPopup'

export default {
  components: {
    Chart22Desktop,
    Chart22Mobile,
    Chart23Desktop,
    Chart23Mobile,
    Chart24Desktop,
    Chart24Mobile,
    Chart25Desktop,
    Chart25Mobile,
    Chart26Desktop,
    Chart26Mobile,
    Chart27Desktop,
    Chart27Mobile,
    Chart28Desktop,
    Chart29Desktop,
    StoryBottomNav
  },
  mixins: [ registerMailChimpPopup ],
  data () {
    return {
      AdditionalInfo: {
        1: false,
        2: false
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

#story2
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
      &-color
        color #C31C5C
        // border 0
        // cursor initial
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
      width 80%
      margin 0 auto
      figcaption
        h2
          text-align center
          margin-bottom 1rem
        h3
          text-align center
          display none
      &.desktop
        display block
      &.full
        width 100%
      &.mobile
        display none
  .fb-comments
    display none

@media (max-width: 767px)
  #story2
    padding 5%
    display block
    article
      figure
        width 100%
        &.desktop
          display none
        &.mobile
          display block
        figcaption
          h3
            display block
    .fb-comments
      display block
</style>
