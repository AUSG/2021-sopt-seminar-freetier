import React, { useEffect, useState } from 'react';
import { Meeting } from '../interfaces';
import { rest } from '../utils/axios';
import {LiveMeeting} from './LiveMeeting'
import {ClosedMeeting} from './ClosedMeeting'

interface Meetings {
  liveMeetings: Meeting[];
  closedMeetings: Meeting[];
}

export const MeetingList = () => {
    const [ meetingName, setMeetingName ] = useState<string>('')
    const [ liveMeetings, setLiveMeetings ] = useState<Meeting[]>([])
    const [ closedMeetings, setClosedMeetings ] = useState<Meeting[]>([])
    
    useEffect(() => {
      const fetchMeetings = async () => {
        const meetings: Meetings = await rest.get('/meetings');
        setLiveMeetings(meetings.liveMeetings)
        setClosedMeetings(meetings.closedMeetings)
      }

      fetchMeetings()
    }, [])

    async function createMeeting() {
      const { meeting } = await rest.post('/meetings', { name: meetingName})
      const newLiveMeetings: Meeting[] = liveMeetings.slice()
      newLiveMeetings.push(meeting)
      setLiveMeetings(newLiveMeetings)
      setMeetingName('')
    }

    return (
      <div>
        <div>
          <h1>미팅 생성</h1>
          <input type="text" placeholder="미팅 이름" value={meetingName} onChange={ (e)=>{setMeetingName(e.target.value);} }/>
          <button onClick={createMeeting}>
            생성하기
          </button>
        </div>
        <div>
          <h1>Live Meetings</h1>
          <div>
          {
            liveMeetings.map((meeting) => {
              return (<LiveMeeting key={meeting.id} meeting={meeting} />)
            })
          }
          </div>
        </div>
        <div>
          <div>
            <h1>Closed Meetings</h1>
            {
              closedMeetings.map((meeting) => {
                return (<ClosedMeeting key={meeting.id} meeting={meeting} />)
              })
            }
          </div>
        </div>
      </div>
    );
  }