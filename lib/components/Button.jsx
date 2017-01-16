import React from 'react'

const Button = (props) => {
  const { className, disabled, onClick, text } = props
  return (
    <button className={ className }
            disabled={ disabled }
            onClick={ onClick }> { text } </button>
  )
}

export default Button
