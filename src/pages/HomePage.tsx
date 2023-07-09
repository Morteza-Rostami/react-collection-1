import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div
      className='
      p-4
      bg-indigo-100
      h-full

      '
    >
      <nav
        className='
          flex flex-col gap-4
        '
      >
        {/* <Link
          className='
            underline
            text-lg
            hover:text-blue-400
          '
          to={'/comments-section'}
        >
          comments-section
        </Link> */}

        <Link
          className='
            underline
            text-lg
            hover:text-blue-400
          '
          to={'/stop-watch'}
        >
          stop-watch
        </Link>
      </nav>
    </div>
  )
}

export default HomePage
