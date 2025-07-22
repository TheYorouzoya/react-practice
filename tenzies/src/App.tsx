import './App.css'
import Die from './components/Die'
import Timer from './components/Timer'
import type { DieProps } from './components/types'
import { useState, useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const [rolls, setRolls] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [timerReset, setTimerReset] = useState(false)

  const diceElements = dice.map(dieObj => <Die key={dieObj.id} {...dieObj} />)

  const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

  const rerollButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (gameWon) {
      rerollButtonRef.current?.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    const arr = []
    for (let i = 1; i <= 10; i++) {
      const dieObj: DieProps = {
        id: nanoid(),
        isHeld: false,
        value: Math.ceil(Math.random() * 6),
        hold: hold,
      } 
      arr.push(dieObj)
    }
    return arr
  }

  function rerollDice() {
    if (gameWon) {
      setRolls(0)
      setTimerActive(false)
      setTimerReset(oldReset => !oldReset)
      setDice(generateAllNewDice())
    } else {
      setTimerActive(true)
      setDice(oldDice => oldDice.map(die => 
        die.isHeld ?
          die :
          { ...die, value: Math.ceil(Math.random() * 6) }
      ))
      setRolls(oldRolls => oldRolls + 1)
    } 
  }

  function hold(id: string) {
    setDice(oldDice => oldDice.map(die => {
        if (die.id === id) {
          setTimerActive(true)
          const newDie: DieProps = {
            ...die,
            isHeld: !die.isHeld,
          }
          return newDie
        } else {
          return die
        }
      })
    )
  }

  return (
      <main>
        {gameWon && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. Click 
          each die to freeze it at its current value between rolls.</p>

        <div id='die-container'>
          {diceElements}
        </div>

        <div className='footer'>
        <div className='stats'>
          <Timer 
            gameWon={gameWon} 
            timerActive={timerActive} 
            timerReset={timerReset} 
          />
          <p className='rolls-done'>Rolls done: {rolls}</p>
        </div>
          <button id="reroll-button" ref={rerollButtonRef} onClick={rerollDice}>
          {gameWon ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
  )
}

export default App
