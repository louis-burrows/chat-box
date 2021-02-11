import React, { useState, useEffect } from 'react';

type AvatarSource = {
  AvatarSource: string
}

const Avatar: React.FC = ({ AvatarSource }): JSX.Element => {

  return (
    <>
    <img src={AvatarSource} alt=""/>
   
    </>
  )
}

export default Avatar;
