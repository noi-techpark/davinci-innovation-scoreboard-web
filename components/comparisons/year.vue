<template>
  <div>
    <div>
      <SelectableButton
        v-for="(selectedTerritory, id) in selectedTerritories"
        :key="id"
        :text="territories[selectedTerritory]"
        :value="selectedTerritory"
        :selected-value="markedTerritoryInYearComparison"
        :selected-color="metric.id"
        :click="markTerritoryInYearComparison"
        class="mt-3 mr-3"
      />
    </div>

    <div class="mt-5 overflow-x-scroll md:overflow-auto">
      <LineChart :chart-data="data" class="chart" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/buttons/selectable.vue'
import LineChart from '@/components/charts/line.vue'

export default {
  components: {
    SelectableButton,
    LineChart
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    metric: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markedTerritoryInYearComparison: null
    }
  },
  computed: {
    territories() {
      return this.$store.state.metrics.territories
    },
    selectedTerritories() {
      return this.$store.state.metrics.selectedTerritories
    },
    data() {
      const data = this.$store.getters['metrics/getData'](this.index)
      const years = this.$store.getters['metrics/getYears'](this.index)

      const datasets = this.$store.state.metrics.selectedTerritories.map(
        (territory) => {
          return {
            data: years.map((year) => {
              return data[territory].find((item) => {
                return item.year === year
              }).total
            }),
            label: this.$store.getters['metrics/getTerritoryLabel'](territory)
          }
        }
      )

      return {
        labels: years,
        datasets
      }
    }
  },
  methods: {
    markTerritoryInYearComparison(territory) {
      if (this.markedTerritoryInYearComparison === territory) {
        this.markedTerritoryInYearComparison = null
      } else {
        this.markedTerritoryInYearComparison = territory
      }
    }
  }
}
</script>

<style scoped>
.chart {
  min-width: 800px;
}

@screen md {
  .chart {
    min-width: 0;
  }
}
</style>
