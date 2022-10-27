/** Class to manage a locale identifier using the BCP 47 `language`-`country` format. */
export default class Locale {
    /** The ISO 3166-1 alpha-2 country code. */
    readonly countryCode: string;
    /** The locale identifier using the BCP 47 `language`-`country` case-normalized format. */
    readonly identifier: string;
    /** The ISO 639-1 alpha-2 language code. */
    readonly languageCode: string;
    /**
     * Create a new `Locale` object.
     *
     * @param identifier - A locale identifier using the BCP 47 `language`-`country` format (case insensitive).
     *
     * @throws An error if the `identifier` format is invalid.
     */
    constructor(identifier: string);
    /**
     * Is a given string an ISO 3166-1 alpha-2 country code.
     *
     * @param countryCode - An ISO 3166-1 alpha-2 country code.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    static isCountryCode(countryCode: string, caseNormalized?: boolean): boolean;
    /**
     * Is a given string an ISO 639-1 alpha-2 language code.
     *
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    static isLanguageCode(languageCode: string, caseNormalized?: boolean): boolean;
    /**
     * Is a given string a locale identifier following the BCP 47 `language`-`country` format.
     *
     * @param identifier - A potential locale identify to verify.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    static isLocale(identifier: string, caseNormalized?: boolean): boolean;
}
