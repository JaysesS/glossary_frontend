<template>
  <div class="about">
    <h1>Hello, {{ userLogin }}! Your id is {{ userId }}</h1>
    <h2>{{ userCreatedAt }}</h2>
    <h2>This is an about page!</h2>
  </div>
</template>

<script>
export default {
  name: "GlossaryView",
  computed: {
    userId() {
      return this.$store.getters["AuthModule/getUserId"];
    },
    userLogin() {
      return this.$store.getters["AuthModule/getUserLogin"];
    },
    userCreatedAt() {
      return this.$store.getters["AuthModule/getUserCreatedAt"];
    },
  },
  async created() {
    await this.$store.dispatch("AuthModule/checkUpdateUser");
  },
};
</script>
