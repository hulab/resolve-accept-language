/** Resolve the preferred locale from an HTTP `Accept-Language` header. */
export declare class ResolveAcceptLanguage {
    /** The language-based match, if applicable. */
    private languageBasedMatch;
    /** The locale-based match, if applicable. */
    private localeBasedMatch;
    /** The related-locale-based match, if applicable. */
    private relatedLocaleBasedMatch;
    /**
     * Create a new `ResolveAcceptLanguage` object.
     *
     * All locale identifiers provided as parameters must following the BCP 47 `language`-`country` (case insensitive).
     *
     * @param acceptLanguageHeader - The value of an HTTP request `Accept-Language` header (also known as a "language priority list").
     * @param locales - An array of locale identifiers. The order will be used for matching where the first identifier will be more
     * likely to be matched than the last identifier.
     */
    constructor(acceptLanguageHeader: string, locales: string[]);
    /**
     * Is the best match language-based?
     *
     * @returns True if the best match language-based, otherwise false.
     */
    bestMatchIsLanguageBased(): boolean;
    /**
     * Is the best match locale-based?
     *
     * @returns True if the best match locale-based, otherwise false.
     */
    bestMatchIsLocaleBased(): boolean;
    /**
     * Is the best match related-locale-based?
     *
     * @returns True if the best match related-locale-based, otherwise false.
     */
    bestMatchIsRelatedLocaleBased(): boolean;
    /**
     * Get the locale which was the best match.
     *
     * @returns The locale which was the best match.
     */
    getBestMatch(): string | undefined;
    /**
     * Was a match found when resolving the preferred locale?
     *
     * @returns True when a match is found, otherwise false.
     */
    hasMatch(): boolean;
    /**
     * Did the resolution of the preferred locale find no match?
     *
     * @returns True when there is no match, otherwise false.
     */
    hasNoMatch(): boolean;
}
/**
 * Resolve the preferred locale from an HTTP `Accept-Language` header.
 *
 * All locale identifiers provided as parameters must following the BCP 47 `language`-`country` (case insensitive).
 *
 * @param acceptLanguageHeader - The value of an HTTP request `Accept-Language` header (also known as a "language priority list").
 * @param locales - An array of locale identifiers that must include the default locale. The order will be used for matching where
 * the first identifier will be more likely to be matched than the last identifier.
 * @param defaultLocale - The default locale identifier when no match is found.
 *
 * @returns The locale identifier which was the best match, in case-normalized format.
 *
 * @example
 * // returns 'fr-CA'
 * resolveAcceptLanguage(
 *   'fr-CA;q=0.01,en-CA;q=0.1,en-US;q=0.001',
 *   ['en-US', 'fr-CA'],
 *   'en-US'
 * )
 */
declare const resolveAcceptLanguage: (acceptLanguageHeader: string, locales: string[], defaultLocale: string) => string;
export default resolveAcceptLanguage;
