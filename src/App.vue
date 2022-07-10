<template>
  <CustomSideBar />
  <div :style="{ 'margin-left': getSideBarWidth }">
    <router-view />
  </div>
</template>

<script>
import CustomSideBar from "@/components/CustomSideBar.vue";
export default {
  components: {
    CustomSideBar,
  },
  computed: {
    getSideBarWidth() {
      return this.$store.getters.getSideBarWidth;
    },
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "BalsamiqSans";
  src: local("BalsamiqSans"),
    url(./assets/BalsamiqSans-Bold.ttf) format("truetype");
}

#app {
  font-family: BalsamiqSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
