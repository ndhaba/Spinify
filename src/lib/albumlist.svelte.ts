import { browser } from '$app/environment';

export type Album = {
  name: string;
  artist: string;
  image: string;
}

export class AlbumList {
  albums = $state<Album[]>() as Album[];
  key = '';

  constructor(key: string) {
    this.key = key;

    if (browser) {
      const item = localStorage.getItem(key);
      if (item) {
        this.albums = JSON.parse(item);
      } else {
        this.albums = [];
      }
    } else {
      this.albums = [];
    }

    $effect(() => {
      localStorage.setItem(this.key, JSON.stringify(this.albums));
    });
  }

  add(album: Album): boolean {
    if(this.contains(album)){
      return false;
    } else {
      this.albums.push(album);
      return true;
    }
  }

  contains(album: Album): boolean {
    for(let a of this.albums){
      if(a.name == album.name && a.artist == album.artist && a.image == album.image){
        return true;
      }
    }
    return false;
  }

  remove(album: Album): boolean {
    for(let i = 0; i < this.albums.length; ++i){
      let a = this.albums[i];
      if(a.name == album.name && a.artist == album.artist && a.image == album.image){
        this.albums.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

export function albumList(key: string): AlbumList {
  return new AlbumList(key);
}