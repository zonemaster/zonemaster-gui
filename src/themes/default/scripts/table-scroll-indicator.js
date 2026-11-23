document.querySelectorAll('[data-table-scroll]').forEach((wrapper) => {
    const tableContainer = wrapper.querySelector('[data-table-scroll-container]');
    const indicator = wrapper.querySelector('[data-table-scroll-indicator]');
    const table = tableContainer?.querySelector('table');

    if (!(tableContainer instanceof HTMLElement) || !(indicator instanceof HTMLElement)) {
        return;
    }

    const updateIndicator = () => {
        const hasHorizontalOverflow =
            tableContainer.scrollWidth > tableContainer.clientWidth;
        const isAtEnd =
            tableContainer.scrollLeft + tableContainer.clientWidth >=
            tableContainer.scrollWidth - 1;

        indicator.hidden =
            !hasHorizontalOverflow || isAtEnd;
    };

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(tableContainer);
    if (table instanceof HTMLTableElement) {
        resizeObserver.observe(table);
    }
    tableContainer.addEventListener('scroll', updateIndicator, { passive: true });
    window.addEventListener('resize', updateIndicator, { passive: true });
    updateIndicator();
});
