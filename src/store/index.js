import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      history: [],
    };
  },
  getters: {
    history(state) {
      return state.history;
    },
    hasHistory(state) {
      return state.history && state.history.length > 0;
    },
  },
  mutations: {
    clearHistory(state) {
      state.history = [];
    },
    addHistory(state, payload) {
      state.history.unshift(payload.historyEntry);
    },
    removeHistoryItem(state, payload){
        state.history.splice(payload.ind, 1)
    }
  },
  actions: {
    clearHistory(context){ 
        context.commit('clearHistory');
    },
    addHistory(context, payload){
        context.commit('addHistory', payload)
    },
    removeHistoryItem(context, payload){
        context.commit('removeHistoryItem', payload)
    }
  },
});

export default store;
