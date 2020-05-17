export const isObject = <T extends object>(
  value: unknown,
): value is { [P in keyof T]?: unknown } =>
  typeof value === 'object' && value !== null
