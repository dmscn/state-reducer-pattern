import React from 'react'

export default function Button({ children, className, ...props }) {
  const style = `${className} bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`;

  return (
    <button className={style} {...props}>
      {children}
    </button>
  )
}