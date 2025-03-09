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
   git clone https://github.com/PradhieepK/Quyil.git -> cd Quyil

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Usage
   - Open your browser and navigate to http://localhost:5173.
   - Browse the music collections on the main page.
   - Use the search bar to find specific collections by name.
   - Use the type filter to filter collections by type (Album, EP, Single).
   - Click on a collection to view detailed information.

## Components

1. Collections: Main component that displays the list of music collections.
2. CollectionDetails: Component for displaying detailed information about a specific collection.
3. TypeFilter: Component for filtering collections by type.

## API Endpoints

1. GET /collections: Fetch all music collections.
2. GET /collections/:id: Fetch details of a specific collection.
