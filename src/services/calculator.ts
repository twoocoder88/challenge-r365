export const EXCEPTION_MAX_TWO_NUMBERS = 'Only 2 numbers are allowed.'
export const NEGATIVE_NUMBERS_NOT_ALLOWED = 'Negative numbers are not allowed: '

const findCustomDelimitersRegex = /^\/\/(?:(\[.+\])|(.))\n/
const multipleCharacterDelimiterRegex = /\[([^\]]+)\]/g

export function addFormattedStringOfNumbers(stringOfNumbers: string): number {
  // check to see if we have a custom delimiter with a single character
  // OR one or more multiple character delimiters
  const customDelimiterMatch = stringOfNumbers.match(findCustomDelimitersRegex)
  const customDelimiters: Array<string> = []

  // if there are custom delimiter(s)
  if (customDelimiterMatch !== null) {
    // captures from regex
    const multipleCharacterCapture = customDelimiterMatch[1]
    const singleCharacterCapture = customDelimiterMatch[2]

    if (multipleCharacterCapture) {
      // process multiple character delimiters
      let match
      while (
        (match = multipleCharacterDelimiterRegex.exec(
          multipleCharacterCapture
        )) !== null
      ) {
        customDelimiters.push(match[1])
      }
    }

    // check to see if it is a single character delimiter
    if (singleCharacterCapture) {
      customDelimiters.push(singleCharacterCapture)
    }
  }

  const aggCustomDelimiters = customDelimiters.reduce<string>(
    (agg, curDelimiter) => {
      return agg + '|' + escapeRegExp(curDelimiter)
    },
    ''
  )

  // create regex of all delimiters
  const delimitersRegex = new RegExp(`\n|,${aggCustomDelimiters}`)

  // convert string to array of potential numbers that are delimited by above delimiters
  const numbers = stringOfNumbers
    .split(delimitersRegex)
    .map(num => parseInt(num, 10))
    .filter(num => num)

  // track sum and negative numbers
  const result = numbers.reduce<[number, Array<number>]>(
    (agg, cur) => {
      if (cur < 0) {
        agg[1].push(cur)
      }
      agg[0] += cur > 1000 ? 0 : cur

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

// from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
