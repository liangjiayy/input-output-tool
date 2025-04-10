const templateHandlerStr = `
/**
 * 处理输入和输出，生成新的输出内容。
 *
 * @param {Object} params - 包含以下属性的参数对象：
 * @param {string} params.input - 第一个输入框的文本内容，总是等于 \`inputs[0]\`。
 * @param {string[]} params.inputs - 所有输入框的文本内容数组。
 * @param {string} params.pre - 上一个返回值的第一个文本内容，总是等于 \`pres[0]\`。
 * @param {string[]} params.pres - 上一个返回值的所有文本内容数组。
 * @param {Object} params.out - 输出对象，用于构建当前步骤的输出。
 *                              可以通过 \`out.concat()\` 方法添加文本内容，
 *                              或通过 \`out.push()\` 方法添加新的输出框。
 *
 * @returns {void|string|Object} 返回值类型取决于函数的实现：
 *                               - \`void\`：如果无需返回内容，则不返回任何值。
 *                               - \`string\`：如果返回单个文本内容，则返回字符串。
 *                               - \`Object\`：如果返回更复杂的内容（例如包含标题的对象），则返回对象。
 */
function ({input, inputs, pre, pres, out}) {
    // 函数体
}
`
export { templateHandlerStr }
