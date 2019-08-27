import territories from '@/meta/territories'
import metrics from '@/meta/metrics'

export const state = () => ({
  loaded: false,
  territories,
  selectedTerritories: ['IT', 'ITD', 'ITD1', 'ITD2', 'ITD3', 'ITC4'],
  metrics,
  openMetric: null
})

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  getData: (state) => (index) => {
    return state.metrics[index].data
  },
  getYears: (state) => (index) => {
    const data = state.metrics[index].data

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

      metric.data = data

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
  metricFaceLoaded(state, { id }) {
    state.list.forEach((metric) => {
      if (metric.id !== id) return

      metric.value = 1234
    })
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

      const response0 = await this.$axios(
        '/statistics/enterprises-with-innovation-activities-divided-by-territory'
      )

      const response1 = await this.$axios(
        '/statistics/enterprises-that-have-introduced-product-or-process-innovations-divided-by-territory'
      )

      const response2 = await this.$axios(
        '/statistics/innovation-expenditure-divided-by-territory'
      )

      const response3 = await this.$axios(
        '/statistics/innovation-expenditure-per-number-of-persons-employed-divided-by-territory'
      )

      // const response4 = await this.$axios(
      //   '/statistics/research-and-development-personnel-in-house-divided-by-territory'
      // )

      const response5 = await this.$axios(
        '/statistics/domestic-research-and-development-expenditure-in-house-divided-by-territory'
      )

      commit('metricLoaded', { id: 'metric0', data: response0.data.statistics })
      commit('metricLoaded', { id: 'metric1', data: response1.data.statistics })
      commit('metricLoaded', { id: 'metric2', data: response2.data.statistics })
      commit('metricLoaded', { id: 'metric3', data: response3.data.statistics })
      // commit('metricLoaded', { id: 'metric4', data: response4.data.statistics })
      commit('metricLoaded', { id: 'metric5', data: response5.data.statistics })
      commit('metricFaceLoaded', { id: 'metric4' })
      // commit('metricFaceLoaded', { id: 'metric5' })

      commit('metricsLoaded')
    } catch (e) {}
  }
}
