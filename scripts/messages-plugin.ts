import path from 'path';
import type { Plugin } from 'vite';
import { generateMessages } from './generate-messages.ts';

interface MessagesPluginConfig {
    defaultLanguage: string;
    enabledLanguages: string[];
}

function validateConfig(config: any): asserts config is MessagesPluginConfig {
    const errors = [];
    if (!config?.defaultLanguage) errors.push('defaultLanguage is required');
    if (!Array.isArray(config?.enabledLanguages) || !config.enabledLanguages.length)
        errors.push('enabledLanguages must be a non-empty array');
    if (config?.enabledLanguages?.some((l: any) => typeof l !== 'string'))
        errors.push('enabledLanguages must contain only strings');

    if (errors.length) throw new Error(`messagesPlugin: ${errors.join(', ')}`);
}

export default function messagesPlugin(config: MessagesPluginConfig): Plugin {
    validateConfig(config);

    const langDir = path.resolve(process.cwd(), 'messages');
    const outDir = path.resolve(process.cwd(), 'src/messages');

    const regenerate = () => {
        console.log('🔄 Generating message files...');
        generateMessages(langDir, outDir, config);
    };

    return {
        name: 'vite-plugin-messages',

        buildStart() {
            regenerate();
        },

        configureServer(server) {
            server.watcher.add(langDir);
        },

        hotUpdate({ file }) {
            if (this.environment.name === 'client' && file.startsWith(langDir + path.sep) && file.endsWith('.json')) {
                console.log('♻️ Language file changed:', path.basename(file));
                regenerate();
                // Trigger a full reload to pick up the new messages
                this.environment.hot.send({ type: 'full-reload' });
                return [];
            }
        },
    };
}
