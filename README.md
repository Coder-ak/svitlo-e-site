# README

## Overview

This project is a web application built using Preact and Vite. It's designed to fetch and display data from the svitlo-e-bot server's API endpoint for the chat-bot. The application also supports data refreshing on tab focus and visibility change.

## Getting Started

### Prerequisites

- Node.js (v20 or newer)
- npm (v10 or newer)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. Install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.development.local` file in the root of the project and add the following variables:

```env
VITE_PROXY_URL="http://localhost:3004"
VITE_API_URL="http://localhost:5173"
VITE_API_PATH="/api/v1/light-bot"
```

Replace the URLs and path with the appropriate values for your development environment.

Create a `.env` file in the root of the project and add the following variables:

```env
VITE_API_URL="https://svitloe.coderak.net"
VITE_API_PATH="/api/v1/light-bot"
```

### Running the Application

- To start the development server, run:

```bash
npm run dev
```

- To build the application for production, run:

```bash
npm run build
```

- To preview the production build locally, run:

```bash
npm run preview
```

## Project Structure

- `.env.development.local`: Environment variables for development.
- `.eslintrc.json`: Configuration for ESLint.
- `package.json`: Project dependencies and scripts.
- `site.webmanifest`: Configuration for the website manifest.
- `README.md`: Project documentation.
- `src/`: Source code for the application.
  - `components/`: Reusable components.
  - `pages/`: Components for different pages.
  - `state/`: Application state management.
  - `utils/`: Utility functions.
  - `style.less`: Global styles.
  - `variables.less`: Less variables.
  - `vite.config.ts`: Vite configuration.
  - `index.tsx`: Main entry point.

## Contributing

Contributions are welcome! Please follow the contributing guidelines.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
