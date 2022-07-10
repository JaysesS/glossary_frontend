<template>
  <div class="sidebar" :style="{ width: getWidth }">
    <CustomSideBarLink
      to="/"
      emoji="🏡"
      text="Домой"
      :collapsed="isCollapsed"
    />
    <CustomSideBarLink
      to="/glossary"
      emoji="📖"
      text="Словарь"
      :collapsed="isCollapsed"
      v-if="userReady"
    />
    <CustomSideBarLink
      to="/login"
      emoji="🟢"
      text="Войти"
      :collapsed="isCollapsed"
      v-if="!userReady"
    />
    <CustomSideBarLink
      to="/register"
      emoji="🟡"
      text="Регистрация"
      :collapsed="isCollapsed"
      v-if="!userReady"
    />
    <CustomSideBarLink
      to="/logout"
      emoji="🔴"
      text="Выйти"
      :collapsed="isCollapsed"
      v-if="userReady"
    />

    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/logout">Logout</router-link>
    </nav> -->

    <span @click="toggle" class="collapse-icon">
      {{ getSymbol }}
    </span>
  </div>
</template>

<script>
import CustomSideBarLink from "@/components/CustomSideBarLink.vue";

export default {
  name: "SideBar",
  components: {
    CustomSideBarLink,
  },
  computed: {
    getWidth() {
      return this.$store.getters.getSideBarWidth;
    },
    isCollapsed() {
      return this.$store.getters.sideBarIsCollapsed;
    },
    getSymbol() {
      return this.isCollapsed ? "👉" : "👈";
    },
    userReady() {
      return this.$store.getters["AuthModule/getUserId"] !== null;
    },
  },
  methods: {
    toggle() {
      this.$store.dispatch("toogleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: $side-bar-color;
  display: flex;
  flex-direction: column;
  position: fixed;
  float: left;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
  transition: 0.5s ease;
}

.collapse-icon {
  user-select: none;
  position: absolute;
  bottom: 0;
  padding: 0.75rem;
  transition: 0.2s linear;
}
</style>