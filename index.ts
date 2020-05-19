/**
 * Return if the given `value` is a type `object`.
 *
 * This function gives the TypeScript compiler the typing-hint that the given
 * `value` is possibly the type of the given `T`.
 *
 * @param value
 */
export const isObject = <T extends object>(
  value: unknown,
): value is { [P in keyof T]?: unknown } =>
  typeof value === 'object' && value !== null
