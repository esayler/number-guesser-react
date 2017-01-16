import React from 'react'

const Hud = ({ lastGuess, message }) => {
  return (
    <section className='hud'>
      <p className='message-top'> {message.top}  </p>
      <h2 className='last-guess'> {lastGuess} </h2>
      <h5 className='message-bottom'> {message.bottom} </h5>
    </section>
  )
}

export default Hud
