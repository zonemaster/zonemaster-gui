import type { ResultLevel } from '@/lib/client.ts';

const icons: Record<ResultLevel, string> = {
    INFO: 'check-circle-fill',
    NOTICE: 'exclamation-circle-fill',
    WARNING: 'exclamation-triangle-fill',
    ERROR: 'x-circle-fill',
    CRITICAL: 'x-octagon-fill',
};

export function resultIcon(level: ResultLevel) {
    return icons[level] || 'question-circle-fill';
}
