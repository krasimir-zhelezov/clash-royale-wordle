import type Card from '../types/Card';
import cardsData from '../data/cards.json';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

export default function Game() {
    const cards: Card[] = cardsData;
    const cardNames: string[] = cards.map((card) => card.name);
    const card = cards[Math.floor(Math.random() * cards.length)];

    const [selectedCard, setSelectedCard] = useState('');
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // console.log(card);

    const filteredCards = cardNames.filter((card) => card.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <input value={selectedCard ?? query} onChange={(e) => {
                setQuery(e.target.value);
                setSelectedCard('');
            }}/>

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