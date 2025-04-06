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
    --album-side-length: 3rem;
    background-color: #222;
    border-radius: 8px;
    height: calc(3rem + (6 * var(--album-side-length)))
  }
  #album-count {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.25rem;
    width: 100%;
    height: 3rem;
    user-select: none;
  }
  #albums {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(10, var(--album-side-length));
    max-height: calc(6 * var(--album-side-length));
    width: 100%;
    overflow-y: auto;
  }
  .album {
    background: transparent;
    border: none;
    display: block;
    padding: 0px;
    width: var(--album-side-length);
    height: var(--album-side-length);
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