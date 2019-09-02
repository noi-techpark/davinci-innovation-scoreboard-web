import Vue from 'vue'
import territories from '@/meta/territories'
import metrics from '@/meta/metrics'

export const state = () => ({
  loaded: false,
  repaint: {
    territories: false
  },
  territories,
  selectedTerritories: ['IT', 'ITD', 'ITD1', 'ITD2', 'ITD3', 'ITC4'],
  metrics,
  openMetric: null
})

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  getDataByTerritory: (state) => (index) => {
    return state.metrics[index].dataByTerritory
  },
  getYears: (state) => (index) => {
    const data = state.metrics[index].dataByTerritory

    if (data === undefined) return []

    return data[Object.keys(data)[0]]
      .sort((yearA, yearB) => {
        return parseInt(yearA.year) - parseInt(yearB.year)
      })
      .map((year) => {
        return year.year
      })
  },
  getTerritoryLabel: (state) => (territory) => {
    return state.territories[territory]
  }
}

export const mutations = {
  loadingMetrics(state) {
    state.loaded = true
  },
  metricsLoaded(state) {
    state.loaded = true
  },
  metricLoaded(state, { id, data }) {
    state.metrics.forEach((metric) => {
      if (metric.id !== id) return

      metric.dataByTerritory = data

      const latest = data.ITD1.reduce((previousValue, currentValue) => {
        if (parseInt(previousValue.year) > parseInt(currentValue.year)) {
          return previousValue
        } else {
          return currentValue
        }
      })

      metric.value = latest.total
    })
  },
  startRepaint(state, part) {
    state.repaint[part] = true
  },
  finishRepaint(state, part) {
    state.repaint[part] = false
  },
  openMetric(state, index) {
    state.openMetric = index
  },
  closeMetric(state) {
    state.openMetric = null
  },
  selectTerritories(state, selectedTerritories) {
    state.selectedTerritories = selectedTerritories
  }
}

export const actions = {
  async load({ commit }) {
    try {
      commit('loadingMetrics')

      const request0 = this.$axios(
        '/statistics/enterprises-with-innovation-activities-divided-by-territory'
      )

      const request1 = this.$axios(
        '/statistics/enterprises-that-have-introduced-product-or-process-innovations-divided-by-territory'
      )

      const request2 = this.$axios(
        '/statistics/innovation-expenditure-divided-by-territory'
      )

      const request3 = this.$axios(
        '/statistics/innovation-expenditure-per-number-of-persons-employed-divided-by-territory'
      )

      const request4 = this.$axios(
        '/statistics/research-and-development-personnel-in-house-divided-by-territory'
      )

      const request5 = this.$axios(
        '/statistics/domestic-research-and-development-expenditure-in-house-divided-by-territory'
      )

      const responses = await Promise.all([
        request0,
        request1,
        request2,
        request3,
        request4,
        request5
      ])

      commit('metricLoaded', {
        id: 'metric0',
        data: responses[0].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric1',
        data: responses[1].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric2',
        data: responses[2].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric3',
        data: responses[3].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric4',
        data: responses[4].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric5',
        data: responses[5].data.statistics
      })

      commit('metricsLoaded')
    } catch (e) {}
  },
  selectTerritories({ commit }, selectedTerritories) {
    commit('selectTerritories', selectedTerritories)
    commit('startRepaint', 'territories')

    Vue.nextTick(() => {
      commit('finishRepaint', 'territories')
    })
  }
}
