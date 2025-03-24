<script lang="ts">
  import type {Snippet} from "svelte";
  import styles from './stack.module.css';

  type Props = {
    gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | boolean;
    vertical?: boolean;
    wrap?: boolean;
    top?: boolean;
    middle?: boolean;
    stretch?: boolean;
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
    stretch,
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

<div
  class={[
    styles.stack,
    { [styles[`gap--${gap}`]]: gap },
    { [styles.vertical]: vertical },
    { [styles.wrap]: wrap },
    { [styles.top]: top },
    { [styles.middle]: middle },
    { [styles.stretch]: middle },
    { [styles.bottom]: bottom },
    { [styles.left]: left },
    { [styles.center]: center },
    { [styles.right]: right },
    { [styles.spaceBetween]: spaceBetween },
    { [styles.reverse]: reverse },
    restProps.class
  ]}
>
  {@render children?.()}
</div>
