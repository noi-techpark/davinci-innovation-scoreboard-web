<template>
  <div>
    <div class="mb-4 text-right">
      <button
        class="px-4 py-2 border-3 border-white hover:bg-black text-black hover:text-white font-bold text-xl uppercase"
      >
        Logout
        <LogoutIcon class="ml-1 inline w-i h-i align-text-top fill-current" />
      </button>
    </div>

    <div class="p-5 flex flex-col justify-center bg-gray-300">
      <img
        src="~/assets/images/drag.svg"
        alt="Drag &amp; Drop or Choose a File on Your Computer"
      />
      <div class="mt-2 text-center text-2xl text-gray-400">
        Drag &amp; Drop or Choose a File on Your Computer
      </div>
    </div>

    <table class="mt-4 w-full">
      <thead>
        <tr class="table__header">
          <th class="column__header">Source</th>
          <th class="column__header">Date</th>
          <th class="column__header">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row">
          <td class="cell">Jill</td>
          <td class="cell">Smith</td>
          <td class="cell">50</td>
        </tr>
        <tr class="row">
          <td class="cell">Eve</td>
          <td class="cell">Jackson</td>
          <td class="cell">94</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LogoutIcon from '@/components/icons/logout.vue'

export default {
  components: {
    LogoutIcon
  }
}
</script>

<style scoped>
.table__header {
  @apply .border-b .border-gray-500;
}

.column__header {
  @apply .py-3 .px-2 .text-left .text-xl;
}

.row:hover {
  @apply .bg-gray-300;
}

.cell {
  @apply .py-3 .px-2 .text-left .text-lg;
}
</style>
