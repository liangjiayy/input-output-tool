<template>
  <div class="input-item">
    <div class="title">{{ form.title }}</div>

    <!-- 输入框单独一行 -->
    <el-input type="textarea" v-model="form.content" :placeholder="form.desc" @input="updateValue" :rows="5" />

    <!-- 按钮在第二行 -->
    <div class="button-group">
      <el-upload action="" :auto-upload="false" :show-file-list="false" accept=".txt,.md,.json,.csv"
        @change="handleFileUpload">
        <el-button type="primary">上传文件</el-button>
      </el-upload>
      <el-button type="primary" @click="openEditDialog">编辑</el-button>
      <el-button type="danger" @click="$emit('delete')">删除</el-button>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑内容" width="80%" :before-close="handleClose">
      <el-form-item label="标题">
        <el-input v-model="editTitle" placeholder="输入输入框标题" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="editContent" :rows="20" :placeholder="form.desc" />
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'delete'])

const form = ref({
  title: '',
  content: '',
  desc: ''
})

// 编辑对话框相关变量
const dialogVisible = ref(false)
const editContent = ref('')
const editTitle = ref('')

watchEffect(() => {
  if (!props.modelValue) {
    return
  }
  // 解析出标题和内容
  form.value = {
    title: props.modelValue.title || "",
    content: props.modelValue.content || "",
    desc: props.modelValue.desc || props.modelValue.title || "请输入内容"
  }
})

const updateValue = () => emit('update:modelValue', form.value)

// 打开编辑对话框
const openEditDialog = () => {
  editContent.value = form.value.content
  editTitle.value = form.value.title
  dialogVisible.value = true
}

// 保存编辑内容
const saveEdit = () => {
  form.value.content = editContent.value
  form.value.title = editTitle.value
  updateValue()
  dialogVisible.value = false
}

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false
}

// 处理文件上传
const handleFileUpload = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      form.value.content = e.target.result
      updateValue()
      ElMessage.success('文件内容已加载')
    } catch (error) {
      ElMessage.error('文件读取失败')
      console.error(error)
    }
  }
  reader.readAsText(file.raw)
}
</script>

<style scoped>
.input-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.el-input {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>