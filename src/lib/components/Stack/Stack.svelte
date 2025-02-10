<script lang="ts">
  import type {Snippet} from "svelte";

  type Props = {
    gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | boolean;
    vertical?: boolean;
    wrap?: boolean;
    top?: boolean;
    middle?: boolean;
    bottom?: boolean;
    left?: boolean;
    center?: boolean;
    right?: boolean;
    spaceBetween?: boolean;
    reverse?: boolean;
    children?: Snippet;
    class?: string;
  };

  let {
    gap = 'm',
    vertical,
    wrap,
    top,
    middle,
    bottom,
    left,
    center,
    right,
    spaceBetween,
    reverse,
    children,
    ...restProps
  }: Props = $props();
</script>

<div class={['stack', { [`gap--${gap}`]: gap }, { vertical }, { wrap }, { top }, { middle }, { bottom }, { left }, { center }, { right }, { spaceBetween }, { reverse }, restProps.class]}>
  {@render children?.()}
</div>
<style>
  .stack {
    display: flex;
    gap: var(--gap);
  }

  .wrap {
    flex-wrap: wrap;
  }

  .vertical {
    flex-direction: column;
  }

  /**
   *  =Horizontal Stack
   *  ==================================== */
  .stack:not(.vertical).bottom {
    align-items: flex-end;
  }

  .stack:not(.vertical).middle {
    align-items: center;
  }

  .stack:not(.vertical).top {
    align-items: flex-start;
  }

  .stack:not(.vertical).left {
    justify-content: flex-start;
  }

  .stack:not(.vertical).center {
    justify-content: center;
  }

  .stack:not(.vertical).right {
    justify-content: flex-end;
  }

  .stack:not(.vertical).space-between {
    justify-content: space-between;
  }

  .stack:not(.vertical).reverse {
    flex-direction: row-reverse;
  }

  /**
   *  =Vertical Stack
   *  ==================================== */
  .vertical.bottom {
    justify-content: flex-end;
  }

  .vertical.middle {
    justify-content: center;
  }

  .vertical.top {
    justify-content: flex-start;
  }

  .vertical.left {
    align-items: flex-start;
  }

  .vertical.center {
    align-items: center;
  }

  .vertical.right {
    align-items: flex-end;
  }

  .vertical.reverse {
    flex-direction: column-reverse;
  }
</style>
