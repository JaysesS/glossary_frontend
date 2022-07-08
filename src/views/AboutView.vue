<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button type="submit" @click="logoutAction">Выйти</button>
  </div>
</template>

<script>
export default {
    name: "AboutView",
    methods: {
        async logoutAction() {
            this.$store.dispatch("AuthModule/onLogout")
            window.location.reload();
        },
    },
};
</script>
