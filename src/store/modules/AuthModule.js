import { AuthAPI } from "@/api/auth";
import { APIInstance } from "@/api";

export const AuthModule = {
  namespaced: true,

  state() {
    return {
      credentials: {
        token: localStorage.getItem("token") || null,
      },
    };
  },

  getters: {
    getUserToken(state) {
      return state.credentials.token;
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
  },

  actions: {
    onLogin({ commit }, { login, password }) {
      return AuthAPI.login(login, password).then(
        (response) => {
          commit("setToken", response.data.token);
          APIInstance.defaults.headers["authorization"] = `Bearer ${response.data.token}`;
          return response.status
        },
        (error) => {
          return error.response.status
        }
      );
    },
    onLogout({ commit }) {
      commit("clearToken");
      APIInstance.defaults.headers["authorization"] = "";
    },
  },
};
