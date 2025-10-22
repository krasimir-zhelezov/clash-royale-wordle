export default function About() {
    return (
        <div className="flex text-center h-screen justify-center items-center px-6">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">About CRWordle</h1>
                <p className="text-lg text-gray-800 leading-relaxed">
                    CRWordle is a Clash Royale–themed guessing game. You try to guess 
                    the target Clash Royale card using limited attempts and feedback. CRWordle is built 
                    for Clash Royale fans who want a quick puzzle.
                </p>
            </div>
        </div>
    )
}