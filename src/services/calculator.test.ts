import { addFormattedStringOfNumbers as add } from './calculator'

// input, expected output
type TestCases = Array<[string, number]>

test('should return a number', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 5001]]

  testCases.forEach(tuple => {
    expect(typeof add(tuple[0])).toBe('number')
  })
})
