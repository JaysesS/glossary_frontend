<template>
  <router-link :to="to" class="link">
    <div
      :class="linkStyle"
      aria-current="page"
      @mouseover="isHover = true"
      @mouseleave="isHover = null"
    >
      {{ text }}
    </div>
  </router-link>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "NavBarLink",
  data() {
    return {
      isHover: false,
    };
  },
  props: {
    to: String,
    text: String,
    isMobile: Boolean,
  },
  computed: {
    isActive() {
      const route = useRoute();
      return route.path == this.to;
    },
    linkStyle() {
      const base_style = {
        "bg-gray-900": this.isActive || this.isHover, // active
        "bg-gray-700": !this.isActive && !this.isHover, // hover
        "text-white": this.isActive || this.isHover, // active
        "text-gray-300": !this.isActive && !this.isHover, // hover
        "px-3": true,
        "py-2": true,
        "rounded-md": true,
        "font-medium": true,
      };
      if (this.isMobile) {
        return { ...base_style, block: true, "text-base": true };
      }
      return { ...base_style, "text-sm": true };
    },
  },
};
</script>
