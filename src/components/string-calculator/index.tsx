import React, { useState } from 'react'
import './index.css'
import { addFormattedStringOfNumbers as add } from '../../services/calculator'

const StringCalculator: React.FC = () => {
  const [calculatedSum, setCalculatedSum] = useState()
  const [formattedString, setFormattedString] = useState('')

  return (
    <div className="calculator-container">
      <form>
        <div className="calculator">
          <textarea
            className="formatted-input"
            id="formattedStringOfNumbers"
            name="formattedStringOfNumbers"
            cols={30}
            rows={5}
            placeholder="Input formatted string"
            aria-label="Input formatted string"
            onChange={e => setFormattedString(e.target.value)}
            value={formattedString}
            data-testid="formattedStringOfNumbers"
          ></textarea>

          <div className="button-combo">
            <button
              id="clearInputBtn"
              className="btn"
              type="button"
              onClick={() => {
                setFormattedString('')
                setCalculatedSum(undefined)
              }}
              data-testid="clearInputBtn"
            >
              Clear Input
            </button>
            <button
              id="calculateAdditionBtn"
              className="btn"
              type="button"
              onClick={() => setCalculatedSum(add(formattedString))}
              data-testid="calculateAdditionBtn"
            >
              Calculate Addition
            </button>
          </div>
        </div>
      </form>

      <div>
        Calculated Sum:{' '}
        <span data-testid="calculatedSum">
          {calculatedSum !== undefined && calculatedSum}
        </span>
      </div>
    </div>
  )
}

export default StringCalculator
