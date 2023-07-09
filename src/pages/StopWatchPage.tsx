import { Button, IconButton } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { MdOutlineMotionPhotosPaused, MdPlayCircleFilled, MdTimer } from 'react-icons/md'
import { LuTimerReset } from 'react-icons/lu'

type State = {
  seconds: number,
  minutes: number,
  hours: number,
  elapsedTime: number,
  startTime: number,
  timeLaps: string[],
  timerOn: boolean,
}

const StopWatchPage = () => {
  // reference to setInterval
  const timerInterval: any = useRef(null);
  
  const [state, setState] = useState<State>({
    seconds: 0,
    minutes: 0,
    hours: 0,
    elapsedTime: 0,
    startTime: 0,
    // array of time lapses
    timeLaps: [],
    timerOn: false,
  });

  // startTimer 
  function startTimer(): void {

    // set timer is on 
    setState(c => ({
      ...c,
      timerOn: true,
    }))

    // get the start time // also: we sub by the elepsedTime in case we pause and start again.

    // start again.
    setState(c => ({
      ...c,
      // time of now - elapsedTime from the previus interval, before we set the 
      // new elapsed time.
      startTime: Date.now() - state.elapsedTime,   
    }));

    // interval loop each 1 second and calcs the elapsed time
    timerInterval.current = setInterval(() => {
      // each second calc the new elapsed time
      setState(c => ({ 
        ...c,
        elapsedTime: Date.now() - c.startTime,
      }));

      // set new state of: hours, minutes, seconds
      setState(c => ({
        ...c,
        hours: Math.floor((c.elapsedTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((c.elapsedTime / (1000 * 60)) % 60),
        seconds: Math.floor((c.elapsedTime / 1000) % 60),
      }))
    }, 1000);
  }

  // stop thimer
  function pauseTimer(): void {

    // just clear the interval
    clearInterval(timerInterval.current);
    setState(c => ({
      ...c,
      timerOn: false,
    }))
  }

  function resetTimer(): void {
    clearInterval(timerInterval.current);
    setState(c => ({
      ...c,
      elapsedTime: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      timerOn: false,
    }))
  }

  // click this and get screenshot of the time at that moument
  function lapTimer(): void { 
    const timeLap: string = 
      `${state.hours < 10 ? '0' + state.hours : state.hours} : 
      ${state.minutes < 10 ? '0' + state.minutes : state.minutes } : 
      ${state.seconds < 10 ? '0' + state.seconds : state.seconds}`
    setState(c => ({
      ...c,
      timeLaps: [...c.timeLaps, timeLap]
    }))
  }

  return (
    <div
      className='
      p-4
      bg-indigo-100
      flex-1
      '
      style={{
        height: '100%'
      }}
    >
      {/* stop-watch */}
      <div
      className='
      flex flex-col gap-4 items-center justify-center
      bg-slate-500
      p-4
      rounded-md
      h-full
      '   
      >

        <div
          className='
          flex gap-4 items-center justify-center 
          text-center
          bg-indigo-400
          '
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%'
          }}
        >
          <div
            className='
            font-bold text-4xl text-white
            '
          >
            {
              state.hours < 10
              ? (
                `0${state.hours}`
              )
              : (state.hours)
            }
          </div>
          <Colon/>
          <div
          className='
          font-bold text-4xl text-white
          '
          >
            {
              state.minutes < 10
              ? (
                `0${state.minutes}`
              )
              : (state.minutes)
            }
          </div>
          <Colon/>
          <div
          className='
          font-bold text-4xl text-white
          '
          >
            {
              state.seconds < 10
              ? (
                `0${state.seconds}`
              )
              : (state.seconds)
            }
          </div>
        </div>
        <div
          className='
          flex gap-4 items-center
          '
        >
          <IconButton
            onClick={startTimer}
            aria-label=''
            isDisabled={ state.timerOn }
            rounded={'full'}
          >
            <MdPlayCircleFilled
              size={30}
            />
          </IconButton>
          <IconButton
            rounded={'full'}
            onClick={pauseTimer}
            aria-label=''
          >
            <MdOutlineMotionPhotosPaused
              size={30}
            />
          </IconButton>
          <IconButton
            rounded={'full'}
            onClick={resetTimer}
            aria-label=''
          >
            <LuTimerReset
              size={30}
            />
          </IconButton>
          <IconButton
            rounded={'full'}
            onClick={lapTimer}
            aria-label=''
          >
            <MdTimer
              size={30}
            />
          </IconButton>
        </div>

        {/* show time laps */}
        <div
          className='
          flex flex-col items-center
          bg-slate-200
          p-3
          rounded-md
          text-center
          '
          style={{
            minWidth: '300px',
            height: '200px',
            overflow: 'auto',
          }}
        >
          {
            state.timeLaps.length
            ? (
              state.timeLaps.map((lap, inx) => {
                return (
                  <p
                    key={inx}
                  >
                    {lap}
                  </p>
                )
              })
            )
            : ('')
          }
        </div>
      </div> {/* stop-watch */}
    </div>
  )
}

const Colon = (): any => {
  return (
    <span
      className='
      text-white font-bold text-2xl
      '
    >
    :
    </span>
  )
}

export default StopWatchPage
