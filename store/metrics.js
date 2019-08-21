export const state = () => ({
  list: [
    {
      title: 'enterprises with innovation activities',
      value: 9323
    },
    {
      title: 'enterprises that have introduced product o process innovations',
      value: 8884
    },
    {
      title: 'innovation expenditure',
      value: 1234
    },
    {
      title: 'innovation expenditure per number of persons',
      value: 234
    },
    {
      title: 'research and development personnel in-house',
      value: 4345
    },
    {
      title: 'domestic research and development expenditure in-house',
      value: 72344553
    }
  ],
  status: [
    {
      isMetricOpen: false
    },
    {
      isMetricOpen: false
    },
    {
      isMetricOpen: false
    },
    {
      isMetricOpen: false
    },
    {
      isMetricOpen: false
    },
    {
      isMetricOpen: false
    }
  ]
})

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.status[index].isMetricOpen
  }
}

export const mutations = {
  openMetric(state, index) {
    state.status[index].isMetricOpen = true
  },
  closeMetrics(state) {
    state.status.forEach((status) => {
      status.isMetricOpen = false
    })
  }
}

export const actions = {
  openMetric({ commit }, index) {
    commit('closeMetrics')
    commit('openMetric', index)
  },
  closeMetric({ commit }, index) {
    commit('closeMetrics')
  }
}
