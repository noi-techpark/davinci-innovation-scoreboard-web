<template>
  <div>
    <slot name="button" :open-modal="openModal"></slot>

    <portal v-if="paint" to="modals">
      <transition name="modal" @after-leave="afterLeave">
        <div v-show="open" class="modal__mask" @click="closeModal">
          <div class="modal__container" @click.stop>
            <slot name="modal" :close-modal="closeModal"></slot>
          </div>
        </div>
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paint: false,
      open: false
    }
  },
  methods: {
    openModal() {
      this.paint = true
      this.open = true
    },
    closeModal() {
      this.open = false
    },
    afterLeave() {
      this.paint = false
    }
  }
}
</script>

<style>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal__container {
  transition: all 0.3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__container,
.modal-leave-active .modal__container {
  transform: scale(1.1);
}
</style>
