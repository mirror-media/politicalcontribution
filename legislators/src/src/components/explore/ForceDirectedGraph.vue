<template>
  <div class="svg-container">
    <!-- svg here -->
    <div class="zoombtns-container">
      <img src="~assets/images/explore-force/+.png" class="zoombtns" id="zoom_in"></img>
      <img src="~assets/images/explore-force/_.png" class="zoombtns" id="zoom_out"></img>
    </div>
    <div class="legends-container">
      <div class="legends" v-show="legendParties.wonParties.includes('民主進步黨')">
        <div class="legends__circle legends__circle--dpp"></div>
        民主進步黨
      </div>
      <div class="legends" v-show="legendParties.wonParties.includes('中國國民黨')">
        <div class="legends__circle legends__circle--kmt"></div>
        中國國民黨
      </div>
      <div class="legends" v-show="legendParties.wonParties.includes('時代力量')">
        <div class="legends__circle legends__circle--npp"></div>
        時代力量
      </div>
      <div class="legends" v-show="legendParties.wonParties.includes('無黨團結聯盟')">
        <div class="legends__circle legends__circle--npsu"></div>
        無黨團結聯盟
      </div>
      <div class="legends" v-show="legendParties.wonParties.includes('無黨籍')">
        <div class="legends__circle legends__circle--none"></div>
        無黨籍
      </div>
      <div class="legends" v-show="legendParties.hasLostCandidates">
        <img class="legends__circle" src="~assets/images/explore-force/lost-legend.png" alt="">
        無當選立委
      </div>
      <div class="legends">
        <img class="legends__normal" src="~assets/images/explore-force/line.png" alt="">
        捐贈金額多寡
      </div>
      <div class="legends">
        <img class="legends__multiple-circles" src="~assets/images/explore-force/circle.png" alt="">
        獻金收入 / 捐贈總額
      </div>
      <div class="legends">
        <img class="legends__company" src="~assets/images/money-icon/money1.png" alt="">
        集團
      </div>
      <div class="legends">
        <img class="legends__company" src="~assets/images/money-icon/money4.png" alt="">
        公司
      </div>
    </div>
    <div class="graph-tooltip-container">
      <info v-if="hoverIndicator === 'node' && isCandidate(tooltipNodeName)" class="graph-tooltip-container__candidate-basic" :type="'candidate-basic'" :data="tooltipData"></info>
      <info v-if="hoverIndicator === 'node' && isCandidate(tooltipNodeName)" class="graph-tooltip-container__candidate-detail" :type="'tooltip-node'" :data="tooltipData" :totalData="totalData"></info>
      <info v-if="hoverIndicator === 'node' && isCompany(tooltipNodeName)" class="graph-tooltip-container__candidate-basic" :type="'company-basic'" :data="{ '公司名': tooltipNodeName, 'tej': tejData }"></info>
      <info v-if="hoverIndicator === 'node' && isCompany(tooltipNodeName)" class="graph-tooltip-container__candidate-detail" :type="'company-detail'" :data="{ '旗下核心公司': companyCoreChild, '代表人姓名': companyOwner, '資本總額(元)': companyCapital }" :totalData="totalData"></info>
      <info v-if="hoverIndicator === 'link'" class="graph-tooltip-container__candidate-detail" :type="'tooltip-link'" :data="tooltipData" :tooltipSourceName="tooltipSourceName" :tooltipTargetName="tooltipTargetName" :tooltipLinkMoney="tooltipLinkMoney" :tooltipDetailOfParent="tooltipDetailOfParent"></info>
    </div>
    <!-- svg grayscale -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" height="0">
      <filter id="grayscale">
        <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
      </filter>
    </svg> -->
  </div>
</template>
<script>
import Info from './Info'
import * as d3 from 'd3'
import _ from 'lodash'
import $ from 'jquery'

export default {
  name: 'forceDirectedGraph',
  props: [ 'target', 'data', 'abstractData' ],
  components: {
    Info
  },
  data () {
    return {
      tooltipNodeName: null, //
      companyCapital: '查詢中',
      companyOwner: '查詢中',
      companyCoreChild: null,
      candidateTotalEarnings: null, // 紀錄所有候選人拿到多少錢
      companyTotalCosts: null,  // 紀錄所有公司捐了多少錢
      tooltipSourceName: null, //
      tooltipTargetName: null, //
      tooltipLinkMoney: null, //
      tooltipDetailOfParent: null,
      hoverIndicator: null, //
      hasNodePinned: false
      // tooltip: {
      //   typeHoverOn: null,
      //   onNode: {
      //     name: null
      //   },
      //   onLink: {
      //     sourceName: null,
      //     targetName: null,
      //     money: null,
      //     detailOfParent: null
      //   }
      // }
    }
  },
  watch: {
    // data () {
    //   this.visualize()
    // },
    target () {
      // When search value change, reset the tooltipNodeName
      this.tooltipNodeName = null
      if (window.innerWidth > 767) {
        this.visualize()
      }
    },
    tooltipNodeName () {
      if (this.isChildCompany(this.tooltipNodeName)) {
        let vm = this
        let isParentCompany = _.find(this.data, { '集團碼': this.tooltipNodeName })
        let companyId = (isParentCompany ? _.find(this.data, { '集團碼': this.tooltipNodeName })['統一編號'] : _.find(this.data, { '捐贈者／支出對象': this.tooltipNodeName })['統一編號'])
        d3.request(`https://company.g0v.ronny.tw/api/show/${companyId}`)
        .get((err, res) => {
          if (err || _.isEmpty(JSON.parse(res.response).data['財政部'])) {
            vm.companyCapital = '查無資料'
            vm.companyOwner = '查無資料'
          } else {
            // vm.companyCapital = JSON.parse(res.response).data['資本總額(元)']
            // vm.companyOwner = JSON.parse(res.response).data['代表人姓名']
            // console.log(JSON.parse(res.response).data)
            vm.companyCapital = JSON.parse(res.response).data['資本總額(元)'] ? JSON.parse(res.response).data['資本總額(元)'] : JSON.parse(res.response).data['資本額(元)']
            vm.companyOwner = JSON.parse(res.response).data['代表人姓名'] ? JSON.parse(res.response).data['代表人姓名'] : JSON.parse(res.response).data['負責人姓名']
          }
        })
      } else if (this.isParentCompany(this.tooltipNodeName)) {
        let relatedData = _.filter(this.data, {'集團碼': this.tooltipNodeName})
        this.companyOwner = relatedData[0]['董事長']
        this.companyCoreChild = relatedData[0]['旗下核心公司']
        let ids = _.uniq(relatedData.map(d => d['統一編號']))
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
  computed: {
    nestedData () {
      if (this.data) {
        return {
          'byCandidate': d3.nest().key(d => d['候選人']).key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).object(this.data),
          'byCompany': d3.nest().key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象']).key(d => d['候選人']).object(this.data),
          'byParentCompany': d3.nest().key(d => { if (d['集團碼']) { return d['集團碼'] } }).key(d => d['候選人']).object(this.data),
          'byChildCompany': d3.nest().key(d => d['捐贈者／支出對象']).key(d => d['候選人']).object(this.data)
        }
      }
    },
    list () {
      if (this.nestedData) {
        return {
          'candidate': d3.keys(this.nestedData.byCandidate),
          // 'company': d3.keys(this.nestedData.byCompany)
          'parentCompany': d3.keys(this.nestedData.byParentCompany),
          'childCompany': d3.keys(this.nestedData.byChildCompany),
          'company': _.concat(d3.keys(this.nestedData.byParentCompany), d3.keys(this.nestedData.byChildCompany))
        }
      }
    },
    total () {
      if (this.data) {
        return {
          'candidate': d3.nest()
            .key(d => d['候選人'])
            .rollup(leaves => { return {'total': d3.sum(leaves, d => +d['收入金額'] * 100000) / 100000} })
            .entries(this.data),
          'company': d3.nest()
            .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'])
            .rollup(leaves => { return {'total': d3.sum(leaves, d => +d['收入金額'] * 100000) / 100000} })
            .entries(this.data)
        }
      }
    },
    legendParties () {
      let vm = this
      function getWonParties () {
        return _.uniq(_.map(vm.data, candidate => {
          if (candidate['當選註記'] === '*') {
            return candidate['推薦政黨']
          }
        }))
      }
      function hasLostCandidates () {
        return _.some(vm.data, candidate => candidate['當選註記'] !== '*')
      }
      return {
        'hasLostCandidates': hasLostCandidates(),
        'wonParties': getWonParties()
      }
    },
    tooltipData () {
      if (this.abstractData) {
        return this.abstractData.filter(d => d['姓名'] === this.tooltipNodeName)[0]
      }
    },
    totalData () {
      if (this.tooltipNodeName) {
        if (this.isCandidate(this.tooltipNodeName)) {
          return ((_.find(this.total.candidate, ['key', this.tooltipNodeName]).value.total)).toLocaleString()
        } else if (this.isCompany(this.tooltipNodeName)) {
          return ((_.find(this.total.company, ['key', this.tooltipNodeName]).value.total)).toLocaleString()
        }
      }
    },
    tejData () {
      if (this.data) {
        if (_.find(this.data, { '集團碼': this.tooltipNodeName })) {
          if (_.find(this.data, ['集團碼', this.tooltipNodeName])['集團碼'] !== '') {
            return {
              '集團名': _.find(this.data, ['集團碼', this.tooltipNodeName])['集團碼'].substring(6),
              '董事長': _.find(this.data, ['集團碼', this.tooltipNodeName])['董事長'],
              '核心公司(Y)': _.find(this.data, ['集團碼', this.tooltipNodeName])['核心公司(Y)'] === '' ? '否' : '是'
            }
          } else {
            return '無'
          }
        }
      }
    }
  },
  methods: {
    isCandidate (name) {
      return this.list.candidate.includes(name)
    },
    isCompany (name) {
      return this.list.company.includes(name)
    },
    isParentCompany (name) {
      return this.list.parentCompany.includes(name)
    },
    isChildCompany (name) {
      // return _.includes(this.getCompaniesNameList, name)
      return this.list.childCompany.includes(name)
    },
    resizeGraph () {
      d3.select('#force-directed-graph').attr('width', document.querySelector('#graph-container').offsetWidth)
      d3.select('#force-directed-graph').attr('height', document.querySelector('#graph-container').offsetHeight)
    },
    visualize () {
      var vm = this
      vm.hasNodePinned = false

      // Scales
      var color = d3.scaleOrdinal()
                  .domain(['中國國民黨', '民主進步黨', '時代力量', '無黨團結聯盟', '無黨籍', '公司', '未當選'])
                  .range(['#0071bc', '#53a66f', '#fcc037', '#722f37', '#736357', 'transparent', '#000'])
      var r = d3.scaleLinear().range([5, 200])
      var linksStrokeWidth = d3.scaleLinear().range([1, 20])
      var strength = d3.scaleLinear().domain([0, 397]).range([-450, -100])

      d3.select('#force-directed-graph').remove()

      var svg = d3.select('.svg-container').append('svg').attr('id', 'force-directed-graph')
      var g = svg.append('g')
      var zoom = d3.zoom().scaleExtent([1 / 5, 8])
      .on('zoom', () => {
        g.attr('transform', d3.event.transform)
      })

      svg.attr('width', document.querySelector('#graph-container').offsetWidth)
      .attr('height', document.querySelector('#graph-container').offsetHeight)
      svg.call(zoom)

      var width = +svg.attr('width')
      var height = +svg.attr('height')

      var simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(d => {
          // console.log(d)
          // if (d.source.id === vm.target) {
          //   return 200
          // }
          return 100
        }))
        .force('charge', d3.forceManyBody().strength(d => {
          // if (d.party === '公司') {
          //   return -(_.find(companyTotalCosts, ['key', d.id]).value.total * 10)
          // } else {
          //   return -(_.find(candidateTotalEarnings, ['key', d.id]).value.total * 10)
          // }
          return strength(vm.data.length)
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

      var candidateTotalEarnings = vm.total.candidate
      var companyTotalCosts = vm.total.company

      var maxMoney = Math.max(d3.max(vm.total.candidate, d => d.value.total), d3.max(vm.total.company, d => d.value.total))
      var minMoney = Math.min(d3.min(vm.total.candidate, d => d.value.total), d3.min(vm.total.company, d => d.value.total))

      var minMaxFlow = d3.extent(graph.links, d => d.value)
      linksStrokeWidth.domain(minMaxFlow)
      r.domain([minMoney, maxMoney])

      var link = g.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(graph.links)
                .enter().append('line')
                .attr('id', d => {
                  return `${d.source}-${d.target}-link`
                })
                .attr('stroke-width', d => linksStrokeWidth(d.value))
                .on('mouseover', function (d) {
                  if (!vm.hasNodePinned) {
                    // Change vm's data, which is used by tooltip
                    vm.hoverIndicator = 'link'
                    vm.tooltipTargetName = d.target.id
                    vm.tooltipSourceName = d.source.id
                    vm.tooltipLinkMoney = (d.value * 10).toFixed(2)
                    if (d.companyType === 'parentCompany') {
                      let data = d3.nest()
                              .key(d => d['捐贈者／支出對象'])
                              .rollup(leaves => {
                                return {
                                  '收入金額': d3.sum(leaves, d => +d['收入金額'])
                                }
                              })
                              .entries(vm.nestedData.byCompany[d.target.id][d.source.id])
                      // vm.tooltipDetailOfParent = vm.nestedData.byCompany[d.target.id][d.source.id]
                      vm.tooltipDetailOfParent = data
                    }
                    // Show tooltip container
                    d3.select('.graph-tooltip-container')
                    .style('display', 'initial')
                    .style('opacity', 1)
                    // Fadeout or preserve links
                    d3.selectAll('line')
                    .style('stroke-opacity', '0.1')
                    d3.select(this)
                    .style('stroke-opacity', '0.7')
                    // Fadeout or preserve nodes
                    d3.selectAll('circle')
                    .style('opacity', '0.2')
                    d3.selectAll('image')
                    .style('opacity', '0.2')
                    d3.select(`#${d.source.id}-image`)
                    .style('opacity', '1')
                    d3.select(`#${d.source.id}-circle`)
                    .style('opacity', '1')
                    d3.select(`#${d.target.id}-image`)
                    .style('opacity', '1')
                    d3.select(`#${d.target.id}-circle`)
                    .style('opacity', '1')
                  }
                })
                .on('mouseout', d => {
                  if (!vm.hasNodePinned) {
                    // Delete vm's data, which is used by tooltip
                    vm.hoverIndicator = null
                    vm.tooltipTargetName = null
                    vm.tooltipSourceName = null
                    vm.tooltipLinkMoney = null
                    vm.tooltipDetailOfParent = null
                    // Hide tooltip container
                    d3.select('.graph-tooltip-container')
                    .style('opacity', 0)
                    .style('display', 'none')
                    // Set all the svg elements opacity to original
                    d3.selectAll('line')
                    .style('stroke-opacity', '0.7')
                    d3.selectAll('circle')
                    .style('opacity', '1')
                    d3.selectAll('image')
                    .style('opacity', '1')
                  }
                })

      var node = g.append('g')
                .attr('class', 'nodes')
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
                    return d.type === 'candidate' ? (d.wonStamp ? color(d.party) : '#000') : 'transparent'
                  })
                  // .style('display', d => d.type === 'candidate' ? 'initial' : 'none')
                  .style('stroke', d => {
                    if (d.party === '公司') {
                      return 'transparent'
                    }
                  })
                  .style('cursor', 'pointer')
                  .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended))
                  .on('mouseover', mouseoverHandler(0.2, 0.1))
                  .on('mouseout', mouseoverHandler(1, 0.7))
                  .on('click', d => {
                    $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=force-${d.id}`)
                    vm.$emit('repaint', d.id)
                  })
      var images = node
                  .append('image')
                  .attr('id', d => d.id + '-image')
                  .attr('xlink:href', d => {
                    if (d.type === 'candidate') {
                      return d.wonStamp ? require(`../../assets/images/candidate-portrait/${d.id}.png`) : require(`../../assets/images/candidate-portrait/沒當選.png`)
                    } else if (d.type === 'parentCompany') {
                      return require(`../../assets/images/money-icon/money1.png`)
                    } else if (d.type === 'childCompany') {
                      return require(`../../assets/images/money-icon/money4.png`)
                    }
                  })
                  .attr('x', setNodeImage('position'))
                  .attr('y', setNodeImage('position'))
                  .attr('width', setNodeImage('size'))
                  .attr('height', setNodeImage('size'))
                  .style('clip-path', d => {
                    if (d.party !== '公司') {
                      return 'circle(46% at 50% 50%)'
                    }
                  })
                  .style('-webkit-clip-path', d => {
                    if (d.party !== '公司') {
                      return 'circle(46% at 50% 50%)'
                    }
                  })
                  .style('cursor', 'pointer')
                  .call(d3.drag()
                        .on('start', dragstarted)
                        .on('drag', dragged)
                        .on('end', dragended))
                  .on('mouseover', mouseoverHandler(0.2, 0.1))
                  .on('mouseout', mouseoverHandler(1, 0.7))
                  .on('click', d => {
                    $.get(`https://www.mirrormedia.mg/gorest/poll_increase?qid=politicalcontributiontest&field=force-${d.id}`)
                    vm.$emit('repaint', d.id)
                  })
      var pin = node
                .append('image')
                .attr('id', d => d.id + '-pin')
                .attr('xlink:href', d => {
                  return require(`../../assets/images/explore-force/pin1.png`)
                })
                .attr('x', setPinImage('position'))
                .attr('y', setPinImage('position'))
                .attr('width', setPinImage('size'))
                .attr('height', setPinImage('size'))
                .style('cursor', 'pointer')
                .style('display', 'none')
                .on('mouseover', function (d) {
                  if (!vm.hasNodePinned) {
                    let event = new MouseEvent('mouseover', {})
                    document.querySelector(`#${d.id}-circle`).dispatchEvent(event)
                    document.querySelector(`#${d.id}-image`).dispatchEvent(event)
                    d3.select(this).style('display', 'initial')
                  }
                })
                .on('mouseout', function (d) {
                  if (!vm.hasNodePinned) {
                    let event = new MouseEvent('mouseout', {})
                    document.querySelector(`#${d.id}-circle`).dispatchEvent(event)
                    document.querySelector(`#${d.id}-image`).dispatchEvent(event)
                    d3.select(this).style('display', 'none')
                  }
                })
                .on('click', function (d) {
                  if (!vm.hasNodePinned) {
                    let event = new MouseEvent('mouseover', {})
                    document.querySelector(`#${d.id}-circle`).dispatchEvent(event)
                    document.querySelector(`#${d.id}-image`).dispatchEvent(event)
                    vm.hasNodePinned = true
                    vm.pinnedNodeName = d.id
                    // console.log(this)
                    d3.select(this)
                    .attr('xlink:href', d => {
                      return require(`../../assets/images/explore-force/pin2.png`)
                    })
                  } else {
                    vm.hasNodePinned = false
                    let event = new MouseEvent('mouseout', {})
                    document.querySelector(`#${d.id}-circle`).dispatchEvent(event)
                    document.querySelector(`#${d.id}-image`).dispatchEvent(event)
                    d3.select(this)
                    .attr('xlink:href', d => {
                      return require(`../../assets/images/explore-force/pin1.png`)
                    })
                  }
                })

      // Apply graph data to force simulation
      simulation
      .nodes(graph.nodes)
      .on('tick', ticked)
      simulation.force('link')
      .links(graph.links)

      // Initial zoom
      if (width <= 1920) {
        svg.transition()
        .call(zoom.transform, d3.zoomIdentity.translate(width / 5, height / 5).scale(2 / 3))
      }
      if (width <= 1280) {
        svg.transition()
        .call(zoom.transform, d3.zoomIdentity.translate(width / 4, height / 4).scale(1 / 2))
      }

      // Button zoom
      d3.select('#zoom_in').on('click', () => {
        zoom.scaleBy(svg.transition().duration(350), 1.3)
      })
      d3.select('#zoom_out').on('click', () => {
        zoom.scaleBy(svg.transition().duration(350), 1 / 1.3)
      })

      // Functions
      function setNodeImage (type) {
        if (type === 'position') {
          return function (d) {
            if (d.type === 'candidate') {
              return -(Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 23))
            } else {
              return -(Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 23))
            }
          }
        } else if (type === 'size') {
          return function (d) {
            if (d.type === 'candidate') {
              return (Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 23)) * 2
            } else {
              return (Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 23)) * 2
            }
          }
        }
      }
      function setPinImage (type) {
        if (type === 'position') {
          return function (d) {
            if (d.type === 'candidate') {
              return ((Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 23)) / 2) * 1.2
            } else {
              return ((Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 23)) / 2) * 1.2
            }
          }
        } else if (type === 'size') {
          return function (d) {
            if (d.type === 'candidate') {
              return Math.sqrt(r(_.find(candidateTotalEarnings, ['key', d.id]).value.total) * 23) / 1.5
            } else {
              return Math.sqrt(r(_.find(companyTotalCosts, ['key', d.id]).value.total) * 23) / 1.5
            }
          }
        }
      }
      function ticked () {
        link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

        // node
        //     .attr('cx', function(d) { return d.x })
        //     .attr('cy', function(d) { return d.y })
        circle
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
        images.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
        pin.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
      }

      let linkedByIndex = {}
      graph.links.forEach(d => {
        linkedByIndex[d.source.index + ',' + d.target.index] = 1
      })
      function isConnected (a, b) {
        return linkedByIndex[a.index + ',' + b.index] || linkedByIndex[b.index + ',' + a.index] || a.index === b.index
      }
      function mouseoverHandler (nodesOpacity, linksOpacity) {
        return function (d) {
          if (!vm.hasNodePinned) {
            // var showTooltip = function () {
            //   // Temporary shown the tooltip aside from graph
            //   if (_.some(candidateTotalEarnings, ['key', d.id])) {
            //     document.querySelector('#tooltip').innerHTML = d.id + '<br>' + formatter.format((_.find(candidateTotalEarnings, ['key', d.id]).value.total)*100000)
            //   } else if (_.some(companyTotalCosts, ['key', d.id])) {
            //     document.querySelector('#tooltip').innerHTML = d.taxId + '<br>' + d.id + '<br>' + formatter.format((_.find(companyTotalCosts, ['key', d.id]).value.total)*100000)
            //   }
            // }

            var fade = function () {
              // Don't using arrow function here when we have 'this' in function
              circle.style('stroke-opacity', function (o) {
                let thisOpacity = isConnected(d, o) ? 1 : nodesOpacity
                this.setAttribute('fill-opacity', thisOpacity)
                return thisOpacity
              })

              images.style('opacity', function (o) {
                let thisOpacity = isConnected(d, o) ? 1 : nodesOpacity
                this.setAttribute('opacity', thisOpacity)
                return thisOpacity
              })

              link.style('stroke-opacity', linksOpacity).style('stroke-opacity', o =>
                o.source === d || o.target === d ? 0.7 : linksOpacity
              )
            }

            fade()

            if (nodesOpacity === 0.2) {
              d3.select(`#${d.id}-pin`).style('display', 'initial')
            } else {
              d3.select(`#${d.id}-pin`).style('display', 'none')
            }
            // if (vm.hasNodePinned) {
              //   let event = new MouseEvent('mouseover', {})
            //   document.querySelector(`#${vm.pinnedNodeName}-circle`).dispatchEvent(event)
            //   document.querySelector(`#${vm.pinnedNodeName}-image`).dispatchEvent(event)
            // }
          }
          if (nodesOpacity === 0.2) {
            vm.tooltipNodeName = d.id
            vm.hoverIndicator = 'node'
            d3.select('.graph-tooltip-container')
            .style('display', 'initial')
            .style('opacity', 1)
            // .style('left', (d3.event.pageX) + 'px')
            // .style('top', (d3.event.pageY - 28) + 'px')
          } else {
            vm.tooltipNodeName = null
            vm.hoverIndicator = null
            vm.companyCapital = '查詢中'
            vm.companyOwner = '查詢中'
            vm.companyCoreChild = null
            d3.select('.graph-tooltip-container')
            .style('opacity', 0)
            .style('display', 'none')
            // .style('left', (d3.event.pageX) + 'px')
            // .style('top', (d3.event.pageY - 28) + 'px')
          }
        }
      }

      //
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
  },
  mounted () {
    if (window.innerWidth > 767) {
      this.visualize()
    }
    window.addEventListener('resize', this.resizeGraph)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeGraph)
  }
}
</script>
<style lang="stylus">
.svg-container
  position relative
  .zoombtns-container
    position absolute
    right 0
    display flex
    flex-direction column
    margin-top 1rem
    margin-right 1rem
    background white
    img
      cursor pointer
      width 35px
      height 35px
      // margin-bottom 0.5rem
      &:hover
        filter brightness(0%)
    #zoom_in
      margin-bottom 0.5rem
  .legends-container
    position absolute
    left 0
    display flex
    flex-direction column
    margin-top 1rem
    margin-left 2rem
    background white
    .legends
      display flex
      justify-content flex-start
      align-items center
      margin-bottom 0.2rem
      font-size 1rem
      .legends__circle
        display inline-block
        width 16px
        height 16px
        border-radius 8px
        margin-right 0.5rem
        &--dpp
          background #53a66f
        &--kmt
          background #0071bc
        &--npp
          background #fcc037
        &--npsu
          background #722f37
        &--none
          background #736357
      .legends__normal
        display inline-block
        width 16px
        height 16px
        margin-right 0.5rem
      .legends__multiple-circles
        display inline-block
        width 24px
        position relative
        left -4px
        // margin-right 0.5rem
      .legends__company
        display inline-block
        width 16px
        // height 16px
        margin-right 0.5rem
  .graph-tooltip-container
    position absolute
    opacity 1
    bottom 0
    left 1rem
    background white
    &__candidate-basic
      padding 0 !important
    &__candidate-detail
      padding 0 !important
  .links
    line
      stroke #999
      stroke-opacity .7
  .nodes
    circle
      stroke #fff
      stroke-width 1.5px
// @media (max-width: 1680px)
// @media (max-width: 1440px)
@media (max-width: 1280px)
  .svg-container
    .legends-container
      .legends
        font-size 0.8rem
        margin-bottom 0.2rem
// @media (max-width: 1116px)
</style>


