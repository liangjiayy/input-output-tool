<template>
  <div class="side-menu-container">
    <el-tree :data="menuData" :props="defaultProps" :highlight-current="true" node-key="id" indent="5"
      @node-click="handleNodeClick" class="side-menu-tree">
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span :title="node.label">{{ node.label }}</span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  menuData: {
    type: Array,
    required: true,
    default: () => []
  },
});

const emit = defineEmits(['changeItem']);

const defaultProps = {
  children: 'children',
  label: 'title'
};

// 处理节点点击
const handleNodeClick = (data) => {
  // 如果是可点击项，则触发事件
  if (data.isItem) {
    emit('changeItem', data);
  }
};
</script>

<style scoped>
.side-menu-container {
  height: 100%;
  border-right: solid 1px var(--el-border-color-light);
  padding: 10px 0;
}

.side-menu-tree {
  width: 100%;
  background-color: transparent;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

:deep(.el-tree-node__content) {
  height: 40px;
}

:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

:deep(.el-tree-node__content:hover) {
  background-color: var(--el-fill-color-light);
}
</style>