"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var locale_1 = require("./locale");
var LocaleList = /** @class */ (function () {
    /**
     * Create a list of locale identifiers.
     *
     * @param locales - An array of locale identifiers using the BCP 47 `language`-`country` format.
     *
     * @throws Will throw an error if one of the locale's format is invalid.
     */
    function LocaleList(locales) {
        var _this = this;
        /** A set of ISO 3166-1 alpha-2 country codes. */
        this.countries = new Set();
        /** A set of ISO 639-1 alpha-2 language codes. */
        this.languages = new Set();
        /** A set of locale identifiers using the BCP 47 `language`-`country` case-normalized format. */
        this.locales = new Set();
        /** A list of locale objects. */
        this.objects = [];
        locales.forEach(function (locale) {
            var localeObject = new locale_1.default(locale);
            if (!_this.locales.has(localeObject.identifier)) {
                _this.objects.push(localeObject);
                _this.locales.add(localeObject.identifier);
                _this.languages.add(localeObject.languageCode);
                _this.countries.add(localeObject.countryCode);
            }
        });
    }
    return LocaleList;
}());
exports.default = LocaleList;
