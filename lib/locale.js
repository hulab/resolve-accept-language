"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class to manage a locale identifier using the BCP 47 `language`-`country` format. */
var Locale = /** @class */ (function () {
    /**
     * Create a new `Locale` object.
     *
     * @param identifier - A locale identifier using the BCP 47 `language`-`country` format (case insensitive).
     *
     * @throws An error if the `identifier` format is invalid.
     */
    function Locale(identifier) {
        if (!Locale.isLocale(identifier, false)) {
            throw new Error("invalid locale identifier '".concat(identifier, "'"));
        }
        var _a = identifier.split('-'), languageCode = _a[0], countryCode = _a[1];
        this.languageCode = languageCode.toLowerCase();
        this.countryCode = countryCode.toUpperCase();
        this.identifier = "".concat(this.languageCode, "-").concat(this.countryCode);
    }
    /**
     * Is a given string an ISO 3166-1 alpha-2 country code.
     *
     * @param countryCode - An ISO 3166-1 alpha-2 country code.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    Locale.isCountryCode = function (countryCode, caseNormalized) {
        if (caseNormalized === void 0) { caseNormalized = true; }
        var regExp = new RegExp(/^[A-Z]{2}$/, caseNormalized ? undefined : 'i');
        return regExp.test(countryCode);
    };
    /**
     * Is a given string an ISO 639-1 alpha-2 language code.
     *
     * @param languageCode - An ISO 639-1 alpha-2 language code.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    Locale.isLanguageCode = function (languageCode, caseNormalized) {
        if (caseNormalized === void 0) { caseNormalized = true; }
        var regExp = new RegExp(/^[a-z]{2}$/, caseNormalized ? undefined : 'i');
        return regExp.test(languageCode);
    };
    /**
     * Is a given string a locale identifier following the BCP 47 `language`-`country` format.
     *
     * @param identifier - A potential locale identify to verify.
     * @param caseNormalized - Should we verify if the identifier is using the case-normalized format?
     */
    Locale.isLocale = function (identifier, caseNormalized) {
        if (caseNormalized === void 0) { caseNormalized = true; }
        var regExp = new RegExp(/^[a-z]{2}-[A-Z]{2}$/, caseNormalized ? undefined : 'i');
        return regExp.test(identifier);
    };
    return Locale;
}());
exports.default = Locale;
