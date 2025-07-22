import { nanoid } from 'nanoid'

import './Keyboard.css'

export default function Keyboard() {

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const letters = [...alphabet.toUpperCase()]

    const keyboardButtons = letters.map(letter => {
        const id = nanoid()
        return (
            <button 
                className='keyboard-button'
                key={id}
                id={id}
            >
                {letter}
            </button>
        )
    })

    return (
        <div className='keyboard'>
            {...keyboardButtons}
        </div>
    )
}