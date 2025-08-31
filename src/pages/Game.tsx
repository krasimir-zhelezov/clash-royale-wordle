import type Card from '../types/Card';
// import cardsData from '../data/cards.json';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import cardsData from '../assets/data/cards.json';

export default function Game() {
    const arenaToPosition: { [key: string]: number } = {
        "Training Camp": 0,
        "Goblin Stadium": 1,
        "Bone Pit": 2,
        "Barbarian Bowl": 3,
        "Spell Valley": 4,
        "Builder's Workshop": 5,
        "P.E.K.K.A.'s Playhouse": 6,
        "Royal Arena": 7,
        "Frozen Peak": 8,
        "Jungle Arena": 9,
        "Hog Mountain": 10,
        "Electro Valley": 11,    
        "Spooky Town": 12,
        "Rascal's Hideout": 13,
        "Serenity Peak": 14,
        "Miner's Mine": 15,
        "Executioner's Kitchen": 16,
        "Royal Crypt": 17,
        "Silent Sanctuary": 18,
        "Dragon Spa": 19,
        "Boot Camp": 20,
        "Clash Fest": 21,
        "PANCAKES!": 22,
        "Valkalla": 23,
        "Legendary Arena": 24
    };

    const rarityToValue: { [key: string]: number } = {
        "Common": 1,
        "Rare": 2,
        "Epic": 3,
        "Legendary": 4,
        "Champion": 5
    };

    // const BASE_PATH = window.location.hostname === "localhost" ? "" : "/clash-royale-wordle";

    const cards: Card[] = cardsData.map(card => ({
        ...card,
        releaseYear: Number(card.releaseYear),
        elixir: Number(card.elixir)
    }));
    const [randomCard] = useState(() => cards[Math.floor(Math.random() * cards.length)]);

    const [cardNames, setCardNames] = useState(cards.map(card => card.name));
    const [query, setQuery] = useState('');
    const [guessedCards] = useState<Card[]>([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [gameOvber, setGameOver] = useState(false);

    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

    const filteredCards = cardNames.filter((card) => normalize(card).includes(normalize(query))).reverse().slice(0, 5);

    useEffect(() => {
        // async function loadCards() {
        //     const response = await fetch(`${BASE_PATH}/data/cards.json`);
        //     const data: Card[] = await response.json();
        //     setCards(data);
        //     setCardNames(data.map(card => card.name));
        //     setRandomCard(data[Math.floor(Math.random() * data.length)]);
        // }
        // loadCards();
    }, []);

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
        <div className="flex flex-col min-h-screen px-4 sm:px-8">
            <div className="flex flex-col items-center justify-center py-2 mt-10 sm:mt-20 text-gray-900 relative">
                <img className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60" src={logo}></img>
                <h1 className="text-2xl sm:text-3xl md:text-4xl" onClick={() => console.log(randomCard)}>Clash Royale Wordle</h1>

                {showAlert && (
                    <div className="absolute -top-20 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all">
                        {alertMessage}
                    </div>
                )}

                <div className="flex flex-col items-center justify-center py-2">
                    <div className="mx-auto w-[280px] sm:w-[320px] md:w-full">
                        <input
                            className="hover:cursor-pointer bg-white border-2 border-gray-600 rounded-md placeholder:text-gray-600 w-full text-center focus:outline-none focus:placeholder-transparent p-2 mt-5 hover:shadow-lg hover:bg-gray-50 transition-colors duration-300"
                            placeholder="Guess a card"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && guessCard()}
                            disabled={gameOvber}
                        />
                    </div>

                    {query && filteredCards.length > 0 && (
                        <ul>
                            {filteredCards.map((card) => (
                            <li
                                className="hover:cursor-pointer flex items-center gap-2"
                                key={card}
                                onClick={() => guessCard(card)}
                            >
                                <img
                                src={`https://cdns3.royaleapi.com/cdn-cgi/image/w=60,h=72,format=auto/static/img/cards/v6-aa179c9e/${cardNameToId(card)}.png`}
                                alt={card}
                                className="w-[40px] h-auto rounded"
                                />
                                <span>{card}</span>
                            </li>
                            ))}
                        </ul>
                    )}

                    {gameOvber && <button className="border-3 hover:cursor-pointer hover:scale-105 border-amber-500 bg-amber-400 rounded-md w-1/2 p-2 mt-5 hover:bg-amber-300 hover:border-amber-400 focus:bg-amber-500 focus:border-amber-600 transition-colors duration-300" onClick={() => window.location.reload()}>Play Again</button>}

                    <div className="overflow-x-auto mt-5 mx-auto w-[280px] sm:w-[320px] md:w-full">
                    <table className="table-auto border-separate text-center w-full min-w-[600px]">
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
                                        {card.rarity}{" "}
                                        {rarityToValue[card.rarity] > rarityToValue[randomCard.rarity] ? "⬇️" 
                                            : rarityToValue[card.rarity] < rarityToValue[randomCard.rarity] ? "⬆️" 
                                            : ""}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.type === card!.type ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.type}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.arena === card!.arena ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {card.arena}{" "}
                                        {arenaToPosition[card.arena] > arenaToPosition[randomCard.arena] ? "⬇️" 
                                            : arenaToPosition[card.arena] < arenaToPosition[randomCard.arena] ? "⬆️" 
                                            : ""}
                                    </td>
                                    <td className={`w-25 h-25 border-black border-1 rounded-md hover:scale-105 transition-colors duration-300 ${randomCard.elixir === card!.elixir ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'}`}>
                                        {isNaN(card.elixir) ? "NaN" : card.elixir}{" "}
                                        {isNaN(card.elixir) ? ""
                                            : card.elixir > randomCard.elixir ? "⬇️"
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
                    </div>
                    
                    {guessedCards.length === 0 && <p className="mt-5">No guesses yet. Start by typing a card name above!</p>}
                </div>
            </div>
            <footer className="w-full text-center py-4 border-t border-gray-300 mt-auto">
                <p className="text-gray-600">
                    Made by Krasimir Zhelezov
                </p>
                <p className="text-gray-600">
                <a href="https://www.instagram.com/krasimir.zhelezov/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Instagram</a>
                <a href="https://github.com/krasimir-zhelezov/clash-royale-wordle/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">GitHub</a>
                <a href="https://www.paypal.com/paypalme/krasimirzhelezov" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Donate</a>
                </p>
            </footer>
        </div>
    )
}
