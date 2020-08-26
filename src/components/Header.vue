<template>
  <header>
    <div class="nav">
      <router-link to="/signin" v-if="!user.loggedIn">signin</router-link> 
      <router-link to="/main">main</router-link>
      <router-link to="/secret">secret</router-link>
    </div>
    <div v-if="user.loggedIn">
      <button @click="logout">로그아웃</button>
      <button @click="unsubscribe">회원탈퇴</button>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex';
export default {
  computed: {
     ...mapState([
      'user',
    ]),    
  }, 
  filters: {
    nullCheck: function(value) {
      return value == null? '-': value;
    }
  },
  methods: {
    logout() {     
      firebase.auth().signOut().then(() => {
        this.$router.replace({name:'main'})
      }).catch(function(error) {
        console.log(error);
      });
    },
    unsubscribe(){
      var user = firebase.auth().currentUser;
      user.delete().then(() => {
        alert('탈퇴하였습니다.');
        this.$router.replace({name:'main'})
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
  .nav a{
    padding: 0 10px;
  }
</style>