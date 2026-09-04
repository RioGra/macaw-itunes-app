# MACAW - iTunes Search Application

A full-stack web application that allows users to search the iTunes Store and Apple Books for media content including music, podcasts, audiobooks, ebooks and more. Features a 30-second audio preview player and a personalised favourites list.

## 🌟 Features

- **iTunes Store search** - Search by keyword and media type
- **Media Cards** - Results displayed with album artwork, artist name, title and release year
- **30-second Audio Previews** - Play iTunes directly in the app via a fixed bottom player
- **Favourites List** - Add and remove favourites — displayed in a side panel on desktop, slide-out drawer on mobile
- **Responsive Mobile-First Design** - Built with Bootstrap, optimised for all screen sizes
- **JWT-Secured API** - All search requests authorised with JSON Web Tokens
- **Accessible UI** - Lighthouse accessibility score 18/18
- **Loading Skeleton** - Animated skeleton cards shown during API Calls

## 🛠️ Tech Stack

### Frontend

- **React 19.2.8** - UI framework
- **Vite** - Build tool and dev server
- **Bootstrap 5.3.8** - Responsive UI components
- **Bootstrap Icons 1.13.1** - Icon library
- **Axios** - HTTP requests
- **Vitest + React Testing Library** - Unit testing

### Backend

- **Node.js + Express** - Server framework
- **JWT (jsonwebtoken)** - API authentication
- **Axios** - iTunes API calls
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

1. Install server dependencies:

```bash
   cd server
   npm install
```

2. Create a`.env` file inside the `server` folder:

```env
   PORT=5001
   JWT_SECRET=your_own_secret_key
```

Use your own secret value. Do not commit the `.env` file to Git.

3. Start the server from the `server` folder:

```bash
   node server.js
```

4. Open a second terminal and install the client dependencies:

```bash
  cd client
  npm install
```

5. Start the client from the `client` folder:

```bash
   npm run dev
```

6. Open browser at http://localhost:5173

## 🧪 Testing

Unit tests written with **Vitest** and **React Testing Library**

To run all client tests:

1. Open a terminal in the project folder
2. Change to client folder:

```bash
   cd client
```

3.Install client dependencies:

```bash
  npm install
```

4. Run all tests:

```bash
  npm test -- --run
```

A successful test run reports that all tests passed and finishes with exit code `0`.

### Tests cover:

- `AudioPlayer` - checks that nothing is displayed when no track is selected
- `FavouritesDrawer` - checks empty state and displays a saved favourite
- `FavouritesPanel` - checks empty state and displays a saved favourite
- `Footer`- checks footer text is displayed
- `MediaCard` - checks the artist name and favourite button states
- `NavBar` - checks that the MACAW app name is displayed
- `ResultsGrid` - checks the initial message and no-results message
- `SearchBar` - checks the input, Search button, empty search and submitted search

### Additional testing completed:

- Functional testing in browser
- Responsive testing on mobile,tablet and desktop views
- Accessibility testing with Chrome Lighthouse: 18/18
- Cross-browser testing in Chrome and Safari

## ⚠️ API NOTES

- Uses the iTunes Search API
- Audio previews are 30-second samples - for promotional use only
- Use of sound samples must be proximate to a store badge (included in player)
- Some media types (e.g movies) may return limited results depending on iTunes store availability. The iTunes API returns 0 results for movies. This is an API limitation not a code issue.

## 📖 Usage

Searching for Content

1. Type a keyword in the Search iTunes field
2. Select a media type from the dropdown (music, Podcast, Audiobook etc)
3. Click Search

Audio Preview

1. Click the Preview button on any media card
2. A player bar appears at the bottom of the screen
3. Play, pause or close the preview

Favourites

1. Click Add to Favourites on any card
2. View saved favourites via the Favourites button in the navbar
3. Remove items by clicking the X icon

## 📂 Project Structure

The main project folders are organised as follows:

```
itunes-app/
|-- .gitignore
|-- README.md
|-- client/
| |-- public
| |-- src/
| | |-- assets/ _ Images (mACAW logo)
| | |-- components/ _ React UI components
| | | |-- AudioPlayer.jsx
| | | |-- FavouritesDrawer.jsx
| | | |-- FavouritesPanel.jsx
| | | |-- Footer.jsx
| | | |-- MediaCard.jsx
| | | |-- NavBar.jsx
| | | |-- ResultsGrid.jsx
| | | |-- SearchBar.jsx
| | |
| | |-- services/
| | | |-- api.js _ JWT token fetch and iTunes API
| | |-- tests/ _ Vitest unit tests
| | |-- App.jsx _ Root component and state
| | |-- App.css _ Global styles
| | |-- main.jsx _ React entry point
| |--index.html
| |--vite.config.js
| |--package.json
| |
|-- server/
|   |-- controllers/
|   |    |-- searchController.js _ iTunes API call
|   |-- middleware/
|   |    |-- authMiddleware.js _ JWT token verification
|   |-- routes/
|   |    |-- itunesRoutes.js _ Express route definitions
|   |-- .env _ Environment variables
|   |-- .gitignore
|   |-- server.js _ Express entry point
|   |-- package.json
```

## Wireframes

Mobile and Desktop application wireframes are included in [wireframes.pdf](wireframes.pdf).

## Live Demo

## 🎨 Design Philosophy

App name - MACAW - Inspired by Hyacinth Macaw encountered during project planning

- Dark theme with cobalt blue and electric blue accents
- Yellow highlights for interactive elements
- Inter font family throughout
- Glassmorphism effect on the favourites drawer
- Neon blue glow on card hover

## 🔐 Security

- JWT tokens issued on every session - expire after 1 hour
- CORS restricted to localhost:5173
- Secrets stored in .env - never committed to git
- Input validation on all API endpoints

## Browser Support

- Chrome - recommended for development and testing

## 🚧 Future Enhancements

- Persistent favourites with database storage
- Full desktop split panel with playlist management
- Search history

## 👩‍💻 Author

Gráinne Riordan
Full-Stack Capstone Project - 2026

## 🙏🏻 Acknowledgements

- Apple iTunes Search API
- HyperionDev Bootcamp for project guidance
- Bootstrap and Bootstrap Icons
