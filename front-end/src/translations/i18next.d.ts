import { resources, defaultNS } from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['en'];
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

// import { resources, defaultNS } from "./i18n";

// declare module "i18next" {
//   interface CustomTypeOptions {
//     defaultNS: typeof ns1;
//     resources: typeof resources["en"];
//   }
// }