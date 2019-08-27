<template>
  <Modal>
    <button
      slot="button"
      slot-scope="{ openModal }"
      class="text-black hover:text-gray-500"
      @click="openModal"
    >
      <ConfigIcon class="icon fill-current" />
      <span class="sr-only">Configure Territories</span>
    </button>

    <div v-cloak slot="modal" slot-scope="{ closeModal }" class="m-4 bg-white">
      <div class="p-4 flex justify-between items-center">
        <div class="font-bold text-xl md:text-2xl uppercase">
          Filter Territories
        </div>

        <button class="text-black hover:text-gray-500" @click="closeModal">
          <ExitIcon class="icon fill-current" />
          <span class="sr-only">Close Territories Configuration</span>
        </button>
      </div>

      <div
        class="content p-4 pb-3 flex flex-wrap border-t border-b border-gray-400 text-black text-lg uppercase"
      >
        <div
          v-for="(territory, id) in territories"
          :key="id"
          class="pb-3 w-full md:w-1/2"
        >
          <input
            :id="'territory' + id"
            v-model="selectedTerritories[id]"
            type="checkbox"
            :disabled="id === 'ITD1'"
            class="cursor-pointer"
          />
          <label :for="'territory' + id" class="ml-2 cursor-pointer">{{
            territory
          }}</label>
        </div>
      </div>

      <div class="p-4 flex justify-end">
        <button
          class="mr-2 px-4 py-2 text-lg md:text-xl font-bold text-black hover:text-white hover:bg-black"
          @click="closeModal"
        >
          CANCEL
        </button>
        <button
          class="px-4 py-2 text-lg md:text-xl font-bold text-black hover:text-white hover:bg-black"
          @click="
            () => {
              ok()
              closeModal()
            }
          "
        >
          OK
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/components/modal.vue'
import ConfigIcon from '@/components/icons/config.vue'
import ExitIcon from '@/components/icons/exit.vue'

export default {
  components: {
    Modal,
    ConfigIcon,
    ExitIcon
  },
  data() {
    const selectedTerritories = {}

    Object.keys(this.$store.state.metrics.territories).forEach((territory) => {
      const state = this.$store.state.metrics.selectedTerritories.includes(
        territory
      )
      selectedTerritories[territory] = state
    })

    return {
      selectedTerritories
    }
  },
  computed: {
    territories() {
      return this.$store.state.metrics.territories
    }
  },
  methods: {
    ok() {
      const selectTerritories = Object.entries(this.selectedTerritories)
        .filter((entry) => {
          return entry[1] === true
        })
        .map((entry) => {
          return entry[0]
        })

      this.selectTerritories(selectTerritories)
    },
    ...mapActions({
      selectTerritories: 'metrics/selectTerritories'
    })
  }
}
</script>

<style scoped>
.content {
  height: 300px;
  overflow-y: scroll;
}

@screen lg {
  .content {
    height: auto;
  }
}
</style>
