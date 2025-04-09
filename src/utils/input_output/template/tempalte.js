const templateHandlerStr = `
/**
 * 一个模板函数，用于处理用户的输入并返回处理后的结果。
 * 该函数接受一个包含 \`input\` 和 \`inputs\` 的对象参数，其中 \`input\` 是单个输入，\`inputs\` 是输入数组。
 * 函数的设计保证 \`input\` 始终等于 \`inputs\` 数组的第一个元素（即 \`input === inputs[0]\`）。
 * 输出结果可以是 \`input\` 的类型（单个输入）或 \`inputs\` 的类型（输入数组），具体取决于实现逻辑。
 *
 * @template T - 输入的类型，可以是字符串或具有 \`title\` 和 \`content\` 属性的对象。
 * @param {Object} param0 - 输入参数对象。
 * @param {T} param0.input - 单个输入，可以是字符串或对象 \`{title: string, content: string}\`。
 * @param {T[]} param0.inputs - 输入数组，包含多个输入项，其中 \`inputs[0]\` 始终等于 \`input\`。
 * @returns {T | T[]} - 返回值可以是单个输入（与 \`input\` 类型相同）或输入数组（与 \`inputs\` 类型相同），取决于具体实现。
 *
 * 以下是两个可能的输入参数。
 * @example
 * // 示例 1: 字符串输入
 * { input: "hello", inputs: ["hello", "world"] }
 *
 * @example
 * // 示例 2: 对象输入
 * {
 *   input: { title: "Greeting", content: "Hello" },
 *   inputs: [{ title: "Greeting", content: "Hello" }, { title: "Bye", content: "Goodbye" }]
 * }
 */
function ({ input, inputs }) {
  // ... 具体的处理逻辑
  return input;
}
`

export { templateHandlerStr }
