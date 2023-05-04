import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

// import login_fi from './fi/login.json';
// import login_en from './en/login.json';
// import sidebaruser_fi from './fi/sidebaruser.json';
// import sidebaruser_en from './en/sidebaruser.json';


import en from './en/trans.json';
import fi from './fi/trans.json';



export const defaultNS = "ns";
export const resources = {
    en: {
        trans: en,
    },

    fi: {
       trans: fi,
      }
};

i18next.use(initReactI18next).init({
    returnNull: false,
    fallbackLng: "en",
    // ns:
    defaultNS,
    resources,
    react: {
        bindI18n: 'languageChanged loaded',
    }
});