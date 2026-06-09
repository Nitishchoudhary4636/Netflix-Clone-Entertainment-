# Entertainment Library

A movie browsing app built with React, TypeScript, and MUI. Movie data is bundled locally — no API key required.

## Setup

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy the `dist` folder to Vercel, Netlify, or any static host.

## Docker

```sh
docker build -t entertainment-library .
docker run --name entertainment-library --rm -d -p 80:80 entertainment-library
```

## Features

- 20 curated movies with trailers, genres, and browse grids
- Detail modal with YouTube trailers and similar titles
- Video player page with custom controls
- Lazy-loaded routes and infinite scroll grids
- Responsive layout with MUI and framer-motion carousels

## Data

Movies live in `src/data/movies.ts`. To add more titles, extend that file and update `src/data/genres.ts` if needed.
