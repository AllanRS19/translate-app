import TranslationInputBox from "./TranslationInputBox"
import TranslationResultBox from "./TranslationResultBox"

const TranslationBoxes = () => {
    return (
        <section className="translation-boxes-wrapper">
            <TranslationInputBox />
            <TranslationResultBox />
        </section>
    )
}

export default TranslationBoxes