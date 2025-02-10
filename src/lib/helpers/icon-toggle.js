/* Usage: data-toggle-icon-target="targetSvg" data-toggle-icon="copy|check" */
function toggleIconOnClick(el) {
  const target = el.dataset.toggleIconTarget
    ? document.getElementById(el.dataset.toggleIconTarget)
    : el;
  const i = parseInt(el.dataset.iconIteration || 0, 10);
  const options = el.dataset.toggleIcon.split('|');
  const nextIteration = i + 1 === options.length ? 0 : i + 1;

  el.dataset.iconIteration = nextIteration;
  target.setAttribute('class', `bi-${options[nextIteration]}`);
}

document.addEventListener('click', (e) => {
  let target = e.target.closest('[data-toggle-icon]');

  if (target) {
    e.preventDefault();
    toggleIconOnClick(target);
    return false;
  }
});
