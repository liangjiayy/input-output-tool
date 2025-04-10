<template>
  <div class="output-item">
    <el-card>
      <template #header>
        <div class="card-header" v-if="output.title">
          <!-- 如果有标题则显示标题 + content， 否则只显示content -->
          <span>{{ output.title }}</span>
        </div>
      </template>
      <div class="output-content" :class="{ expanded: isExpanded }">
        <span>{{ displayContent }}</span>
      </div>
      <div class="actions">
        <el-button type="primary" size="small" @click="toggleExpand">
          {{ isExpanded ? '收起' : '展开全部' }}
        </el-button>
        <el-button type="success" size="small" @click="copyContent">复制</el-button>
        <!-- <el-button type="danger" size="small" @click="$emit('delete')">删除</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['content'])
defineEmits(['delete'])

const output = ref({})
watchEffect(() => {
  // 如果是字符串，则解析为output.content。如果是对象，则直接赋值
  const newContent = props.content
  if (typeof newContent === 'string') {
    output.value = { content: newContent }
  } else {
    output.value = newContent
    // 如果没有content，则提示用户没有content
    if (!output.value.content) {
      output.value.content = '输出内容为空!'
    }
  }
})

const isExpanded = ref(false)
const displayContent = computed(() => {
  if (!output.value.content) return
  if (isExpanded.value) return output.value.content
  return output.value.content.length > 50 ? output.value.content.slice(0, 50) + '...' : output.value.content
})

const toggleExpand = () => (isExpanded.value = !isExpanded.value)
const copyContent = () => {
  navigator.clipboard.writeText(output.value.content)
  ElMessage.success('已复制到剪贴板')
}
</script>

<style scoped>
.output-item {
  margin-bottom: 10px;
}

.output-content {
  white-space: pre-wrap;
  max-height: 100px;
  overflow: hidden;
}

.output-content.expanded {
  max-height: none;
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>