export const EXCEPTION_MAX_TWO_NUMBERS = 'Only 2 numbers are allowed.'

export function addFormattedStringOfNumbers(stringOfNumbers: string): number {
  // convert string to array of potential numbers that are delimited by ','
  const numbers = stringOfNumbers
    .split(',')
    .map(num => parseInt(num, 10))
    .filter(num => num)

  // add up numbers in array and return result
  return numbers.reduce((sum, cur) => {
    return sum + cur
  }, 0)
}
