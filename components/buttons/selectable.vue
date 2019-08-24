<template>
  <button
    class="px-4 py-2 border-3 uppercase"
    :class="style"
    @click="click(value)"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    metric: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    selectedValue: {
      type: String,
      required: true
    },
    click: {
      type: Function,
      required: true
    }
  },
  computed: {
    isSelected() {
      return this.value === this.selectedValue
    },
    style() {
      const styleNotSeleted =
        'border-black hover:bg-black text-black hover:text-white'
      const styleSelected =
        'border-metric' +
        this.metric +
        '-500 hover:bg-metric' +
        this.metric +
        '-500 text-metric' +
        this.metric +
        '-500 hover:text-white'

      return {
        [styleNotSeleted]: !this.isSelected,
        [styleSelected]: this.isSelected
      }
    }
  }
}
</script>
