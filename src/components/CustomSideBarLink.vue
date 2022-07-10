<template>
  <div class="router-link" :class="{ active: isActive }">
    <router-link :to="to" class="link">
      <span class="emoji">{{ emoji }}</span>
      <span class="text">
        {{ !collapsed ? text : "" }}
      </span>
    </router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "CustomSideBarLink",
  props: {
    to: String,
    emoji: String,
    text: String,
    collapsed: Boolean,
  },
  computed: {
    isActive() {
      const route = useRoute();
      return route.path == this.to;
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba(74, 245, 154, 0.5);
  border-radius: 10px;
  &:hover {
    background-color: rgba(74, 245, 154, 0.5) !important;
  }
}

.router-link {
  margin-right: 10px;
  &:hover {
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 10px;
  }
}

.link {
  display: flex;
  font-size: medium;
  align-items: center;
  user-select: none;
  height: 1.5rem;
  margin: 0.3em 0;
  padding: 0.4rem;
  cursor: pointer;
  color: white;
  text-decoration: none;

  .text {
    margin-left: 10px;
  }
}
</style>
