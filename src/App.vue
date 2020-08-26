<template>
  <div id="app">
    <h1>ACNH GUIDE</h1>
    <Header />
    <div class="main">
      <router-view />  
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: 'App',
  components: {
    Header  
  },
}
</script>

<style>
  #app{    
    height: 100%;
  }
</style>
