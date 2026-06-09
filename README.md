# Entertainment Library

A movie browsing app built with React, TypeScript, MUI, and the TMDB API.

## Setup

1. Create a free account on [TMDB](https://www.themoviedb.org/).
2. Create an API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
3. Copy `.env.example` to `.env` and set your key:

```sh
VITE_APP_API_ENDPOINT_URL=https://api.themoviedb.org/3
VITE_APP_TMDB_V3_API_KEY=your_api_key_here
```

4. Install and run:

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy the `dist` folder to Vercel, Netlify, or any static host. Set the same `VITE_APP_*` variables in your hosting provider before building.

## Docker

```sh
docker build --build-arg VITE_APP_TMDB_V3_API_KEY=your_api_key_here -t entertainment-library .
docker run --name entertainment-library --rm -d -p 80:80 entertainment-library
```

## Features

- Movie browse, genre explore, detail modal, and video player
- RTK Query for TMDB API data
- Lazy-loaded routes and infinite scroll grids
- Responsive layout with MUI and framer-motion carousels
