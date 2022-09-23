<template>
  <NavBar></NavBar>
  <div>
    <router-view />
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>


<style lang="scss">
@font-face {
  font-family: "BalsamiqSans";
  src: local("BalsamiqSans"),
    url(./assets/BalsamiqSans-Bold.ttf) format("truetype");
}

// body, html {
//     background-color: rgba(250, 252, 253, 0.999);
//     height: 100%;
//     width: 100%;
// }

// #app {
//   font-family: BalsamiqSans;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   height: 100%;
//     width: 100%;
// }

// nav {
//   padding: 30px;
// }

// nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// nav a.router-link-exact-active {
//   color: #42b983;
// }
</style>
