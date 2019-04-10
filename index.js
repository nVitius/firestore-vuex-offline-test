import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
import * as Firebase from 'firebase/app'
import 'firebase/firestore'

Firebase.initializeApp({
})

Firebase.firestore().enablePersistence()
Vue.prototype.$firebase = Firebase

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {},
  plugins: [
    VuexEasyFirestore(
      [{
        firestorePath: 'test',
        firestoreRefType: 'collection',
        moduleName: 'test',
        statePropName: 'docs',
        namespaced: true,
        state: {},
        getters: {},
        mutations: {},
        actions: {}
      }],
      { logging: true, FirebaseDependency: Firebase }
    )
  ]
})

import App from './App'

const app = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  beforeCreate() {
    // Pre-cache Firestore collections
    this.$store.dispatch('test/openDBChannel')
  },
  components: {
    App
  }
})
