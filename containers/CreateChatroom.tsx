import React, { useState, useEffect, useContext } from 'react';
import EmailForEachUser from '../components/EmailForEachUser';
import { PointSpreadLoading } from 'react-loadingg';
import axios from 'axios'



import { UniqueIdContext } from '../context/UniqueIdContext'

const CreateChatRoom: React.FC = (): JSX.Element => {
  const { uniqueId } = useContext(UniqueIdContext)
  const [createdRoomName, addName] = useState("")
  const [createdParticipantNumber, addNumber] = useState(0)
  const [emails, setEmails] = useState<string[]>([])
  const [postInProgress, postProgressState] = useState<boolean>(false);


  const updateEmails = (email: string, index: number) => {
    const newEmails = [...emails]
    newEmails[index] = email
    setEmails(newEmails)
  }

  const generateEmailsToSend = async (): Promise<void> => {
    postProgressState(true)

    try {
      const { data } = await axios('/api/chatrooms/create', {
        method: "POST",
        data: {
          uniqueId: uniqueId,
          name: createdRoomName,
          users: emails
        }
      })
      setTimeout(() => {
        postProgressState(false)
      }, 1000);
    }
    catch (error) {
      setTimeout(() => {
        postProgressState(false)
      }, 1000);
    }
  }

  return (
    <>

      <div className="flex flex-col w-full">

        <div className="flex flex-row w-full justify-center">
        <input className="rounded" type="text" placeholder=" Name your chatroom" onChange={e => addName(e.target.value)} />

        <button className="rounded border-solid border-2 border-blue-400 pr-1 pl-1 bg-white font-bold ml-2" onClick={() => generateEmailsToSend()}>Create room</button>
        </div>

        <div className="flex flex-row justify-center mt-6">
        <label className="mr-4" htmlFor="participants">How many participants?</label>

        <input className="rounded w-6" type="number" min="0" max="5" id="participants" onChange={e => addNumber(e.target.valueAsNumber)} value={createdParticipantNumber} />
        </div>


      </div>

      {postInProgress && (
        <PointSpreadLoading color="#eeeeee" size="large" />
      )}

      <div className="">
        <EmailForEachUser
          numberOfParticipants={createdParticipantNumber}
          emails={emails}
          updateEmails={updateEmails}
        />
      </div>

    </>
  )
}

export default CreateChatRoom;
