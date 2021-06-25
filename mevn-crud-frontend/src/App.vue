<template>
  <Menu />
  <router-view v-slot="{ Component }">
    <transition name="page">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    Menu,
  },
  methods: {
    async fetchNotes() {
      this.$store.dispatch("toggleLoading");
      try {
        await this.$store.dispatch("notes/fetchNotes");
      } catch (error) {
        this.$store.dispatch("setError");
        console.log(error.message);
        console.log(error.response.data.message);
      }
      this.$store.dispatch("toggleLoading");
    },
    tryLogin() {
      this.$store.dispatch("user/tryLogin");
    },
  },
  created() {
    //Reset error in vuex?

    //Interceptor to catch expired jwt tokens
    /*
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
    */

    this.tryLogin();
    this.fetchNotes();
  },
};
</script>

<style scoped>
.page-enter-from,
.page-leave-to {
  @apply opacity-0;
}

.page-enter-active {
  @apply transition;
  @apply duration-500;
  @apply ease-out;
}

.page-enter-to,
.page-leave-from {
  @apply opacity-100;
}
</style>
