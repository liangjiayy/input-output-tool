<template>
  <div class="process-item">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ process.title }}</span>
          <div class="header-buttons">
            <el-button type="primary" size="small" @click="openEditDialog">编辑</el-button>
            <el-button type="danger" size="small" @click="$emit('delete')">删除</el-button>
          </div>
        </div>
      </template>
      <div class="function-content">
        <div class="function-header">
          <el-button type="text" @click="showFullFunction = !showFullFunction">
            {{ showFullFunction ? '收起' : '展开' }}
          </el-button>
        </div>
        <pre class="function-code">{{ showFullFunction ? handlerStr : truncatedHandler }}</pre>
      </div>
    </el-card>

    <!-- 编辑模态框 -->
    <el-dialog v-model="dialogVisible" title="编辑处理函数" width="50%" :before-close="handleClose">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="处理函数">
          <el-input v-model="editForm.handlerStr" type="textarea" :rows="20" placeholder="请输入处理函数"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, defineProps, defineEmits } from 'vue'

const props = defineProps(['process'])
const emit = defineEmits(['delete', 'update'])

// 获取handler
const handlerStr = ref("")
watchEffect(() => {
  handlerStr.value = props.process.handlerStr
})

// 控制函数显示
const showFullFunction = ref(false)
const truncatedHandler = computed(() => {
  if (handlerStr.value.length <= 100) return handlerStr.value
  return handlerStr.value.substring(0, 100) + '...'
})

// 编辑模态框
const dialogVisible = ref(false)
const editForm = ref({
  title: '',
  handlerStr: ''
})

// 打开编辑对话框
const openEditDialog = () => {
  editForm.value.title = props.process.title
  editForm.value.handlerStr = handlerStr.value
  dialogVisible.value = true
}

// 关闭对话框
const handleClose = (done) => {
  done()
}

// 保存编辑
const saveEdit = () => {
  emit('update', {
    ...props.process,
    title: editForm.value.title,
    handlerStr: editForm.value.handlerStr
  })
  dialogVisible.value = false
}
</script>

<style scoped>
.process-item {
  margin-bottom: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  gap: 8px;
}

.function-content {
  margin-top: 10px;
}

.function-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.function-code {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
  max-height: 300px;
  overflow-y: auto;
}
</style>