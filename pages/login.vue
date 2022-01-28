<template>
  <div class="p-5 flex justify-center bg-gray-300">
    <button
      @click="login"
      class="mx-auto px-4 py-4 border-2 border-black hover:bg-black hover:text-white"
    >
      Log in with <strong>NOI Authentication</strong>
    </button>
  </div>
</template>

<script>
export default {
  auth: false,
  methods: {
    login() {
      this.$auth.loginWith('noi')
    }
  }
}
</script>
