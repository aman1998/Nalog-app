import { useTranslation } from "react-i18next";

const AuthValidateText = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="sign-validate">
      <div className="validate-item">
        <div className="validate-item_circle" />
        <span className="validate-item_text">{t('validation.minSymbols', { number: 8 })}</span>
      </div>
      <div className="validate-item">
        <div className="validate-item_circle" />
        <span className="validate-item_text">{t('validation.minNumber', { number: 1 })}</span>
      </div>
      <div className="validate-item">
        <div className="validate-item_circle" />
        <span className="validate-item_text">{t('validation.atLeastLatinLetter', { number: 1 })}</span>
      </div>
    </div>
  );};

export default AuthValidateText;
