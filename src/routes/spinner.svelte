<script lang="ts">
  import { AlbumList, type Album } from "$lib/albumlist.svelte";

  let props: {list: AlbumList} = $props();
  let list = props.list;
  let selectedAlbum: Album | null = $state(null);
  let selectedAlbumGone = $derived(selectedAlbum ? !list.contains(selectedAlbum) : true)
  let randomAlbum: Album | null = $state(null);


  function repeat(fn: Function, delay: number, iters: number): Promise<void> {
    return new Promise(function(resolve){
      let i = 0;
      let interval = setInterval(function(){
        fn();
        if(++i == iters){
          clearInterval(interval);
          resolve();
        }
      }, delay);
    })
  }
  function newRandomAlbum(){
    randomAlbum = list.albums[Math.floor(Math.random() * list.albums.length)];
  }
  function newSelectedAlbum(){
    selectedAlbum = list.albums[Math.floor(Math.random() * list.albums.length)];
  }
  async function roll(){
    if(randomAlbum != null){
      return;
    }
    newSelectedAlbum();
    newRandomAlbum();
    await repeat(newRandomAlbum, 100, 10);
    await repeat(newRandomAlbum, 200, 5);
    await repeat(newRandomAlbum, 333, 3);
    await repeat(newRandomAlbum, 500, 6);
    randomAlbum = null;
  }
</script>

<div id="root">
  {#if selectedAlbum == null}
    <button onclick={roll} class="big">Roll a new album</button>
  {:else if randomAlbum == null}
    <img src="{selectedAlbum.image}" width="64" height="64" alt="{selectedAlbum.name} - {selectedAlbum.artist}">
    <span>{selectedAlbum.name} - {selectedAlbum.artist}</span>
    <button onclick="{() => list.remove(selectedAlbum!)}" disabled={selectedAlbumGone}>Remove from list</button>
    <button onclick="{roll}">Reroll</button>
  {:else}
    <img src="{randomAlbum.image}" width="64" height="64" alt="{randomAlbum.name} - {randomAlbum.artist}">
    <span>{randomAlbum.name} - {randomAlbum.artist}</span>
  {/if}
</div>

<style>
  #root {
    background-color: #222;
    border-radius: 8px;
    display: flex;
    width: 400px;
    height: 400px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }
  button {
    background-color: rgb(29, 185, 84);
    border: none;
    border-radius: 6px;
    font-size: 16px;
    padding: 4px 8px;
  }
  button.big {
    font-size: 20px;
  }
  button:disabled {
    color: #444;
    filter: grayscale(50%);
  }
  button:hover:not(:disabled) {
    background-color: #60ce87;
    cursor: pointer;
  }
  span {
    color: #fff;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    width: 75%;
  }
</style>