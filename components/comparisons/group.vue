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
          class="mt-3 mr-3"
        />
      </div>

      <div class="relative">
        <select
          class="block appearance-none w-full text-black py-3 px-4 leading-tight text-xl focus:outline-none"
          style="padding-right: 2.5rem"
          @change="changeYear"
        >
          <option v-for="year in years" :key="year" :value="year">{{
            year
          }}</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="mt-5 pb-2 overflow-x-scroll md:overflow-auto">
      <HorizontalBarChart :chart-data="data" class="chart" />
    </div>
  </div>
</template>

<script>
import pattern from 'patternomaly'
import SelectableButton from '@/components/buttons/selectable.vue'
import HorizontalBarChart from '@/components/charts/horizontal-bar.vue'
import {
  DATASET_COLOR_NORMAL,
  DATASET_COLOR_METRICS,
  DATASET_PATTERN_STYLES,
  DATASET_PATTERN_SIZE
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
          datasets.push({
            data: this.selectedTerritories.map((id) => {
              return data[id]
                .find((year) => {
                  return year.year === this.selectedYear
                })
                .groups.find((g) => {
                  return g.id === this.markedGroup
                }).values[value]
            }),
            borderWidth: 0,
            backgroundColor: this.selectedTerritories.map((id) => {
              return pattern.draw(
                DATASET_PATTERN_STYLES[i],
                '#FFF',
                id === 'ITD1'
                  ? DATASET_COLOR_METRICS[this.metric.id]
                  : DATASET_COLOR_NORMAL,
                DATASET_PATTERN_SIZE
              )
            }),
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
            return pattern.draw(
              DATASET_PATTERN_STYLES[0],
              '#FFF',
              id === 'ITD1'
                ? DATASET_COLOR_METRICS[this.metric.id]
                : DATASET_COLOR_NORMAL,
              DATASET_PATTERN_SIZE
            )
          })
          // label: 'xxx'
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
    },
    changeYear(e) {
      this.selectYear(e.target.value)
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
