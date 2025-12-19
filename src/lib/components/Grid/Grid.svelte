<script lang="ts">
  import type {Snippet} from "svelte";

  type Props = {
    gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | boolean;
    cols?: 2 | 3 | 4 | 5 | 6;
    children?: Snippet;
  };

  let { gap = 'm', cols = 3, children }: Props = $props();
</script>

<div class={['zm-grid', { [`zm-gap--${gap}`]: gap }, { [`zm-grid--${cols}`]: cols }]}>
  {@render children?.()}
</div>
