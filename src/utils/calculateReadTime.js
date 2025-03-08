export default function calculateReadTime(markdownContent) {
    const wordsPerMinute = 200; // Average reading speed
    const words = markdownContent.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(words / wordsPerMinute);
    const minuteLabel = readTimeMinutes === 1 ? 'minute' : 'minutes';
    return `${readTimeMinutes} ${minuteLabel}`;
}
