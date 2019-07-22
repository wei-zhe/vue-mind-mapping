<template>
  <div 
    class="mindMapping" 
    ref="wTextarea" 
    :style = "{
      width  : this.editor.width  + 'px',
      height : this.editor.height + 'px',
    }"
  >
    <div :id='editorId'></div>
  </div>
</template>

<script>
import EditorMind from  '../js/editorMind.js'
import UUID from '../js/uuid.js';

export default {
  name: 'MindMapping',
  data() {
    return {
      editor : '',
      editorId : 'editor_',
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    tag: {        // 自定义模版标签的标签名
      type: String,
      // 默认使用wise作为标签名，并添加了默认样式
      // 当使用其他标签名的时候，需要另写标签样式
      default: 'wise'
    },
    tools: {      // 自定义扩展功能：超链接'link'，模版标签'tag'
      type: Array,
      default () {
        return [
          { type: 'link', text: '添加超链接' },
          { type: 'tag', text: '添加模版标签' }
        ]
      }
    },
    maxlength: {  // 最大输入长度
      type: [String, Number],
      default: ''
    },
    width  : {
      type: [String, Number],
      default: 500,
    },
    height : {
      type: [String, Number],
      default: 500,
    },
  },
  watch: {
    value(val) {
      // 非锁定状态下，实时更新innerHTML
      if (!this.isLocked) {
        this.$refs.wTextareaContent.innerHTML = val;
      }
    }
  },
  computed: {

  },
  mounted() {
    let uuid = new UUID();
    this.editorId = this.editorId + uuid.generate();

    let setTime = setInterval(() => {

      let dom = document.getElementById(this.editorId)
      if (dom) {
    
        this.editor = new EditorMind(
          this.$svg,
          {
            domId   : this.editorId, // 目标元素id
            width   : this.width,         // 宽
            height  : this.height,        // 高
            spacing : 50,                 // 标题之间的间距
          }
        );
    
        this.editor.fromJson();
        window.TOOL = this.editor;
        clearInterval(setTime);
      }
    });
    
    // 初始化数据
  },
  methods: {
    openTagDialog(type) {
      // 将事件抛给父组件处理
      // 处理后需要调用 addTag() 或者 addLink() 将内容传回来
      this.$emit('add', type)
    },
  },
};
</script>

<style lang="scss" scoped>
.mindMapping {
  position: relative;
  box-shadow: #d8dee9 0px 0px 5px 0px;
  #editorMindSVGDom{
    width: 100%;
    height: 100%;
  }
}
</style>
