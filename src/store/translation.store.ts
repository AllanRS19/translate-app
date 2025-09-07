import { create } from 'zustand';
import { languages } from '../constants';
import { fetchTextTranslation } from '../lib/api';

export const useTranslationStore = create<UseTranslationStoreProps>((set, get) => ({
    isTranslating: false,
    translatingTextLang: languages[1].value,
    translatedTextLang: languages[2].value,
    translatedText: "",
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
        const { translatingTextLang, translatedTextLang } = get();
        set(() => ({ translatingTextLang: translatedTextLang, translatedTextLang: translatingTextLang }));
    },
    translateText: async (textToTranslate) => {
        set(() => ({ isTranslating: true, translatedText: "" }));
        try {
            const { translatingTextLang, translatedTextLang } = get();

            const result = await fetchTextTranslation(textToTranslate, translatingTextLang, translatedTextLang);
            if (result.errorPresented) throw new Error("There was an error fetching the data");

            const { responseData } = result;
            if (!responseData.translatedText) throw new Error("A translation could not be completed. Try with other words.");

            set(() => ({ translatedText: responseData.translatedText }));

            return responseData.responseText;
        } catch (error: any) {
            return { translateError: error.message };
        } finally {
            set(() => ({ isTranslating: false }));
        }
    }
}))
