import type { HeaderProps } from '../types'
import { clsx } from 'clsx';
import './Header.css'

export default function Header({ gameWon, gameLost, customStatus }: HeaderProps) {
    const [heading, message] = getStatusMessage()

    const className = clsx({
        'game-won': gameWon,
        'game-lost': gameLost,
        'farewell': !gameWon && !gameLost && customStatus !== undefined,
        'status': true,
    })

    function getStatusMessage() {
        if (gameWon) {
            return ["You Win!", "Well done! 🎉"]
        }
        
        if (gameLost) {
            return ["Game Over!", "You lose! Better start learning Assembly 😭"]
        }

        if (customStatus) {
            return [`"${customStatus}"`, ""]
        }
        
        return ["", ""]
    }

    return (
        <div className='header'>
            <h1 className='title'>Assembly: Endgame</h1>
            <p className='description'>Guess the word in under 8 attempts to keep the
                programming world safe from Assembly!
            </p>
            <div className={className} aria-live="polite" role='status'>
                <h3 className="status-heading">{heading}</h3>
                <p className='status-message'>{message}</p>
            </div>
        </div>
    )
}