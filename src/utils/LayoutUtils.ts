export const highlightMatch = (text: string, input: string) => {
    const regex = new RegExp(`(${input})`, 'gi');
    return text.replace(regex, "<span class='green'>$1</span>");
};
