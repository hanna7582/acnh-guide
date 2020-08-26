<template>
  <div class="sign-in">
    <form @submit.prevent="signIn()">
      <div class="email">
        <label class="email">아이디</label>
        <input type="email" id="email" v-model="email" required autofocus/>
      </div>
      <div class="password">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="password" required autofocus/>
      </div>
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>   
    <button @click="goRegister">회원가입</button> 
    <button @click="goGithub">github</button> 
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
 data () {
    return {
      email:'',
      password:'',
    }
  },
  methods: {
    signIn(){      
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then( () => {
        this.$router.replace({name:'main'})  
      })
      .catch(function(error) {
        console.log(error);        
        if(error.code=='auth/user-not-found'){
          alert('회원가입하세요.');          
        }
      });
    },
    goRegister(){
      this.$router.replace({name:'register'})  
    },
    goGithub(){
      console.log('github auth');      
      firebase.auth().getRedirectResult().then(function(result) {
        console.log('result', result);
        
        if (result.credential) {
          // This gives you a GitHub Access Token.
          // var token = result.credential.accessToken;
          this.$router.replace({name:'main'}) 
        }
        // var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have signed up with a different provider for that email.');
          // Handle linking here if your app allows it.
        } else {
          console.error(error);
        }
      });

      var provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      firebase.auth().signInWithRedirect(provider);
    }
  }
}
</script>

<style>

</style>