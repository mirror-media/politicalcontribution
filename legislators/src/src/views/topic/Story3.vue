<template>
  <main id="story3">
    <header>
      <h1>企業篇／金權遊戲？翻開金主的投資名冊</h1>
      <div class="credit-container">
        <p class="credit">文：李又如 設計：陳怡蒨</p>
        <p class="credit">網站製作：熊凱文 資料整理：李又如、熊凱文</p>
        <p class="credit">資料分析：李宗榮</p>
      </div>
    </header>
    <article>
      <!-- chart3-1 -->
      <figure class="full">
        <figcaption><h2>營利事業政治獻金組成</h2></figcaption>
        <Chart31Desktop></Chart31Desktop>
      </figure>
      <p>誰可以當立委的金主？政治獻金有分 5 種不同的來源，個人、營利事業、政黨、人民團體、匿名捐贈。在 2016 年立委選舉中，營利事業政治獻金佔了總捐贈的 32%，216 名候選人中，只有 8 位候選人沒有收到營利事業的捐贈。</p>
      <p>「金錢雖然不是政治影響力的唯一來源，卻是資本主義社會中最重要的影響要素之一。」中研院社會所副研究員李宗榮在其研究<a class="highlight" href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90" target="_blank">《企業權力與民主：台灣企業集團 2008 年立委選舉的政治獻金分析》</a>中寫道，美國的政治學家賴特米爾斯（C. Wright Mills）也認為，政治獻金讓經濟權力的掌控者，可以將金錢直接轉換為政治的運作。</p>
      <p>在聯想到權力的施展之前，先來認識一下台灣捐贈政治獻金的限制，可能會有助於我們去分辨這些金額的意義。</p>
      <p>由於政治獻金可以抵稅，但可減除的金額不能超過所得額 10% ，總額也不得超過新台幣 50 萬元。從這個限制看來，意在抵稅的公司佔了大多數，4162 家公司中，3769 家公司捐獻金額在 50 萬元以下，只有 393 家公司捐超過 50 萬元。</p>
      <p>而每家公司同年度針對單一候選人的捐獻上限是 100 萬，對多位候選人的捐獻上限是 200 萬，中正大學政治系副教授陳尚志就提到，「如果要做公關的話，多位候選人，一個人頂多 20 萬。針對個人捐超過 50 萬、或是捐到滿（100萬），就可以特別關注。」</p>
      <p>參選人可以在投票日的前十個月開始收政治獻金。但捐獻人的額度是以「年度」計算，假設企業想要捐好捐滿，以 2016 年立委選舉在 1 月投票為例，企業可以選擇在 2015 年尾、 2016 年初各捐一次，就能對同一位候選人捐到 200 萬，如立委柯建銘、吳秉叡都有收到這類跨年度的捐款。</p>
      <p>我們也在李宗榮的協助下，將這 5797 筆捐獻明細與與集團資料相對照<span class="highlight" @click="toggleAdditionalInfo(1)">（註）</span>，發現隸屬於 254 個集團的 432 家公司，掌握了 40％ 的營利事業政治獻金，第一名是徐旭東的遠東集團，共捐了 5 千 400 萬，是第二名裕隆集團的 1.6 倍。</p>
      <section class="additional" v-show="AdditionalInfo[1]">
        <p>註：</p>
        <p>關於集團資料是透過李宗榮協助比對幾個企業資料庫，佐以人工查證方式增補。若有遺漏，歡迎來信或留言補充。另集團與子公司的關聯狀態是以捐獻時為主，故 2016 年之後退出或加入（集團）的關係都不採計。</p>
      </section>
      <!-- chart3-2 -->
      <figure class="full">
        <figcaption><h2>哪些集團／公司最支持立委？</h2></figcaption>
        <figcaption><h3>點擊頭像看獻金資訊</h3></figcaption>
        <Chart32Desktop></Chart32Desktop>
      </figure>
      <p>從捐獻前二十名的企業名單可以發現另一個特色。這 21 個集團中，有 15 個（遠東、裕隆、台泥、潤泰、味丹、仰德、力麗、金鼎證券、日月光、大慶、所羅門、國產實業、宏泰、冠德、中纖）屬於家族集團<span class="highlight" @click="toggleAdditionalInfo(2)">（註）</span>，比例高達 71% 。</p>
      <section class="additional" v-show="AdditionalInfo[2]">
        <p>註：</p>
        <p>家族企業定義為董事互為親屬關係；而集團中，有上市公司是家族企業，就把集團歸納為家族集團。</p>
      </section>
      <p>李宗榮提到，「家族企業為了要傳承，就會很積極地去累積各式各樣的政商關係，除了打通人脈，鞏固家族的所有權，也讓外部有一些資源。加上家族企業本身就很會累積社會關係、政商關係，尤其關係的累積需要長時間的，又可以傳承給下一代。」</p>
      <p>若跟李宗榮以 2008 年立委政治獻金做的<a class="highlight" href="https://www.academia.edu/27129103/%E4%BC%81%E6%A5%AD%E6%AC%8A%E5%8A%9B%E8%88%87%E6%B0%91%E4%B8%BB_%E5%8F%B0%E7%81%A3%E4%BC%81%E6%A5%AD%E9%9B%86%E5%9C%982008%E5%B9%B4%E7%AB%8B%E5%A7%94%E9%81%B8%E8%88%89%E7%9A%84%E6%94%BF%E6%B2%BB%E7%8D%BB%E9%87%91%E5%88%86%E6%9E%90" target="_blank">研究</a>對照，集團的捐款都有提高，如遠東集團增加了 1 千 400 萬、裕隆集團增加了 1 千 654 萬；另外則有些集團從排行榜上「退位」， 2008 年能排進前 30 名的遠雄、中國信託、台塑、威京、耐斯、寶來、太子汽車、統一等集團， 在 2016 年選舉的捐獻都不若以往。</p>
      <p>雖然無法得知集團捐獻排行變化的確切原因，李宗榮則提供一個解讀的方向，「或許是時代有點不太一樣了。」</p>
      <p>「現在台灣自由化程度高，該讓給財團的也都讓了，政治權力對經濟利益的影響小了很多。所以對很多大財團來說，政治獻金不那麼重要了，才造成他們沒有那麼積極。」李宗榮指出，「經歷過需要政商關係才能發展的那個世代漸漸退位，讓位給下一代，新一代不一定吃這一套。以前是你不跟政治打交道，政治也要跟你打交道，政治介入是必須的。但現在有點不太一樣了。」</p>
      <p>那哪些產業會需要跟政治打交道？李宗榮指出，「會嘗試去影響政治的人，都是企業受到政府很強的管制，如美國，國防企業、水電、電網、瓦斯、石化工業等，利益多寡都受政府掌控，它需要疏通，對影響政治就有比較高的誘因。」</p>
      <p>「以台灣為例，早期金控的捐款很高，因為金融產業高度受國家管制；又或者像水泥，一個法律的規範就可以影響它的特許這麼久。若產業受到的影響大多來自國家政策的改變時，就會相對積極。」李宗榮提到。</p>
      <p>他也指出，「電子業相較於其他產業，就特別不愛參與政治獻金。因為產業的競爭受到全球環境、市場的左右，不太需要國內政府的配合。」我們以「母公司」的產業為單位，統計了這些捐獻政治獻金的企業分屬哪些產業：</p>
      <!-- chart3-3 -->
      <figure class="full">
        <figcaption><h2>佛心產業前十名</h2></figcaption>
        <Chart33Desktop></Chart33Desktop>
      </figure>
      <p>從表中可以看見，的確有很多容易受到政府政策影響的產業上榜。但從第一名是「其他」、第二名是李宗榮提過不太參與政治獻金遊戲的「電子工業」，我們推測「公司母數」應該有很大的影響，也就是說，或許在台灣的產業分布裡，這些公司的數量本來就比較多。</p>
      <p>我們進一步地分析這些樂於捐獻的公司佔其產業的比例，得到這樣的結果：</p>
      <!-- chart3-4 -->
      <figure class="full">
        <figcaption><h2>哪些產業與政治人物互動性較高？</h2></figcaption>
        <Chart34Desktop></Chart34Desktop>
      </figure>
      <p>2016 年 5 月時，《經濟學人》（The Economist）發布了最新的「裙帶資本主義指數」（Crony Capitalism）<a class="highlight" href="https://www.economist.com/news/international/21698239-across-world-politically-connected-tycoons-are-feeling-squeeze-party-winds" target="_blank">報告</a>，用以統計各國的億萬富豪在與政府往來密切的行業中，所獲取的財富佔 GDP 的比例。在 22 個國家中，台灣以 3.2% 排名第 10 名，高於亞洲的日本、韓國、甚至中國。</p>
      <p>指數愈高，就代表在這個國家裡有愈多的企業，商業的成功與否取決於政商關係的密切度，而這些優惠與偏袒都是合法的。他們通常會以壟斷或遊說等手段，讓政府運用行政權力，提供較好的生存環境與利益。簡單來說，就是「靠關係」賺錢。</p>
      <p>我們找出《經濟學人》用以評估裙帶資本主義的<a class="highlight" href="https://www.economist.com/blogs/graphicdetail/2016/05/daily-chart-2" target="_blank">產業</a>，有賭場、國防、信貸投資銀行、基礎設施、管線、油、瓦斯等能源業、房地產、建設業、鋼鐵、金屬、礦石等等。從這次的資料中發現，最樂於捐獻的產業前十名中，就有 6 個屬於裙帶資本主義產業。</p>
      <p>因為政商之間的關係本來就敏感，各國對於是否允許營利事業捐款有不同的規定。根據內政部委託之<a class="highlight" href="http://ir.lib.pccu.edu.tw/retrieve/46392/RRPG10105-0231-2751535.pdf" target="_blank">《我國政治獻金制度改革之研究》</a>研究中就提到，美國、韓國、加拿大、法國的企業不能捐贈政治獻金，日本的企業也只能捐給政黨（不能給個人）。</p>
      <p>計畫主持人楊泰順最後也在文中寫道，「由於禁止公司與工會捐款已漸成各先進民主國家的趨勢，其原則仍然值得我國借鏡，尤其營利事業的捐款上限為個人的十倍，研究團隊主張以較嚴苛的標準審視公司與工會的捐款。 」</p>
      <p>「但企業透過錢去影響政治，這個趨勢是很難去阻擋的。完全禁止，就有辦法杜絕官商勾結嗎？我覺得很難，因為它可以用別的方法去捐獻。」李宗榮表示，「關鍵應該是我們要多大程度讓它變得透明。」</p>
      <p>台灣在 2004 年制定《政治獻金法》，規定政治人物必須申報選舉時的政治獻金，政商關係就跟著透明了嗎？還有哪些是陽光照不到的地方？請鎖定我們的後續報導喔，歡迎<span class="highlight" @click="toggleSubscribe">訂閱</span>最新進度！</p>
    </article>
    <StoryBottomNav></StoryBottomNav>
    <!-- <div class="fb-comments" data-href="https://www.mirrormedia.mg/projects/political-contribution/" data-colorscheme="light" data-numposts="10" data-width="100%" data-order-by="reverse_time" style="width: 100%"></div> -->
  </main>
</template>

<script>
import Chart31Desktop from '@/components/topic/desktop/Chart3-1'
import Chart32Desktop from '@/components/topic/desktop/Chart3-2'
import Chart33Desktop from '@/components/topic/desktop/Chart3-3'
import Chart34Desktop from '@/components/topic/desktop/Chart3-4'
import StoryBottomNav from '@/components/topic/StoryBottomNav'
import registerMailChimpPopup from '@/mixins/registerMailChimpPopup'

export default {
  components: {
    Chart31Desktop,
    Chart32Desktop,
    Chart33Desktop,
    Chart34Desktop,
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
  #story3
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
