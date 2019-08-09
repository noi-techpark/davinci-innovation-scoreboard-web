<template>
  <div>
    <div class="mb-4 text-right">
      <button
        class="px-4 py-2 border-3 border-white hover:bg-black text-black hover:text-white font-bold text-xl uppercase"
        @click="logout"
      >
        Logout
        <LogoutIcon class="ml-1 inline w-i h-i align-text-top fill-current" />
      </button>
    </div>

    <div
      class="drag__container p-5 flex flex-col justify-center bg-gray-300 text-gray-400 text-center relative"
      :class="{ 'bg-gray-500 text-gray-300': draggingOver }"
    >
      <div
        v-if="isFileSelected"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div>Do you want to upload the file {{ fileName }}?</div>

        <div class="mt-4 flex justify-center">
          <button
            class="z-50 mr-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            @click="upload"
          >
            Upload
          </button>
          <button
            class="z-50 ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-else class="flex flex-col content-center">
        <div>
          <AddIcon class="drag__image inline fill-current" />
        </div>
        <div class="mt-2 text-2xl">
          Drag &amp; Drop or Choose a File on Your Computer
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        name="file"
        accept="text/csv"
        class="hidden"
        @change="onFileChange"
      />

      <canvas
        class="absolute z-40 top-0 left-0 w-full h-full"
        tabindex="0"
        @drag.stop.prevent=""
        @dragover.stop.prevent=""
        @dragstart.stop.prevent=""
        @dragend.stop.prevent=""
        @dragenter.stop.prevent="onDragEnter"
        @dragleave.stop.prevent="onDragLeave"
        @drop.stop.prevent="onFileDrop"
        @click.prevent="onClick"
        @keyup.enter="onClick"
      >
      </canvas>
    </div>

    <div class="mt-4 mx-3 xl:mx-0">
      <table class="w-full">
        <thead>
          <tr class="table__header">
            <th class="column__header">Source</th>
            <th class="column__header">Date</th>
            <th class="column__header">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, id) in history" :key="id" class="row">
            <td class="cell">{{ item.source }}</td>
            <td class="cell">{{ item.date | formatDate }}</td>
            <td class="cell">{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LogoutIcon from '@/components/icons/logout.vue'
import AddIcon from '@/components/icons/add.vue'

export default {
  components: {
    LogoutIcon,
    AddIcon
  },
  data() {
    return {
      draggingOver: false,
      file: null,
      history: []
    }
  },
  computed: {
    fileName() {
      return this.file.name
    },
    isFileSelected() {
      return this.file !== null
    },
    isFileUploading() {
      return false
    }
  },
  async mounted() {
    await this.$axios.get('stats/upload/history').then((response) => {
      this.history = response.data.uploadedStats
    })
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    onClick() {
      this.$refs.fileInput.click()
    },
    onDragEnter() {
      this.draggingOver = true
    },
    onDragLeave() {
      this.draggingOver = false
    },
    onFileDrop(e) {
      this.onDragLeave()
      this.onFileChange(e)
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      const file = files[0]

      if (file.type !== 'text/csv') {
        return
      }

      this.file = file
    },
    onFileRemove() {
      this.file = null
    },
    upload() {},
    cancel() {
      this.file = null
    }
  }
}
</script>

<style scoped>
.drag__container {
  height: 300px;
}

.drag__image {
  width: 150px;
  height: 150px;
}

.table__header {
  @apply .border-b .border-gray-500;
}

.column__header {
  @apply .py-3 .px-2 .text-left .text-xl;
}

.row:hover {
  @apply .bg-gray-100;
}

.cell {
  @apply .py-3 .px-2 .text-left .text-lg;
}
</style>
