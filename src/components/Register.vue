<template>
  <div class="sign-in">
    <form @submit.prevent="register()">
      <div class="email">
        <label class="email">아이디</label>
        <input type="email" id="email" v-model="email" required autofocus/>
      </div>
      <div class="password">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <div>
        <button type="submit">가입하기</button>
      </div>
    </form>    
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
    register () {                  
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user)
          alert('가입되었습니다.')
        })
        .catch((error) => {
          console.log(error)
        })        
    }
  }
}
</script>

<style>

</style>