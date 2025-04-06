<script lang="ts">
  import { AlbumList, type Album } from "$lib/albumlist.svelte";

  let props: {list: AlbumList} = $props();
  let list = props.list;

  let results: Album[] = $state([]);
  let searchQuery = $state("");
  let searchBarValue = $state("");

  function onkeydown(event: KeyboardEvent){
    if(event.key != "Enter"){
      return;
    }
    searchQuery = searchBarValue;
    fetch("/search_album?q=" + encodeURIComponent(searchQuery)).then(function(value){
      value.json().then(function(json){
        results = json.albums;
      })
    })
  }
</script>

<div id="root">
  <div id="search-wrapper">
    <div id="search-image-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
      </svg>
    </div>
    <input type="text" placeholder="Search for an album" {onkeydown} bind:value={searchBarValue}>
  </div>
    {#if results.length == 0}
      <div id="search-message">
        <span id="search-message-span">
          {#if searchQuery == ""}
            Use the search bar to search for an album
          {:else}
            No results found
          {/if}
        </span>
        <div id="credits">
          <img src="/lastfm.webp" alt="Last.fm" width="16" height="16" style="image-rendering: smooth; border-radius: 3px;">
          <span>Music data from <a href="https://www.last.fm/" target="_blank">Last.fm</a></span>
        </div>
      </div>
    {:else}
      <div id="results">
        {#each results as result}
          <button class="result" title="{result.name}&#013;{result.artist}" onclick={() => list.add(result)}>
            <img src={result.image} alt="{result.name} - {result.artist}">
          </button>
        {/each}
      </div>
    {/if}
</div>

<style>
  #root {
    background-color: #222;
    box-sizing: border-box;
    width: 280px;
    min-width: 280px;
    height: 388px;
    border-radius: 8px 8px;
  }
  #search-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 38px;
    min-height: 38px;
    padding: 2px;
  }
  #search-image-box {
    display: flex;
    min-width: 32px;
    height: 100%;
    justify-content: center;
    align-items: center;
    fill: #fff;
  }
  #search-wrapper input {
    background: transparent;
    border: none;
    color: #fff;
    width: 100%;
    outline: none;
  }
  #results {
    display: grid;
    grid-template-columns: repeat(4, 70px);
    grid-template-rows: repeat(5, 70px);
    gap: 0px;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 350px;
  }
  .result {
    background: transparent;
    border: none;
    display: block;
    padding: 0px;
    width: 64px;
    height: 64px;
  }
  .result img {
    width: inherit;
    height: inherit;
  }
  .result:hover {
    cursor: pointer;
  }
  #search-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 76px);
    flex-direction: column;
    gap: 8px;
  }
  #search-message span {
    color: #fff;
    display: inline-block;
    font-size: 0.75rem;
    text-align: center;
    vertical-align: center;
    user-select: none;
  }
  #search-message-span {
    font-size: 1rem;
    width: 75%;
  }
  #credits {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: center;
  }
  a {
    color: #8f8;
  }
</style>