// 定义输入类型
const inputs = ['hallo', ' ', 'world']
// 定义处理函数
const process = {
  title: '合并字符串',
  handler: function ({ inputs }) {
    return inputs.join('')
  },
}
const processes = [process]
export { inputs, processes }
