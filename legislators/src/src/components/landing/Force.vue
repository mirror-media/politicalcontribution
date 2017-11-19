<template>
  <svg class="landing-force-container" style="z-index: 1000" width="100%" height="100%"></svg>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  watch: {
    '$store.getters.exist.landingData': 'visualize'
  },
  computed: {
    name () {
      return this.$store.state.landingForceCandidateName
    },
    detailData () {
      // return this.$store.getters.getTargetRelatedDetailData(this.name)
      return this.$store.state.landingData
    },
    nestedData () {
      return this.$store.getters.nestedData(this.detailData)
    },
    total () {
      return this.$store.getters.total(this.detailData)
    }
  },
  methods: {
    visualize () {
      // Scales
      var color = d3.scaleOrdinal()
                  .domain(['中國國民黨', '民主進步黨', '時代力量', '無黨團結聯盟', '無黨籍', '公司', '未當選'])
                  .range(['#9dcbdf', '#cee099', '#fcc037', '#722f37', '#736357', 'transparent', '#000'])
      var r = d3.scaleLinear().range([5, 200])
      var linksStrokeWidth = d3.scaleLinear().range([1, 20])
      var strength = d3.scaleLinear().domain([0, 397]).range([-450, -100])

      var svg = d3.select('.landing-force-container')
          // .attr('width', document.querySelector('.landing').offsetWidth)
          // .attr('height', document.querySelector('.landing').offsetHeight)

      var g = svg.append('g').attr('id', 'root')
      // var zoom = d3.zoom().scaleExtent([1, 1])
      // .on('zoom', () => {
      //   g.attr('transform', d3.event.transform)
      // })

      // var width = +svg.attr('width')
      // var height = +svg.attr('height')
      var width = +svg.node().getBoundingClientRect().width
      var height = +svg.node().getBoundingClientRect().height
      // console.log(width)
      // console.log(svg.node().getBoundingClientRect())
      // svg.call(zoom)
      // .on('wheel.zoom', null)
      // .on('mousedown.zoom', null)
      // .on('touchstart.zoom', null)
      // .on('touchmove.zoom', null)
      // .on('touchend.zoom', null)

      // svg.call(zoom.transform, d3.zoomIdentity.translate(width / 5, height / 10).scale(0.8))

      var simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(d => {
          return 100
        }))
        .force('charge', d3.forceManyBody().strength(d => {
          return strength(this.detailData.length)
        }))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(function (d) {
          if (d.party === '公司') {
            return Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 20) + 0.5
          } else {
            return Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 20) + 0.5
          }
        }).iterations(2))

      // graph data
      var graph = { 'nodes': [], 'links': [] }
      Object.entries(this.nestedData.byCandidate).forEach(([candidateKey, companyObjs]) => {
        Object.entries(companyObjs).forEach(([companyKey, companyValueArray]) => {
          var total = d3.sum(companyValueArray, d => +d['收入金額'] / 100000)
          companyValueArray.forEach(d => {
            // Checker
            var candidateExist = _.some(graph.nodes, [ 'id', d['候選人'] ])
            var companyExist
            if (d['集團碼']) {
              companyExist = _.some(graph.nodes, [ 'id', d['集團碼'] ])
            } else {
              companyExist = _.some(graph.nodes, [ 'id', d['捐贈者／支出對象'] ])
            }

            // Processing nodes
            if (!candidateExist) {
              graph.nodes.push({
                'type': 'candidate',
                'id': d['候選人'],
                'party': d['推薦政黨'],
                'wonStamp': d['當選註記'] === '*'
              })
            }
            if (!companyExist) {
              graph.nodes.push({
                'type': d['集團碼'] ? 'parentCompany' : 'childCompany',
                'taxId': d['集團碼'] ? null : d['統一編號'],
                'id': d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'],
                'party': '公司'
              })
            }
            // Processing links
            graph.links.push({
              'source': d['候選人'],
              'target': d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'],
              'companyType': d['集團碼'] ? 'parentCompany' : 'childCompany',
              'value': total
            })
          })
        })
      })

      var candidateTotalEarnings = this.total.candidate
      var companyTotalCosts = this.total.company

      var maxMoney = Math.max(d3.max(this.total.candidate, d => d.value.total), d3.max(this.total.company, d => d.value.total))
      var minMoney = Math.min(d3.min(this.total.candidate, d => d.value.total), d3.min(this.total.company, d => d.value.total))

      var minMaxFlow = d3.extent(graph.links, d => d.value)
      linksStrokeWidth.domain(minMaxFlow)
      r.domain([minMoney, maxMoney])

      var link = g.append('g')
          .attr('class', 'landing-links')
          .selectAll('line')
          .data(graph.links)
          .enter().append('line')
          .attr('id', d => {
            return `${d.source}-${d.target}-link`
          })
          .attr('stroke-width', d => linksStrokeWidth(d.value))
          .attr('stroke-width', 2)
          .style('animation-delay', (d, i) => {
            return i === 0 ? '1.5s' : (i * 0.025 + 1.5) + 's'
          })

      var node = g.append('g')
          .attr('class', 'landing-nodes')
          .selectAll('circle')
          .data(graph.nodes)
          .enter()

      var circle = node
          .append('circle')
          .attr('id', d => d.id + '-circle')
          .attr('r', d => {
            if (d.type === 'candidate') {
              return Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 20)
            } else {
              return Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 20)
            }
          })
          .attr('fill', d => {
            return d.type === 'candidate' ? (d.wonStamp ? color(d.party) : '#eceeef') : '#eceeef'
          })
          .style('cursor', 'pointer')
          .style('animation-delay', (d, i) => {
            return i === 0 ? '1.5s' : (i * 0.025 + 1.5) + 's'
          })
          .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))

      // Apply graph data to force simulation
      simulation
      .nodes(graph.nodes)
      .on('tick', ticked)
      simulation.force('link')
      .links(graph.links)

      for (var i = 20; i > 0; --i) simulation.tick()
      d3.timeout(() => { zoomFit(1, 0) })

      d3.select(window).on('resize', resize)
      function resize () {
        var width = svg.node().getBoundingClientRect().width
        var height = svg.node().getBoundingClientRect().height
        simulation.force('center', d3.forceCenter(width / 2, height / 2)).restart()
        d3.timeout(() => { zoomFit(1, 0) })
      }

      function zoomFit (paddingPercent, transitionDuration) {
        var root = g
        var zoom = d3.zoom()
          .scaleExtent([1, 1])
          .on('zoom.zoom', function () {
            root.attr('transform', d3.event.transform)
          })

        var bounds = root.node().getBBox()
        var parent = root.node().parentElement

        var fullWidth = parent.clientWidth
        var fullHeight = parent.clientHeight

        var width = bounds.width
        var height = bounds.height

        var midX = bounds.x + width / 2
        var midY = bounds.y + height / 2

        if (width === 0 || height === 0) return // nothing to fit

        var scale
        var translate
        if (window.innerWidth >= 1100) {
          scale = (paddingPercent || 0.75) / Math.max(width / fullWidth, height / fullHeight) * 1.3
          translate = [2 * fullWidth / 3 - scale * midX, fullHeight / 2 - scale * midY]
        } else {
          scale = (paddingPercent || 0.75) / Math.max(width / fullWidth, height / fullHeight) * 3
          translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY]
        }

        root
          // .transition()
          // .duration(transitionDuration || 0) // milliseconds
          .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
      }

      function ticked () {
        link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

        circle
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
      }

      function dragstarted (d) {
        if (!d3.event.active) { simulation.alphaTarget(0.3).restart() }
        d.fx = d.x
        d.fy = d.y
      }

      function dragged (d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended (d) {
        if (!d3.event.active) { simulation.alphaTarget(0) }
        d.fx = null
        d.fy = null
      }
    }
  }
}
</script>

<style lang="stylus">
@keyframes linkFadeIn
  from
    stroke-opacity 0
  to
    stroke-opacity .3
@keyframes nodeFadeIn
  from
    opacity 0
  to
    opacity 1
.landing-force-container
  opacity .45
  .landing-links
    line
      stroke white
      stroke-opacity 0
      animation-name linkFadeIn
      animation-duration 1s
      animation-fill-mode forwards
  .landing-nodes
    circle
      // stroke #fff
      // stroke-width 1.5px
      opacity 0
      animation-name nodeFadeIn
      animation-duration 1s
      animation-fill-mode forwards
</style>

