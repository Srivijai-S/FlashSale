import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Initialize i18next
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: localStorage.getItem("language") || "en",
    load: "languageOnly", // Only load the language files
    backend: {
      loadPath: "/localization/{{lng}}.json",
      // loadPath: process.env.REACT_APP_LOCALIZATION_URL,ss
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  })
  .then(() => {
    // console.log("i18next initialized");
  })
  .catch((err) => {
    console.error("i18next initialization error:", err);
  });

export default i18n;
