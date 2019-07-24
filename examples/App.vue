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
      testData : '{"x":5,"y":400,"title":"主标题","index":0,"color":"#ddd","size":50,"sprites":[{"x":295,"y":-307.50390625,"title":"随机分配颜色","index":1,"color":"#f9c0d2","size":40,"sprites":[]},{"x":295,"y":-195.50390625,"title":"横向间距可调节","index":1,"color":"#fd32da","size":40,"sprites":[]},{"x":295,"y":-30,"title":"纵向间距是标题的高","index":1,"color":"#d28f7f","size":40,"sprites":[{"x":505,"y":-23.5078125,"title":"字体大小是上一级的0.8","index":2,"color":"#d28f7f","size":32,"sprites":[]},{"x":505,"y":70.5234375,"title":"主要依赖svg.js","index":2,"color":"#d28f7f","size":32,"sprites":[{"x":363.71875,"y":20.0078125,"title":"需要全局安装是svgjs","index":3,"color":"#d28f7f","size":26,"sprites":[]}]}]},{"x":295,"y":127.50390625,"title":"箭头颜色是和主标题颜色一致","index":1,"color":"#c997bb","size":40,"sprites":[{"x":578.34375,"y":23.5078125,"title":"fromjson","index":2,"color":"#c997bb","size":32,"sprites":[{"x":281.890625,"y":20.0078125,"title":"用json保存所有的属性","index":3,"color":"#c997bb","size":26,"sprites":[]}]}]},{"x":295,"y":239.50390625,"title":"标题文字显示有长度","index":1,"color":"#d03643","size":40,"sprites":[]},{"x":295,"y":351.50390625,"title":"更新会保存所有属性","index":1,"color":"#2a7a75","size":40,"sprites":[]}]}',
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
