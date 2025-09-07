declare interface Language {
    label: string;
    value: string;
}

declare interface TranslationInputBoxProps {
    translatingText: string;
    setTranslatingText: (text: string) => void;
    translatingTextLang: Language;
}

declare interface TranslationResultBoxProps {
    translatedTextLang: Language;
}

declare interface TranslationBoxActionBtns {
    action: 'text_to_speech' | 'copy_text';
    icon: string;
}

type UseTranslationStoreProps = {
    isTranslating: boolean;
    internalTranslatingText: string;
    translatedText: string;
    translatingTextLang: string;
    translatedTextLang: string;
    resetInternalTranslatingText: () => void;
    handleLangChange: (lang: string, type: 'from' | 'to') => void;
    handleInvertLanguages: () => void;
    translateText: (textToTranslate: string) => void;
}