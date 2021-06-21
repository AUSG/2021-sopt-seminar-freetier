import React, { FC } from 'react';
import { Meeting } from '../interfaces'
import styled from 'styled-components'
import { useState } from 'react';
import { rest } from '../utils/axios';

interface Props {
  meeting: Meeting
}

const Box = styled.div`
  width: 512px;
  height: 150px;
  border: 2px solid;
  color: black;
  margin-top: 5px;
  padding-left: 5px;
`

export const LiveMeeting: FC<Props> = ({ meeting }) => {
    const [userName, setUserName] = useState('')

    async function enterMeeting() {
      const { url } = await rest.post(`/meetings/${meeting.id}`, { name: userName})
      setUserName('')
      window.open(url)
    }

    async function closeMeeting() {
      await rest.put(`/meetings/${meeting.id}`)
      window.location.reload();
    }

    return (
      <Box>
        <p>이름: {meeting.name}</p>
        <p>
          시작 시간: {meeting.start}
        </p>
        <div>
          <input type="text" placeholder="닉네임" value={userName} onChange={ (e)=>{setUserName(e.target.value);} }/>
          <button onClick={enterMeeting}>
            입장하기
          </button>
        </div>
        <div>
          <button onClick={closeMeeting}>
            종료하기
          </button>
        </div>
      </Box>
    );
  }