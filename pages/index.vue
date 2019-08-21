<template>
  <div class="flex flex-wrap">
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
