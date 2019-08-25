// import pattern from 'patternomaly'
import territories from '@/meta/territories'
import metrics from '@/meta/metrics'

export const state = () => ({
  loaded: false,
  territories,
  // selectedTerritories: ['IT', 'ITD', 'ITD1', 'ITD2', 'ITD3', 'ITC4'],
  selectedTerritories: ['IT', 'ITD1', 'ITD2', 'ITC4'],
  metrics,
  openMetric: null
})

// function generateChartLabels(territories, selectedTerritories) {
//   return selectedTerritories.map((id) => {
//     return territories[id].toUpperCase()
//   })
// }

// function generateDatasetForChart2(
//   dataByTerritory,
//   selectedTerritories,
//   selectedYear
// ) {
//   return [
//     {
//       data: selectedTerritories.map((id) => {
//         const group = dataByTerritory.stats[id].find((group) => {
//           return group.group.FORMA_INNOVAZ === 'ALL'
//         })

//         return group.values[selectedYear]
//       }),
//       borderWidth: 0,
//       backgroundColor: [
//         pattern.draw('disc', '#FFF', '#000', 15),
//         pattern.draw('disc', '#FFF', '#000', 15),
//         pattern.draw('disc', '#FFF', '#D5575C', 15),
//         pattern.draw('disc', '#FFF', '#000', 15),
//         pattern.draw('disc', '#FFF', '#000', 15),
//         pattern.draw('disc', '#FFF', '#000', 15)
//       ]
//       // label: 'xxx'
//     }
//   ]
// }

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  getData: (state) => (index) => {
    return state.metrics[index].data
  },
  getYears: (state) => (index) => {
    const data = state.metrics[index].data

    return data[Object.keys(data)[0]].map((year) => {
      return year.year
    })
  },
  getTerritoryLabel: (state) => (territory) => {
    return state.territories[territory]
  }
  // getChartData2: (state) => (index) => {
  //   return {
  //     labels: generateChartLabels(state.territories, state.selectedTerritories),
  //     datasets: generateDatasetForChart2(
  //       state.list[index].dataByTerritory,
  //       state.selectedTerritories,
  //       state.selectedYear
  //     )
  //   }
  // }
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
