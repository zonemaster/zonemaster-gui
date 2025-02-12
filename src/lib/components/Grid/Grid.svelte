<script lang="ts">
  import type {Snippet} from "svelte";

  type Props = {
    gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | boolean;
    cols?: 2 | 3 | 4 | 5 | 6;
    children?: Snippet;
  };

  let { gap = 'm', cols = 3, children }: Props = $props();
</script>

<div class={['grid', { [`gap--${gap}`]: gap }, { [`cols-${cols}`]: cols }]}>
  {@render children?.()}
</div>

<style>
  .grid {
    display: grid;
    gap: var(--gap);
    width: 100%;
  }

  .cols-2 {
    grid-template-columns: repeat(1, 1fr);

    @media screen and (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .cols-3 {
    grid-template-columns: repeat(1, 1fr);

    @media screen and (min-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .cols-4 {
    grid-template-columns: repeat(1, 1fr);

    @media screen and (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 769px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .cols-5 {
    grid-template-columns: repeat(1, 1fr);

    @media screen and (min-width: 576px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .cols-6 {
    grid-template-columns: repeat(1, 1fr);

    @media screen and (min-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 769px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>
