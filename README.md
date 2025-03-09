# Quyil

Quyil is a music collection management application that allows users to browse, search, and filter music collections, including albums, EPs, and singles. The application provides detailed information about each collection, including song details, duration, size, and release date.

## Table of Contents

- Features
- Installation
- Usage
- Components
- API Endpoints
- Contributing
- License
- Code Snippet

## Features

- Browse music collections
- Search collections by name
- Filter collections by type (Album, EP, Single)
- View detailed information about each collection
- Navigate to collection details page

## Installation

1. Clone the repository:
   - git clone https://github.com/PradhieepK/Quyil.git
   - cd Quyil

2. Install dependencies:
   - npm install
   - If json-server is not installed, then install json-server using following command: npm install -g json-server
   - npx json-server --watch json-server/db.json --port 4000

4. Start the development server:
   - npm run dev

5. Usage
   - Open your browser and navigate to http://localhost:5173.
   - Browse the music collections on the main page.
   - Use the search bar to find specific collections by name.
   - Use the type filter to filter collections by type (Album, EP, Single).
   - Click on a collection to view detailed information.

## Components

- Collections: Main component that displays the list of music collections.
- CollectionDetails: Component for displaying detailed information about a specific collection.
- TypeFilter: Component for filtering collections by type.

## API Endpoints

- GET /collections: Fetch all music collections.
- GET /collections/:id: Fetch details of a specific collection.
