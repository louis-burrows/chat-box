import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { PointSpreadLoading } from 'react-loadingg';

const Input: React.FC = ({ }): JSX.Element => {

  const [email, updateFormEmail] = useState<string>("");
  const [inputColor, toggleColor] = useState<string>("bg-red-100");
  const [messageFromAxios, setAxiosMessage] = useState<string>("");
  const [fetchInProgress, changeProgressState] = useState<boolean>(false);

  const [buttonDisabled, toggleDisabled] = useState(true);
  const buttonDisabledStyles = buttonDisabled ? "cursor-default opacity-30" : "cursor-pointer opacity-100";

  const showLoader = fetchInProgress ? "block" : "hidden";
  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sendEmail = async (): Promise<void> => {
    changeProgressState(true);
    try {
      const { data } = await axios('/api/users/create', {
        method: "POST",
        data: {
          email
        }
      })
      setTimeout(() => {
        changeProgressState(false)
        updateFormEmail("");
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
    if (validEmail.test(email)) {
      toggleDisabled(false);
      toggleColor("bg-green-100");
      setAxiosMessage("");
    } else {
      toggleColor("bg-red-100");
      toggleDisabled(true);
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
          type="email"
          name="addEmail"
          id="addEmail"
          value={email}
          onChange={e => updateFormEmail(e.target.value)}
        />

        <button
          disabled={buttonDisabled}
          onClick={() => sendEmail()}
          className={`${buttonDisabledStyles} rounded border-solid border-2 border-blue-500 p-0.5 bg-white font-bold`}
        >
          Submit
        </button>

        {messageFromAxios && (
          <p>{messageFromAxios}</p>
        )}

        <div className={`${showLoader}`}>
          <PointSpreadLoading color="#eeeeee" size="large" />
        </div>

      </div>
    </>
  )
}

export default Input;
