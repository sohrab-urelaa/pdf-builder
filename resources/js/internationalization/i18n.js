import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
        },
    },
    fr: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next",
        },
    },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        backend: {
            loadPath: function (lngs, namespaces) {
                console.log("langes", lngs, namespaces, arguments);
                let language = lngs[0];
                if (language === "en") {
                    language = "en-US";
                }
                return `/storage/translations/${lngs[0]}.json`;
            },
        },
    });

export default i18n;
