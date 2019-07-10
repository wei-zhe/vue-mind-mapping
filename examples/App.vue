<template>
  <div id="app">
    <MindMapping 
      v-model="testData"
      tag="wise" 
      ref="testText"
      maxlength="100"
      :width  = 'width'
      :height = 'height'
      @add="handleAdd"
    ></MindMapping>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  data () {
    return {
      testData : '',
      width    : 1000,
      height   : 800,
    }
  },
  mounted() {
  },
  methods: {
    handleAdd (type) {
      if (type === 'tag') {
        this.show = true
      } else {
        console.log(type)
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  >div{
    margin: 0 auto;
    margin-top: 100px;
  }
}
body {
  margin : 0;
}
</style>
