<script lang="ts">
  import { AlbumList } from "$lib/albumlist.svelte";

  let props: {list: AlbumList} = $props();
  let list = props.list;
  let albumCount = $derived(list.albums.length);
</script>

<div id="root">
  <div id="album-count">
    {#if albumCount == 0}
      No albums
    {:else if albumCount == 1}
      1 album
    {:else}
      {albumCount} albums
    {/if}
  </div>
  <div id="albums">
    {#each list.albums as album, i (album.name + " - " + album.artist)}
      <button class="album" title="{album.name}&#013;{album.artist}&#013;&#013;Click to remove" onclick={() => list.albums.splice(i, 1)}>
        <img loading="lazy" src={album.image} alt="{album.name} - {album.artist}">
      </button>
    {/each}
  </div>
</div>

<style>
  #root {
    background-color: #222;
    width: 500px;
    height: 360px;
    border-radius: 8px;
  }
  #album-count {
    box-sizing: border-box;
    color: #fff;
    display: flex;
    font-size: 20px;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  #albums {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(10, 50px);
    width: 100%;
    max-height: 320px;
    overflow-y: scroll;
  }
  .album {
    background: transparent;
    border: none;
    display: block;
    padding: 0px;
    width: 50px;
    height: 50px;
  }
  .album img {
    width: inherit;
    height: inherit;
  }
  .album img:hover {
    filter: blur(1px) invert(75%);
    cursor: pointer;
  }
</style>