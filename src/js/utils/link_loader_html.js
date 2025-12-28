import { fetchDataJson } from './core/fetcher_json.js';


// DEBUG modunda çalışırken verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args);


/**
 * JSON dosyasından linkelere ait veriyi okur ve linkleri HTML içindeki
 * ID'lere atar.
 * Eğer JSON dosyasında bir sorun oluşursa, fallback değerler kullanılır.
 * 'window.DEBUG = true' ise konsola işleme dair günlükler yazıdırır.
 *
 * @async
 * @param {Object} options - Fonksiyon parametrelerini içeren obje
 * @param {string} options.path - Verinin alınacağı JSON dosyasının yolu
 * @param {Array}  options.keys - HTML içinde aranacak ID değerleri
 * @param {Object} options.fallback - JSON dosyasında sorun oluşursa kullanılacak varsayılan veriler
 * @returns {void} - Herhangi bir değer döndürmez.
 */
export async function loadLinksHtml({ path, keys, fallback }) {
    log("[LinkLoaderHtml] async 'loadLinksHtml' çalıştırılıyor...");

    try {
        // JSON dosyasını okur ve veriyi 'data_i18n' değişkenine atar.
        const data_links = await fetchDataJson(path);
        log("Yüklenen veri: ", data_links);

        keys.forEach(key => {
            // html ve json içinde 'id' için aynı anahtara sahip
            // tüm elemanları alır.
            const element = document.getElementById(key);
            // herhangi bir html elemanıyla eşleşmediyse döngüden çıkış yapar.
            if (!element) {
                log(`[LinkLoaderHtml] ! Element bulunamadı: ${elementId}`);
                return;
            }

            if (data_links[key]) {
                // el. türüne bakmadan href attribute'unu doğrudan set eder.
                element.setAttribute("href", data_links[key]);
            }
        });

    } catch (err) {
        log(
            "(!) [LinkLoaderHtml] 'loadLinksHtml' İçerik yüklenemedi, fallback çalıştı - ",
            err
        );

        keys.forEach(key => {
            // html ve json içinde 'id' için aynı anahtara sahip
            // tüm elemanları alır.
            const elements = document.getElementById(key);
            // herhangi bir html elemanıyla eşleşmediyse döngüden çıkış yapar.
            if (!element) {
                log(`[LinkLoaderHtml] ! Element bulunamadı: ${elementId}`);
                return;
            }

            if (fallback[key]) {
                // el. türüne bakmadan href attribute'unu doğrudan set eder.
                element.setAttribute("href", fallback[key]);
            }
        });
    } finally {
        log("[LinkLoaderHtml] async 'loadLinksHtml' başarıyla çalıştırıldı.");

    }
}
