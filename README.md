# The Rapture Presentation

An interactive, web-based presentation constructed as a dynamic pitch deck. This application explores various themes through smooth slide transitions and immersive visuals.

## Features

- **Interactive Presentation Slides:** Smooth, animated transitions between slides exploring themes such as Pattern, Descent, Separation, Condition, Position, Possessor, and Security.
- **Dynamic Interactions:** Built-in verse modal, swipeable views, and full-screen scaling presentation mode.
- **Modern UI/UX:** Built with a sleek, dark-mode amber aesthetic using Tailwind CSS and Framer Motion.

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository (if applicable) or download the source code.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:3000`).

## Project Structure

- `src/components/slides/`: Contains the individual presentation slides (e.g., `TitleSlide.tsx`, `PatternSlide.tsx`).
- `src/App.tsx`: The main application entry point that manages slide navigation and state.
- `src/context/`: Contains context providers like `VerseProvider` for app-wide state.
