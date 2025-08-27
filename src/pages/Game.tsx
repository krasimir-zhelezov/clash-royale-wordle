import type Card from '../types/Card';
import cardsData from '../data/cards.json';

export default function Game() {
    const cards: Card[] = cardsData;
    const card = cards[Math.floor(Math.random() * cards.length)];

    console.log(card);

    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    )
}