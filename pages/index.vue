<template>
  <div class="flex flex-wrap">
    <div
      v-for="(metric, index) in metrics"
      :key="index"
      class="mt-6 px-4 w-1/2"
    >
      <div class="border-b-2 border-black font-bold text-2xl uppercase">
        {{ metric.title }}
      </div>
      <div class="flex justify-between py-2 border-b border-gray-500 ">
        <div
          class="mb-1 leading-none font-light text-7xl "
          :class="['text-metric' + index + '-500']"
        >
          <CountUp :number="metric.value" /> %
        </div>

        <div class="mt-1 flex flex-col justify-center">
          <button @click.prevent="openMetric(index)">
            <OpenIcon class="toggle-icon" />
            <span class="sr-only">Open metric</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountUp from '@/components/count-up.vue'
import OpenIcon from '@/components/icons/open.vue'
// import CloseIcon from '@/components/icons/close.vue'

export default {
  auth: false,
  components: {
    CountUp,
    OpenIcon
    // CloseIcon
  },
  data() {
    return {
      metrics: [
        {
          title: 'enterprises with innovation activities',
          value: 9323,
          instance: null,
          show: false
        },
        {
          title:
            'enterprises that have introduced product o process innovations',
          value: 8884,
          instance: null,
          show: false
        },
        {
          title: 'innovation expenditure',
          value: 1234,
          instance: null,
          show: false
        },
        {
          title: 'innovation expenditure per number of persons',
          value: 234,
          instance: null,
          show: false
        },
        {
          title: 'research and development personnel in-house',
          value: 4345,
          instance: null,
          show: false
        },
        {
          title: 'domestic research and development expenditure in-house',
          value: 72344553,
          instance: null,
          show: false
        }
      ]
    }
  },
  methods: {
    openMetric(index) {
      this.closeMetrics()
      this.metrics[index].show = true
    },
    closeMetrics() {
      this.metrics.forEach((metric, index) => {
        metric.show = false
      })
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
