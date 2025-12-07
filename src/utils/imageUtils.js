
/**
 * Resolves the correct path for assets based on the deployment base URL.
 * @param {string} path - The absolute path to the asset (e.g., "/images/foo.jpg")
 * @returns {string} - The resolved path including the base URL (e.g., "/repo-name/images/foo.jpg")
 */
export const getAssetPath = (path) => {
    if (!path) return path;
    const base = import.meta.env.BASE_URL;

    // If base is root, or path is external/data url, return as is
    if (base === '/' || path.startsWith('http') || path.startsWith('data:')) {
        return path;
    }

    // Remove leading slash from path to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Ensure base ends with slash
    const cleanBase = base.endsWith('/') ? base : base + '/';

    return cleanBase + cleanPath;
};
