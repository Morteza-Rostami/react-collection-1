import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div
      className='
      p-4
      bg-indigo-100
      '
    >
      <nav
        className='
          flex flex-col gap-4
        '
      >
        <Link
          className='
            underline
            text-lg
            hover:text-blue-400
          '
          to={'/comments-section'}
        >
          comments-section
        </Link>
      </nav>
    </div>
  )
}

export default HomePage
