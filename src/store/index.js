import { createStore } from "vuex";
import { AppModule } from "./modules/AppModule";
import { AuthModule } from "./modules/AuthModule";

export default createStore({
  state: {
    sideBar: {
      collapsed: true,
      open_width: 180,
      collapsed_width: 50,
    },
  },
  getters: {
    getSideBarWidth(state) {
      return `${
        state.sideBar.collapsed
          ? state.sideBar.collapsed_width
          : state.sideBar.open_width
      }px`;
    },
    sideBarIsCollapsed(state) {
      return state.sideBar.collapsed;
    },
  },
  mutations: {
    setSideBarCollapsed(state, value) {
      state.sideBar.collapsed = value;
    },
  },
  actions: {
    toogleSideBar({ state, commit }) {
      commit("setSideBarCollapsed", !state.sideBar.collapsed);
    },
  },
  modules: {
    AuthModule: AuthModule,
    AppModule: AppModule,
  },
});
