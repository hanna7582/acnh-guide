import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',     
    redirect:'/main'
  },
  {
    name: 'signin', 
    path: '/signin',  
    component:  loadView('Signin'), 
    meta: { unauthorized : true }
  },
  {
    name: 'register', 
    path: '/register',  
    component:  loadView('Register'), 
    meta: { unauthorized : true }
  },
  {
    name: 'secret', 
    path: '/secret',  
    component:  loadView('Secret'), 
    meta: { requiresAuth : true }
  }, 
  {
    name: 'main', 
    path: '/main',  
    component:  loadView('Main'),
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

router.beforeEach( (to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let unauthorized = to.matched.some(record => record.meta.unauthorized)
  let user = firebase.auth().currentUser;
  // console.log('requiresAuth', requiresAuth);
  // console.log('unauthorized', unauthorized);
  // console.log('user', user);
  
  // 인증요구 페이지만 검사하기
  // if(requiresAuth && !user){
  //   next('/signin')
  // }else{
  //   next();
  // }

  // 인증요구 페이지, 로그인페이지 검사 
  // 인증요구 페이지
  if (requiresAuth) {
    // 유저가 있다면
    if(user){
      next() 
    // 유저가 없으면
    }else{      
      next('/signin')            
    }
  // 로그인페이지    
  }else if (unauthorized) {
    // 유저가 있다면
    if(user){
      next('/main')  
    // 유저가 없으면
    }else{
      next() 
    }
  // 그외  페이지
  } else {      
    next()
  }
})

function loadView(view) {
  return () => import (`../components/${view}.vue`);
}

export default router
