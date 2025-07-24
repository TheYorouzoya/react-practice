import { languages } from "./languages";
import { nanoid } from "nanoid"
import type { LanguagesProps } from "../types";
import { clsx } from "clsx";

import './Languages.css'

export default function Languages({ wrongGuessCount }: LanguagesProps) {
    const languageElements = languages.map((language, index) => {
        const languageStyles = {
            color: language.color,
            backgroundColor: language.backgroundColor
        }
        const languageId = nanoid()
        const className = clsx({
            language: true,
            lost: index < wrongGuessCount,
        })

        return (
            <span 
                className={className} 
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