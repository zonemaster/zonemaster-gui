/* Add class to html-element on tab click */

const element = document.getElementsByTagName('html')[0];
const highLightClass = 'tab-highlight';

function onKeyDown(e) {
    const event = e;
    if (!event) {
        window.event = event;
    }

    const keyCode = event.keyCode || event.which;
    const tabKey = 9;

    if (keyCode === tabKey) {
        this.classList.add(highLightClass);
    }
}

/* Remove class on mouse click */
function onMouseDown() {
    this.classList.remove(highLightClass);
}

/* Run on events */

element.addEventListener('keydown', onKeyDown);
element.addEventListener('mousedown', onMouseDown);
