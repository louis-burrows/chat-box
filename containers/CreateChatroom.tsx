import React, { useState, useEffect, useContext } from 'react';
import EmailForEachUser from '../components/EmailForEachUser';
import { PointSpreadLoading } from 'react-loadingg';
import axios from 'axios'

type CreateChatRoom = {
  refreshChatrooms: () => void
}

import { UniqueIdContext } from '../context/uniqueIdContext'

const CreateChatRoom: React.FC<CreateChatRoom> = ({ refreshChatrooms }): JSX.Element => {
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

  console.log('emails', emails)
  useEffect(() => {
    console.log(postInProgress)
  }, [postInProgress]);

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

        console.log(data.message)
      }, 1000);
    }
    catch (error) {
      setTimeout(() => {
        postProgressState(false)
        console.log(error.message)
      }, 1000);
    }
  }

  return (
    <>

      <div className="flex flex-column max-w-4xl">

        <button className="rounded border-solid border-2 border-blue-500 p-0.5 bg-white font-bold m-3" onClick={() => generateEmailsToSend()}>Create a new chat room</button>

        <input className="m-3 rounded" type="text" placeholder="Name your chatroom" onChange={e => addName(e.target.value)} />

        <label className="m-2" htmlFor="participants">How many participants?</label>

        <input className="m-3 rounded w-10" type="number" min="0" max="5" id="participants" onChange={e => addNumber(e.target.valueAsNumber)} value={createdParticipantNumber} />

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
