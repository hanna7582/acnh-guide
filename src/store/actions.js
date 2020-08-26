// import axios from 'axios';
// import router from '../router/index'

const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email,
        photoURL:user.photoURL
      });
    } else {
      commit("SET_USER", null);
    }
  }
}

export default actions;