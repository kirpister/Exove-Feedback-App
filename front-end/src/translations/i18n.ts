import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

import login_fi from './fi/login.json';
import login_en from './en/login.json';

export const defaultNS = "ns1";
export const resources = {
    fi: {
        login: login_fi,
      },
    en: {
        login: login_en,
    }
};

i18next.use(initReactI18next).init({
    lng: "en",
    ns: ["login_fi", "login_en"],
    defaultNS,
    resources,
    react: {
        bindI18n: 'languageChanged loaded',
    }
});