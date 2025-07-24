import { useState } from 'react'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx'
import { languages } from '../languages/languages'
import { getFarewellText, getRandomWord } from '../utils'
import Confetti from 'react-confetti'

import Header from '../header/Header'
import Languages from '../languages/Languages'

import './Quiz.css'


export default function Quiz() {
    const [answer, setAnswer] = useState(() => getRandomWord())
    const [guesses, setGuesses] = useState<string[]>([])
    
    const answerLetters = [...answer]
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const letters = [...alphabet]
    
    const wrongGuessCount = guesses.reduceRight(
        (acc, curr) => !answer.includes(curr) ? acc + 1 : acc, 0)
    
    const lastGuessedLetter = guesses[guesses.length - 1]
    const isLastGuessWrong = lastGuessedLetter && !answer.includes(lastGuessedLetter)

    const farewellText = isLastGuessWrong && wrongGuessCount > 0 ?
        getFarewellText(languages[wrongGuessCount - 1].name) : undefined
        
    const gameLost = wrongGuessCount >= languages.length - 1
    const gameWon = answerLetters.every(
        letter => guesses.includes(letter)
    )
    const gameOver = gameLost || gameWon

    function addGuess(letter: string) {
        setGuesses(oldGuesses => 
            oldGuesses.includes(letter) ? oldGuesses : [...oldGuesses, letter])
    }

    const answerElements = answerLetters.map(character => {
        const id = nanoid()
        const className = clsx('quiz-letter', {
            missed: gameLost && !guesses.includes(character),
        })
        return (
            <span 
                className={className}
                key={id} 
                id={id}
            >
                {(guesses.includes(character) || gameLost) && character.toUpperCase()}
            </span>
        )
    })

    const keyboardButtons = letters.map(letter => {
        const id = nanoid()
        const isGuessed = guesses.includes(letter)
        const isCorrect = isGuessed && answer.includes(letter)
        const isWrong = isGuessed && !answer.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
        })

        return (
            <button 
                className={className}
                key={id}
                id={id}
                disabled={gameOver}
                aria-disabled={isGuessed}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuess(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    function resetGame() {
        setAnswer(getRandomWord())
        setGuesses([])
    }

    return (
        <>
        {gameWon && <Confetti />}
        <Header 
            gameWon={gameWon} 
            gameLost={gameLost} 
            customStatus={farewellText}
        />
        <Languages wrongGuessCount={wrongGuessCount} />
        <section className='quiz'>
            {...answerElements}
        </section>
        <section className='keyboard'>
            {...keyboardButtons}
        </section>
        {gameOver && <button className='footer' onClick={resetGame}>New Game</button>}
        </>
    )
}