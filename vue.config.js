module.exports = {
    // 修改 src 为 examples
    pages: {
      index: {
        // page 的入口
        entry: 'examples/main.js',
        // 模板来源
        template: 'public/index.html',
        // 输出文件名
        filename: 'index.html'
      }
    },
  
    productionSourceMap: false,
    baseUrl: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    parallel: undefined,
  
    css: {
      extract: false
    }
}
  