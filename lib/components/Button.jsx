import React from 'react'

const Button = (props) => {
  const { text, className, onClick } = props
  return (
    <button className={ className }
            onClick={ onClick }> { text } </button>
  )
}

export default Button
