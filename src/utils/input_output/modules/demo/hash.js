// 定义菜单
const menu = ['安全工具', '哈希计算']

// 标题
const title = '文本哈希计算'

// 定义输入类型
const inputs = [{ title: '输入文本', content: 'Hello World!' }]

// 定义处理函数
const processes = [
  {
    title: '计算SHA-1',
    handler: async function ({ inputs }) {
      try {
        const text = inputs[0]
        const encoder = new TextEncoder()
        const data = encoder.encode(text)
        const hashBuffer = await crypto.subtle.digest('SHA-1', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        return hashHex
      } catch (error) {
        return `错误: ${error.message || '浏览器不支持此哈希算法'}`
      }
    },
  },
  {
    title: '计算SHA-256',
    handler: async function ({ inputs }) {
      try {
        const text = inputs[0]
        const encoder = new TextEncoder()
        const data = encoder.encode(text)
        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        return hashHex
      } catch (error) {
        return `错误: ${error.message || '浏览器不支持此哈希算法'}`
      }
    },
  },
]

export { inputs, processes, menu, title }
