<template>
  <div id="app">
    <div>{{this.testData}}</div>
    <MindMapping 
      v-model     = "testData"
      :width      = 'width'
      :height     = 'height'
      :spacing    = '100'
      topColor    = '#ddd'
      :fontSize   = '50'
      :fontLength = '10'
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
      testData : '{"x":5,"y":400,"title":"创建标题","index":0,"color":"#ddd","size":50,"sprites":[{"x":345,"y":-196,"title":"创建标题","index":1,"color":"#f9c0d2","size":40,"sprites":[]},{"x":345,"y":-84,"title":"创建标题","index":1,"color":"#fd32da","size":40,"sprites":[]},{"x":345,"y":28,"title":"创建标题","index":1,"color":"#d28f7f","size":40,"sprites":[]},{"x":345,"y":140,"title":"创建标题","index":1,"color":"#c997bb","size":40,"sprites":[]},{"x":345,"y":252,"title":"创建标题","index":1,"color":"#d03643","size":40,"sprites":[]}]}',
      width    : 1000,
      height   : 800,
    }
  },
  mounted() {

  },
  methods: {
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  >div{
    margin: 50px auto;
  }
}
body {
  margin : 0;
}
</style>
