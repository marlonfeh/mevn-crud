<template>
  <section id="editSection">
    <div
      class="
        container
        mx-auto
        py-16
        grid grid-cols-1
        justify-items-center
        gap-y-8
      "
    >
      <!--Loading Spinner Section-->
      <div v-if="isLoading">
        <loading-spinner></loading-spinner>
      </div>
      <!--Error Banner-->
      <base-banner v-if="error && !isLoading"
        >Ups. Something went wrong! Please try again
      </base-banner>
      <div v-if="error && !isLoading">
        <div class="flex justify-center space-x-4">
          <button
            class="
              my-auto
              px-3
              py-1
              rounded-full
              text-white
              bg-blue-400
              hover:bg-blue-500
            "
            @click="ErrorHandling"
          >
            Retry
          </button>
        </div>
      </div>

      <!--Note-->
      <div
        class="w-6/12 p-4 space-y-4 rounded-lg bg-white shadow-lg"
        v-if="!isLoading && !error"
      >
        <input
          type="text"
          placeholder="Title"
          class="
            px-3
            py-3
            placeholder-blueGray-300
            text-blueGray-600
            relative
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none
            focus:ring
            w-full
          "
          v-model="selectedTitle"
        />
        <textarea
          placeholder="Your Note ..."
          class="
            resize-y
            px-3
            py-3
            placeholder-blueGray-300
            text-blueGray-600
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none
            focus:ring
            w-full
            h-36
          "
          v-model="selectedContent"
        ></textarea>
        <div class="flex justify-center space-x-4">
          <button
            class="
              my-auto
              px-3
              py-1
              rounded-full
              text-white
              bg-green-400
              hover:bg-green-500
            "
            @click="updateNote"
          >
            Update
          </button>
          <button
            class="
              my-auto
              px-3
              py-1
              rounded-full
              text-white
              bg-red-400
              hover:bg-red-500
            "
            @click="showModal = !showModal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Note Modal -->
    <Modal :show="showModal" @cancel="showModal = false" @confirm="deleteNote">
      <template v-slot:title>
        <p>Delete Note</p>
      </template>

      <template v-slot:body>
        <p>Do you want to delete the note?</p>
      </template>
    </Modal>
  </section>
</template>

<script>
import Modal from "@/components/ui/BaseModal.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";
import LoadingSpinner from "@/components/ui/BaseSpinner.vue";
import axios from "axios";

export default {
  components: {
    Modal,
    BaseBanner,
    LoadingSpinner,
  },
  props: ["_id"],
  data() {
    return {
      selectedNote: null,
      selectedTitle: null,
      selectedContent: null,
      isLoading: false,
      showModal: false,
      error: null,
    };
  },
  methods: {
    async updateNote() {
      const formData = {
        _id: this._id,
        title: this.selectedTitle,
        content: this.selectedContent,
      };

      this.$router.replace("/home");
      this.$store.dispatch("toggleLoading");
      await this.$store.dispatch("notes/updateNote", formData);
      this.$store.dispatch("toggleLoading");
    },
    async deleteNote() {
      this.showModal = false;

      this.$router.replace("/home");

      this.$store.dispatch("toggleLoading");
      await this.$store.dispatch("notes/deleteNote", this._id);
      this.$store.dispatch("toggleLoading");
    },
    async fetchNoteByID(id) {
      this.isLoading = true;
      console.log(this.isLoading);

      await axios
        .get(`http://localhost:8080/notes/${id}`)
        .then((res) => {
          console.log(res.data.note);
          this.selectedTitle = res.data.note.title;
          this.selectedContent = res.data.note.content;
          if (this.error) {
            this.error = null;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
      this.isLoading = false;
      console.log(this.isLoading);
    },
    ErrorHandling() {
      this.fetchNoteByID(this._id);
    },
  },

  created() {
    if (this.$store.getters["notes/notes"].length > 0) {
      this.selectedNote = this.$store.getters["notes/notes"].find(
        (note) => note._id === this._id
      );
      this.selectedTitle = this.selectedNote.title;
      this.selectedContent = this.selectedNote.content;
    } else {
      this.fetchNoteByID(this._id);
    }
  },
};
</script>
