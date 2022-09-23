<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              p-2
              text-gray-400
              hover:bg-gray-700 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="mobileToggle = !mobileToggle"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="
            flex flex-1
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="../assets/logo.png"
              alt="Glossary app"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="../assets/logo.png"
              alt="Glossary app"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NavBarLink to="/" :is-mobile="false" text="Главная" />
              <NavBarLink
                to="/glossary"
                :is-mobile="false"
                text="Словарь"
                v-if="userReady"
              />
            </div>
          </div>
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
        >
          <div class="relative">
            <NavBarLink
              to="/login"
              :is-mobile="false"
              text="Войти"
              v-if="!userReady"
            />
          </div>
          <div class="relative ml-3">
            <NavBarLink
              to="/register"
              :is-mobile="false"
              text="Регистрация"
              v-if="!userReady"
            />
          </div>
          <NavBarLink
            to="/logout"
            :is-mobile="false"
            text="Выйти"
            v-if="userReady"
          />
        </div>
      </div>
    </div>

    <div class="sm:hidden" id="mobile-menu" v-if="mobileToggle">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <NavBarLink to="/" :is-mobile="true" text="Главная" />
        <NavBarLink
          to="/glossary"
          :is-mobile="true"
          text="Словарь"
          v-if="userReady"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarLink from "@/components/NavBarLink.vue";
export default {
  name: "NavBar",
  data() {
    return {
      mobileToggle: null,
    };
  },
  components: {
    NavBarLink,
  },
  computed: {
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