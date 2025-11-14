import React from 'react'

export default function Avatar({size=8}) {
  if (typeof size !== 'number') {
    throw new Error('Invalid size prop. Size must be a number.')
  }

  return (
    <div className={`w-${size} h-${size} rounded-full linear-bg`}>
      <p className='m-auto pt-1 text-white font-semibold text-center text-sm'>OJ</p>
    </div>
  )
}