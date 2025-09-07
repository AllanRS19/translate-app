import { create } from 'zustand';
import { languages } from '../constants';
import { fetchTextTranslation } from '../lib/api';

export const useTranslationStore = create<UseTranslationStoreProps>((set, get) => ({
    isTranslating: false,
    internalTranslatingText: "",
    translatingTextLang: languages[1].value,
    translatedTextLang: languages[2].value,
    translatedText: "",
    resetInternalTranslatingText: () => {
        set(() => ({ internalTranslatingText: "" }));
    },
    handleLangChange: (langValue, type) => {
        const { translatingTextLang, translatedTextLang } = get();
        if (langValue === 'detectLanguage') return;
        // if (type === 'from' && langValue === translatingTextLang || type === 'to' && langValue === translatedTextLang) return;
        if (langValue === translatingTextLang || langValue === translatedTextLang) return;
        const [{ value }] = languages.filter(({ value }) => value === langValue);

        const valueToChange = type === 'from' ? { translatingTextLang: value } : { translatedTextLang: value }
        set(() => (valueToChange));
    },
    handleInvertLanguages: () => {
        const { translatingTextLang, translatedTextLang, internalTranslatingText, translatedText } = get();

        set(() => ({ translatingTextLang: translatedTextLang, translatedTextLang: translatingTextLang }));

        if (!translatedText.trim()) return;
        set(() => ({ translatedText: internalTranslatingText, internalTranslatingText: translatedText }));
    },
    translateText: async (textToTranslate) => {
        set(() => ({ isTranslating: true }));
        try {
            const { translatingTextLang, translatedTextLang } = get();

            const result = await fetchTextTranslation(textToTranslate, translatingTextLang, translatedTextLang);
            if (result.errorPresented) throw new Error("There was an error fetching the data");

            const { responseData } = result;
            set(() => ({ internalTranslatingText: textToTranslate, translatedText: responseData.translatedText }));

        } catch (error: any) {
            console.log(error.message);
        } finally {
            set(() => ({ isTranslating: false }));
        }
    }
}))
