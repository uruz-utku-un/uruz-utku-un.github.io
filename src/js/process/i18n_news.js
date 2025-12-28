import { loadI18nTextsHtml } from '../utils/i18n_loader_html.js'


const i18n_paths = [
    "news.label.date_01",
    "news.label.text_01",
];

const i18n_fallback = {
    "news.label.date_01": "2025.12.08 - 2026.07.08",
    "news.label.text_01": "Bu tarihler arasında zorunlu askerlik görevim nedeniyle aktif çalışma yapmayacağım. Temmuz 2026 itibariyle yeniden iş tekliflerine açık olmayı planlıyorum. Dönüş sonrası planladığım yol için Yol Haritası bölümüne bakabilirsiniz."
};

// DEBUG modunda çalışırken, verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args)


// Bu işlev sayfanın yüklenmesini (DOMContentLoaded) beklemez,
// main.js tarafından çağrılır.
export function runI18nLoaderHtmlNews(lang) {
    log("[I18nNews] 'runI18nLoaderHtmlNews' çalıştırılıyor...");

    loadI18nTextsHtml({
       path: `./data/i18n/news/news.${lang}.json`,
       keys: i18n_paths,
       i18n_fallback: i18n_fallback,
    });

    log("[I18nNews] 'runI18nLoaderHtmlNews' çalıştırılıyor...");
}
