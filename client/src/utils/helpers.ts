export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;

    if (typeof value === "number") {
        return value === 0 || Number.isNaN(value);
    }

    if (typeof value === "string") {
        return value.trim() === "";
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === "object") {
        return Object.keys(value as object).length === 0;
    }

    return false;
};
