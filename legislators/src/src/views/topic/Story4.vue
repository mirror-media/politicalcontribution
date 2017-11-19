<template>
  <main id="story3">
    <header>
      <h1>政治獻金開放了嗎？</h1>
      <div class="credit-container">
        <p class="credit">文：李又如 設計：陳怡蒨</p>
        <p class="credit">網站製作：熊凱文 資料整理：李又如、熊凱文</p>
      </div>
    </header>
    <article>
      <p>「（政治獻金資料）完全不算公開啊。資料的價值是在能被使用，而不是在紙上被人家看。」 2014 年 g0v <a class="highlight" href="https://g0v.hackpad.tw/8ow2GnliH48" target="_blank">政治獻金透明化專案</a>共同發起人王向榮<span class="highlight" @click="toggleAdditionalInfo(1)">（註）</span>提到。</p>
      <section class="additional" v-show="AdditionalInfo[1]">
        <p>註：</p>
        <p>與王向榮的訪談逐字稿，請點<a class="highlight" href="http://readr.sayit.mysociety.org/%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%912014%E5%B9%B4-g0v-%E5%B0%88%E6%A1%88%E7%99%BC%E8%B5%B7%E4%BA%BA%E7%8E%8B%E5%90%91%E6%A6%AE%E5%B0%88%E8%A8%AA" target="_blank">此</a></p>
      </section>
      <p>政治獻金透明化始於某次黑客松。公民團體「反核四五六」帶來從監察院印出的七個政治獻金專戶明細，希望檢視支持核電的候選人背後的政商關係，「 g0v 的精神就是開放政府，希望政府的資訊都能盡量簡單的被大家索取用利用。當時知道了政治獻金的明細只能透過紙本這種超不方便的方式取得，讓 g0v 很多的參與者憤憤不平。」王向榮提到，但由於當時政府還沒有開放資料的觀念，只能先嘗試自力救濟。</p>
      <p>「然後當時時間點也跟太陽花運動差不多，網路上的許多鄉民都對政府的黑箱極度不滿，很想做點事卻不知道能做些什麼。所以我就想透過開放政治獻金協力，讓大家可以發洩一鼓怨氣，了解用鍵盤也能讓國家更好，並且也讓大家可以注意到有政治獻金這個議題。」王向榮說。</p>
      <p>確定了協作的方向，王向榮便把文件掃描檔以字為單位，切成圖檔，讓鄉民一起來參與辨識<span class="highlight" @click="toggleAdditionalInfo(2)">（註）</span>。結果在 24 小時之內，鄉民就完成了將近 31 萬格的文字辨識，成功數位化 7 個政治獻金專戶、 2637 份文件資料。</p>
      <section class="additional" v-show="AdditionalInfo[2]">
        <p>註：</p>
        <p>如何辨識呢？其實就像我們幾乎每天都會遇到的「圖形驗證」（Captcha），現在各大網站服務為了驗證使用者是不是機器人，會要求使用者輸入圖片中的文字或數字。而 reCAPTCHA 計畫利用了這樣的需求，將太過模糊、不容易被電腦辨識的古老文件轉換成圖檔，當使用者想證明自己不是機器人，輸入正確的文字後，就成功達成圖檔的人工辨識。這個計畫在 2009 年被 Google 收購，全球的用戶每天約可達成 2 億次辨識，可以想見，能協助多少文件、圖檔被數位化。</p>
      </section>
      <!-- image -->
      <figure>
        <img src="~assets/images/ocr.jpeg" alt="">
        <figcaption>2014 年 g0v 的開放政治獻金專案。</figcaption>
      </figure>
      <p>「但是鄉民還是欲罷不能。」王向榮提到，「當時覺得很開心啊。心裡覺得，也許我讓更多鄉民知道，要關心政治、關心國家不需要很麻煩，從小地方就可以開始做了。」公民團體印的七個專戶迅速被破關後，他們就趕緊去印新的專戶出來，產生新的「關卡」讓鄉民挑戰。</p>
      <p>但這個專案最終沒有破解所有立委的專戶。除了各環節所需人力過大以外，也因為當時有立委順應民意提出《政治獻金法》修法，讓王向榮覺得「效果已達到，等修完法就有乾淨的數位檔可以用了」，沒想到這麼一等，「就像趙敏在大都等張無忌一樣，不知道要等多少年啊！」</p>
      <p>當年行政院提出修正草案，但只要求「公司團體捐款超過 50 萬」的明細上網公開；而立委陳其邁、李昆澤、李應元（現為環保署署長）都有提出修法版本，皆主張所有收支明細全部公開，甚至李昆澤還在其版本明訂公開資訊「須採便利民眾複製、下載的格式」。但最後條文只有一讀通過，後來就沒有下文。</p>
      <h2>等政府來做，還要等多久？</h2>
      <p>直到台灣又經歷了兩次大選，我們取得政治獻金明細資料的方式仍跟三年前無異。對照監察院當年還針對 g0v 行動發出聲明，「希望開啟這項專案的 g0v 更審慎思考，等政府來處理會比較好」，我們還要等多久？</p>
      <p>當年提案修法的立委，現在只剩陳其邁還有繼續在去年五月提案，他向記者表示，草案之所以不容易過關，「是有人反對啦。怕公開了，很多人會不敢捐，有些人也有個資法的疑慮」，但陳其邁認為「政治獻金明細沒有不公開的理由」。至於這個會期有沒有機會處理，就要「再看看」。</p>
      <p>針對可能的反對原因，王向榮認為，尊重個人不想公開自己捐款資訊的自由，但是個人捐贈以外的資訊，「像政黨、企業、以及（候選人）支出的部分一定要公開。」</p>
      <p>「政治獻金並不是錯事，不透明的政治獻金才是問題。」王向榮認為，「很多人都覺得政治獻金四個字就是邪惡的，好像是種勾結，但我們應該要用更公開透明的政治獻金紀錄來扭轉大家的觀念，讓大家能接受政治獻金是民主制度所需要的。」</p>
      <p>「企業捐贈或是遊說是民主國家應該會有的正常現象，我不會直接把捐贈或遊說當作不正當的利益關係。」王向榮提到，但公開資訊、杜絕檯面下的金錢來往，可以讓選舉變得更公平；企業捐贈也可以讓人民檢視企業跟候選人之間在選舉期間有沒有捐贈的紀錄，當選之後，至少不敢明目張膽幫企業護航。</p>
      <h2>選舉管制，不只是獻金透明而已</h2>
      <p>但除了政治獻金資料透明度不足以外，台灣在選舉的管控上還有很大的努力空間。</p>
      <p>實際參與過 2016 立委選舉的中正大學政治系副教授陳尚志提到，選舉的金流，應該從三個面向去觀察：政府補助、政府管制、公開揭露。台灣制定《政治獻金法》補強了「公開揭露」面向後，前兩項管制卻幾乎沒有了。</p>
      <p>政府補助，指的是公費補助選舉。台灣一直維持「部分公費補助」制度，如依據候選人的得票數進行一票 30 元的補貼，以及經常性的政黨補助。</p>
      <p>政府管制，就是政府對選舉活動經費的管制。其實，台灣是有規定競選經費上限的喔！<a class="highlight" href="http://law.cec.gov.tw/LawContentDetails.aspx?id=GL000292&KeyWordHL=&StyleType=1" target="_blank">《公職人員選舉罷免法》</a>第 41 條規定每次選舉都要公告「競選經費最高金額」，計算方式是選區人口總數的 70% 乘上一票 30 元，再依選舉種類加上一個固定金額，如立委選舉就是加 1 千萬元，按照目前的選區劃分，最多人的選區落在新竹縣，競選金額上限可以達到 1 千 8 百萬。</p>
      <p>我們檢視資料，發現 2016 年有 77 個立委超過自己選區的競選經費限制，佔總數 30％。為什麼會這樣呢？其實，在 2004 年《政治獻金法》制定之後，競選經費超過上限的罰則被取消了，形成空有規定，卻沒有罰則的奇特現象。</p>
      <p>陳尚志表示，之所以會取消，是因為政府認為選舉的管制跟透明化是兩種取向，只能二擇一。也就是說，既然政治獻金都透明化了，便沒有加以管制的必要，但真的是這樣嗎？</p>
      <p>「現在（收取）捐獻無上限、支出也無上限，關於選舉活動的管制非常少；政府補助還是維持一票 30 元，公共宣傳的管道還愈來愈少；政治獻金只看候選人的自主申報，完全沒有主動稽查。這真的是我們想要的選舉嗎？」陳尚志說。</p>
      <h2>選舉更公平，才有新人參政的可能</h2>
      <p>從立委的政治獻金<a class="highlight" href="https://www.mirrormedia.mg/projects/political-contribution/#/story2" target="_blank">分析</a>可以看見，不但資源過度集中在現任立委上，現任立委與新科挑戰者的勝選率也相當懸殊。陳尚志以自己的選舉經驗為例，「錢真的太重要了」。</p>
      <p>「選舉一開始有沒有資金打知名度，是關鍵。」陳尚志指出，依照規定，參選人在投票前十個月才能開始申請專戶，「等到申請下來，網路金流做好，兩個月過去了；等到錢真的進來，還要再等兩個月。前面半年全部透支，這些透支的錢哪裡來？就是一大問題，更別提民進黨、國民黨是有初選的政黨。」</p>
      <p>「打知名度，最快的是看板，卻是最貴的，一塊小小的就比房租貴四、五倍。假設選舉掛十二個月，得花多少錢？」陳尚志也提到宣傳管道因金錢而受限，「我自己在選舉的時候，以面紙當作宣傳文宣，面紙可以透過快遞公司或是郵局投遞，但投遞的費用比我們的製作成本還高。最後我們還是選擇請志工挨家挨戶去投，如果政府願意幫每個候選人投幾波，事情就不一樣了。」</p>
      <p>就算政府有公辦政見發表會，「卻是在很冷門的時段播出，我去參加的時候，準備很久，後來發現完全沒有人看到，只能透過網路。還有參選人跟我說，哇，你好認真，還寫稿。你看大家根本不重視這件事。」陳尚志說。</p>
      <p>因此，陳尚志多年來致力推動公費候選人制度，希望透過政府投入更多、更公平的選舉補助，消弭新人參政會遇到的金錢門檻。他也認為，關於參選人自有資產的揭露、政治廣告購買的透明化也要加強，才能讓選舉環境更健全。</p>
      <p>在政府的眼中，能夠在監察院查閱這些被典藏的資料，就已經是資料的開放了。《鏡傳媒》這次透過實際行動印證了限制所在，也希望藉由資料應用、協作的過程凸顯開放資料的價值。但這只是第一步，不管是政商關係的透明、政治獻金的管制、到選舉活動的管理，都需要更多的關注。</p>
    </article>
    <StoryBottomNav></StoryBottomNav>
    <!-- <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div> -->
  </main>
</template>

<script>
import StoryBottomNav from '@/components/topic/StoryBottomNav'

export default {
  components: {
    StoryBottomNav
  },
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

#story3
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
      // width 80%
      margin 3rem auto
      flex(column, center, center)
      img
        width 80%
      figcaption
        margin-top 1.5rem
        color gray
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
  #story3
    padding 5%
    display block
    article
      figure
        // width 100%
        img
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
