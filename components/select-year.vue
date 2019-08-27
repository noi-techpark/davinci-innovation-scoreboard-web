<template>
  <div class="relative text-black hover:text-gray-500">
    <select
      class="block appearance-none w-full py-3 px-4 leading-tight text-xl focus:outline-none cursor-pointer"
      style="padding-right: 2.5rem"
      :value="selectedYear"
      @change="change"
    >
      <option v-for="year in years" :key="year" :value="year">{{
        year
      }}</option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
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
</template>

<script>
export default {
  props: {
    years: {
      type: Array,
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
  methods: {
    change(e) {
      this.selectYear(e.target.value)
    }
  }
}
</script>
