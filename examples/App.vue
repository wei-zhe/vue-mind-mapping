<template>
  <div id="app">
    <div>{{this.testData}}</div>
    <MindMapping 
      v-model     = "testData"
      :width      = 'width'
      :height     = 'height'
      :spacing    = '50'
      topColor    = '#646464'
      :fontSize   = '30'
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
      testData : '{"x":5,"y":400,"title":"主标题","index":0,"color":"#646464","size":30,"sprites":[{"x":185,"y":-171.0703125,"title":"随机分配颜色","index":1,"color":"#e78ed9","size":24,"sprites":[]},{"x":185,"y":-95.0390625,"title":"横向间距可调节","index":1,"color":"#5119cb","size":24,"sprites":[{"x":263,"y":16.0078125,"title":"字体大小是上一级的0.8","index":2,"color":"#5119cb","size":19,"sprites":[{"x":292.40625,"y":13.5,"title":"标题文字显示有长度","index":3,"color":"#5119cb","size":15,"sprites":[]}]}]},{"x":185,"y":-19.0078125,"title":"纵向间距是标题的高","index":1,"color":"#fc7d28","size":24,"sprites":[]},{"x":185,"y":57.0234375,"title":"主要依赖svg.js","index":1,"color":"#5c3039","size":24,"sprites":[{"x":259.046875,"y":16.078125,"title":"需要安装是svgjs","index":2,"color":"#5c3039","size":19,"sprites":[]}]},{"x":185,"y":133.0546875,"title":"箭头颜色是和主标题颜色一致","index":1,"color":"#8523fa","size":24,"sprites":[{"x":355.015625,"y":16.0546875,"title":"用json保存所有的属性","index":2,"color":"#8523fa","size":19,"sprites":[]}]},{"x":185,"y":209.0859375,"title":"更新会保存所有属性","index":1,"color":"#1a4a27","size":24,"sprites":[{"x":311,"y":16.0078125,"title":"再次打开没有属性变化","index":2,"color":"#1a4a27","size":19,"sprites":[]}]}]}',
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
