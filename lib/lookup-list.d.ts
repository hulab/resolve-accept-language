/** Lookup list used to match the preferred locale based on the value of an `Accept-Language` HTTP header. */
export default class LookupList {
    /** The list of locales used to get the match during the lookup. */
    private localeList;
    /** Data object where the properties are quality (in string format) and their values a set containing locale
     * identifiers using the `language`-`country` format and ISO 639-1 alpha-2 language code. */
    private localesAndLanguagesByQuality;
    /** Data object where the properties are quality (in string format) and their value a set of ISO 639-1 alpha-2
     * language code. */
    private relatedLocaleLanguagesByQuality;
    /**
     * Create a new `LookupList` object.
     *
     * @param acceptLanguageHeader - The value of an HTTP request `Accept-Language` header (also known as a "language priority list").
     * @param locales - An array of locale identifiers. The order will be used for matching where the first identifier will be more
     * likely to be matched than the last identifier.
     */
    constructor(acceptLanguageHeader: string, locales: string[]);
    /**
     * Get the top (highest-ranked) locale by language.
     *
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     *
     * @returns The top locale with the specified language.
     */
    getTopByLanguage(languageCode: string): string | undefined;
    /**
     * Get the top (highest-ranked) locale or language.
     *
     * @returns The top match, which can either be a locale or a language.
     */
    getTopLocaleOrLanguage(): string | undefined;
    /**
     * Get the top (highest-ranked) related locale.
     *
     * @returns The top related locale.
     */
    getTopRelatedLocale(): string | undefined;
    /**
     * Add a language in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a language.
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     */
    private addLanguage;
    /**
     * Add a locale in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a locale.
     * @param identifier - A locale identifier using the BCP 47 `language`-`country` case-normalized format.
     */
    private addLocale;
    /**
     * Add a related locale's language in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a related locale's language.
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     */
    private addRelatedLocaleLanguage;
    /**
     * Get a directive object from a directive string.
     *
     * @param directiveString - The string representing a directive, extracted from the HTTP header.
     *
     * @returns A `Directive` object or `undefined` if the string's format is invalid.
     */
    private getDirective;
    /**
     * Get the top (highest-ranked) entry from a dataset object entries.
     *
     * @param dataObjectEntries - The object entries of a dataset object.
     *
     * @returns The top entry from a dataset object entries.
     */
    private getTop;
}
