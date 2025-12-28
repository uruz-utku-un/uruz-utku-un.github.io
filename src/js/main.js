import { runI18nLoaderHtmlUi } from './process/i18n_ui.js';
import { runI18nLoaderHtmlNews } from './process/i18n_news.js';
import { runLinkLoaderHtml } from './process/links.js';
import { updateFullYearHtml } from './utils/date_updater_html.js'


// DEBUG (hata ayıklama) modunu açar (true) veya kapatır (false).
window.DEBUG = true;


// DEBUG modunda çalışırken verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args)


//Sayfa tamamen yüklendiğinde çalıştırılır.
document.addEventListener("DOMContentLoaded", () => {
    log("[Main] çalıştırılıyor...");

    // Tarayıcı dilini alır.
    let lang = navigator.language.slice(0, 2);
    // navigasyondaki dil desteklenmiyorsa varsayılan dili seçer.
    const supported_langs = ["tr", "en", "pl"];
    if (!supported_langs.includes(lang)) lang = "tr";


    // metinleri yükler.
    runI18nLoaderHtmlUi(lang);

    // linkleri yükler.
    runLinkLoaderHtml();

    // güncel gündem içeriğini yükler.
    runI18nLoaderHtmlNews(lang);

    // 'footer' için mevcut yılı günceller.
    updateFullYearHtml();


    // seçili dilin bilgisini html içinden çeker.
    const select_lang = document.getElementById("language-select")

    // bir dil seçilmişse;
    if (select_lang) {
        // varsayılan dili gösterir (html'de).
        select_lang.value = lang;
        // kullanıcının seçtiği dili kullanır.
        select_lang.addEventListener("change", (e) => {
            lang = e.target.value;
            // sadece metinleri tekrar yükler.
            runI18nLoaderHtmlUi(lang);
            runI18nLoaderHtmlNews(lang);
        });
    }

    log("[Main] çalıştırıldı.");
});
