<script>
export default {
  name: "LogoutView",
  async created() {
    await this.$store.dispatch("AuthModule/onLogout");
  },
};
</script>