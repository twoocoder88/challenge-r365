import {
  addFormattedStringOfNumbers as add,
  NEGATIVE_NUMBERS_NOT_ALLOWED
} from './calculator'

// input, expected output, exception
type TestCases = Array<[string, number?, string?]>

test('should return a number', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 1]]

  testCases.forEach(tc => {
    expect(typeof add(tc[0])).toBe('number')
  })
})

test('should add up the numbers delimited by a ","', () => {
  const testCases: TestCases = [['20', 20], ['1,5000', 1], ['4,3', 7]]

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
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

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
})

test('supports adding an unlimited number of numbers', () => {
  const testCases: TestCases = [
    ['1,2,3,4,5', 15],
    ['1,2,3,4,5,6,7,8,9,10,11,12', 78],
    ['1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 120]
  ]

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
})

test('should support the new line character "\\n" as another delimiter', () => {
  const testCases: TestCases = [['1\n2,3', 6], ['2\n4\n6', 12]]

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1])
  })
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
    ['1,12340,999', 1000],
  ];

  testCases.forEach(tc => {
    expect(add(tc[0])).toBe(tc[1]);
  });
});
