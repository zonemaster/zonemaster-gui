import DomainTest from './components/DomainTest/DomainTest.svelte';
import ProgramVersions from './components/ProgramVersions/ProgramVersions.svelte';
import { createTestAgent } from './TestAgent.ts';
import { setApiBaseUrl, setPollingInterval } from '@/config.ts';
import * as client from './client.ts';
import './styles/style.css';

if (window?.zonemaster?.apiEndpoint) {
    setApiBaseUrl(window.zonemaster.apiEndpoint);
}

if (window?.zonemaster?.pollingInterval) {
    setPollingInterval(window.zonemaster.pollingInterval);
}

export { DomainTest, ProgramVersions, createTestAgent, client };
