import type Card from '../types/Card';
import cardsData from '../data/cards.json';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

export default function Game() {
    const cards: Card[] = cardsData;
    const [randomCard, setRandomCard] = useState(() => cards[Math.floor(Math.random() * cards.length)]);

    const [cardNames, setCardNames] = useState(cards.map(card => card.name));
    const [query, setQuery] = useState('');

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
        }
    }

    return (
        <div>
            <h1 onClick={() => console.log(randomCard)}>Clash Royale Wordle</h1>
            <input value={query} onChange={(e) => {
                setQuery(e.target.value);
            }} onKeyDown={(e) => e.key === 'Enter' && guessCard()}/>

            {query && filteredCards.length > 0 && (
                <ul>
                    {filteredCards.map((card) => (
                        <li key={card} onClick={() => guessCard(card)}>{card}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}