import type Card from '../types/Card';
import cardsData from '../data/cards.json';

export default function Game() {
    const cards: Card[] = cardsData;

    console.log(cards);

    return (
        <h1>Game</h1>
    )
}