# Orbit CLI Pitch Deck

An interactive, web-based presentation and live execution demo for the **Orbit CLI** and **StorageGrid** migration tools. This application serves as a dynamic pitch deck to showcase how Orbit CLI automates the translation of legacy mainframe logic into modern Go structs and batch configurations.

## Features

- **Interactive Presentation Slides:** Smooth, animated transitions between slides explaining the problem, solution, and architecture.
- **Live Execution Demo:** A built-in terminal simulator that visually demonstrates the Orbit CLI in action.
  - **Controlled Execution:** Presenters can control when the mock execution starts via a "Run Execution" button.
  - **Typing Animations:** Simulates real-time command typing and interactive CLI prompts.
  - **Log Streaming:** Displays realistic output logs for `orbit --init`, `orbit --migrate`, and `storagegrid-cli` commands.
- **Modern UI/UX:** Built with a sleek, dark-mode aesthetic using Tailwind CSS and Framer Motion.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
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

- `src/components/slides/`: Contains the individual slide components (e.g., `DemoSlide.tsx` for the live execution demo).
- `src/App.tsx`: The main application entry point that manages slide navigation and state.
- `src/index.css`: Global styles and Tailwind CSS configuration.

## Demo Scenarios

The "Live Execution Demo" slide includes three interactive scenarios:
1. **Orbit CLI: Init:** Demonstrates scaffolding a new project codebase (`./orbit --init`).
2. **Orbit CLI: Migrate:** Shows the extraction and translation of legacy Talon Batch logic into Go (`./orbit --migrate`).
3. **StorageGrid Server:** Simulates a mock downstream server receiving and validating the translated payload.
