<template>
  <div class="container">
    <div class="col">
      <br />
      <div class="input-field-group mt">
        <input v-model="login" class="input-field" placeholder="Логин.." />
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
        />
        <div class="input-field-group-items">
          <button class="btn-click" @click="togglePassword">
            {{ toggleShowPasswordIcon }}
          </button>
          <button>{{ passwordValidateIcon }}</button>
        </div>
      </div>
      <br />
      <button class="btn" @click="registerAction">Зарегистрироваться</button>
      <div>
        <p class="mt" v-if="registerError">Чего-то вам не хватает.. 🙊</p>
      </div>
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
  transition: all 0.4s ease-in-out;
  background-size: 300% 100%;
  cursor: pointer;

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
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
  justify-content: flex-end;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  min-width: 30vw;
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
