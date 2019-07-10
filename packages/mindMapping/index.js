
// 导入组件，组件必须声明 name
import MindMapping from './src/mindMapping.vue';

// 为组件添加 install 方法，用于按需引入
MindMapping.install = function (Vue) {
    Vue.component(MindMapping.name, MindMapping);
}

export default MindMapping;