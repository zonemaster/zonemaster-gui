import '../src/themes/default/styles/theme.css';
import '../src/themes/default/styles/foundation.css';
import '../src/assets/fonts/bootstrap-icons.min.css';
import '../src/lib/styles/style.css';
import { createTestAgent } from '../src/lib/main.ts';

const agent = createTestAgent();
const button = document.getElementById('headless') as HTMLButtonElement;

agent.subscribe((state, context) => {
    if (state === 'testing') {
        button.disabled = true;
        button.innerText = `Testing...${context.progress}%`;
    } else {
        button.disabled = false;
        button.innerText = 'Start test';
    }
});

button?.addEventListener('click', () => {
    agent.transition('START', {
        domain: 'zonemaster.net',
    });
});
