import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "./i18n/locales";

const resources = Object.keys(locales)
    .reduce((res, key) => ({ ...res, [key]: { 
        translation: (locales as any)[key] }}), {} as Resource);

i18n
    .use(initReactI18next) 
    .init({
        lng: "pl", 
        resources,
        interpolation: {
            escapeValue: false,
        }
    });    

export default i18n;