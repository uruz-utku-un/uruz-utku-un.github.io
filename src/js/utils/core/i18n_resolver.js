// i18n: Internationalization (uluslararasılaşma)


/**
 * Nokta ile ayrılmış i18n yolunu çözerek veriyi döndürür.
 * try-catch çağıran işlev içinde işlenir.
 *
 * @param {Object} options - Fonksiyon parametrelerini içeren obje
 * @param {object} options.data - i18n JSON kök nesnesi
 * @param {string} options.path - örnek: key = "ui.main.label.note"
 * @returns {string|undefined} - Bulunan i18n metni veya tanımsız (undefined)
 */
export function getI18nValue({ data, path }) {
    // start -> acc = data (acc: mevcut adım)
    // key = "ui" -> acc = data[ui]
    // key = "main" -> acc = data[ui][main]
    // key = "label" -> acc = data[ui][main][label]
    // key = "note" -> acc = data[ui][main][label][note]
    // return = "abc.."
    return path
        .split('.')  // ["ui", "main", "label", "note"]
        .reduce((acc, key) => acc && acc[key], data);
}
