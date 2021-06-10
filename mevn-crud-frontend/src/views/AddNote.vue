<template>
  <form
    id="AddNoteForm"
    @submit.prevent="submitForm"
    class="
      container
      mx-auto
      py-16
      grid grid-cols-1
      justify-items-center
      gap-y-8
    "
  >
    <div class="w-6/12 p-4 space-y-4 rounded-lg bg-white shadow-lg">
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
        v-model.trim="title.val"
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
        "
        v-model.trim="content.val"
      ></textarea>

      <div class="flex justify-center">
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
        >
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script>
// @ is an alias to /src
//import Menu from "@/components/Menu.vue";

export default {
  name: "AddNote",
  data() {
    return {
      title: {
        val: "",
        isValid: true,
      },
      content: {
        val: "",
        isValid: true,
      },
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    async submitForm() {
      const formData = {
        title: this.title.val,
        content: this.content.val,
        creator: this.username,
      };

      console.log(formData);

      this.$router.replace("/home");

      this.$store.dispatch("toggleLoading");

      await this.$store.dispatch("notes/addNote", formData);
      //await this.$store.dispatch("notes/fetchNotes");

      this.$store.dispatch("toggleLoading");
    },
  },
};
</script>
