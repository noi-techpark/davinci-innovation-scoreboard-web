<template>
  <div
    class="mt-5 md:mt-6 px-4 xl:px-0 flex flex-col justify-end"
    :class="{
      'w-full': isMetricOpen,
      'w-full xl:w-1/2': isMetricClose,
      'xl:pl-4 xl:pr-0': showLeftPadding,
      'xl:pl-0 xl:pr-4': showRightPadding
    }"
  >
    <div
      class="border-b-2 border-black font-bold text-xl md:text-2xl uppercase"
    >
      {{ metric.title }}
    </div>
    <div class="flex justify-between py-2 border-b border-gray-500 ">
      <div
        class="mb-1 leading-none font-light text-5xl sm:text-6xl md:text-8xl "
        :class="['text-metric' + index + '-500']"
      >
        <CountUp :number="metric.value" :suffix="metric.unit" />
      </div>

      <div class="mt-1 flex flex-col justify-center">
        <button
          v-if="isMetricClose"
          class="hover:text-gray-500"
          @click.prevent="openMetric(index)"
        >
          <OpenIcon class="toggle-icon fill-current" />
          <span class="sr-only">Open metric</span>
        </button>

        <button
          v-if="isMetricOpen"
          class="hover:text-gray-500"
          @click.prevent="closeMetric(index)"
        >
          <CloseIcon class="toggle-icon fill-current" />
          <span class="sr-only">Close metric</span>
        </button>
      </div>
    </div>
    <div v-if="isMetricOpen" class="mt-3">
      <div class="text-base sm:text-lg md:text-xl">
        {{ metric.description }}
      </div>
      <div class="mt-4 py-4 chart-box">
        <HorizontalBarChart :chart-data="chartData2" class="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CountUp from '@/components/count-up.vue'
import OpenIcon from '@/components/icons/open.vue'
import CloseIcon from '@/components/icons/close.vue'
import HorizontalBarChart from '@/components/charts/horizontal-bar.vue'

function moduloComparisonValueforLeftPadding(openMetric, index) {
  if (openMetric === null) return 1

  if (openMetric < index && openMetric % 2 === 0) return 0

  return 1
}

function moduloComparisonValueforRightPadding(openMetric, index) {
  if (openMetric === null) return 0

  if (openMetric < index && openMetric % 2 === 0) return 1

  return 0
}

export default {
  components: {
    CountUp,
    OpenIcon,
    CloseIcon,
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
  computed: {
    isMetricOpen() {
      return this.$store.getters['metrics/isMetricOpen'](this.index)
    },
    isMetricClose() {
      return !this.$store.getters['metrics/isMetricOpen'](this.index)
    },
    chartData2() {
      return this.$store.getters['metrics/getChartData2'](this.index)
    },
    showLeftPadding() {
      return (
        this.isMetricClose &&
        this.index % 2 ===
          moduloComparisonValueforLeftPadding(
            this.$store.state.metrics.openMetric,
            this.index
          )
      )
    },
    showRightPadding() {
      return (
        this.isMetricClose &&
        this.index % 2 ===
          moduloComparisonValueforRightPadding(
            this.$store.state.metrics.openMetric,
            this.index
          )
      )
    }
  },
  methods: {
    ...mapMutations({
      openMetric: 'metrics/openMetric',
      closeMetric: 'metrics/closeMetric'
    })
  }
}
</script>

<style scoped>
.toggle-icon {
  width: 35px;
  height: 35px;
}

.chart-box {
  @apply .overflow-x-scroll;
}

.chart {
  min-width: 800px;
}
</style>
