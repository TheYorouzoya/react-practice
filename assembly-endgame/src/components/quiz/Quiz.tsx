import { useState } from 'react'
import { nanoid } from 'nanoid'
import './Quiz.css'


export default function Quiz() {
    const [word, setWord] = useState("React")

    const letters = [...word.toUpperCase()]

    const letterElements = letters.map(letter => {
        const id = nanoid()
        return (
            <span 
                className='quiz-letter' 
                key={id} 
                id={id}
            >
                {letter}
            </span>
        )
    })

    return (
        <div className='quiz'>
            {...letterElements}
        </div>
    )
}