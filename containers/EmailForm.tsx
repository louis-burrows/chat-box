import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { PointSpreadLoading } from 'react-loadingg';

const Input: React.FC = ({ }): JSX.Element => {

  const [email, updateFormEmail] = useState<string>("")
  const [inputColor, toggleColor] = useState<string>("bg-red-100")
  const [messageFromAxios, setAxiosMessage] = useState<string>("")
  const [fetchInProgress, changeProgressState] = useState<boolean>(false)
  const showLoader = fetchInProgress ? "block" : "hidden"

  
    const sendEmail = async () => {
    changeProgressState(true);
    updateFormEmail("");
    try {
      const { data } = await axios('/api/users/create', {
        method: "POST",
        data: {
          email
        }
      })
      setTimeout(() => {
        changeProgressState(false)
        console.log(data.message)
        setAxiosMessage(data.message)
      }, 2000);
    }
    catch (error) {
      setTimeout(() => {
        changeProgressState(false)
        console.log(error.message)
        setAxiosMessage(error.response.data.message)
      }, 2000);
    }
  }
  

  useEffect(() => {
    if (email) {
      toggleColor("bg-green-100");
      setAxiosMessage("");
    } else {
      toggleColor("bg-red-100");
    }
  }, [email]);


  return (
    <>
      <div className="">
        <label
          htmlFor="addEmail"
          className="m-5"
        >
          Enter your email:
        </label>

        <input
          className={`${inputColor} m-5 border-solid border-2 border-blue-500 rounded p-0.5`}
          type="text"
          name="addEmail"
          id="addEmail"
          value={email}
          onChange={e => updateFormEmail(e.target.value)}
        />

        <button
          onClick={() => sendEmail()}
          className="m-5 rounded border-solid border-2 border-blue-500 p-0.5 bg-white font-bold"
        >
          Submit
        </button>

        <p>{messageFromAxios}</p>

        <div className={`${showLoader}`}>
          <PointSpreadLoading color="#bbadb5" size="large"/>
        </div>

      </div>
    </>
  )
}

export default Input;
