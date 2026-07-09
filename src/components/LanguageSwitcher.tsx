import clsx from "clsx";
import { useTranslation } from "react-i18next";

type Language = "en" | "ru" | "uz";

const languages: { label: string; value: Language }[] = [
  { label: "EN", value: "en" },
  { label: "РУ", value: "ru" },
  { label: "O'Z", value: "uz" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <div className="flex items-center h-9 rounded-full bg-secondary border border-border px-1">
      {languages.map((language) => (
        <button
          key={language.value}
          type="button"
          onClick={() => changeLanguage(language.value)}
          className={clsx(
            "h-7 px-3 rounded-full text-xs font-semibold transition-colors",
            i18n.language === language.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-secondary-foreground"
          )}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
}