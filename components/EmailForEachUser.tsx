import React, { useState, useEffect } from 'react';

type EmailDetailsForUser = {
  numberOfParticipants: number;
  emails: string[];
  updateEmails: (email: string, index: number) => void;
}

const EmailForEachUser: React.FC<EmailDetailsForUser> = ({ numberOfParticipants, emails, updateEmails }): any => {
  const emailInputs: JSX.Element[] = []

  for (let i = 1; i <= numberOfParticipants; i++) {
    const arrayIndex = i - 1
    emailInputs.push(
      <>
        <p>Email address {i}</p>
        <input key={`email-${arrayIndex}`} type="email" onChange={(e) => updateEmails(e.target.value, arrayIndex)} value={emails[arrayIndex]} />
      </>
    )
  }

  return emailInputs.map(input => input)
}

export default EmailForEachUser;
