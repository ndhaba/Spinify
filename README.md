# Spinify

Random album picker

This web app allows you to pick out any amount of music releases and choose one at random. Music data is sourced from [Last.fm](https://www.last.fm/).

## Setup Requirements

Spinify requires an environment variable `LASTFM_API_KEY`, specifying a [Last.fm API key](https://www.last.fm/api)

## Development

Once you've setup the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version of Spinify:

```bash
npm run build
```

You can preview the production build with `npm run preview`.