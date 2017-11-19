<template>
  <div class="chart-container">
    <div id="chartMostDonateCompany">
      <!--  -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  methods: {
    chartMostDonateCompany () {
      let data = [
        {
          name: '其他',
          value: '48,016,200'
        },
        {
          name: '電子工業',
          value: '40,386,000'
        },
        {
          name: '建材營造',
          value: '38,970,000'
        },
        {
          name: '水泥工業',
          value: '32,550,000'
        },
        {
          name: '汽車工業',
          value: '27,980,000'
        },
        {
          name: '紡織纖維',
          value: '23,500,000'
        },
        {
          name: '航運業',
          value: '20,250,000'
        },
        {
          name: '食品工業',
          value: '18,731,200'
        },
        {
          name: '化學生技醫',
          value: '17,350,000'
        },
        {
          name: '貿易百貨',
          value: '12,770,000'
        }
      ]

      let margin = {top: 20, right: 80, bottom: 30, left: 80}
      let ow = window.innerWidth > 767 ? 900 : window.innerWidth - 30
      let oh = window.innerWidth > 767 ? 500 : 300
      let width = ow - margin.left - margin.right
      let height = oh - margin.top - margin.bottom
      let svg = d3.select('#chartMostDonateCompany')
                .append('svg')
                .attr('width', ow)
                .attr('height', oh)

      let x = d3.scaleLinear().range([0, width])
      let y = d3.scaleBand().range([height, 0]).paddingInner(0.5).paddingOuter(0.25)
      let yAxis = d3.scaleBand().domain([0, 1, 2, 3, 4, 5, 6, 7, 8]).range([height, 0]).paddingInner(1).paddingOuter(1)

      let g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      data.sort(function (a, b) { return +a.value.split(',').join('') - +b.value.split(',').join('') })

      // x.domain([0, d3.max(data, function (d) { return +d.value.split(',').join('') })])
      x.domain([0, 50000000])
      y.domain(data.map(function (d) { return d.name }))

      g.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .style('font-size', () => {
            if (window.innerWidth <= 374) {
              return '6px'
            } else {
              return '10px'
            }
          })
          .call(d3.axisBottom(x)
                .ticks(5)
                // .tickValues(x.ticks(5).concat(x.domain()))
                .tickFormat(function (d, i) {
                  return i === x.ticks(5).length - 1 ? parseInt(d / 10000) + '萬元' : parseInt(d / 10000)
                })
                .tickSize([-height])
                .tickPadding(20))

      g.append('g')
          .attr('class', 'y axis')
          .call(d3.axisLeft(y).tickSizeInner(0).tickPadding(10))
      g.select('.y.axis')
      .selectAll('text')
      .style('font-size', '14px')
      g.append('g')
          .attr('class', 'yy axis')
          .call(d3.axisLeft(yAxis).tickSize(10).tickFormat(function (d) { return '' }))
      g.append('g')
          .attr('class', 'y axis')
          .call(d3.axisRight(yAxis).tickSizeOuter(width).tickSizeInner(0).tickFormat(function (d) { return '' }))
      // g.select('.yy.axis line')
      // .attr('stroke', 'red').attr('stroke-width', '1')

      g.selectAll('.axis')
      .selectAll('path')
      .style('stroke', 'lightgray')
      .style('shape-rendering', 'crispEdges')
      g.selectAll('.axis')
      .selectAll('line')
      .style('stroke', 'lightgray')
      .style('shape-rendering', 'crispEdges')

      let bar = g.selectAll('.bar')
          .data(data)
        .enter()
      bar.append('rect')
          .attr('class', 'bar')
          .attr('x', 0)
          .attr('height', y.bandwidth())
          .attr('y', function (d) { return y(d.name) })
          .attr('width', function (d) { return x(+d.value.split(',').join('')) })
          // .style('fill', '#c7195c')
          .style('fill', function (d, i) {
            return i % 2 === 0 ? '#666' : '#c7195c'
          })
      bar.append('text')
          .attr('x', function (d) { return x(+d.value.split(',').join('')) + 5 })
          .attr('y', function (d) { return y(d.name) + y.bandwidth() / 2 })
          .attr('dy', '.35em')
          .text(function (d) {
            return (+d.value.split(',').join('') / 10000).toLocaleString(undefined, {maximumFractionDigits: 0}) + ' 萬元'
          })
          .style('font-weight', '600')
    }
  },
  mounted () {
    this.chartMostDonateCompany()
  }
}
</script>

<style lang="stylus" scoped>
.chart-container
  display flex
  flex-direction column
  justify-content center
  align-items center
  // #chartMostDonateCompany
</style>


