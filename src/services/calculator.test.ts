import {
  addFormattedStringOfNumbers as add,
  NEGATIVE_NUMBERS_NOT_ALLOWED
} from './calculator'

// input, expected output, exception
type TestCases = Array<[string, number?, string?]>

function runTestCases(testCases: TestCases): void {
  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
}

test('should return a number', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 1]]

  testCases.forEach(tc => {
    expect(typeof add(tc[0])).toBe('number')
  })
})

test('should add up the numbers delimited by a ","', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 1], ['4,3', 7]]
  runTestCases(testCases)
})

// test('should throw an exception if there are more than 2 numbers', () => {
//   const testCases: TestCases = [['20,1,2'], ['1,5000,2']]

//   testCases.forEach(tc => {
//     expect(() => {
//       add(tc[0])
//     }).toThrow(EXCEPTION_MAX_TWO_NUMBERS)
//   })
// })

test('invalid/missing numbers should be converted to 0', () => {
  const testCases: TestCases = [['', 0], ['5,tytyt', 5]]
  runTestCases(testCases)
})

test('supports adding an unlimited number of numbers', () => {
  const testCases: TestCases = [
    ['1,2,3,4,5', 15],
    ['1,2,3,4,5,6,7,8,9,10,11,12', 78],
    ['1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 120]
  ]
  runTestCases(testCases)
})

test('should support the new line character "\\n" as another delimiter', () => {
  const testCases: TestCases = [['1\n2,3', 6], ['2\n4\n6', 12]]
  runTestCases(testCases)
})

test('should throw an exception when negative numbers are included', () => {
  const testCases: TestCases = [
    ['-1\n2,-3', undefined, `${NEGATIVE_NUMBERS_NOT_ALLOWED}-1, -3`],
    ['-1,2,3,-4', undefined, `${NEGATIVE_NUMBERS_NOT_ALLOWED}-1, -4`]
  ]

  testCases.forEach(tc => {
    expect(function() {
      add(tc[0])
    }).toThrow(tc[2])
  })
})

test('should ignore numbers greater than 1000', () => {
  const testCases: TestCases = [
    ['999', 999],
    ['1,1000,7', 1008],
    ['1,12340,999', 1000]
  ]
  runTestCases(testCases)
})

test('should support 1 additional character delimiter', () => {
  const testCases: TestCases = [
    ['//;\n2;5', 7],
    ['//a\n2a5', 7],
    ['//*\n2*5', 7]
  ]
  runTestCases(testCases)
})

test('should support 1 custom delimiter of any length', () => {
  const testCases: TestCases = [
    ['//[***]\n11***22***33', 66],
    ['//[&&&]\n11&&&22&&&33', 66],
    ['//[..]\n11..22..33', 66],
    ['//[$$$$$]\n11$$$$$22$$$$$33', 66],
    ['//[r9r]\n11r9r22r9r33', 66],
    ['//[r9r]\n11rr22r9r33', 44]
  ]
  runTestCases(testCases)
})

test('should support multiple delimiters of any length', () => {
  const testCases: TestCases = [
    ['//[*][!!][r9r]\n11r9r22*33!!44', 110],
    ['//[*][!!][break]\n11break22*33!!44', 110],
    ['//[*][!!][w1llth1sbreak]\n11w1llth1sbreak22*33!!44', 110],
    ['//[*][!!][w1llth1sbre[ak]\n11w1llth1sbre[ak22*33!!44', 110]
  ]
  runTestCases(testCases)
})
