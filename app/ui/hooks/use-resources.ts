import { useLanguage } from "../contexts/language-context";
import { resources, Resources } from "../../lib/constants/resources";

export function useResources() {
    const { locale } = useLanguage();
    return resources[locale] as Resources[string];
}
