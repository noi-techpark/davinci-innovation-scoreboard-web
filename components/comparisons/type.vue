<template>
  <div>
    <div>
      <SelectableButton
        v-for="(selectedTerritory, id) in selectedTerritories"
        :key="id"
        :text="territories[selectedTerritory]"
        :value="selectedTerritory"
        :selected-value="markedTerritory"
        :selected-color="metric.id"
        :click="markTerritory"
        class="mt-3 mr-3"
      />
    </div>

    <div class="mt-5 pb-2 overflow-x-scroll md:overflow-auto">
      <HorizontalBarChart :chart-data="data" class="chart" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/buttons/selectable.vue'
import HorizontalBarChart from '@/components/charts/horizontal-bar.vue'
import {
  LINE_COLOR_NORMAL,
  LINE_COLOR_METRICS
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    HorizontalBarChart
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
      markedTerritory: null
    }
  },
  computed: {
    territories() {
      return this.$store.state.metrics.territories
    },
    selectedTerritories() {
      return this.$store.state.metrics.selectedTerritories
    },
    hasMarkedTerritory() {
      return this.markedTerritory !== null
    },
    data() {
      const data = this.$store.getters['metrics/getData'](this.index)
      const years = this.$store.getters['metrics/getYears'](this.index)

      const datasets = this.$store.state.metrics.selectedTerritories.map(
        (territory) => {
          const color = this.isTerritoryMarked(territory)
            ? LINE_COLOR_METRICS[this.metric.id]
            : LINE_COLOR_NORMAL

          return {
            data: years.map((year) => {
              return data[territory].find((item) => {
                return item.year === year
              }).total
            }),
            label: this.$store.getters['metrics/getTerritoryLabel'](territory),
            fill: false,
            borderColor: color,
            pointStyle: 'rect',
            pointRadius: 8,
            pointHoverRadius: 10,
            pointBackgroundColor: color,
            pointBorderColor: color
          }
        }
      )

      if (this.hasMarkedTerritory) {
        const markedTerritoryIndex = this.selectedTerritories.indexOf(
          this.markedTerritory
        )
        const markedDataset = datasets[markedTerritoryIndex]

        datasets.splice(markedTerritoryIndex, 1)

        datasets.unshift(markedDataset)
      }

      return {
        labels: years,
        datasets
      }
    }
  },
  methods: {
    isTerritoryMarked(territory) {
      return this.markedTerritory === territory
    },
    markTerritory(territory) {
      if (this.isTerritoryMarked(territory)) {
        this.markedTerritory = null
      } else {
        this.markedTerritory = territory
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
