<template>
  <div>
    <div class="mb-4 text-right">
      <button
        class="px-4 py-2 border-3 border-white hover:bg-black text-black hover:text-white font-bold text-xl uppercase"
        @click="logout"
      >
        Logout
        <LogoutIcon
          class="ml-1 inline w-i h-i align-text-bottom fill-current"
        />
      </button>
    </div>

    <div
      class="drag-container p-5 flex flex-col justify-center bg-gray-300 text-gray-400 text-center relative"
      :class="{ 'bg-gray-500 text-gray-300': draggingOver }"
    >
      <div
        v-if="isFileSelected"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div>
          <UploadIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3">Do you want to upload the file {{ fileName }}?</div>

        <div class="mt-4 flex justify-center">
          <button
            class="mr-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            :disabled="isFileUploading"
            @click="upload"
          >
            Upload
          </button>
          <button
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            :disabled="isFileUploading"
            @click="cancel"
          >
            Cancel
          </button>
        </div>
      </div>

      <div
        v-if="uploadingSucceeded"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div class="text-primary-500">
          <SuccessIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3 text-primary-500">
          Uploading file succeeded!
        </div>

        <div class="mt-4 text-center">
          <button
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            @click="cancel"
          >
            Done
          </button>
        </div>
      </div>

      <div
        v-if="uploadingFailed"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div class="text-error-500">
          <ErrorIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3 text-error-500">
          Uploading file failed!
        </div>

        <div class="mt-4 text-center">
          <button
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
            @click="cancel"
          >
            Done
          </button>
        </div>
      </div>

      <div v-if="isFileNotSelected" class="flex flex-col content-center">
        <div>
          <AddIcon class="drag-image inline fill-current" />
        </div>
        <div class="mt-2 text-2xl">
          Drag &amp; Drop or Choose a File on Your Computer
        </div>
        <input
          ref="fileInput"
          type="file"
          name="file"
          accept="text/csv"
          class="hidden"
          @change="onFileChange"
        />
      </div>

      <canvas
        v-if="isFileNotSelected"
        class="absolute z-50 top-0 left-0 w-full h-full"
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
            <td class="cell">{{ item.importDate | formatDate }}</td>
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
import UploadIcon from '@/components/icons/upload.vue'
import SuccessIcon from '@/components/icons/success.vue'
import ErrorIcon from '@/components/icons/error.vue'

const STATE_FILE_NOT_SELECTED = 'File not selected'
const STATE_FILE_SELECTED = 'File selected'
const STATE_UPLOADING_FILE = 'Uploading file'
const STATE_UPLOAD_SUCCEEDED = 'Upload succeeded'
const STATE_UPLOAD_FAILED = 'Upload failed'

export default {
  components: {
    LogoutIcon,
    AddIcon,
    UploadIcon,
    SuccessIcon,
    ErrorIcon
  },
  data() {
    return {
      state: STATE_FILE_NOT_SELECTED,
      draggingOver: false,
      file: null,
      history: []
    }
  },
  computed: {
    fileName() {
      if (this.file === null) return ''

      return this.file.name
    },
    isFileNotSelected() {
      return this.state === STATE_FILE_NOT_SELECTED
    },
    isFileSelected() {
      return this.state === STATE_FILE_SELECTED
    },
    isFileUploading() {
      return this.state === STATE_UPLOADING_FILE
    },
    uploadingSucceeded() {
      return this.state === STATE_UPLOAD_SUCCEEDED
    },
    uploadingFailed() {
      return this.state === STATE_UPLOAD_FAILED
    }
  },
  mounted() {
    this.updateHistory()
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      // this.$router.push('/login')
    },
    updateHistory() {
      this.$axios.get('stats/upload/history').then((response) => {
        this.history = response.data.uploadedStats
      })
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
      this.state = STATE_FILE_SELECTED
    },
    onFileRemove() {
      this.file = null
      this.state = STATE_FILE_NOT_SELECTED
    },
    async upload() {
      try {
        this.state = STATE_UPLOADING_FILE

        const formData = new FormData()
        formData.append('file', this.file)

        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }

        await this.$axios.post('stats/upload/csv', formData, config)

        this.updateHistory()

        this.state = STATE_UPLOAD_SUCCEEDED
      } catch (e) {
        this.state = STATE_UPLOAD_FAILED
      }

      this.file = null
    },
    cancel() {
      this.file = null
      this.state = STATE_FILE_NOT_SELECTED
    }
  }
}
</script>

<style scoped>
.drag-container {
  height: 300px;
}

.drag-image {
  width: 150px;
  height: 150px;
}

.drag-status-image {
  width: 100px;
  height: 100px;
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
