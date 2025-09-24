import type { ResultLevel } from '@/lib/client.ts';

const icons: Record<ResultLevel, string> = {
    INFO: 'check-circle-fill',
    NOTICE: 'exclamation-circle-fill',
    WARNING: 'exclamation-triangle-fill',
    ERROR: 'x-circle-fill',
    CRITICAL: 'x-octagon-fill',
};

const iconsAlt: Record<ResultLevel, string> = {
    INFO: 'check',
    NOTICE: 'exclamation',
    WARNING: 'exclamation-triangle-fill',
    ERROR: 'x',
    CRITICAL: 'x-octagon-fill',
};

export function resultIcon(level: ResultLevel) {
    return icons[level] || 'question-circle-fill';
}

export function resultIconAlt(level: ResultLevel) {
    return iconsAlt[level] || 'question-circle-fill';
}
