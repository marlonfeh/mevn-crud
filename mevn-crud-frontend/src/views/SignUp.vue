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
        placeholder="Email"
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
      />

      <input
        type="text"
        placeholder="Password"
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
      />

      <div class="flex justify-center space-x-6">
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
          Login
        </button>
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
          Register
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
    };
  },
  methods: {
    async submitForm() {
      //Data

      this.$router.replace("/home");

      this.$store.dispatch("toggleLoading");

      await this.$store.dispatch("notes/addNote");
      //await this.$store.dispatch("notes/fetchNotes");

      this.$store.dispatch("toggleLoading");
    },
  },
};
</script>