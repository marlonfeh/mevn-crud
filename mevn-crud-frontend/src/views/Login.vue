<template>
  <section
    class="
      container
      mx-auto
      py-16
      grid grid-cols-1
      justify-items-center
      gap-y-8
    "
  >
    <base-banner v-if="error"
      >Ups. Something went wrong! Please try again</base-banner
    >
    <form
      id="AddNoteForm"
      @submit.prevent="submitForm"
      class="container mx-auto grid grid-cols-1 justify-items-center"
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
          v-model.trim="email.val"
        />

        <input
          type="password"
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
          v-model.trim="password.val"
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
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import BaseBanner from "@/components/ui/BaseBanner.vue";

export default {
  name: "Login",
  components: {
    BaseBanner,
  },
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
      error: null,
    };
  },
  methods: {
    async submitForm() {
      const formData = {
        email: this.email.val,
        password: this.password.val,
      };

      //Include Spinner and change order of rerouting

      this.$router.replace("/home");

      this.$store.dispatch("toggleLoading");

      try {
        await this.$store.dispatch("user/loginUser", formData);
      } catch (error) {
        this.error =
          error.message || "Ups. Something went wrong! Please try again";
        console.log(this.error);
      }

      this.$store.dispatch("toggleLoading");
    },
  },
};
</script>