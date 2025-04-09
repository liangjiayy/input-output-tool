// 定义菜单
const menu = ['demo', '菜单demo']

// 标题
const title = '复制N次'

// 定义输入类型
const inputs = ['hallo', { title: '复制次数', content: '9' }]
// 定义处理函数
const process = {
  title,
  handler: function ({ inputs }) {
    return inputs[0].repeat(Number(inputs[1]))
  },
}
const processes = [process]
export { inputs, processes, menu, title }
