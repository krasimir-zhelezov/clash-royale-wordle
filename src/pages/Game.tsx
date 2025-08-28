import type Card from '../types/Card';
import cardsData from '../data/cards.json';
import { useState } from 'react';

export default function Game() {
    const cards: Card[] = cardsData;
    const [randomCard, setRandomCard] = useState(() => cards[Math.floor(Math.random() * cards.length)]);

    const [cardNames, setCardNames] = useState(cards.map(card => card.name));
    const [query, setQuery] = useState('');
    const [guessedCards, setGuessedCards] = useState<Card[]>([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [gameOvber, setGameOver] = useState(false);

    const filteredCards = cardNames.filter((card) => card.toLowerCase().includes(query.toLowerCase())).slice().reverse();

    function guessCard(chosenCard?: string ) {
        const cardName = chosenCard || filteredCards[0];
        
        setQuery('');

        if (!cardName) return;
        
        setCardNames(cardNames.filter(card => card !== cardName));

        const guessedCard = cards.find(card => card.name === cardName);
        guessedCards.push(guessedCard!);

        if (cardName === randomCard.name) {
            setAlertMessage(`You guessed the card! It's ${randomCard.name}!`);
            setShowAlert(true);
            setGameOver(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }

    function cardNameToId(name: string) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center justify-center py-2 mt-30 text-gray-900 relative">
                <h1 className="text-3xl" onClick={() => console.log(randomCard)}>Clash Royale Wordle</h1>

                {showAlert && (
                    <div className="absolute -top-20 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all">
                        {alertMessage}
                    </div>
                )}

                <div className="flex flex-col items-center justify-center py-2">
                    <input
                        className="hover:cursor-pointer bg-white border-2 border-gray-600 rounded-md placeholder:text-gray-600 w-full text-center focus:outline-none focus:placeholder-transparent p-2 mt-5 hover:shadow-lg hover:bg-gray-50 transition-colors duration-300"
                        placeholder="Guess a card"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && guessCard()}
                        disabled={gameOvber}
                    />

                    {query && filteredCards.length > 0 && (
                        <ul>
                            {filteredCards.map((card) => (
                                <li className="hover:cursor-pointer" key={card} onClick={() => guessCard(card)}>{card}</li>
                            ))}
                        </ul>
                    )}

                    {gameOvber && <button className="border-3 hover:cursor-pointer hover:scale-105 border-amber-500 bg-amber-400 rounded-md w-1/2 p-2 mt-5 hover:bg-amber-300 hover:border-amber-400 focus:bg-amber-500 focus:border-amber-600 transition-colors duration-300" onClick={() => window.location.reload()}>Play Again</button>}

                    <table className="table-fixed mt-5 border-separate text-center">
                        <thead className="border-2 border-t-0">
                            <tr>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Card</th>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Rarity</th>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Type</th>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Arena</th>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Elixir</th>
                                <th className="border-1 border-t-0 p-2 rounded-md w-25 hover:scale-105 transition-colors duration-300 hover:bg-gradient-to-b hover:from-light-sky-blue hover:to-blue-400">Release Year</th>
                            </tr>
                        </thead>
                        <tbody className="border-black border-1 text-white">
                            {guessedCards.slice().reverse().map((card) => (
                                <tr key={card.name}>
                                    <td className="w-25 h-25 hover:scale-105">
                                        <img 
                                            src={`https://cdns3.royaleapi.com/cdn-cgi/image/w=150,h=180,format=auto/static/img/cards/v6-aa179c9e/${cardNameToId(card.name)}.png`}
                                            className="w-full h-full object-cover"
                                        />
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.rarity === card!.rarity ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.rarity}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.type === card!.type ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.type}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.arena === card!.arena ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.arena}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.elixir === card!.elixir ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.elixir}{" "}
                                        {card.elixir > randomCard.elixir ? "⬇️" 
                                            : card.elixir < randomCard.elixir ? "⬆️" 
                                            : ""}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md ${randomCard.releaseYear === card!.releaseYear ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.releaseYear}{" "}
                                        {card.releaseYear > randomCard.releaseYear ? "⬇️" 
                                            : card.releaseYear < randomCard.releaseYear ? "⬆️" 
                                            : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {guessedCards.length === 0 && <p className="mt-5">No guesses yet. Start by typing a card name above!</p>}
                </div>
            </div>
            <footer className="w-full text-center py-4 border-t border-gray-300 mt-auto">
                <p className="text-gray-600">
                Made by Krasimir Zhelezov <p></p>
                <a href="https://www.instagram.com/krasimir.zhelezov/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Instagram</a>
                <a href="https://github.com/krasimir-zhelezov/clash-royale-wordle/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">GitHub</a>
                <a href="https://www.paypal.com/paypalme/krasimirzhelezov" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Donate</a>
                </p>
            </footer>
        </div>
    )
}
