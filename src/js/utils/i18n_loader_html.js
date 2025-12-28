import { fetchDataJson } from './core/fetcher_json.js';
import { getI18nValue } from './core/i18n_resolver.js';


// DEBUG modunda çalışırken verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args);


/**
 * JSON dosyasındaki metinlere ait veriyi okur ve metinleri HTML içindeki
 * yollara (örn: ui.language.label) atar.
 * Eğer JSON dosyasında bir sorun oluşursa, fallback değerler kullanılır.
 * 'window.DEBUG = true' ise konsola işleme dair günlükler yazıdırır.
 *
 * @async
 * @param {Object} - options - Fonksiyon parametrelerini içeren obje
 * @param {string} - options.path - Verinin alınacağı JSON dosyasının yolu
 * @param {Array[string]} - options.keys - HTML içinde aranacak 'data-i18n' anahtarları
 * @param {Object} - options.fallback - JSON dosyasında sorun oluşursa kullanılacak varsayılan veriler
 * @returns {void} - Herhangi bir değer döndürmez.
 */
export async function loadI18nTextsHtml({ path, keys, fallback }) {
    log("[I18nLoaderHtml] async 'loadI18nTextsHtml' çalıştırılıyor...");

    try {
        // JSON dosyasını okur ve veriyi 'data_i18n' değişkenine atar.
        const data_i18n = await fetchDataJson(path);
        log("Yüklenen veri: ", data_i18n);

        keys.forEach(key => {
            // html ve json içinde 'data-i18n' için aynı anahtara sahip
            // tüm elemanları alır.
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            // herhangi bir html elemanıyla eşleşmediyse döngüden çıkış yapar.
            if (elements.length === 0) return;

            // değeri, sorun yoksa json içinden alır,
            // varsa fallback'ten alır.
            const value =
                getI18nValue({ data: data_i18n, path: key }) ??
                fallback[key];

            if (typeof value !== 'string') {
                console.warn(`[i18n] geçersiz anahtar`, value);
            }

            elements.forEach(element => {
                element.textContent = value;
            });
        });

    } catch (err) {  // 'fetch' başarısız olursa içeriğin boş kalmasını önler.
        log(
            "(!) [I18nLoaderHtml] 'loadI18nTextsHtml' İçerik yüklenemedi, fallback çalıştı - ",
            err
        );

        keys.forEach(key => {
            // html ve json içinde 'data-i18n' için aynı anahtara sahip
            // tüm elemanları alır.
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            // herhangi bir html elemanıyla eşleşmediyse döngüden çıkış yapar.
            if (elements.length === 0) return;

            // değeri fallback'ten alır.
            const value = getI18nValue({ data: fallback, path: key});

            elements.forEach(element => {
                element.textContent = fallback[key];
            });
        });

    } finally {
        log("[I18nLoaderHtml] async 'loadI18nTextsHtml' başarıyla çalıştırıldı.");
    }
}
