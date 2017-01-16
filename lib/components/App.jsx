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
      winState: false,
      wins: 0,
    }

  }

  componentDidMount() {
    this.setState({
      secret: getRandomNum(this.state.range),
    })
  }

  updateGuessState(e) {
    this.setState({
      guess: e.target.value,
    })
  }

  updateMinState(e) {
    this.setState({
      rangeDraft: {
        min: e.target.value,
        max: this.state.rangeDraft.max,
      },
    })
  }

  updateMaxState(e) {
    this.setState({
      rangeDraft: {
        min: this.state.rangeDraft.min,
        max: e.target.value,
      },
    })
  }

  handleGuessKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.state.guess != '') {
        this.handleSubmit()
      }
    }
  }


  handleRangeKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleRangeUpdate()
    }
  }

  handleSubmit() {
    const { winState, msg } = guessCheck(this.state.guess, this.state.secret, this.state.range)
    this.setState({
      lastGuess: this.state.guess,
      message: {
        top: 'Your last guess was...',
        bottom: msg,
      },
      started: true,
      winState: winState,
    })

    this.handleClear()

    if (winState) {
      this.handleReset({
        max: this.state.range.max + 10,
        min: this.state.range.min - 10,
      }, winState)

      this.setState({
        wins: this.state.wins + 1,
      })
    }

  }

  handleClear() {
    this.setState({
      guess: '',
    })
  }

  handleReset(range, winState) {
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
        top: winState ? 'Correct! You Win!' : '',
        bottom: 'New game! Enter your best guess below...',
      },
      started: false,
      winState: false,
      wins: 0,
    })
  }

  handleRangeUpdate() {
    const newRange = this.state.rangeDraft
    let minIsANumber = /^\d+$/.test(this.state.rangeDraft.min)
    if (!minIsANumber || this.state.rangeDraft.min === '')  {
      newRange.min = this.state.range.min
    }
    const maxIsANumber = /^\d+$/.test(this.state.rangeDraft.max)
    if (!maxIsANumber || this.state.rangeDraft.max === '')  {
      newRange.max = this.state.range.max
    }
    this.handleReset(newRange)
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
               type='text'
               placeholder='Your best guess'
               value={ this.state.guess }
               onKeyPress={ e => this.handleGuessKeyPress(e) }
               onChange={ e => this.updateGuessState(e) } />
        <Button className='btn btn-submit'
                text='Guess'
                disabled={this.state.guess === '' || this.state.guess === null}
                onClick={ this.handleSubmit.bind(this) } />
        <Button className='btn btn-clear'
                text='Clear'
                disabled={this.state.guess === ''}
                onClick={ this.handleClear.bind(this) } />
        <Button className='btn btn-reset'
                text='Reset Game'
                disabled={ this.state.wins === 0 && !this.state.started }
                onClick={ this.handleReset.bind(this) } />
        <Input className='input min-input'
               type='text'
               placeholder={`min: ${this.state.range.min}`}
               value={ this.state.rangeDraft.min }
               onKeyPress={ e => this.handleRangeKeyPress(e) }
               onChange={ e => this.updateMinState(e) } />
        <Input className='input max-input'
               type='text'
               placeholder={`max: ${this.state.range.max}`}
               value={ this.state.rangeDraft.max }
               onKeyPress={ e => this.handleRangeKeyPress(e) }
               onChange={ e => this.updateMaxState(e) } />
        <Button className='btn btn-update-min-max'
                text='Update Range'
                disabled={false}
                onClick={ this.handleRangeUpdate.bind(this) } />
      </div>
    )
  }

}
