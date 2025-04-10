// 定义菜单
const menu = ['系统工具', '日期时间']

// 标题
const title = '日期时间转换'

// 定义输入类型
const inputs = [{ title: '时间戳/日期字符串', content: '' }]

// 获取当前时间戳
inputs[0].content = Date.now().toString()

// 定义处理函数
const processes = [
  {
    title: '时间戳转日期时间',
    handler: function ({ inputs }) {
      try {
        const timestamp = parseInt(inputs[0], 10)
        if (isNaN(timestamp)) throw new Error('无效的时间戳')

        const date = new Date(timestamp)
        if (date.toString() === 'Invalid Date') throw new Error('无效的日期')

        return (
          `ISO格式: ${date.toISOString()}\n` +
          `本地格式: ${date.toLocaleString()}\n` +
          `UTC格式: ${date.toUTCString()}`
        )
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: '日期字符串转时间戳',
    handler: function ({ inputs }) {
      try {
        const dateStr = inputs[0].trim()
        const date = new Date(dateStr)
        if (date.toString() === 'Invalid Date') throw new Error('无效的日期字符串')

        return (
          `时间戳(毫秒): ${date.getTime()}\n` + `时间戳(秒): ${Math.floor(date.getTime() / 1000)}`
        )
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: '获取当前时间',
    handler: function () {
      const now = new Date()
      return (
        `当前时间:\n` +
        `ISO格式: ${now.toISOString()}\n` +
        `本地格式: ${now.toLocaleString()}\n` +
        `UTC格式: ${now.toUTCString()}\n` +
        `时间戳(毫秒): ${now.getTime()}\n` +
        `时间戳(秒): ${Math.floor(now.getTime() / 1000)}`
      )
    },
  },
]

export { inputs, processes, menu, title }
