<template>
  <!--Modal-->
  <transition name="modal">
    <div v-if="show">
      <div class="fixed inset-0 z-50 flex justify-center items-center">
        <div class="bg-white rounded-lg w-1/2 max-w-2xl">
          <div class="flex flex-col items-start p-4">
            <div class="flex items-center w-full">
              <h3 class="text-gray-900 font-medium text-lg">
                <slot name="title"></slot>
              </h3>
              <svg
                class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                @click="emitCancel"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
            </div>
            <hr />
            <div class="my-4">
              <slot name="body"></slot>
            </div>
            <hr />
            <slot name="footer">
              <div class="ml-auto space-x-2">
                <button
                  class="bg-transparent hover:bg-blue-500 font-semibold hover:text-white px-3 py-1 rounded-full border border-blue-400 hover:border-transparent"
                  @click="emitCancel"
                >
                  Close
                </button>
                <button
                  class="bg-blue-400 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-full"
                  @click="emitConfirm"
                >
                  Agree
                </button>
              </div>
            </slot>
          </div>
        </div>
      </div>

      <!--Background-->
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["show"],
  emits: ["cancel", "confirm"],
  methods: {
    emitCancel() {
      console.log("cancel");
      this.$emit("cancel");
    },
    emitConfirm() {
      console.log("confirm");
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-active {
  @apply transition;
  @apply duration-200;
  @apply ease-out;
}

.modal-leave-active {
  @apply transition;
  @apply duration-200;
  @apply ease-in;
}

.modal-enter-to,
.modal-leave-from {
  @apply opacity-100;
}
</style>