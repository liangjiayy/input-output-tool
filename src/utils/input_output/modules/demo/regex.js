// 定义菜单
const menu = ['文本工具', '正则表达式']

// 标题
const title = '正则表达式测试'

// 定义输入类型
const inputs = [
  {
    title: '测试文本',
    content: 'Hello World! My email is example@example.com and my phone is 123-456-7890.',
  },
  { title: '正则表达式', content: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b' },
  { title: '标志(g,i,m)', content: 'g' },
]

// 定义处理函数
const processes = [
  {
    title: '匹配结果',
    handler: function ({ inputs }) {
      try {
        const text = inputs[0]
        const regexStr = inputs[1]
        const flags = inputs[2] || ''

        const regex = new RegExp(regexStr, flags)
        const matches = text.match(regex)

        if (!matches) return '没有找到匹配项'

        if (flags.includes('g')) {
          return `找到 ${matches.length} 个匹配项:\n${matches.join('\n')}`
        } else {
          return `找到匹配项: ${matches[0]}\n组匹配: ${JSON.stringify(matches.slice(1))}`
        }
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
  {
    title: '替换',
    handler: function ({ inputs }) {
      try {
        const text = inputs[0]
        const regexStr = inputs[1]
        const flags = inputs[2] || ''

        // 使用第四个输入作为替换文本，如果没有则使用默认值
        const replacement = inputs[3] || '<替换>'

        const regex = new RegExp(regexStr, flags)
        const result = text.replace(regex, replacement)

        return result
      } catch (error) {
        return `错误: ${error.message}`
      }
    },
  },
]

// 添加第四个输入框用于替换文本
inputs.push({ title: '替换文本', content: '<替换>' })

export { inputs, processes, menu, title }
