import type Card from '../types/Card';
import cardsData from '../data/cards.json';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

export default function Game() {
    const cards: Card[] = cardsData;
    const card = cards[Math.floor(Math.random() * cards.length)];

    const [cardNames, setCardNames] = useState(cards.map(card => card.name));
    const [selectedCard, setSelectedCard] = useState('');
    const [query, setQuery] = useState('');

    const filteredCards = cardNames.filter((card) => card.toLowerCase().includes(query.toLowerCase()));

    function guessCard() {
        const cardName = filteredCards[0];

        setQuery('');

        if (!cardName) return;

        console.log(query);
        console.log(cardName);
        
        setCardNames(cardNames.filter(card => card !== cardName));
        console.log(cardNames);
    }

    return (
        <div>
            <input value={query} onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCard('');
            }} onKeyDown={(e) => e.key === 'Enter' && guessCard()}/>

            {query && filteredCards.length > 0 && (
                <ul>
                    {filteredCards.map((card) => (
                        <li key={card} onClick={() => {
                            setSelectedCard(card);
                            setQuery("");
                        }}>{card}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}