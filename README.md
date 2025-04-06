<h1 align='center'>
  <img src="./static/favicon.webp">
  <br>
  Spinify
</h1>

<p align='center'>
  <i>Random album picker</i>
</p>

<p align='center'>
  This web app allows you to pick out any amount of music releases and choose one at random.<br>
  Music data is sourced from <a href="https://www.last.fm/">Last.fm</a>.
</p>

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

## Roadmap

 - [ ] Overhaul UI 
    - [ ] Improve component layout
    - [ ] Create better album rolling effect
 - [ ] Allow multiple album lists
 - [ ] Include more metadata in search
 - [ ] Add temporary filtering by genre
 - [ ] Artist sync
    - [ ] Allow adding releases by artists (includes artist search)
    - [ ] Filter by release type (album, EP, single, etc.)
    - [ ] Auto-add new artist releases
 - [ ] Spotify integration
    - [ ] Server-sided storage
    - [ ] Add picks to library
    - [ ] Import releases from library
