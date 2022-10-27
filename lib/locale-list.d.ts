import Locale from './locale';
export default class LocaleList {
    /** A set of ISO 3166-1 alpha-2 country codes. */
    readonly countries: Set<string>;
    /** A set of ISO 639-1 alpha-2 language codes. */
    readonly languages: Set<string>;
    /** A set of locale identifiers using the BCP 47 `language`-`country` case-normalized format. */
    readonly locales: Set<string>;
    /** A list of locale objects. */
    readonly objects: Locale[];
    /**
     * Create a list of locale identifiers.
     *
     * @param locales - An array of locale identifiers using the BCP 47 `language`-`country` format.
     *
     * @throws Will throw an error if one of the locale's format is invalid.
     */
    constructor(locales: string[]);
}
