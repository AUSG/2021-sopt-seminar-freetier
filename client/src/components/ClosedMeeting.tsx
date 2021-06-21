import React, { FC } from 'react';
import { Meeting } from '../interfaces'
import styled from 'styled-components'

interface Props {
  meeting: Meeting
}

const Box = styled.div`
  width: 512px;
  height: 160px;
  border: 2px solid;
  color: black;
  margin-top: 5px;
  padding-left: 5px;
`

export const ClosedMeeting: FC<Props> = ({ meeting }) => {
    return (
      <Box>
        <p>이름: {meeting.name}</p>
        <p>
          시작 시간: {meeting.start}
        </p>
        <p>
          종료 시간: {meeting.end}
        </p>
        <p>
          참가자 수: {meeting.participants}
        </p>
      </Box>
    );
  }