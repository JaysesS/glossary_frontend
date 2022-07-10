import { AuthAPI } from "@/api/auth";
import { AuthAPIInstance } from "@/api";

export const AuthModule = {
  namespaced: true,

  state() {
    return {
      credentials: {
        token: localStorage.getItem("token") || null,
      },
      user: {
        id: null,
        login: null,
        createdAt: null,
      },
    };
  },

  getters: {
    getUserToken(state) {
      return state.credentials.token;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUserLogin(state) {
      return state.user.login;
    },
    getUserCreatedAt(state) {
      return state.user.createdAt;
    },
  },

  mutations: {
    setToken(state, token) {
      state.credentials.token = token;
      localStorage.setItem("token", token);
    },
    clearToken(state) {
      state.credentials.token = null;
      localStorage.removeItem("token");
    },
    setUserId(state, user_id) {
      state.user.id = user_id;
    },
    setUserLogin(state, login) {
      state.user.login = login;
    },
    setUserCreatedAt(state, createdAt) {
      state.user.createdAt = createdAt;
    },
  },

  actions: {
    async onLogin({ commit }, { login, password }) {
      const resp = await AuthAPI.login(login, password);
      const json = await resp.data;
      commit("setToken", json.token);
      AuthAPIInstance.defaults.headers[
        "authorization"
      ] = `Bearer ${json.token}`;
    },
    // eslint-disable-next-line no-unused-vars
    async onRegister({ commit }, { login, password }) {
      await AuthAPI.register(login, password);
    },
    async onLogout({ commit }) {
      commit("clearToken");
      AuthAPIInstance.defaults.headers["authorization"] = "";
      window.location.reload();
    },
    async checkUpdateUser({ state, dispatch }) {
      if (!state.user.id) {
        await dispatch("me");
      }
    },
    async me({ commit }) {
      const resp = await AuthAPI.me();
      const json = await resp.data;
      commit("setUserId", json.id);
      commit("setUserLogin", json.login);
      commit("setUserCreatedAt", json.created_at);
    },
  },
};
