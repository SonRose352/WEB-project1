export function generateID() {
    const timePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 11);

    return timePart + randomPart;
}