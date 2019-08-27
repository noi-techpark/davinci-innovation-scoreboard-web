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

      const response = await this.$axios(
        '/statistics/enterprises-with-innovation-activities-divided-by-territory'
      )

      commit('metricLoaded', { id: 'metric0', data: response.data.statistics })
      commit('metricFaceLoaded', { id: 'metric1' })
      commit('metricFaceLoaded', { id: 'metric2' })
      commit('metricFaceLoaded', { id: 'metric3' })
      commit('metricFaceLoaded', { id: 'metric4' })
      commit('metricFaceLoaded', { id: 'metric5' })

      commit('metricsLoaded')
    } catch (e) {}
  }
}
