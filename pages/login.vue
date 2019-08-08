<template>
  <div class="p-4 flex justify-center bg-gray-300">
    <form
      class="login__container mx-2 my-4 xl:mx-0 p-5 border-3 border-black bg-white"
    >
      <div class="mb-5">
        <img src="~/assets/images/login.png" alt="Login" class="login__image" />
      </div>

      <div class="flex flex-col">
        <label for="email" class="font-bold text-primary-500">Email *</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          class="py-1 border-b border-black text-2xl placeholder-gray-500 focus:border-primary-500"
          required
          autocomplete="email"
          autofocus
        />
      </div>

      <div class="mt-4 flex flex-col">
        <label for="password" class="font-bold text-primary-500"
          >Password *</label
        >
        <input
          type="password"
          name="password"
          placeholder="Password"
          class="py-1 border-b border-black text-2xl placeholder-gray-500 focus:border-primary-500"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="mt-5 flex justify-between">
        <div class="text-error-500">
          <!-- <img src="~/assets/images/error.svg" class="inline mr-2" /> Login
          failed. -->
        </div>
        <button
          type="submit"
          class="px-4 py-2 border-3 border-black hover:bg-black hover:text-white"
        >
          LOGIN
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.login__container {
  width: 100%;

  @screen md {
    width: 700px;
  }
}

.login__image {
  width: auto;
  height: 70px;
}
</style>
