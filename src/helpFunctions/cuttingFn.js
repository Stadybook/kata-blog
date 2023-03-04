export default function cuttingFn(text, symbols) {
    if (text === undefined) return '';
    if (text.length <= symbols) {
        return text;
    }
    const description = text.substring(0, symbols - 1);
    return `${description.substring(0, description.lastIndexOf(' '))}...`;
}
