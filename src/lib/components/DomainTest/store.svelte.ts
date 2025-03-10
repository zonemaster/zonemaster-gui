export let expandedModules: Record<string, boolean> = $state({});

export function toggleModule(module: string) {
  expandedModules[module] = !expandedModules[module];
}

export function expandAll(modules: string[]) {
  console.log(modules);
  modules.forEach((module) => {
    expandedModules[module] = true;
    console.log(module);
  });
}

export function collapseAll(modules: string[]) {
  modules.forEach((module) => {
    expandedModules[module] = false;
  });
}
