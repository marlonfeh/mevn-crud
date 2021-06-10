<template>
  <div class="w-6/12 p-4 space-y-6 rounded-lg bg-white shadow-lg">
    <h2 class="font-bold">{{ title }}</h2>
    <p>{{ content }}</p>
    <div class="flex justify-between">
      <div class="flex space-x-8">
        <p class="my-auto text-gray-400">
          {{ wasUpdated }}: {{ createdDate }} {{ createdTime }}
        </p>
        <p class="my-auto text-gray-400">Creator: {{ creator }}</p>
      </div>

      <router-link
        :to="editNoteLink"
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
        Edit
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["_id", "title", "content", "createdAt", "updatedAt", "creator"],
  data() {
    return {};
  },
  computed: {
    editNoteLink() {
      return "/edit-note/" + this._id;
    },
    wasUpdated() {
      if (this.createdAt !== this.updatedAt) {
        return "Updated";
      } else {
        return "Created";
      }
    },
    createdDate() {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
      return new Date(this.createdAt).toLocaleDateString("en-GB");
    },
    createdTime() {
      return new Date(this.createdAt).toLocaleTimeString("en-GB", {
        timeStyle: "short",
      });
      //toLocaleTimeString
    },
  },
};
</script>