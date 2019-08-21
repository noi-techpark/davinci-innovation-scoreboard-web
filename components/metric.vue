<template>
  <div
    class="mt-5 md:mt-6 px-4 flex flex-col justify-end"
    :class="{ 'w-full': isMetricOpen, 'w-full xl:w-1/2': isMetricClose }"
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
        <CountUp :number="metric.value" /> %
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CountUp from '@/components/count-up.vue'
import OpenIcon from '@/components/icons/open.vue'
import CloseIcon from '@/components/icons/close.vue'

export default {
  components: {
    CountUp,
    OpenIcon,
    CloseIcon
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
    }
  },
  methods: {
    ...mapActions({
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
</style>
