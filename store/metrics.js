import Vue from 'vue'
import territories from '@/meta/territories'
import nace from '@/meta/nace'
import metrics from '@/meta/metrics'

export const state = () => ({
  loaded: false,
  repaint: {
    territories: false
  },
  territories,
  selectedTerritories: ['IT', 'ITD', 'ITD1', 'ITD2', 'ITD3', 'ITC4'],
  nace,
  metrics,
  openMetric: null
})

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  hasDataByNace: (state) => (index) => {
    return state.metrics[index].dataByNace !== null
  },
  getDataByTerritory: (state) => (index) => {
    return state.metrics[index].dataByTerritory
  },
  getDataByNace: (state) => (index) => {
    return state.metrics[index].dataByNace
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
  metricLoaded(state, { id, dataByTerritory, dataByNace }) {
    state.metrics.forEach((metric) => {
      if (metric.id !== id) return

      metric.dataByTerritory = dataByTerritory
      metric.dataByNace = dataByNace

      const latest = dataByTerritory.ITD1.reduce(
        (previousValue, currentValue) => {
          if (parseInt(previousValue.year) > parseInt(currentValue.year)) {
            return previousValue
          } else {
            return currentValue
          }
        }
      )

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

      const request6 = this.$axios(
        '/statistics/enterprises-with-innovation-activities-in-italy-divided-by-nace'
      )

      const request7 = this.$axios(
        '/statistics/enterprises-that-have-introduced-product-or-process-innovations-in-italy-divided-by-nace'
      )

      const request8 = this.$axios(
        '/statistics/innovation-expenditure-in-italy-divided-by-nace'
      )

      const responses = await Promise.all([
        request0,
        request1,
        request2,
        request3,
        request4,
        request5,
        request6,
        request7,
        request8
      ])

      commit('metricLoaded', {
        id: 'metric0',
        dataByTerritory: responses[0].data.statistics,
        dataByNace: responses[6].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric1',
        dataByTerritory: responses[1].data.statistics,
        dataByNace: responses[7].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric2',
        dataByTerritory: responses[2].data.statistics,
        dataByNace: responses[8].data.statistics
      })
      commit('metricLoaded', {
        id: 'metric3',
        dataByTerritory: responses[3].data.statistics,
        dataByNace: null
      })
      commit('metricLoaded', {
        id: 'metric4',
        dataByTerritory: responses[4].data.statistics,
        dataByNace: null
      })
      commit('metricLoaded', {
        id: 'metric5',
        dataByTerritory: responses[5].data.statistics,
        dataByNace: null
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
