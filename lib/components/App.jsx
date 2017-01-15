import React from 'react'
import Button from './Button'
import Input from './Input'
import Hud from './Hud'
import { guessCheck, getRandomNum } from '../numberGuesser'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      guess: '',
      secret: 0,
      range: {
        max: 100,
        min: 0,
      },
      lastGuess: '',
      message: '',
    }

  }

  componentDidMount() {
    this.setState({
      secret: getRandomNum(this.state.range),
    })
  }

  updateState(e) {
    this.setState({
      guess: e.target.value,
    })
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
      message: guessCheck(this.state.guess, this.state.secret, this.state.range),
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
      secret: getRandomNum(this.state.range),
      max: 100,
      min: 0,
      lastGuess: '',
      message: '',
    })
  }

  render() {
    return (
      <div>
        <h1>Number Guesser</h1>
        <Hud lastGuess={this.state.lastGuess}
             message={this.state.message} />
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
