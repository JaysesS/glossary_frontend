<template>
  <div>
    <div class="sidebar" :style="{ width: getWidth }">
      <div>
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
      </div>

      <div class="collapse-holder">
        <span @click="toggle" class="collapse-icon">
          {{ getSymbol }}
        </span>
      </div>
    </div>
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
  transition: 0.2s ease-in-out;
  max-height: 100%;
}

.collapse-holder {
    margin-top: auto;
    margin-right: auto;
}

.collapse-icon {
  user-select: none;
  bottom: 0;
  padding: 0.75rem;
  transition: 0.2s ease-in-out;
}
</style>