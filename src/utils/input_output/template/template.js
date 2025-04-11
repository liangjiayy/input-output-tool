const templateHandlerStr = `
/**
 * 处理输入和输出，生成新的输出内容。
 *
 * @param {Object} params - 包含以下属性的参数对象：
 * @param {string} params.input - 第一个输入框的文本内容，总是等于 \`inputs[0]\`。类型总是为字符串。
 * @param {string[]} params.inputs - 所有输入框的文本内容数组。类型总是为字符串数组。
 * @param {Object} params.inputObj - 第一个输入框文本内容的原始对象（可能包含输入框标题等信息，也可能等于input，取决于输入框是否定义了标题）。总是等于inputObjs[0]。
 * @param {Object[]} params.inputObjs - 所有输入框文本内容的对象数组。
 * @param {string} params.pre - 上一个返回值的第一个文本内容，总是等于 \`pres[0]\`。类型总是为字符串。
 * @param {string[]} params.pres - 上一个返回值的所有文本内容数组。类型总是为字符串数组。
 * @param {Object} params.preObj - 上一个返回值的第一个文本内容的对象（可能包含标题等信息，也可能等于pre，取决于上一个函数如何返回）。总是等于preObjs[0]。
 * @param {Object[]} params.preObjs - 上一个返回值的所有文本内容的对象数组。
 * @param {Object} params.out - 输出对象，用于构建当前步骤的输出。
 * @param {Function} params.out.concat - 添加文本内容的方法。
 * @param {Function} params.out.push - 添加新的输出框的方法。
 *
 * @returns {void|string|Object|Promise} 返回值类型取决于函数的实现：
 *  - \`void\`：如果无需返回内容，则不返回任何值。
 *  - \`string\`：如果返回单个文本内容，则返回字符串。
 *  - \`Object\`：如果返回更复杂的内容（例如包含标题的对象），则返回对象。
 *  - \`Promise\`: 如果需要异步操作，则返回 Promise 对象。Promise 解析后的值将作为返回值。
 */
function ({input, inputs, inputObj, inputObjs, pre, pres, preObj, preObjs, out}) {
    // 函数体
}
`
export { templateHandlerStr }
