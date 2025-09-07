import toast from "react-hot-toast";
import { languages, translationBoxActionBtns } from "../constants";
import { cn } from "../lib/utils";
import { useTranslationStore } from "../store/translation.store";

const TranslationResultBox = () => {

    const { isTranslating, translatedTextLang, translatedText, handleLangChange, handleInvertLanguages } = useTranslationStore();

    const handleButtonAction = (action: 'text_to_speech' | 'copy_text') => {
        if (!translatedText.trim()) return;

        if (action === 'copy_text') {
            navigator.clipboard.writeText(translatedText);
            toast.success("Successfully copied text to clipboard", {
                className: "custom-toast",
            });
        }

        if (action === 'text_to_speech') {
            const langAccent = translatedTextLang === 'en' ? "en-US" : translatedTextLang === 'fr' ? "fr-FR" : "es-ES";
            if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(translatedText);
                utterance.lang = langAccent;
                speechSynthesis.speak(utterance);
            } else {
                toast.error("Sorry, your browser does not support text to speech!", {
                    className: "custom-toast error"
                });
            }
        }
    }

    return (
        <div className="translation-box bg-grey-400/80">
            <div className="translation-box-top">
                {languages.map(({ label, value }, i) => (
                    <button
                        key={i}
                        className={cn(
                            "language-select-button",
                            i === 0 && "hidden",
                            translatedTextLang === value && "bg-grey-300"
                        )}
                        onClick={() => handleLangChange(value, 'to')}
                    >
                        {label}
                    </button>
                ))}
                <button
                    className="invert-langs-btn flex-center"
                    disabled={isTranslating}
                    onClick={handleInvertLanguages}
                >
                    <img
                        src="/icons/horizontal_top_left.webp"
                        alt="Invert Languages"
                        className="size-auto"
                    />
                </button>
            </div>
            <div className="translation-box-middle">
                <div className="translation-result-area">
                    <p className={cn(isTranslating && "animate-pulse")}>
                        {isTranslating
                            ? "Translating your text..."
                            : translatedText
                        }
                    </p>
                </div>
            </div>
            <div className="translation-box-bottom">
                <div className="translation-box-actions">
                    {translationBoxActionBtns.map(({ action, icon }, i) => (
                        <button
                            key={i}
                            className="box-action-btn flex-center"
                            disabled={isTranslating || !translatedText.trim()}
                            onClick={() => handleButtonAction(action)}
                        >
                            <img
                                src={icon}
                                alt={action}
                                className="size-auto"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TranslationResultBox;