import pattern from 'patternomaly'

export const state = () => ({
  territories: {
    IT: 'Italy',
    ITC: 'Nord-ovest',
    ITD: 'Nord-est',
    ITE: 'Centro (I)',
    ITF: 'Sud',
    ITG: 'Isole',
    ITC1: 'Piemonte',
    ITC2: "Valle d'Aosta / Vallée d'Aoste",
    ITC3: 'Liguria',
    ITC4: 'Lombardia',
    ITDA: 'Trentino Alto Adige / Südtirol',
    ITD1: 'Provincia Autonoma Bolzano / Bozen',
    ITD2: 'Provincia Autonoma Trento',
    ITD3: 'Veneto',
    ITD4: 'Friuli-Venezia Giulia',
    ITD5: 'Emilia-Romagna',
    ITE1: 'Toscana',
    ITE2: 'Umbria',
    ITE3: 'Marche',
    ITE4: 'Lazio',
    ITF1: 'Abruzzo',
    ITF2: 'Molise',
    ITF3: 'Campania',
    ITF4: 'Puglia',
    ITF5: 'Basilicata',
    ITF6: 'Calabria',
    ITG1: 'Sicilia',
    ITG2: 'Sardegna'
  },
  selectedTerritories: ['IT', 'ITD', 'ITD1', 'ITD2', 'ITD3', 'ITC4'],
  selectedYear: 2016,
  list: [
    {
      title: 'enterprises with innovation activities',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 9323,
      unit: '%',
      dataByTerritory: {
        descriptions: {
          FORMA_INNOVAZ: {
            ALL: 'all items',
            PTCON: 'product and/or process innovation activities (only)',
            OMKON: 'organisation and/or marketing innovations (only)',
            PTCOMK:
              'product/process innovation activities and  organisation/marketing innovations'
          }
        },
        stats: {
          IT: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '84701',
                '2014': '68204',
                '2016': '76895'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '14874',
                '2014': '17674',
                '2016': '19268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '26679',
                '2014': '19416',
                '2016': '16757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '43147',
                '2014': '31113',
                '2016': '40870'
              }
            }
          ],
          ITD: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '4701',
                '2014': '8204',
                '2016': '6895'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '4874',
                '2014': '7674',
                '2016': '9268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '6679',
                '2014': '9416',
                '2016': '6757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '3147',
                '2014': '1113',
                '2016': '870'
              }
            }
          ],
          ITD1: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '84701',
                '2014': '68204',
                '2016': '7895'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '14874',
                '2014': '17674',
                '2016': '19268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '26679',
                '2014': '19416',
                '2016': '16757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '43147',
                '2014': '31113',
                '2016': '40870'
              }
            }
          ],
          ITD2: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '84701',
                '2014': '68204',
                '2016': '6305'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '14874',
                '2014': '17674',
                '2016': '19268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '26679',
                '2014': '19416',
                '2016': '16757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '43147',
                '2014': '31113',
                '2016': '40870'
              }
            }
          ],
          ITD3: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '84701',
                '2014': '68204',
                '2016': '7689'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '14874',
                '2014': '17674',
                '2016': '19268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '26679',
                '2014': '19416',
                '2016': '16757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '43147',
                '2014': '31113',
                '2016': '40870'
              }
            }
          ],
          ITC4: [
            {
              group: {
                FORMA_INNOVAZ: 'ALL'
              },
              values: {
                '2012': '84701',
                '2014': '68204',
                '2016': '7685'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCON'
              },
              values: {
                '2012': '14874',
                '2014': '17674',
                '2016': '19268'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'OMKON'
              },
              values: {
                '2012': '26679',
                '2014': '19416',
                '2016': '16757'
              }
            },
            {
              group: {
                FORMA_INNOVAZ: 'PTCOMK'
              },
              values: {
                '2012': '43147',
                '2014': '31113',
                '2016': '40870'
              }
            }
          ]
        }
      }
    },
    {
      title: 'enterprises that have introduced product o process innovations',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 8884,
      unit: '€'
    },
    {
      title: 'innovation expenditure',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 1234,
      unit: ''
    },
    {
      title: 'innovation expenditure per number of persons',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 234,
      unit: '%'
    },
    {
      title: 'research and development personnel in-house',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 4345,
      unit: '€'
    },
    {
      title: 'domestic research and development expenditure in-house',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      value: 7234455,
      unit: ''
    }
  ],
  openMetric: null
})

function generateChartLabels(territories, selectedTerritories) {
  return selectedTerritories.map((id) => {
    return territories[id].toUpperCase()
  })
}

function generateDatasetForChart2(
  dataByTerritory,
  selectedTerritories,
  selectedYear
) {
  return [
    {
      data: selectedTerritories.map((id) => {
        const group = dataByTerritory.stats[id].find((group) => {
          return group.group.FORMA_INNOVAZ === 'ALL'
        })

        return group.values[selectedYear]
      }),
      borderWidth: 0,
      backgroundColor: [
        pattern.draw('disc', '#FFF', '#000', 15),
        pattern.draw('disc', '#FFF', '#000', 15),
        pattern.draw('disc', '#FFF', '#D5575C', 15),
        pattern.draw('disc', '#FFF', '#000', 15),
        pattern.draw('disc', '#FFF', '#000', 15),
        pattern.draw('disc', '#FFF', '#000', 15)
      ]
      // label: 'xxx'
    }
  ]
}

export const getters = {
  isMetricOpen: (state) => (index) => {
    return state.openMetric === index
  },
  getChartData2: (state) => (index) => {
    return {
      labels: generateChartLabels(state.territories, state.selectedTerritories),
      datasets: generateDatasetForChart2(
        state.list[index].dataByTerritory,
        state.selectedTerritories,
        state.selectedYear
      )
    }
  }
}

export const mutations = {
  openMetric(state, index) {
    state.openMetric = index
  },
  closeMetric(state) {
    state.openMetric = null
  }
}
