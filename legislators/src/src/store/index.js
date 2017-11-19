import Vue from 'vue'
import Vuex from 'vuex'

import * as d3 from 'd3'
import _ from 'lodash'

Vue.use(Vuex)

const paths = {
  landingData: 'static/data/landing.json',
  explore: {
    abstractData: 'static/data/political-contribution-abstract-csv.csv',
    detailData: 'static/data/political-contribution-detail-opendata-csv.csv'
  }
}

const store = new Vuex.Store({
  state: {
    landingData: [],
    abstractData: [],
    detailData: [],
    storyPublishedCount: 4,
    landingForceCandidateName: '陳歐珀'
  },
  mutations: {
    SET_LANDING_DATA (state, data) {
      Vue.set(state, 'landingData', data)
    },
    SET_ABSTRACT_DATA (state, data) {
      Vue.set(state, 'abstractData', data)
    },
    SET_DETAIL_DATA (state, data) {
      Vue.set(state, 'detailData', data)
    }
  },
  actions: {
    FETCH_LANDING_DATA ({ commit, state }) {
      d3.json(paths.landingData, (error, response) => {
        if (error) throw error
        commit('SET_LANDING_DATA', response)
      })
    },
    FETCH_CSV_DATA ({ commit, state }) {
      const queue = d3.queue()
      Object.entries(paths.explore).forEach((path) => {
        queue.defer(d3.csv, path[1])
      })
      queue.awaitAll((error, responses) => {
        if (error) throw error
        responses.forEach((response, i) => {
          if (i === 0) {
            commit('SET_ABSTRACT_DATA', response)
          } else {
            commit('SET_DETAIL_DATA', response)
          }
        })
      })
    }
  },
  getters: {
    exist: state => {
      return {
        'landingData': state.landingData.length !== 0,
        'abstractData': state.abstractData.length !== 0,
        'detailData': state.detailData.length !== 0
      }
    },
    nestedData: state => (inputData = undefined) => {
      let data = inputData || state.detailData
      return {
        'byCandidate': d3.nest()
                       .key(d => d['候選人'])
                       .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'])
                       .object(data),
        'byParentCompany': d3.nest()
                           .key(d => d['集團碼'] ? d['集團碼'] : '無所屬集團')
                           .key(d => d['候選人'])
                           .object(data),
        'byChildCompany': d3.nest()
                          .key(d => d['捐贈者／支出對象'])
                          .key(d => d['候選人'])
                          .object(data)
      }
    },
    // list: state => (inputData = undefined) => {
    //   let data = inputData ? inputData : state.detailData
    //   return {
    //     'byCandidate': d3.keys(store.getters.nestedData().byCandidate),
    //     'byParentCompany': d3.keys(store.getters.nestedData().byParentCompany),
    //     'byChildCompany': d3.keys(store.getters.nestedData().byChildCompany),
    //     'byCompany': _.concat(d3.keys(store.getters.nestedData().byParentCompany), d3.keys(store.getters.nestedData().byChildCompany))
    //   }
    // },
    total: state => (inputData = undefined) => {
      let data = inputData || state.detailData
      return {
        'candidate': d3.nest()
          .key(d => d['候選人'])
          .rollup(leaves => { return {'total': d3.sum(leaves, d => +d['收入金額'] * 100000) / 100000} })
          .entries(data),
        'company': d3.nest()
          .key(d => d['集團碼'] ? d['集團碼'] : d['捐贈者／支出對象'])
          .rollup(leaves => { return {'total': d3.sum(leaves, d => +d['收入金額'] * 100000) / 100000} })
          .entries(data)
      }
    },
    getTargetRelatedDetailData: state => name => {
      let candidateName = name
      let candidateData = state.detailData.filter(d => d['候選人'] === candidateName)

      let companies = []
      candidateData.forEach(d => {
        d['集團碼'] ? companies.push(d['集團碼']) : companies.push(d['捐贈者／支出對象'])
      })

      let data = state.detailData.filter(d => d['集團碼'] ? _.includes(companies, d['集團碼']) : _.includes(companies, d['捐贈者／支出對象']))
      return data
    }
  }
})

export default store
