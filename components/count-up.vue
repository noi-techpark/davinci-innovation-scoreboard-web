<template>
  <span>0</span>
</template>

<script>
import { CountUp } from 'countup.js'

const options = {
  duration: 3,
  separator: '.',
  decimal: ',',
  useEasing: true,
  easingFn: (t, b, c, d) => {
    const ts = (t /= d) * t
    const tc = ts * t
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t)
  }
}

export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    const instance = new CountUp(this.$el, this.number, options)

    instance.start()
  }
}
</script>
