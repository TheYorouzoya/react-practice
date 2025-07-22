import './Header.css'

export default function Header() {
    return (
        <div className='header'>
            <h1 className='title'>Assembly: Endgame</h1>
            <p className='description'>Guess the word in under 8 attempts to keep the
                programming world safe from Assembly!
            </p>
            <div className="status">
                <h3 className="status-heading">You Win!</h3>
                <p className='status-message'>Well done! 🎉</p>
            </div>
        </div>
    )
}