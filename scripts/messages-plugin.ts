import path from 'path';
import { generateMessages } from './generate-messages.ts';

interface MessagesPluginConfig {
    defaultLanguage: string;
    enabledLanguages: string[];
}

function validateConfig(config: any): asserts config is MessagesPluginConfig {
    if (!config || typeof config !== 'object') {
        throw new Error('messagesPlugin: config is required and must be an object');
    }
    if (!config.defaultLanguage || typeof config.defaultLanguage !== 'string') {
        throw new Error('messagesPlugin: config.defaultLanguage is required and must be a string');
    }
    if (!Array.isArray(config.enabledLanguages) || config.enabledLanguages.length === 0) {
        throw new Error('messagesPlugin: config.enabledLanguages is required and must be a non-empty array');
    }
    if (!config.enabledLanguages.every((lang: any) => typeof lang === 'string')) {
        throw new Error('messagesPlugin: config.enabledLanguages must contain only strings');
    }
}

export function messagesIntegration() {
    return {
        name: 'messages-integration',
        hooks: {
            'astro:config:setup': ({ injectScript }: any) => {
                injectScript(
                    'before-hydration',
                    `
                    import { setLocale } from '@/messages';
                    setLocale(document.documentElement.lang);
                    `
                );
            },
        },
    };
}

export default function messagesPlugin(config: MessagesPluginConfig) {
    validateConfig(config);

    const langDir = path.resolve(process.cwd(), 'messages');
    const outDir = path.resolve(process.cwd(), 'src/messages');

    const regenerate = () => {
        try {
            console.log('🔄 Generating message files...');
            generateMessages(langDir, outDir, config);
        } catch (error) {
            console.error('❌ Failed to generate message files:', error);
            throw error;
        }
    };

    return {
        name: 'vite-plugin-messages',

        buildStart() {
            regenerate();
        },

        configureServer(server: any) {
            server.watcher.add(langDir);
        },

        handleHotUpdate({ file, server }: { file: string; server: any }) {
            if (file.startsWith(langDir) && file.endsWith('.json')) {
                console.log('♻️ Language file changed:', path.basename(file));
                regenerate();
                // Trigger a full reload to pick up the new messages
                server.ws.send({ type: 'full-reload' });
                return [];
            }
        },
    };
}
