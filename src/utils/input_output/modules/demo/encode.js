// 定义菜单
const menu = ['文本工具', '编码转换']

// 标题
const title = '文本编码转换'

// 定义输入类型
const inputs = [{ title: '输入文本', content: 'Hello World!' }]

// 定义处理函数
const processes = [
  {
    title: '转Base64',
    handler: function ({ inputs }) {
      try {
        return btoa(inputs[0])
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: 'Base64解码',
    handler: function ({ inputs }) {
      try {
        return atob(inputs[0])
      } catch (error) {
        return `错误: 无效的Base64编码 - ${error.message}`
      }
    },
  },
  {
    title: '转URL编码',
    handler: function ({ inputs }) {
      try {
        return encodeURIComponent(inputs[0])
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: 'URL解码',
    handler: function ({ inputs }) {
      try {
        return decodeURIComponent(inputs[0])
      } catch (error) {
        return `错误: 无效的URL编码 - ${error.message}`
      }
    },
  },
]

export { inputs, processes, menu, title }
