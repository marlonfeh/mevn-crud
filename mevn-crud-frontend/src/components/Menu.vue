<template>
  <section
    id="nav"
    class="
      fixed
      w-full
      border-solid
      bg-blue-400
      shadow-lg
      text-white
      hover:font-semibold
    "
  >
    <div class="container mx-auto flex justify-between">
      <div class="flex justify-start space-x-4 py-2 px-4">
        <router-link
          to="/home"
          class="
            px-3
            py-1
            rounded-full
            text-white
            bg-blue-400
            hover:bg-white
            hover:text-blue-500
          "
          :class="{ 'font-bold': $route.path == '/home' }"
          >Home</router-link
        >
        <router-link
          to="/add-note"
          class="
            px-3
            py-1
            rounded-full
            text-white
            bg-blue-400
            hover:bg-white
            hover:text-blue-500
          "
          :class="{ 'font-bold': $route.path == '/add-note' }"
          >Add Note</router-link
        >
      </div>

      <div class="flex justify-start space-x-4 py-2 px-4">
        <router-link
          v-if="!isLoggedIn"
          to="/sign-up"
          class="
            px-3
            py-1
            rounded-full
            text-white
            bg-blue-400
            hover:bg-white
            hover:text-blue-500
          "
          >Sign Up</router-link
        >
        <button
          v-else
          @click="logoutUser"
          class="
            px-3
            py-1
            rounded-full
            text-white
            bg-blue-400
            hover:bg-white
            hover:text-blue-500
          "
        >
          Logout
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  methods: {
    logoutUser() {
      console.log("click");
      this.$store.dispatch("user/logoutUser");
      //this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>