import {
  addFormattedStringOfNumbers as add,
  EXCEPTION_MAX_TWO_NUMBERS
} from './calculator'

// input, expected output
type TestCases = Array<[string, number?]>

test('should return a number', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 5001]]

  testCases.forEach(tc => {
    expect(typeof add(tc[0])).toBe('number')
  })
})

test('should add up the numbers delimited by a ","', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 5001], ['4,-3', 1]]

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
})

test('should throw an exception if there are more than 2 numbers', () => {
  const testCases: TestCases = [['20,1,2'], ['1,5000,2']]

  testCases.forEach(tc => {
    expect(() => {
      add(tc[0])
    }).toThrow(EXCEPTION_MAX_TWO_NUMBERS)
  })
})

test('invalid/missing numbers should be converted to 0', () => {
  const testCases: TestCases = [['', 0], ['5,tytyt', 5]]

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
})
