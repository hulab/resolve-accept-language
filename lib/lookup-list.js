"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locale_list_1 = require("./locale-list");
/** Lookup list used to match the preferred locale based on the value of an `Accept-Language` HTTP header. */
var LookupList = /** @class */ (function () {
    /**
     * Create a new `LookupList` object.
     *
     * @param acceptLanguageHeader - The value of an HTTP request `Accept-Language` header (also known as a "language priority list").
     * @param locales - An array of locale identifiers. The order will be used for matching where the first identifier will be more
     * likely to be matched than the last identifier.
     */
    function LookupList(acceptLanguageHeader, locales) {
        /** Data object where the properties are quality (in string format) and their values a set containing locale
         * identifiers using the `language`-`country` format and ISO 639-1 alpha-2 language code. */
        this.localesAndLanguagesByQuality = {};
        /** Data object where the properties are quality (in string format) and their value a set of ISO 639-1 alpha-2
         * language code. */
        this.relatedLocaleLanguagesByQuality = {};
        this.localeList = new locale_list_1.default(locales);
        var directiveStrings = acceptLanguageHeader
            .split(',')
            .map(function (directiveString) { return directiveString.trim(); });
        for (var _i = 0, directiveStrings_1 = directiveStrings; _i < directiveStrings_1.length; _i++) {
            var directiveString = directiveStrings_1[_i];
            var directive = this.getDirective(directiveString);
            if (directive === undefined)
                continue; // No match for this directive.
            var locale = directive.locale, languageCode = directive.languageCode, quality = directive.quality;
            // If the language is not supported, skip to the next match.
            if (!this.localeList.languages.has(languageCode)) {
                continue;
            }
            // If there is no country code (while the language is supported), add the language preference.
            if (!locale) {
                this.addLanguage(quality, languageCode);
                continue;
            }
            // If the locale is not supported, but the locale's language is, add to locale language preference.
            if (!this.localeList.locales.has(locale) && this.localeList.languages.has(languageCode)) {
                this.addRelatedLocaleLanguage(quality, languageCode);
                continue;
            }
            // If the locale is supported, add the locale preference.
            this.addLocale(quality, locale);
        }
    }
    /**
     * Get the top (highest-ranked) locale by language.
     *
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     *
     * @returns The top locale with the specified language.
     */
    LookupList.prototype.getTopByLanguage = function (languageCode) {
        var _a;
        return (_a = this.localeList.objects.find(function (locale) { return locale.languageCode === languageCode; })) === null || _a === void 0 ? void 0 : _a.identifier;
    };
    /**
     * Get the top (highest-ranked) locale or language.
     *
     * @returns The top match, which can either be a locale or a language.
     */
    LookupList.prototype.getTopLocaleOrLanguage = function () {
        var localesAndLanguagesByQuality = Object.entries(this.localesAndLanguagesByQuality);
        if (localesAndLanguagesByQuality.length === 0) {
            return undefined;
        }
        return this.getTop(localesAndLanguagesByQuality);
    };
    /**
     * Get the top (highest-ranked) related locale.
     *
     * @returns The top related locale.
     */
    LookupList.prototype.getTopRelatedLocale = function () {
        var relatedLocaleLanguagesByQuality = Object.entries(this.relatedLocaleLanguagesByQuality);
        if (relatedLocaleLanguagesByQuality.length === 0) {
            return undefined;
        }
        var topRelatedLocaleLanguage = this.getTop(relatedLocaleLanguagesByQuality);
        return this.getTopByLanguage(topRelatedLocaleLanguage);
    };
    /**
     * Add a language in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a language.
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     */
    LookupList.prototype.addLanguage = function (quality, languageCode) {
        if (!this.localesAndLanguagesByQuality[quality]) {
            this.localesAndLanguagesByQuality[quality] = new Set();
        }
        this.localesAndLanguagesByQuality[quality].add(languageCode);
    };
    /**
     * Add a locale in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a locale.
     * @param identifier - A locale identifier using the BCP 47 `language`-`country` case-normalized format.
     */
    LookupList.prototype.addLocale = function (quality, identifier) {
        if (!this.localesAndLanguagesByQuality[quality]) {
            this.localesAndLanguagesByQuality[quality] = new Set();
        }
        this.localesAndLanguagesByQuality[quality].add(identifier);
    };
    /**
     * Add a related locale's language in the data object matching its quality.
     *
     * @param quality - The HTTP header's quality factor associated with a related locale's language.
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     */
    LookupList.prototype.addRelatedLocaleLanguage = function (quality, languageCode) {
        if (!this.relatedLocaleLanguagesByQuality[quality]) {
            this.relatedLocaleLanguagesByQuality[quality] = new Set();
        }
        this.relatedLocaleLanguagesByQuality[quality].add(languageCode);
    };
    /**
     * Get a directive object from a directive string.
     *
     * @param directiveString - The string representing a directive, extracted from the HTTP header.
     *
     * @returns A `Directive` object or `undefined` if the string's format is invalid.
     */
    LookupList.prototype.getDirective = function (directiveString) {
        /**
         * The regular expression is excluding certain directives due to the inability to configure those options in modern
         * browsers today (also those options seem unpractical):
         *
         * - The wildcard character "*", as per RFC 2616 (section 14.4), should match any unmatched language tag.
         * - Language tags that starts with a wildcard (e.g. "*-CA") should match the first supported locale of a country.
         * - A quality value equivalent to "0", as per RFC 2616 (section 3.9), should be considered as "not acceptable".
         */
        var directiveMatch = directiveString.match(/^((?<matchedLanguageCode>([a-z]{2}))(-(?<matchedCountryCode>[a-z]{2}))?)(;q=(?<matchedQuality>1|0.(\d*[1-9]\d*){1,3}))?$/i);
        if (!(directiveMatch === null || directiveMatch === void 0 ? void 0 : directiveMatch.groups))
            return undefined; // No regular expression match.
        var _a = directiveMatch.groups, matchedLanguageCode = _a.matchedLanguageCode, matchedCountryCode = _a.matchedCountryCode, matchedQuality = _a.matchedQuality;
        var languageCode = matchedLanguageCode.toLowerCase();
        var countryCode = matchedCountryCode ? matchedCountryCode.toUpperCase() : undefined;
        var quality = matchedQuality === undefined ? '1' : Number.parseFloat(matchedQuality).toString(); // Remove trailing zeros.
        var locale = countryCode ? "".concat(languageCode, "-").concat(countryCode) : undefined;
        return { languageCode: languageCode, locale: locale, quality: quality };
    };
    /**
     * Get the top (highest-ranked) entry from a dataset object entries.
     *
     * @param dataObjectEntries - The object entries of a dataset object.
     *
     * @returns The top entry from a dataset object entries.
     */
    LookupList.prototype.getTop = function (dataObjectEntries) {
        return dataObjectEntries.sort().reverse()[0][1].values().next().value;
    };
    return LookupList;
}());
exports.default = LookupList;
