import { createStore } from 'vuex'
import { AppModule } from './modules/AppModule';
import { AuthModule } from './modules/AuthModule';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    AuthModule: AuthModule,
    AppModule: AppModule
  },
});
