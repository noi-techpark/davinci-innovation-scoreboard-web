<template>
  <Modal>
    <button slot="button" slot-scope="{ openModal }" @click="openModal">
      Open
    </button>

    <div v-cloak slot="modal" slot-scope="{ closeModal }" class="p-5 bg-white">
      <button @click="closeModal">Cancel</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/modal.vue'

export default {
  components: {
    Modal
  }
}
</script>
