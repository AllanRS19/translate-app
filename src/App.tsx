import TranslationBoxes from "./components/TranslationBoxes";

const App = () => {
    return (
        <main className="size-full">
            <div className="fixed top-0 left-0 w-full h-1/2 bg-[url(/images/hero_img-sm.webp)] md:bg-[url(/images/hero_img.webp)] bg-cover bg-right-bottom bg-no-repeat" />
            <img
                src="/icons/logo.webp"
                alt="Logo"
                className="w-[180px] h-auto fixed top-20 left-1/2 -translate-x-1/2 object-cover"
            />
            <TranslationBoxes />
        </main>
    )
}

export default App;