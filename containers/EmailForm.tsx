import React, { useState, useEffect } from 'react';

const Input: React.FC = ({ }): JSX.Element => {

  const [email, updateFormEmail] = useState<string>("")

  const sendEmail = (): void => {
    alert(email)
  }


  return (
    <>
      <div>
        <label
          htmlFor="addEmail"
        >
          Enter your email:
        </label>

        <input
          type="text"
          name="addEmail"
          id="addEmail"
          onInput={e => updateFormEmail(e.target.value)}
        />

        <button
          onClick={() => sendEmail()}
        >
          Submit
        </button>


      </div>
    </>
  )
}

export default Input;
