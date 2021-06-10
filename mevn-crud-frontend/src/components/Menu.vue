<template>
  <section
    id="nav"
    class="fixed w-full border-solid bg-blue-400 shadow-lg text-white hover:font-semibold"
  >
    <div class="container mx-auto flex">
      <div class="flex justify-start space-x-4 py-2 px-4">
        <router-link
          to="/home"
          class="px-3 py-1 rounded-full text-white bg-blue-400 hover:bg-white hover:text-blue-500"
          :class="{ 'font-bold': $route.path == '/home' }"
          >Home</router-link
        >
        <router-link
          to="/add-note"
          class="px-3 py-1 rounded-full text-white bg-blue-400 hover:bg-white hover:text-blue-500"
          :class="{ 'font-bold': $route.path == '/add-note' }"
          >Add Note</router-link
        >
      </div>
      <!--
      <div class="flex justify-start space-x-4 py-2 px-4">
        <router-link to="/">Login</router-link>
      </div>
      -->
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>