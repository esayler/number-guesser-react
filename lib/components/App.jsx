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
      rangeDraft: {
        max: '',
        min: '',
      },
      lastGuess: '',
      message: {
        top: '',
        bottom: 'New game! Enter your best guess below...',
      },
      started: false,
    }

  }

  componentDidMount() {
    this.setState({
      secret: getRandomNum(this.state.range),
    })
  }

  updateGuessState(e) {
    this.setState({
      guess: parseInt(e.target.value, 10),
    })
  }

  updateMinState(e) {
    this.setState({
      rangeDraft: {
        min: parseInt(e.target.value, 10),
        max: this.state.rangeDraft.max,
      },
    })
  }

  updateMaxState(e) {
    this.setState({
      rangeDraft: {
        min: this.state.rangeDraft.min,
        max: parseInt(e.target.value, 10),
      },
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
      message: {
        top: 'Your last guess was...',
        bottom: guessCheck(this.state.guess, this.state.secret, this.state.range)
      },
      started: true,
    })

    this.handleClear()
  }

  handleClear() {
    this.setState({
      guess: '',
    })
  }

  handleReset(range) {
    // TODO: change hack used to get this shared method to work
    // (range is proxy object on reset button click, and is a range object on range update)
    range = range.min !== undefined ? range : { max: 100, min: 0 }
    this.setState({
      guess: '',
      secret: getRandomNum(range),
      range: {
        max: range.max,
        min: range.min,
      },
      rangeDraft: {
        max: '',
        min: '',
      },
      lastGuess: '',
      message: {
        top: '',
        bottom: 'New game! Enter your best guess below...',
      },
      started: false,
    })
  }

  handleRangeUpdate() {
    this.handleReset(this.state.rangeDraft)
  }

  render() {
    return (
      <div>
        <header>
          <div className='title-container'>
            <h1 className='title1'>Number</h1>
            <h1 className='title2'>Guesser</h1>
          </div>
        </header>
        <Hud lastGuess={this.state.lastGuess}
             message={this.state.message} />
        <Input className='input guess-input'
               type='number'
               placeholder='Your best guess'
               value={ this.state.guess }
               onKeyPress={ e => this.handleKeyPress(e) }
               onChange={ e => this.updateGuessState(e) } />
        <Button className='btn btn-submit'
                text='Guess'
                disabled={this.state.guess === ''}
                onClick={ this.handleSubmit.bind(this) } />
        <Button className='btn btn-clear'
                text='Clear'
                disabled={this.state.guess === ''}
                onClick={ this.handleClear.bind(this) } />
        <Button className='btn btn-reset'
                text='Reset Game'
                disabled={ !this.state.started }
                onClick={ this.handleReset.bind(this) } />
        <Input className='input min-input'
               type='number'
               placeholder={`min: ${this.state.range.min}`}
               value={ this.state.rangeDraft.min }
               onKeyPress={ e => this.handleKeyPress(e) }
               onChange={ e => this.updateMinState(e) } />
        <Input className='input max-input'
               type='number'
               placeholder={`max: ${this.state.range.max}`}
               value={ this.state.rangeDraft.max }
               onKeyPress={ e => this.handleKeyPress(e) }
               onChange={ e => this.updateMaxState(e) } />
        <Button className='btn btn-update-min-max'
                text='Update Range'
                disabled={ this.state.rangeDraft.min === '' || this.state.rangeDraft.max === '' }
                onClick={ this.handleRangeUpdate.bind(this) } />
      </div>
    )
  }

}
