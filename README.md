# Clash Royale Wordle
A small React game inspired by Wordle, where you try to guess a random Clash Royale card based on hints from its stats.

## Usage
Type in the input box to guess a card name. The game will give you visual hints by highlighting the card's Rarity, Type, Arena, Elixir, and Release Year:
* Green = matches the target card
* Red = does not match
* Arrows indicate if the Elixir or Release Year is higher or lower than the target

Once you guess the correct card, a message appears and you can restart the game.

## Features
* Random card selection from a JSON dataset of Clash Royale cards
* Autocomplete for card names while typing
* Table with guessed cards and visual feedback on stats
* Responsive UI with hover and transition effects
* Play Again button to restart the game

## Planned Features
* Arena, Rarity hints
* Streaks
* Other gamemodes (description, splash card etc.)

## Technologies
* React
* TypeScript
* TailwindCSS
* JSON