import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import locales from "./i18n/locales";
import Cookies from 'js-cookie';

const resources = Object.keys(locales)
    .reduce((res, key) => ({ ...res, [key]: { 
        translation: (locales as any)[key] }}), {} as Resource);

i18n
    .use(initReactI18next) 
    .init({
        lng: Cookies.get('lang') || 'en', 
        resources,
        interpolation: {
            escapeValue: false,
        }
    });    

export default i18n;