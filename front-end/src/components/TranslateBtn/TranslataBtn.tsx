import React from 'react';
import btnstyle from './btnstyle.module.css';
import { useTranslation } from "react-i18next";
import '../../translations/i18n';



const TranslataBtn: React.FC = () => {

    const { i18n } = useTranslation('trans');

    const setFi = () => {
        i18n.changeLanguage('fi');
      }
    
      const setEn = () => {
        i18n.changeLanguage('en');
      }

    return (
        <div className={btnstyle.translatebtns}>
        <button className={btnstyle.btn} onClick={setFi}>FI</button><button className={btnstyle.btn} onClick={setEn}>EN</button>
      </div>
    );
};

export default TranslataBtn;