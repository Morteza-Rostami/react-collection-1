import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div
      className='
      p-4
      bg-indigo-300
      '
    >
      <Link
        className='
        underline
        hover:text-slate-100
        '
        to={'/'}
      >
        home page
      </Link>
    </div>
  )
}

export default Header