<template>
  <div class="container">
    <div class="col">
      <br />
      <div class="input-field-group mt">
        <input v-model="login" class="input-field" placeholder="Логин.." tabindex="1"/>
        <div class="input-field-group-items">
          <button>{{ loginValidateIcon }}</button>
        </div>
      </div>
      <div class="input-field-group mt">
        <input
          :type="togglePasswordinputType"
          v-model="password"
          class="input-field"
          placeholder="Пароль.."
          tabindex="2"
        />
        <div class="input-field-group-items">
          <button class="btn-click" @click="togglePassword">
            {{ toggleShowPasswordIcon }}
          </button>
          <button>{{ passwordValidateIcon }}</button>
        </div>
      </div>
      <br />
      <button class="btn" @click="loginAction" tabindex="3">Войти</button>
      <div>
        <p class="mt" v-if="authError">Вы где-то ошиблись... 🙊</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      login: "",
      password: "",
      authError: false,
      showPassword: false,
    };
  },
  methods: {
    async loginAction() {
      try {
        await this.$store.dispatch("AuthModule/onLogin", {
          login: this.login,
          password: this.password,
        });
        this.authError = false;
      } catch (e) {
        this.authError = true;
      }
      if (!this.authError) {
        await this.$store.dispatch("AuthModule/checkUpdateUser");
        this.$router.push({ name: "Glossary" });
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    fieldIsCorrect(value) {
      return value.length >= 5 && value.length <= 30;
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

<style scoped lang="scss">
.btn {
  background-image: linear-gradient(140deg, #af40ff, #5b42f3, #30dd8a, #cef109);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  border: 0;
  border-radius: 8px;
  color: #ffffff;
  font-family: $global-font;
  font-size: 1em;
  line-height: 1em;
  max-width: 100%;
  padding: 15px 20px;
  transition: all 0.5s ease-in-out;
  background-size: 300% 100%;
  cursor: pointer;

  &:hover {
    background-position: 100% 0;
    transition: all 0.5s ease-in-out;
  }

  &:focus {
    outline: none;
  }
}

.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
}

.col {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: stretch;
}

.mt {
  margin-top: 10px;
}

.input-field {
  font-family: $global-font;
  border: 0;
  min-height: 50px;
  max-width: 45vw;
  flex: 1;
  padding: 0.3rem 0.3rem 0.3rem 1rem;
  border-radius: 0.3rem;

  &:focus {
    outline: 0;
  }
}

.input-field-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  min-width: 30vw;
  max-width: 75vw;
  border-radius: 0.5rem;
}

.input-field-group-items {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  button {
    background-color: transparent;
    outline: 0;
    border: 0;
  }

  .btn-click:hover {
    cursor: pointer;
  }
}
</style>
