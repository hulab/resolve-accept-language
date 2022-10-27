"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveAcceptLanguage = void 0;
var locale_1 = require("./locale");
var lookup_list_1 = require("./lookup-list");
/** Resolve the preferred locale from an HTTP `Accept-Language` header. */
var ResolveAcceptLanguage = /** @class */ (function () {
    /**
     * Create a new `ResolveAcceptLanguage` object.
     *
     * All locale identifiers provided as parameters must following the BCP 47 `language`-`country` (case insensitive).
     *
     * @param acceptLanguageHeader - The value of an HTTP request `Accept-Language` header (also known as a "language priority list").
     * @param locales - An array of locale identifiers. The order will be used for matching where the first identifier will be more
     * likely to be matched than the last identifier.
     */
    function ResolveAcceptLanguage(acceptLanguageHeader, locales) {
        var lookupList = new lookup_list_1.default(acceptLanguageHeader, locales);
        var topLocaleOrLanguage = lookupList.getTopLocaleOrLanguage();
        if (topLocaleOrLanguage !== undefined) {
            if (locale_1.default.isLocale(topLocaleOrLanguage)) {
                this.localeBasedMatch = topLocaleOrLanguage;
            }
            else {
                this.languageBasedMatch = lookupList.getTopByLanguage(topLocaleOrLanguage);
            }
        }
        else {
            this.relatedLocaleBasedMatch = lookupList.getTopRelatedLocale();
        }
    }
    /**
     * Is the best match language-based?
     *
     * @returns True if the best match language-based, otherwise false.
     */
    ResolveAcceptLanguage.prototype.bestMatchIsLanguageBased = function () {
        return this.languageBasedMatch !== undefined;
    };
    /**
     * Is the best match locale-based?
     *
     * @returns True if the best match locale-based, otherwise false.
     */
    ResolveAcceptLanguage.prototype.bestMatchIsLocaleBased = function () {
        return this.localeBasedMatch !== undefined;
    };
    /**
     * Is the best match related-locale-based?
     *
     * @returns True if the best match related-locale-based, otherwise false.
     */
    ResolveAcceptLanguage.prototype.bestMatchIsRelatedLocaleBased = function () {
        return this.relatedLocaleBasedMatch !== undefined;
    };
    /**
     * Get the locale which was the best match.
     *
     * @returns The locale which was the best match.
     */
    ResolveAcceptLanguage.prototype.getBestMatch = function () {
        var _a, _b;
        return (_b = (_a = this.localeBasedMatch) !== null && _a !== void 0 ? _a : this.languageBasedMatch) !== null && _b !== void 0 ? _b : this.relatedLocaleBasedMatch;
    };
    /**
     * Was a match found when resolving the preferred locale?
     *
     * @returns True when a match is found, otherwise false.
     */
    ResolveAcceptLanguage.prototype.hasMatch = function () {
        return this.getBestMatch() !== undefined ? true : false;
    };
    /**
     * Did the resolution of the preferred locale find no match?
     *
     * @returns True when there is no match, otherwise false.
     */
    ResolveAcceptLanguage.prototype.hasNoMatch = function () {
        return !this.hasMatch();
    };
    return ResolveAcceptLanguage;
}());
exports.ResolveAcceptLanguage = ResolveAcceptLanguage;
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
var resolveAcceptLanguage = function (acceptLanguageHeader, locales, defaultLocale) {
    var localesIncludeDefault = false;
    locales.forEach(function (locale) {
        if (!locale_1.default.isLocale(locale, false)) {
            throw new Error("invalid locale identifier '".concat(locale, "'"));
        }
        if (locale.toLowerCase() === defaultLocale.toLocaleLowerCase()) {
            localesIncludeDefault = true;
        }
    });
    if (!locale_1.default.isLocale(defaultLocale, false)) {
        throw new Error("invalid default locale identifier '".concat(defaultLocale, "'"));
    }
    if (!localesIncludeDefault) {
        throw new Error('the default locale must be included in the locales');
    }
    var rankedLocales = __spreadArray([defaultLocale], locales.filter(function (locale) { return locale !== defaultLocale; }), true);
    var resolveAcceptLanguage = new ResolveAcceptLanguage(acceptLanguageHeader, rankedLocales);
    if (resolveAcceptLanguage.hasMatch()) {
        return resolveAcceptLanguage.getBestMatch();
    }
    return new locale_1.default(defaultLocale).identifier;
};
exports.default = resolveAcceptLanguage;
