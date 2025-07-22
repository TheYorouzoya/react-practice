import { languages } from "./languages";
import './Languages.css'
import { nanoid } from "nanoid"

export default function Languages() {
    const languageElements = languages.map(language => {
        const languageStyles = {
            color: language.color,
            backgroundColor: language.backgroundColor
        }
        const languageId = nanoid()
        return (
            <span 
                className="language" 
                style={languageStyles}
                key={languageId}
                id={languageId}
            >{language.name}
            </span>
        )
    })

    return (
        <div className="language-chips">
            {...languageElements}
        </div>
    )
}