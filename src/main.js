import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import firebase from 'firebase'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyArmLXdn4v0E16rLZEKKdVOR009GFLzB3I",
  authDomain: "acnh-guide-da3e5.firebaseapp.com",
  databaseURL: "https://acnh-guide-da3e5.firebaseio.com",
  projectId: "acnh-guide-da3e5",
  storageBucket: "acnh-guide-da3e5.appspot.com",
  messagingSenderId: "455726606942",
  appId: "1:455726606942:web:069e4d597931a8037722cf",
  measurementId: "G-ENBDM4KLVW"
}
firebase.initializeApp(config);

let app;

firebase.auth().onAuthStateChanged( user => {
  console.log('app user', user);
  store.dispatch("fetchUser", user);
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')    
  }
})

