export function getValidationErrorByPath(
    error: any,
    path: string,
): string | false {
    if (!error || !error.data || !Array.isArray(error.data)) {
        return false;
    }

    return (
        error.data.find((error: any) => error.path === path)?.message || false
    );
}
