// 读取前面目录下所有的目录下的js文件，并导出
const modules = []
// 使用import.meta.glob来替代require.context
const files = import.meta.glob('./**/*.js', { eager: true })
Object.keys(files).forEach((key) => {
  const module = files[key]
  modules.push({
    ...module,
    processes: module.processes || [],
    title: module.title || key,
  })
})
export default modules
