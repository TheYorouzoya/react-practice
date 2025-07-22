import type { DieProps } from './types'

export default function Die({ id, isHeld, value, hold }: DieProps) {
    const buttonStyles = {
        backgroundColor: isHeld ? '#59E391' : '#FFFFFF'
    }

    return (
        <button 
            className="die" 
            onClick={() => hold(id)} 
            style={buttonStyles}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value},
            ${isHeld ? "held" : "not held"}`}
        >{value}</button>
    )
}