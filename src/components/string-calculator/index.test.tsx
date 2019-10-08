import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import StringCalculator from '.'

jest.mock('../../services/calculator', () => ({
  addFormattedStringOfNumbers: jest.fn(() => 24)
}))

it('renders the StringCalculator component', () => {
  const { getByTestId, queryByText } = render(<StringCalculator />)
  const textArea = getByTestId(
    'formattedStringOfNumbers'
  ) as HTMLTextAreaElement
  const clearInputBtn = getByTestId('clearInputBtn')
  const calculateAdditionBtn = getByTestId('calculateAdditionBtn')
  const calculatedSumText = getByTestId('calculatedSum')
  const errorMessage = queryByText(/error/i)

  expect(textArea).toBeTruthy()
  expect(clearInputBtn).toBeTruthy()
  expect(clearInputBtn.textContent).toBe('Clear Input')
  expect(calculateAdditionBtn).toBeTruthy()
  expect(calculateAdditionBtn.textContent).toBe('Calculate Addition')
  expect(calculatedSumText.textContent).toBeFalsy()
  expect(errorMessage).toBeNull()

  fireEvent.change(textArea, { target: { value: '10,14' } })
  expect(textArea.value).toBe('10,14')

  fireEvent.click(calculateAdditionBtn)
  expect(calculatedSumText.textContent).toBe('24')

  fireEvent.click(clearInputBtn)
  expect(textArea.value).toBe('')
  expect(calculatedSumText.textContent).toBe('')
})
