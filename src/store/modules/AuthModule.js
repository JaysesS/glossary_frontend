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
      wordListPrepared: [],
      words: {},
      tags: {},
      priority: {},
      links: [],
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
    getPreparedWordList(state) {
      return state.wordListPrepared;
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

    setWordList(state, words) {
      const itemList = {};
      for (const i in words) {
        let item = words[i];
        itemList[item.id] = item;
      }
      state.words = itemList;
    },
    setTagList(state, tags) {
      const itemList = {};
      for (const i in tags) {
        let item = tags[i];
        itemList[item.id] = item;
      }
      state.tags = itemList;
    },
    setPriorityList(state, priorities) {
      const itemList = {};
      for (const i in priorities) {
        let item = priorities[i];
        itemList[item.id] = item;
      }
      state.priority = itemList;
    },
    setLinkList(state, links) {
      state.links = links;
    },

    setWordListPrepared(state) {
        const words = {};
        for (const i in state.words) {
          let word = state.words[i];
          let priority = state.priority[word.priority_id];
          console.log(priority.name);
          word["priority"] = priority.name;
          word["tags"] = [];
          words[word.id] = word;
        }
        for (const i in state.links) {
          let link = state.links[i];
          let word = words[link.word_id];
          word["tags"].push(state.tags[link.tag_id]);
        }
        const wordList = [];
        for (const i in words) {
          wordList.push(words[i]);
        }
        state.wordListPrepared = wordList;
    }
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

    async getWordList({ commit }, { offset, limit }) {
      const resp = await AuthAPI.getWordList(offset, limit);
      const json = await resp.data;
      commit("setWordList", json.items);
    },
    async getTagList({ commit }, { offset, limit }) {
      const resp = await AuthAPI.getTagList(offset, limit);
      const json = await resp.data;
      commit("setTagList", json.items);
    },
    async getPriorityList({ commit }, { offset, limit }) {
      const resp = await AuthAPI.getPriorityList(offset, limit);
      const json = await resp.data;
      commit("setPriorityList", json.items);
    },
    async getLinkList({ commit }, { offset, limit }) {
      const resp = await AuthAPI.getLinkList(offset, limit);
      const json = await resp.data;
      commit("setLinkList", json.items);
    },
  },
};
