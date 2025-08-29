# Shiritori Game

A web-based Shiritori game built with React, TypeScript, and Vite.

## Overview

This project implements the classic word game Shiritori, where players take turns saying words that begin with the last letter of the previous word. The game enforces several rules:

- Words must be at least 4 characters long.
- Words must start with the last character of the previous word (if any).
- Words must be single words containing only letters.
- Words cannot be repeated.

The game is built with a modern React stack, utilizing TypeScript for type safety and Vite for fast development. It also includes styling with Tailwind CSS and Radix UI for accessible components.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- clsx
- tailwind-merge

## Setup

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd shiritori-game
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Run the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

## Gameplay Instructions

1.  The game starts with Player 1.
2.  Player 1 enters a word that is at least 4 letters long and contains only letters.
3.  Player 1 submits the word.
4.  The game switches to Player 2.
5.  Player 2 must enter a word that starts with the last letter of Player 1's word.
6.  The game continues, with each player entering a word that starts with the last letter of the previous word.
7.  Players cannot repeat words.
8.  If a player enters an invalid word, an error message will be displayed.
9.  The game continues until a player cannot think of a valid word.
