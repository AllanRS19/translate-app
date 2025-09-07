export const fetchTextTranslation = async (textToTranslate: string, fromLang: string, toLang: string) => {
    // console.log(textToTranslate, fromLang, toLang);
    try {
        const fetchUrl = new URL("https://api.mymemory.translated.net/get");
        fetchUrl.searchParams.append("q", textToTranslate);
        fetchUrl.searchParams.append("langpair", `${fromLang}|${toLang}`);

        const data = await fetch(fetchUrl);
        if (!data.ok) throw new Error("There was an error translating the text");

        return await data.json();
    } catch (error: any) {
        return {
            errorPresented: error.message
        }
    }
}