const TranslatedText = ({ t, children }) => {
    const replacePlaceholders = (text) => {
        return text.replace(/{{(.*?)}}/g, (_, key) => {
            return t(key);
        });
    };

    return replacePlaceholders(children);
};

export default TranslatedText;
