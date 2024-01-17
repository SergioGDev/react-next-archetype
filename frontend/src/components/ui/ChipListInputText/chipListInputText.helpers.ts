export const isValidate = (value: string, pattern?: RegExp) => (pattern === undefined ? true : pattern.test(value));
