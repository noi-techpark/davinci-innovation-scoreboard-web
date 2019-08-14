<template>
  <div>
    Dashboard

    <div><span ref="number1">0</span> %</div>
  </div>
</template>

<script>
import { CountUp } from 'countup.js'

export default {
  auth: false,
  data() {
    return {
      instances: {
        number1: null
      }
    }
  },
  mounted() {
    const options = {
      duration: 3,
      useEasing: true,
      easingFn: (t, b, c, d) => {
        const ts = (t /= d) * t
        const tc = ts * t
        return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t)
      }
    }

    this.instances.number1 = new CountUp(this.$refs.number1, 5234, options)
    this.instances.number1.start()
  }
}
</script>
