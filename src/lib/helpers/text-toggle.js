/* Usage: data-toggle-target="toggleButton" data-toggle-text="First|Second|Third" */
function toggleTextOnClick(el) {
  const target = el.dataset.toggleTarget
    ? document.getElementById(el.dataset.toggleTarget)
    : el;
  const i = parseInt(el.dataset.iteration || 0, 10);
  const options = el.dataset.toggleText.split('|');
  const nextIteration = i + 1 === options.length ? 0 : i + 1;
  const ariaPressed = el.getAttribute('aria-pressed');

  el.dataset.iteration = nextIteration;
  target.innerText = options[nextIteration];

  if (ariaPressed) {
    el.setAttribute('aria-pressed', ariaPressed === 'true' ? 'false' : 'true');
  }
}

document.addEventListener('click', (e) => {
  let target = e.target.closest('[data-toggle-text]');

  if (target) {
    e.preventDefault();
    toggleTextOnClick(target);
    return false;
  }
});
