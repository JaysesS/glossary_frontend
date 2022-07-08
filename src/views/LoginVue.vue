<template>
    <input v-model="login" type="text" placeholder="Введите ваш логин" />
    <input v-model="password" type="password" placeholder="Введите ваш пароль" />
    <button type="submit" @click="loginAction">Войти</button>
    <br>
    <p v-if="errorCode != 200">Неверные данные</p>

    {{errorCode}}
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            login: "",
            password: "",
            errorCode: 200,
        };
    },
    methods: {
        async loginAction() {
            this.errorCode = await this.$store.dispatch("AuthModule/onLogin", {
                login: this.login,
                password: this.password,
            })
            if (this.errorCode == 200) {
                console.log("go to about")
                this.$router.push({name: "About"})
            }
        },
        async logoutAction() {
            this.$store.dispatch("AuthModule/onLogout")
        },
    },
};
</script>
