<template>
  <div id="content">
    <div class="list" id="from-vuex">
      <div>
        From Vuex
      </div>
      <div v-for="doc in fromVuex" :key="doc.id">
        {{doc.id}}
      </div>
    </div>
    <div class="list" id="from-firestore">
      <div>
        From Firestore
      </div>
      <div v-for="doc in fromFirestore" :key="doc.id">
        {{doc.id}}
      </div>
    </div>
    <div id="add">
      <button v-on:click="insert">Add Doc</button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'app',
    data() {
      return {
        fromFirestore: []
      }
    },
    methods: {
      insert() {
        this.$store.dispatch('test/insert', { foo: 'foo' })
      }
    },
    computed: {
      fromVuex() {
        return _.sortBy(this.$store.state.test.docs, 'id')
      }
    },
    mounted() {
      return this.$firebase.firestore().collection('test')
        .onSnapshot(snapshot => {
          this.fromFirestore = _.sortBy(snapshot.docs.map(doc => doc.data()), 'id')
        })
    }
  }
</script>

<style lang="scss" scoped>
  #content {
    display: flex;
    height: 500px;

    div.list {
      width: 300px;
      overflow: scroll;

      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    #add {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 100px;

      button {
        width: 80px;
        height: 40px;
      }
    }
  }
</style>
