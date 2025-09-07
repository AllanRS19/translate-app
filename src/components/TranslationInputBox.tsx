import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import toast from "react-hot-toast";
import { useTranslationStore } from "../store/translation.store";
import { cn } from "../lib/utils";
import { languages, translationBoxActionBtns } from "../constants";

const TranslationInputBox = () => {

    const { isTranslating, internalTranslatingText, resetInternalTranslatingText, translatingTextLang, translateText, handleLangChange } = useTranslationStore();

    const [translatingText, setTranslatingText] = useState("Hello, how are you?");
    const [infoMessage, setInfoMessage] = useState("");
    const [isBackspaceCliked, setIsBackspaceCliked] = useState(false);

    const checkPressedKey = (event: KeyboardEvent) => {
        setIsBackspaceCliked(event.key === 'Backspace' ? true : false);
    }

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (internalTranslatingText.trim()) {
            resetInternalTranslatingText();
        }
        
        const newValue = e.target.value;

        if (translatingText.length === 500 && !isBackspaceCliked && newValue.length > translatingText.length) {
            setInfoMessage("You have reached the max permitted characters");
            return;
        }

        setTranslatingText(newValue);

        if (newValue.length === 500) {
            setInfoMessage("You have reached the max permitted characters");
        } else {
            setInfoMessage("");
        }
    }

    const handleButtonAction = (action: 'text_to_speech' | 'copy_text') => {
        if (!translatingText.trim()) return;

        if (action === 'copy_text') {
            navigator.clipboard.writeText(translatingText);
            toast.success("Successfully copied text to clipboard", {
                className: "custom-toast",
            });
        }

        if (action === 'text_to_speech') {
            const langAccent = translatingTextLang === 'en' ? "en-US" : translatingTextLang === 'fr' ? "fr-FR" : "es-ES";
            if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(translatingText);
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
        <div className="translation-box">
            <div className="translation-box-top">
                {languages.map(({ label, value }, i) => (
                    <button
                        key={i}
                        className={cn(
                            "language-select-button",
                            translatingTextLang === value && "bg-grey-300"
                        )}
                        onClick={() => handleLangChange(value, 'from')}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="translation-box-middle">
                <textarea
                    name="text-to-translate"
                    className={"translation-textarea disabled:opacity-40"}
                    placeholder="Enter text to translate..."
                    autoFocus
                    maxLength={500}
                    required
                    value={internalTranslatingText || translatingText}
                    onKeyDown={checkPressedKey}
                    onChange={handleTextareaChange}
                    disabled={isTranslating}
                />
                <div className="flex justify-between">
                    {infoMessage.trim() && <p className="informational-message">{infoMessage}</p>}
                    <p
                        className={cn(
                            "characters-counter",
                            internalTranslatingText.length === 500 || translatingText.length === 500 && "text-orange-300"
                        )}
                    >
                        {internalTranslatingText.length || translatingText.length}/500
                    </p>
                </div>
            </div>
            <div className="translation-box-bottom">
                <div className="translation-box-actions">
                    {translationBoxActionBtns.map(({ action, icon }, i) => (
                        <button
                            key={i}
                            className="box-action-btn flex-center"
                            disabled={isTranslating || !translatingText.trim()}
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
                <button
                    className="translate-btn flex-center"
                    disabled={translatingText.length === 0 || isTranslating}
                    onClick={() => translateText(translatingText)}
                >
                    <img src="/icons/sort_alfa.webp" alt="Sort Alfa" className="size-6" />
                    <p>{isTranslating ? "Translating text..." : "Translate"}</p>
                </button>
            </div>
        </div>
    )
}

export default TranslationInputBox;