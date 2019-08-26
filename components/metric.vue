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
        class="mb-1 leading-none font-light text-5xl sm:text-6xl md:text-8xl"
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
    <div v-if="isMetricOpen" class="mt-3 mb-5">
      <div class="text-base sm:text-lg md:text-xl">
        {{ metric.description }}
      </div>
      <div class="mt-3 text-base sm:text-lg md:text-xl">
        Source: {{ metric.source }}
      </div>

      <YearComparison
        :index="index"
        :metric="metric"
        class="mt-5 pb-5 border-b border-gray-400"
      />

      <GroupComparison
        :index="index"
        :metric="metric"
        :selected-year="selectedYear"
        :select-year="selectYear"
        class="mt-5"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CountUp from '@/components/count-up.vue'
import OpenIcon from '@/components/icons/open.vue'
import CloseIcon from '@/components/icons/close.vue'
import YearComparison from '@/components/comparisons/year.vue'
import GroupComparison from '@/components/comparisons/group.vue'

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
    YearComparison,
    GroupComparison
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
    const years = this.$store.getters['metrics/getYears'](this.index)

    return {
      selectedYear: years[years.length - 1]
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
    }),
    selectYear(year) {
      this.selectedYear = year
    }
  }
}
</script>

<style scoped>
.toggle-icon {
  width: 35px;
  height: 35px;
}
</style>
