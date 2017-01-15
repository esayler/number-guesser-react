import React from 'react'
import Button from './Button'
import Input from './Input'
import Hud from './Hud'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      guess: '',
      secret: 11,
      max: 100,
      min: 0,
      lastGuess: '',
    }

  }

  componentDidMount() {
    this.setState({
      secret: Math.floor(Math.random() * (this.state.max - this.state.min + 1)) + this.state.min,
    })
  }

  updateState(e) {
    this.setState({
      guess: e.target.value,
    })
    console.log(`secret number: ${this.state.secret}`)
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.setState({
      lastGuess: this.state.guess,
    })

    this.handleClear()
  }

  handleClear() {
    this.setState({
      guess: '',
    })
  }

  handleReset() {
    this.setState({
      guess: '',
      secret: Math.floor(Math.random() * (this.state.max - this.state.min + 1)) + this.state.min,
      max: 100,
      min: 0,
      lastGuess: '',
    })
  }

  render() {
    return (
      <div>
        <h1>Number Guesser</h1>
        <Hud lastGuess={this.state.lastGuess} message='message goes here'/>
        <Input className='input guess-input'
               type='number'
               placeholder='Your best guess'
               value={ this.state.guess }
               onKeyPress={ e => this.handleKeyPress(e) }
               onChange={ e => this.updateState(e) } />
        <Button className='btn btn-submit'
                text='Guess'
                onClick={ this.handleSubmit.bind(this) } />
        <Button className='btn btn-clear'
                text='Clear'
                onClick={ this.handleClear.bind(this) } />
        <Button className='btn btn-reset'
                text='Reset Game'
                onClick={ this.handleReset.bind(this) } />
      </div>
    )
  }

}
