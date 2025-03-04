"use client";
import { useLanguage } from "../../contexts/language-context";
import { useResources } from "../../hooks/use-resources";
import styles from "./language-switcher.module.scss";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const r = useResources();

    return (
        <select
            className={`form-select form-select-sm w-auto ${styles.languageSwitcher}`}
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="Language selector"
        >
            <option value="en">{r.languages?.english || "English"}</option>
            <option value="vi">{r.languages?.vietnamese || "Tiếng Việt"}</option>
            <option value="th">{r.languages?.thai || "ไทย"}</option>
            <option value="id">{r.languages?.indonesian || "Bahasa Indonesia"}</option>
            <option value="zh">{r.languages?.chinese || "中文"}</option>
        </select>
    );
}

export default LanguageSwitcher;
