import Axios from "axios";
import { LASTFM_API_KEY } from "$env/static/private";
import type { Album } from "./albumlist.svelte";

type LastFMImageSize = "small" | "medium" | "large" | "extralarge";

type LastFMSearchAlbum = {
  name: string;
  artist: string;
  url: string;
  image: {"#text": string; size: LastFMImageSize}[];
  streamable: string;
  mbid: string
}

type LastFMSearchResult = {
  albummatches: {
    album: LastFMSearchAlbum[]
  }
}

type LastFMSearchCacheEntry = {
  expires: number;
  albums: Album[]
}

function getImageMap(album: LastFMSearchAlbum): Map<LastFMImageSize, string> {
  var obj: Map<LastFMImageSize, string> = new Map();
  for(let image of album.image){
    obj.set(image.size, image["#text"]);
  }
  return obj;
}

var albumSearchCache: Map<string, LastFMSearchCacheEntry> = new Map();

export async function searchAlbums(input: string): Promise<Album[]> {
  input = input.toLowerCase();
  if(albumSearchCache.has(input)){
    let entry = albumSearchCache.get(input)!;
    if(Date.now() < entry.expires){
      return entry.albums;
    }
  }
  let response = await Axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(input)}&api_key=${LASTFM_API_KEY}&format=json&limit=20`, {
    headers: {
      'User-Agent': "Spinify/1.0"
    }
  });
  if(response.status != 200){
    return [];
  }
  if(!response.data.results ||!response.data.results.albummatches || !response.data.results.albummatches.album){
    return [];
  }
  let data: LastFMSearchResult = response.data.results;
  let albums = data.albummatches.album.map(fmalbum => {
    let images = getImageMap(fmalbum);
    return {
      name: fmalbum.name,
      artist: fmalbum.artist,
      image: images.get("medium") || "/unknownalbum.jpg"
    }
  });
  albumSearchCache.set(input, {
    albums,
    expires: Date.now() + (1000 * 60 * 60 * 24)
  });
  return albums;
}