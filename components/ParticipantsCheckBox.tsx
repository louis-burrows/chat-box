import React, { useState, useEffect } from 'react';

const Input: React.FC = ({ }): JSX.Element => {

  const [isChecked, toggleCheck] = useState<boolean>(false)


  return (
    <>
      <div>
        <label htmlFor="personCheckbox">Check here</label>
        <input type="checkbox" name="" id="personCheckbox"/>
      </div>
    </>
  )
}

export default Input;