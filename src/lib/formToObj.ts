/**
 * Converts form data to a nested JavaScript object.
 * Supports arbitrarily nested form fields using bracket notation.
 * Example: input name="user[address][city]" becomes { user: { address: { city: value } } }
 * Skips empty string values, removing them from the result.
 */
export default function formToObj(element: HTMLFormElement) {
    const formData = new FormData(element);
    const result = {};

    formData.forEach((value, key) => {
        // Skip empty string values
        if (typeof value === 'string' && value.trim() === '') {
            return;
        }

        // Parse the key path
        const path = parsePath(key);

        // Set the value at the specified path
        setValueAtPath(result, path, value);
    });

    return result;
}

/**
 * Parses a form field name into an array of path segments.
 * Example: "user[address][city]" becomes ["user", "address", "city"]
 */
function parsePath(key: string): string[] {
    // Match the base key and any bracketed parts
    const matches = key.match(/[^\[\]]+/g);
    return matches || [key];
}

/**
 * Sets a value at the specified path in an object, creating intermediate objects/arrays as needed.
 */
function setValueAtPath(
    obj: Record<string, any>,
    path: string[],
    value: any,
): void {
    // Handle empty path (shouldn't happen, but just in case)
    if (path.length === 0) return;

    // For single-segment path, just set the value directly
    if (path.length === 1) {
        obj[path[0]] = value;
        return;
    }

    // Get the current segment and determine if the next segment is numeric
    const currentSegment = path[0];
    const nextSegment = path[1];
    const isNextNumeric = !isNaN(parseInt(nextSegment, 10));

    // Initialize the current level if needed
    if (obj[currentSegment] === undefined) {
        obj[currentSegment] = isNextNumeric ? [] : {};
    }

    // Handle array case specially to ensure we have the right structure
    if (isNextNumeric) {
        const index = parseInt(nextSegment, 10);

        // Ensure the array has the right length
        if (
            Array.isArray(obj[currentSegment]) &&
            obj[currentSegment].length <= index
        ) {
            // Fill any gaps in the array with empty objects
            for (let i = obj[currentSegment].length; i <= index; i++) {
                obj[currentSegment][i] = {};
            }
        }
    }

    // Recurse with the rest of the path
    setValueAtPath(obj[currentSegment], path.slice(1), value);
}
