import React from 'react'

const Hud = ({ lastGuess, message }) => {
  return (
    <section className='hud'>
      <p> Your last guess was... </p>
      <h2 className='last-guess'> {lastGuess} </h2>
      <h5 className='message'> {message} </h5>
    </section>
  )
}

export default Hud
