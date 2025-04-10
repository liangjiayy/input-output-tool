<template>
  <div class="container">
    <div class="side-menu-container">
      <SideMenu class="side-menu" :menuData="menuData" @changeItem="changeItem" />
      <el-button type="primary" class="more-button" @click="showMoreDialog = true">更多</el-button>
    </div>
    <div class="left-panel">
      <h2>输入区域</h2>
      <input-component v-for="(input, index) in inputOutputFormData.inputs" :key="index"
        v-model="inputOutputFormData.inputs[index]" @delete="deleteInput(index)" />
      <el-button type="primary" @click="addInput">添加输入</el-button>
    </div>
    <div class="middle-panel">
      <h2>处理链</h2>
      <process-component v-for="(process, index) in inputOutputFormData.processes" :key="index"
        :process="{ ...process, handlerStr: process.handlerStr || process.handler?.toString() || templateHandlerStr }"
        @delete="deleteProcess(index)" @update="(process) => updateProcess(index, process)" />
      <el-button type="primary" @click="addProcess">添加处理</el-button>
    </div>
    <div class="right-panel">
      <h2>输出区域</h2>
      <output-component v-for="(output, index) in outputs" :key="index" :content="output"
        @delete="deleteOutput(index)" />
    </div>

    <!-- 更多功能对话框 -->
    <el-dialog v-model="showMoreDialog" title="更多功能" width="500px">
      <div class="more-dialog-content">
        <div class="dialog-section">
          <h3>保存/读取模块</h3>
          <div class="save-section">
            <el-input v-model="saveModuleName" placeholder="输入模块名称"></el-input>
            <el-button type="primary" @click="saveCurrentModule">保存当前模块</el-button>
          </div>
          <div class="saved-modules" v-if="savedModules.length > 0">
            <h4>已保存的模块:</h4>
            <div v-for="(module, index) in savedModules" :key="index" class="saved-module-item">
              <span>{{ module.name }}</span>
              <div class="module-actions">
                <el-button size="small" @click="loadModule(module)">加载</el-button>
                <el-button size="small" type="danger" @click="deleteModule(index)">删除</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-section">
          <h3>导出模块</h3>
          <el-button type="primary" @click="exportModule">导出为文件</el-button>
          <div v-if="exportedContent" class="export-content">
            <h4>模块内容:</h4>
            <el-input type="textarea" v-model="exportedContent" rows="10" readonly></el-input>
            <el-button type="primary" size="small" @click="copyExportContent">复制内容</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import InputComponent from '../components/input_output/InputComponent.vue'
import ProcessComponent from '../components/input_output/ProcessComponent.vue'
import OutputComponent from '../components/input_output/OutputComponent.vue'

import SideMenu from '@/components/input_output/SideMenu.vue'

import { templateHandlerStr, modules } from '@/utils/input_output'
import { ElMessage } from 'element-plus'

// 菜单相关
const menuData = ref([
  {
    title: '模块1',
    children: [
      { title: '子模块1' },
      { title: '子模块2', isItem: true },
    ]
  },
])
// 页面数据相关
const inputOutputFormData = ref({
  inputs: [],
  processes: [],
  menu: undefined,
  title: undefined
})
// 用于根据id检索
let menuSearchData = {}

// module转为formData
const moduleToFormData = (module) => {
  return {
    ...module,
    inputs: parseInputs(module.inputs),
  }
}

// 选中菜单时
const changeItem = (item) => {
  // 解析出模块输入内容和处理函数
  const module = menuSearchData[item.id]
  console.log(module)
  inputOutputFormData.value = moduleToFormData(module)
}

//#region 初始化菜单
// 将module解析为菜单
let id = 0

// 添加默认模块
const defaultModule = {
  id: id++,
  title: '默认模块',
  children: []
}
menuData.value = [defaultModule]
menuSearchData = {}

// 用于记录已经添加的菜单。 value：当前层级的菜单，childrenMap：下一层级的菜单
let menuCache = { value: menuData.value, childrenMap: {} }

// （private) 添加菜单。menu：Array
const addMenu = (menu) => {
  // 遍历菜单，检查每个层级的菜单是否存在？
  let curr = menuCache
  menu.forEach((menuItem) => {
    // 如果当前层级的菜单不存在，则添加
    if (!curr.childrenMap[menuItem]) {
      // 获取当前层级的菜单
      const val = curr.value
      // 创建新菜单
      const newMenu = {
        title: menuItem,
        id: ++id,
        children: [],
      }
      // 添加到菜单中
      val.push(newMenu)
      // 记录当前层级的菜单
      curr.childrenMap[menuItem] = { value: newMenu.children, childrenMap: {} }
    }
    // 继续获取下一层级的菜单
    curr = curr.childrenMap[menuItem]
  })
  return curr
}
// (private) 添加菜单项目（内部先添加菜单）
const addMenuItem = (menu, module) => {
  // 添加菜单信息
  const m = addMenu(menu)
  // 添加菜单项目
  m.value.push({
    title: module.title,
    id: ++id,
    isItem: true,
  })
  return id
}
// 用于添加新的菜单项目
const addModule = (module) => {
  let tmpId;
  // 是否有menu属性？没有放在“默认模块”下
  if (module.menu) {
    // 如果有menu属性，则解析为菜单
    let menu = module.menu
    if (!Array.isArray(menu)) {
      menu = [menu]
    }
    // 添加菜单项目
    tmpId = addMenuItem(menu, module)
  } else {
    // 放在“默认模块”下
    defaultModule.children.push({
      title: module.title,
      id: ++id,
      isItem: true,
    })
    tmpId = id;
  }
  // 根据id搜索用
  menuSearchData[tmpId] = module
}
// 遍历modules，将每个模块的inputs和processes解析为菜单
modules.forEach(addModule)
//#endregion

// 确保每个输入都是对象
const parseInputs = (inputs) => {
  // 如果不是数组，转为数组
  if (!Array.isArray(inputs)) {
    inputs = [inputs]
  }
  // 遍历数组中的元素。如果是字符串，则转为对象，否则不变
  return inputs.map((input) => {
    if (typeof input === 'string') {
      return { content: input }
    }
    return input
  })
}
// 输入数据
const addInput = () => inputOutputFormData.value.inputs.push({ content: "" })
const deleteInput = (index) => inputOutputFormData.value.inputs.splice(index, 1)

// 处理函数
const addProcess = () => inputOutputFormData.value.processes.push({ title: `处理${inputOutputFormData.value.processes.length + 1}`, handlerStr: templateHandlerStr })
const deleteProcess = (index) => inputOutputFormData.value.processes.splice(index, 1)
const updateProcess = (index, process) => {
  // 将字符串函数转为函数
  process.handler = convertStringToFunction(process.handlerStr)
  inputOutputFormData.value.processes[index] = process
}

// 输出数据
const outputs = ref([])
const deleteOutput = (index) => outputs.value.splice(index, 1)

// 默认展示第一个模块的输入和处理函数
inputOutputFormData.value = moduleToFormData(modules[0])

// 计算输出
const updateOutputs = () => {
  // 处理链
  const processes = inputOutputFormData.value.processes

  // handler参数做成
  const getHandlerArgs = (input) => {
    // 总是包含input和inputs参数
    if (!Array.isArray(input)) {
      input = [input]
    }
    // 解析出内容
    const texts = input.map((input) => {
      if (typeof input === 'string') {
        return input
      }
      return input.content
    })
    const args = { input: texts[0], inputs: texts, inputObj: input[0], inputObjs: input }
    return args;
  }

  // 结果渲染
  const renderOutput = (outputResults) => {
    outputs.value = []
    // output为字符串或对象。titile为处理链的标题或者处理链的序号
    const addOutput = (output, title) => {
      let toDisplay;
      // 如果是字符串，则解析为output.content。如果是对象，则直接赋值
      if (typeof output === 'string') {
        // 第i个处理链的标题
        toDisplay = { title, content: output }
      }
      // 如果是对象，检查是否有内容
      else if (output.content) {
        // 如果没有标题，添加标题
        if (!output.title) {
          output.title = title
        }
        toDisplay = output
      }
      if (toDisplay) outputs.value.push(toDisplay)
    }
    outputResults.forEach((output, index) => {
      // output为空，跳过
      if (!output) {
        return
      }
      // 默认标题
      const title = processes[index].title || `处理${index + 1}`
      // 检查output是否为数组
      if (Array.isArray(output)) {
        output.forEach((o) => {
          addOutput(o, title)
        })
      }
      else {
        addOutput(output, title)
      }
    })
  }

  // 将inputs作为函数的参数，依次调用处理链
  const handlerResult = () => {
    let preResult = inputOutputFormData.value.inputs
    // 定义出力数组对象
    let resultObjs = new Array(preResult.length)
    for (let i = 0; i < processes.length; i++) {
      try {
        // 如果hander不存在，尝试从handlerStr中获取
        if (!processes[i].handler) {
          processes[i].handler = convertStringToFunction(processes[i].handlerStr)
        }
        const args = {};
        // input: 第一个输入框文本内容。总是等于inputs[0]
        // inputs: 所有输入框文本内容。
        // inputObj: 第一个输入框文本内容的原始对象（可能包含输入框标题等信息，也可能等于input，取决于输入框是否定义了标题）。总是等于inputObjs[0]
        // inputObjs: 所有输入框文本内容的对象。
        const input = getHandlerArgs(preResult)
        args.input = input.input
        args.inputs = input.inputs
        args.inputObj = input.inputObj
        args.inputObjs = input.inputObjs
        // pre: 上一个返回值的第一个文本内容。总是等于pres[0]
        // pres: 上一个返回值的所有文本内容。
        // preObj: 上一个返回值的第一个文本内容的对象（可能包含标题等信息，也可能等于pre，取决于上一个函数如何返回）。总是等于preObjs[0]
        // preObjs: 上一个返回值的所有文本内容的对象。
        const r = getHandlerArgs(preResult)
        args.pre = r.input
        args.pres = r.inputs
        args.preObj = r.inputObj
        args.preObjs = r.inputObjs
        // out: 输出对象。可通过out.concat()方法添加文本内容，或通过out.push()方法添加输出框。
        args.out = {
          concat: (text) => {
            let out = resultObjs[i]
            // 追加文本的方法
            const concat = (out, text) => {
              if (typeof out === 'string') {
                out += text
              } else {
                out.content = out.content || ""
                out.content += text
              }
              return out
            }
            // 如果是数组，则追加到第一个元素
            if (Array.isArray(out)) {
              out[0] = concat(out[0], text)
            } else {
              out = concat(out, text)
            }
            resultObjs[i] = out
            renderOutput(resultObjs)
          },
          push: (text) => {
            if (!Array.isArray(resultObjs[i])) {
              resultObjs[i] = [resultObjs[i]]
            }
            resultObjs[i].push(text)
            renderOutput(resultObjs)
          }
        }
        preResult = processes[i].handler(args)
        resultObjs[i] = preResult
      } catch (error) {
        resultObjs[i] = `第${i + 1}个处理函数执行出错: ${error instanceof Error ? error.message : error}`
      }
    }
    renderOutput(resultObjs)
  }
  handlerResult()
}

// 初始化输出
updateOutputs()

// 监听输入和处理链变化
watch(inputOutputFormData, updateOutputs, { deep: true })

// 将字符串函数转为函数
const convertStringToFunction = (funStr) => {
  return new Function(`return (${funStr.trim()})`)();
}

//#region 更多功能相关
const showMoreDialog = ref(false)
const saveModuleName = ref('')
const savedModules = ref([])
const exportedContent = ref('')

// 初始化时从localStorage加载已保存的模块
onMounted(() => {
  const storedModules = localStorage.getItem('savedModules')
  if (storedModules) {
    try {
      savedModules.value = JSON.parse(storedModules)
      // // 添加到菜单中
      // savedModules.value.forEach(addModule)
    } catch (e) {
      console.error('Failed to parse saved modules:', e)
    }
  }
})

// 保存当前模块到localStorage
const saveCurrentModule = () => {
  if (!saveModuleName.value.trim()) {
    ElMessage.warning('请输入模块名称')
    return
  }

  const moduleToSave = {
    name: saveModuleName.value,
    ...inputOutputFormData.value,
    processes: inputOutputFormData.value.processes.map(p => ({
      ...p,
      handlerStr: p.handlerStr || p.handler?.toString() || templateHandlerStr
    }))
  }

  // 检查是否已存在同名模块
  const existingIndex = savedModules.value.findIndex(m => m.name === saveModuleName.value)
  if (existingIndex >= 0) {
    savedModules.value[existingIndex] = moduleToSave
  } else {
    savedModules.value.push(moduleToSave)
  }

  // 保存到localStorage
  localStorage.setItem('savedModules', JSON.stringify(savedModules.value))
  ElMessage.success('模块保存成功')
  saveModuleName.value = ''
}

// 加载保存的模块
const loadModule = (module) => {
  inputOutputFormData.value.inputs = parseInputs(module.inputs)
  inputOutputFormData.value.processes = module.processes.map(p => {
    // 确保handler函数被正确转换
    if (p.handlerStr && !p.handler) {
      p.handler = convertStringToFunction(p.handlerStr)
    }
    return p
  })
  ElMessage.success(`已加载模块: ${module.name}`)
  showMoreDialog.value = false
}

// 删除保存的模块
const deleteModule = (index) => {
  savedModules.value.splice(index, 1)
  localStorage.setItem('savedModules', JSON.stringify(savedModules.value))
  ElMessage.success('模块已删除')
}

// 导出当前模块
const exportModule = () => {
  const moduleToExport = {
    ...inputOutputFormData.value,
    processes: inputOutputFormData.value.processes.map(p => ({
      ...p,
      handlerStr: p.handlerStr || p.handler?.toString() || templateHandlerStr
    }))
  }

  exportedContent.value = JSON.stringify(moduleToExport, null, 2)

  try {
    // 尝试创建并下载文件
    const blob = new Blob([exportedContent.value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `module_export_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    ElMessage.success('模块已导出为文件')
  } catch (e) {
    console.error('Failed to export file:', e)
    ElMessage.info('文件导出失败，请使用复制功能')
  }
}

// 复制导出内容
const copyExportContent = () => {
  navigator.clipboard.writeText(exportedContent.value)
    .then(() => ElMessage.success('内容已复制到剪贴板'))
    .catch(() => ElMessage.error('复制失败，请手动复制'))
}
//#endregion
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  gap: 20px;
  padding: 20px;
}

.side-menu-container {
  display: flex;
  flex-direction: column;
  width: 150px;
}

.side-menu {
  flex: 1;
  overflow-y: auto;
}

.more-button {
  margin-top: 10px;
}

.left-panel,
.middle-panel,
.right-panel {
  flex: 1;
  overflow-y: auto;
}

.more-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-section {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
}

.save-section {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.saved-modules {
  margin-top: 15px;
}

.saved-module-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.module-actions {
  display: flex;
  gap: 8px;
}

.export-content {
  margin-top: 15px;
}
</style>