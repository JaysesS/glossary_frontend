<template>
  <div
    class="
      flex
      min-h-full
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="../assets/logo.png"
          alt="Glossary app"
        />
        <h2
          class="
            mt-6
            text-center text-3xl
            font-bold
            tracking-tight
            text-gray-900
          "
        >
          Создать аккаунт
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="registerAction">
        <div class="-space-y-px-2 rounded-md shadow-sm">
          <div class="flex">
            <label for="email-address" class="sr-only">Логин</label>
            <input
              v-model="login"
              id="email-address"
              name="email"
              required
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-l-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-indigo-500
                focus:outline-none
                focus:ring-indigo-500
                sm:text-sm
              "
              placeholder="Логин"
            />
            <span
              class="
                inline-flex
                items-center
                px-3
                text-sm text-gray-900
                bg-gray-200
                rounded-r-md
                border border-r-0 border-gray-300
                dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600
              "
            >
              {{ loginValidateIcon }}
            </span>
          </div>
          <div class="flex mt-2">
            <label for="password" class="sr-only">Пароль</label>
            <input
              v-model="password"
              id="password"
              name="password"
              :type="togglePasswordinputType"
              autocomplete="current-password"
              required
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-l-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-indigo-500
                focus:outline-none
                focus:ring-indigo-500
                sm:text-sm
              "
              placeholder="Пароль"
            />
            <href
              class="
                inline-flex
                items-center
                px-3
                py-2
                text-sm text-gray-900
                bg-gray-200
                border border-r-0 border-gray-300
                dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600
              "
              @click="togglePassword"
            >
              {{ toggleShowPasswordIcon }}
            </href>
            <span
              class="
                inline-flex
                items-center
                px-3
                text-sm text-gray-900
                bg-gray-200
                rounded-r-md
                border border-r-0 border-gray-300
                dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600
              "
            >
              {{ passwordValidateIcon }}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              flex
              w-full
              justify-center
              rounded-md
              py-2
              px-4
              text-sm
              font-medium
              text-white
              custombutton
            "
          >
            Зарегистрироваться
          </button>
          <div>
            <p
              v-if="registerError"
              class="
                mt-6
                text-center text-3xs
                font-bold
                tracking-tight
                text-gray-900
              "
            >
              Что-то не сошлось... 🙊
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      login: "",
      password: "",
      registerError: false,
      showPassword: false,
    };
  },
  methods: {
    async registerAction() {
      try {
        await this.$store.dispatch("AuthModule/onRegister", {
          login: this.login,
          password: this.password,
        });
        this.registerError = false;
      } catch (e) {
        this.registerError = true;
      }

      if (!this.registerError) {
        this.$router.push({ name: "Login" });
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    fieldIsCorrect(value) {
      return value.length >= 4 && value.length <= 30;
    },
  },
  computed: {
    togglePasswordinputType() {
      return this.showPassword ? "text" : "password";
    },
    toggleShowPasswordIcon() {
      return this.showPassword ? "🐵" : "🙈";
    },
    loginValidateIcon() {
      return this.fieldIsCorrect(this.login) ? "👌" : "⛔";
    },
    passwordValidateIcon() {
      return this.fieldIsCorrect(this.password) ? "👌" : "⛔";
    },
  },
};
</script>

<style scoped>
.custombutton {
    background-image: linear-gradient(140deg, #30dd8a, #cef109, #af40ff, #5b42f3);
    background-size: 300% 100%;
    transition: all 0.5s ease-in-out;
}

.custombutton:hover {
    background-position: 100% 0;
    transition: all 0.5s ease-in-out !important;
}
</style>