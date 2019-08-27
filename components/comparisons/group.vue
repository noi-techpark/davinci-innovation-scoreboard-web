<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <SelectableButton
          v-for="group in metric.groups"
          :key="group.id"
          :text="group.name"
          :value="group.id"
          :selected-value="markedGroup"
          :selected-color="metric.id"
          :click="markGroup"
          class="my-1 mr-3"
        />
      </div>

      <SelectYear
        :years="years"
        :selected-year="selectedYear"
        :select-year="selectYear"
        class="my-1 flex items-center"
      />
    </div>

    <div class="mt-5 pb-2 overflow-x-scroll md:overflow-auto">
      <HorizontalBarChart :chart-data="data" class="chart" />
    </div>
  </div>
</template>

<script>
import SelectableButton from '@/components/selectable-button.vue'
import SelectYear from '@/components/select-year.vue'
import HorizontalBarChart from '@/components/charts/horizontal-bar.vue'
import {
  DATASET_COLOR_NORMAL,
  DATASET_COLOR_METRICS
} from '@/components/charts/config'

export default {
  components: {
    SelectableButton,
    SelectYear,
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
    },
    selectedYear: {
      type: String,
      required: true
    },
    selectYear: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      markedGroup: null
    }
  },
  computed: {
    territories() {
      return this.$store.state.metrics.territories
    },
    selectedTerritories() {
      return this.$store.state.metrics.selectedTerritories
    },
    years() {
      return this.$store.getters['metrics/getYears'](this.index)
    },
    hasMarkedGroup() {
      return this.markedGroup !== null
    },
    data() {
      const data = this.$store.getters['metrics/getData'](this.index)

      const territoriesLabels = this.selectedTerritories.map((territory) => {
        return this.$store.getters['metrics/getTerritoryLabel'](territory)
      })

      const datasets = []

      if (this.hasMarkedGroup) {
        const group = this.metric.groups.find((group) => {
          return group.id === this.markedGroup
        })

        Object.keys(group.values).map((value, i) => {
          const datasetData = []
          const datasetBackgroundColor = []

          this.selectedTerritories.forEach((id) => {
            const color =
              id === 'ITD1'
                ? DATASET_COLOR_METRICS[this.metric.id]
                : DATASET_COLOR_NORMAL[i]

            datasetData.push(
              data[id]
                .find((year) => {
                  return year.year === this.selectedYear
                })
                .groups.find((g) => {
                  return g.id === this.markedGroup
                }).values[value]
            )

            datasetBackgroundColor.push(color)
          })

          datasets.push({
            data: datasetData,
            borderWidth: 0,
            backgroundColor: datasetBackgroundColor,
            hoverBackgroundColor: datasetBackgroundColor,
            label: group.values[value]
          })
        })
      } else {
        datasets.push({
          data: this.selectedTerritories.map((id) => {
            return data[id].find((year) => {
              return year.year === this.selectedYear
            }).total
          }),
          borderWidth: 0,
          backgroundColor: this.selectedTerritories.map((id) => {
            return id === 'ITD1'
              ? DATASET_COLOR_METRICS[this.metric.id]
              : DATASET_COLOR_NORMAL[0]
          })
        })
      }

      return {
        labels: territoriesLabels,
        datasets
      }
    }
  },
  methods: {
    isGroupMarked(group) {
      return this.markedGroup === group
    },
    markGroup(group) {
      console.log(group)
      if (this.isGroupMarked(group)) {
        this.markedGroup = null
      } else {
        this.markedGroup = group
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
