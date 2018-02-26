const state = {
  step: 0
}

const mutations = {
  DECREMENT_STEP(state) {
    state.step--
  },
  INCREMENT_STEP (state) {
    state.step++
  }, 
  SET_STEP(state,payload){
  state.step = payload;
  }
}

const actions = {

  incrementStepAction ({ commit }) {
    // do something async
    commit('INCREMENT_STEP');
  },
  decrementStepAction ({ commit }) {
    // do something async
    commit('DECREMENT_STEP');
  },
  setStepAction({commit},payload){
    commit('SET_STEP',payload);
  }

  
}

const  getters ={
  getStep(state) {
    return state.step;
   }

}

export default {
  state,
  mutations,
  actions,
  getters
}
