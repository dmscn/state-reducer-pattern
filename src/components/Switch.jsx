import React from 'react'

export default function Switch({ on, ...props }) {
  const staticStyle = "flex items-center w-20 h-12 m-5 rounded-full p-1"
  const style = `${staticStyle} ${on ? 'justify-end' : 'justify-true'} ${on ? 'bg-green-400' : 'bg-gray-200'}`

  return (
    <div className={style} {...props}>
      <div className="w-10 h-10 bg-white rounded-full"></div>
    </div>
  )
}