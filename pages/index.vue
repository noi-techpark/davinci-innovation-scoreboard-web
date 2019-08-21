<template>
  <div class="flex flex-wrap">
    <div
      class="title-box mx-4 w-full flex flex-col justify-end p-4 border-3 border-black"
    >
      <div
        class="leading-tight font-thin text-5xl md:text-6xl lg:text-7xl uppercase"
      >
        All Statistical Innovation Data for South Tyrol
      </div>
    </div>
    <Metric
      v-for="(metric, index) in metrics"
      :key="index"
      :index="index"
      :metric="metric"
    />
  </div>
</template>

<script>
import Metric from '@/components/metric.vue'

export default {
  auth: false,
  components: {
    Metric
  },
  computed: {
    metrics() {
      return this.$store.state.metrics.list
    }
  }
}
</script>

<style scoped>
.title-box {
  min-height: 400px;
}
</style>
