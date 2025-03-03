import { useLanguage } from "../contexts/language-context";
import { resources } from "../../lib/constants/resources";

export function useResources() {
    const { locale } = useLanguage();
    return resources[locale] || resources.en;
}
