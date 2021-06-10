<template>
  <section
    id="noteSection"
    class="
      container
      mx-auto
      py-16
      grid grid-cols-1
      justify-items-center
      gap-y-8
    "
  >
    <!--Loading Spinner-->
    <div v-if="isLoading">
      <loading-spinner></loading-spinner>
    </div>

    <!-- Error Banners-->
    <base-banner v-if="isEmpty && !isLoading && !error">
      It seems that no notes were created
    </base-banner>

    <base-banner v-if="error && !isLoading"
      >Ups. Something went wrong! Please try again
    </base-banner>

    <!-- Notes -->
    <div
      v-if="!isEmpty && !isLoading && !error"
      class="grid grid-cols-1 justify-items-center gap-y-8"
    >
      <Note
        v-for="note in Notes"
        :key="note._id"
        :_id="note._id"
        :title="note.title"
        :content="note.content"
        :createdAt="note.createdAt"
        :updatedAt="note.updatedAt"
        :creator="note.creator"
      ></Note>
    </div>

    <!-- Buttons -->
    <div class="flex justify-center space-x-4">
      <button
        @click="fetchNotes"
        class="
          my-auto
          px-3
          py-1
          rounded-full
          text-white
          bg-blue-400
          hover:bg-blue-500
        "
      >
        Refresh
      </button>
      <button
        v-if="!isEmpty"
        @click="showModal = !showModal"
        class="
          my-auto
          px-3
          py-1
          rounded-full
          text-white
          bg-red-400
          hover:bg-red-500
        "
      >
        Delete All
      </button>
    </div>
    <!-- Modal if DeleteAll/Section-->
    <Modal :show="showModal" @cancel="showModal = false" @confirm="deleteAll">
      <template v-slot:title>
        <p>Delete All</p>
      </template>

      <template v-slot:body>
        <p>Do you want to delete all existing notes?</p>
      </template>
    </Modal>
  </section>
</template>

<script>
import Note from "@/components/Note.vue";
import Modal from "@/components/ui/BaseModal.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";
import LoadingSpinner from "@/components/ui/BaseSpinner.vue";

export default {
  components: {
    Note,
    Modal,
    BaseBanner,
    LoadingSpinner,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    Notes() {
      return this.$store.getters["notes/notes"];
    },
    isEmpty() {
      //return !this.isLoading && this.$store.getters["notes/isEmpty"];
      return this.$store.getters["notes/isEmpty"];
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    async deleteAll() {
      this.showModal = false;
      this.$store.dispatch("toggleLoading");
      await this.$store.dispatch("notes/deleteAll");
      this.$store.dispatch("toggleLoading");
    },
    async fetchNotes() {
      this.$store.dispatch("toggleLoading");
      try {
        await this.$store.dispatch("notes/fetchNotes");
        if (this.error) this.$store.dispatch("resolveError");
      } catch (error) {
        this.$store.dispatch("setError");
        //this.error = "Ups. Something went wrong! Please try again";
        console.log(error.message);
      }
      this.$store.dispatch("toggleLoading");
    },
  },
};
</script>