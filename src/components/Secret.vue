<template>
  <div>
    이 페이지는 로그인해야 볼 수 있습니다.
    <div v-if="user">      
      {{user.data.displayName | nullCheck}}
      {{user.data.email | nullCheck}}
      <img :src="user.data.photoURL" alt="">
    </div>
  </div>
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
      return value == null? '': value;
    }
  },
  methods: {
    logout() {      
      firebase.auth().signOut().then(() => {
        this.setUser(null);
        this.$router.replace({name:'signin'}) 
      }).catch(function(error) {
        console.log(error);
      });
    },
    unsubscribe(){
      var user = firebase.auth().currentUser;
      user.delete().then(() => {
        alert('탈퇴하였습니다.');
        this.$router.replace({name:'signin'}) 
      }).catch(function(error) {
        console.log(error);
      });
    }
  },
}
</script>

<style>

</style>