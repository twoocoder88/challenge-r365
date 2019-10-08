export const EXCEPTION_MAX_TWO_NUMBERS = 'Only 2 numbers are allowed.'
export const NEGATIVE_NUMBERS_NOT_ALLOWED = 'Negative numbers are not allowed: '

export function addFormattedStringOfNumbers(stringOfNumbers: string): number {
  // convert string to array of potential numbers that are delimited by ',' or '\n' newline char
  const numbers = stringOfNumbers
    .split(/[,\n]/)
    .map(num => parseInt(num, 10))
    .filter(num => num)

  // track sum and negative numbers
  const result = numbers.reduce<[number, Array<number>]>(
    (agg, cur) => {
      if (cur < 0) {
        agg[1].push(cur)
      }
      agg[0] += cur

      return agg
    },
    [0, []]
  )

  // throw exception if there are negative numbers
  if (result[1].length > 0) {
    throw `${NEGATIVE_NUMBERS_NOT_ALLOWED}${result[1].join(', ')}`
  }

  // else return sum
  return result[0]
}
