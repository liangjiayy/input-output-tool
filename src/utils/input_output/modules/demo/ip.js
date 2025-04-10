// 定义菜单
const menu = ['网络工具', 'IP工具']

// 标题
const title = 'IP地址转换'

// 定义输入类型
const inputs = [{ title: 'IP地址', content: '192.168.1.1' }]

// 定义处理函数
const processes = [
  {
    title: 'IP转二进制',
    handler: function ({ inputs }) {
      try {
        const ip = inputs[0].trim()
        const parts = ip.split('.')
        if (parts.length !== 4) throw new Error('无效的IP地址格式')

        return parts
          .map((part) => {
            const num = parseInt(part, 10)
            if (isNaN(num) || num < 0 || num > 255) throw new Error('IP段必须在0-255之间')
            return num.toString(2).padStart(8, '0')
          })
          .join('.')
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: 'IP转十六进制',
    handler: function ({ inputs }) {
      try {
        const ip = inputs[0].trim()
        const parts = ip.split('.')
        if (parts.length !== 4) throw new Error('无效的IP地址格式')

        return parts
          .map((part) => {
            const num = parseInt(part, 10)
            if (isNaN(num) || num < 0 || num > 255) throw new Error('IP段必须在0-255之间')
            return num.toString(16).padStart(2, '0').toUpperCase()
          })
          .join('.')
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: 'IP转整数',
    handler: function ({ inputs }) {
      try {
        const ip = inputs[0].trim()
        const parts = ip.split('.')
        if (parts.length !== 4) throw new Error('无效的IP地址格式')

        let result = 0
        for (let i = 0; i < 4; i++) {
          const num = parseInt(parts[i], 10)
          if (isNaN(num) || num < 0 || num > 255) throw new Error('IP段必须在0-255之间')
          result = (result << 8) + num
        }
        return result.toString()
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
]

export { inputs, processes, menu, title }
