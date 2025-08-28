import type Card from '../types/Card';
import cardsData from '../data/cards.json';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

export default function Game() {
    const cards: Card[] = cardsData;
    const [randomCard, setRandomCard] = useState(() => cards[Math.floor(Math.random() * cards.length)]);

    const [cardNames, setCardNames] = useState(cards.map(card => card.name));
    const [query, setQuery] = useState('');
    const [guessedCards, setGuessedCards] = useState<Card[]>([]);

    const filteredCards = cardNames.filter((card) => card.toLowerCase().includes(query.toLowerCase()));

    function guessCard(chosenCard?: string ) {
        const cardName = chosenCard || filteredCards[0];
        
        console.log(cardName);

        setQuery('');

        if (!cardName) return;
        
        setCardNames(cardNames.filter(card => card !== cardName));

        console.log(cardName);

        if (cardName == randomCard.name) {
            alert('You win!');
        } else {
            const guessedCard = cards.find(card => card.name === cardName);
            guessedCards.push(guessedCard!);
            console.log("Name", "Rarity", "Type", "Arena", "Elixir", "Release Year");
            console.log(guessedCard!.name, randomCard.rarity === guessedCard!.rarity ? 'green' : 'red', randomCard.type === guessedCard!.type ? 'green' : 'red', randomCard.arena === guessedCard!.arena ? 'green' : 'red', randomCard.elixir === guessedCard!.elixir ? 'green' : (randomCard.elixir > guessedCard!.elixir ? 'up' : 'down'), randomCard.releaseYear === guessedCard!.releaseYear ? 'green' : (randomCard.releaseYear > guessedCard!.releaseYear ? 'up' : 'down') );
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-2 mt-30 text-gray-900">
            <h1 className="text-3xl" onClick={() => console.log(randomCard)}>Clash Royale Wordle</h1>
            <div className="flex flex-col items-center justify-center py-2">
                <input className="bg-white border-2 border-gray-600 rounded-md placeholder:text-gray-600 w-full text-center focus:outline-none focus:placeholder-transparent p-2 mt-5 hover:shadow-lg hover:bg-gray-50 transition-colors duration-300" placeholder="Guess a card" value={query} onChange={(e) => {
                    setQuery(e.target.value);
                }} onKeyDown={(e) => e.key === 'Enter' && guessCard()}/>

                {query && filteredCards.length > 0 && (
                    <ul>
                        {filteredCards.map((card) => (
                            <li key={card} onClick={() => guessCard(card)}>{card}</li>
                        ))}
                    </ul>
                )}

                <table className="table-fixed mt-5 border-separate text-center">
                    <thead className="border-2 border-t-0 bg-gradient-to-b from-light-sky-blue to-blue-400">
                        <tr>
                            <th className="border-1 border-t-0 p-2 rounded-md">Card</th>
                            <th className="border-1 border-t-0 p-2 rounded-md">Rarity</th>
                            <th className="border-1 border-t-0 p-2 rounded-md">Type</th>
                            <th className="border-1 border-t-0 p-2 rounded-md">Arena</th>
                            <th className="border-1 border-t-0 p-2 rounded-md">Elixir</th>
                            <th className="border-1 border-t-0 p-2 rounded-md">Release Year</th>
                        </tr>
                    </thead>
                    <tbody className="border-1">
                        {guessedCards.slice().reverse().map((card) => (
                            <tr key={card.name}>
                                <td className="w-40 h-40"><img src={card.image}/></td>
                                <td className={`w-40 h-40 border-1 rounded-md ${randomCard.rarity === card!.rarity ? 'bg-green-700' : 'bg-red-700'}`}>{card.rarity}</td>
                                <td className={`w-40 h-40 border-1 rounded-md ${randomCard.type === card!.type ? 'bg-green-700' : 'bg-red-700'}`}>{card.type}</td>
                                <td className={`w-40 h-40 border-1 rounded-md ${randomCard.arena === card!.arena ? 'bg-green-700' : 'bg-red-700'}`}>{card.arena}</td>
                                <td className={`w-40 h-40 border-1 rounded-md ${randomCard.elixir === card!.elixir ? 'bg-green-700' : 'bg-red-700'}`}>{card.elixir}</td>
                                <td className={`w-40 h-40 border-1 rounded-md ${randomCard.releaseYear === card!.releaseYear ? 'bg-green-700' : 'bg-red-700'}`}>{card.releaseYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}