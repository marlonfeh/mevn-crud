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
    <base-banner>
      <h2>404 - Page not found</h2>
    </base-banner>
  </section>
</template>

<script>
import BaseBanner from "@/components/ui/BaseBanner.vue";

export default {
  components: {
    BaseBanner,
  },
};
</script>

<style>
</style>