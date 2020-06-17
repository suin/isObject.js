import { isObject } from '.'

describe('example usage', () => {
  type Foo = {
    readonly a: string
    readonly b: {
      readonly c: {
        readonly d: string
      }
    }
  }

  // Define user-defined type guard function
  const isFoo = (value: unknown): value is Foo =>
    isObject<Foo>(value) &&
    typeof value.a === 'string' &&
    isObject<Foo['b']>(value.b) &&
    isObject<Foo['b']['c']>(value.b.c) &&
    typeof value.b.c.d === 'string'

  test('example1', () => {
    const value: unknown = {
      a: 'hello',
      b: { c: { d: 'world' } },
    }

    if (isFoo(value)) {
      const str: string = value.a + ' ' + value.b.c.d
      expect(str).toBe('hello world')
    } else {
      fail()
    }
  })
})

// noinspection JSPrimitiveTypeWrapperUsage
const truthyValues = [
  {},
  { a: 1 },
  new Number(0),
  new String(''),
  [],
  [1, 2, 3],
  /regex/,
  new Map(),
  new Set(),
]

const falsyValues = [
  undefined,
  null,
  NaN,
  0,
  1,
  BigInt(0),
  '',
  'string',
  Symbol(),
  () => {},
  new Function(),
]

const toTable = <T>(value: T): T[] => [value]

describe('isObject', () => {
  describe('falsy', () => {
    test.each(falsyValues.map(toTable))('%O', value => {
      expect(isObject(value)).toBe(false)
    })
  })

  describe('truthy', () => {
    test.each(truthyValues.map(toTable))('%O', value => {
      expect(isObject(value)).toBe(true)
    })
  })
})
