import { useState, useEffect } from "react"
import type { TimerProps } from "./types"

export default function Timer({ gameWon, timerActive, timerReset }: TimerProps) {
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        setTimer(0)
    }, [timerReset])

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (timerActive && !gameWon) {
                setTimer((prevTimer => prevTimer + 1))
            }
        }, 1000)
        return () => clearInterval(timerInterval)
    }, )

    return(
        <div className="timer">
            Time: {timer}s
        </div>
    )

}