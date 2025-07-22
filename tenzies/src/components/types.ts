export type DieProps = {
    id: string
    isHeld: boolean
    value: number
    hold: (id: string) => void
}

export type TimerProps = {
    gameWon: boolean
    timerActive: boolean
    timerReset: boolean
}