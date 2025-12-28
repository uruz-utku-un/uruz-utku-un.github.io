import { loadI18nTextsHtml } from '../utils/i18n_loader_html.js';


const i18n_paths = [
    // header
    "ui.header.language.label",
    "ui.header.language.help",
    // main
    "ui.main.label.title",
    "ui.main.label.description",
    "ui.main.label.note",
    "ui.main.github.description",
    "ui.main.itchio.description",
    "ui.main.linkedin.description",
    "ui.main.patreon.description",
    "ui.main.spotify.description",
    // news
    "ui.news.label.title",
    "ui.news.label.description",
    "ui.news.linkpast.description",
    // roadmap
    "ui.roadmap.label.title",
    "ui.roadmap.label.description",
    "ui.roadmap.link.description",
    "ui.roadmap.linkpast.description",
    // milestones
    "ui.milestones.label.title",
    "ui.milestones.label.description",
    "ui.milestones.link.description",
    // footer
    "ui.footer.legal.note",
    "ui.footer.license.label",
    "ui.footer.termsofuse.label",
    "ui.footer.usermanual.label",
];

const i18n_fallback = {
    // header
    "ui.header.language.label": "Dil",
    "ui.header.language.help": "Site içeriğinin görüntüleneceği dili seçin.",
    // main
    "ui.main.label.title": "Bağlantılarım",
    "ui.main.label.description": "Bir şeyler ters gitmiş gibi görünüyor.",
    "ui.main.label.note": "Bu mesajı görüyorsanız, metinler ve bağlantılar yüklenemediği için varsayılan içerik gösteriliyor.",
    "ui.main.github.description": "- profesyonel çalışmalar",
    "ui.main.itchio.description": "- profesyonel çalışmalar (planlandı)",
    "ui.main.linkedin.description": "- profesyonel profil",
    "ui.main.patreon.description": "- yazılar, süreç ve çizimler (planlandı)",
    "ui.main.spotify.description": "- kişisel dinleme",
    // news
    "ui.news.label.title": "Gündem",
    "ui.news.label.description": "Güncel durum ve kısa duyurular.",
    "ui.news.linkpast.description": "Gündem geçmişini görüntüle.",
    // roadmap
    "ui.roadmap.label.title": "Yol Haritası",
    "ui.roadmap.label.description": "Zaman içinde şekillenecek çalışmalar ve üretim süreçlerine dair yol haritası.",
    "ui.roadmap.link.description": "Yol haritasını görüntüle.",
    "ui.roadmap.linkpast.description": "Yol haritası geçmişini görüntüle.",
    // milestones
    "ui.milestones.label.title": "Kilometre Taşları",
    "ui.milestones.label.description": "Öne çıkan kilometre taşları.",
    "ui.milestones.link.description": "Öne çıkan kilometre taşlarını görüntüle.",
    // footer
    "ui.footer.legal.note": "Bu web sitesi, topluluğa açık Uruz Community License (UCL-1.0) kapsamında ‘uruz-utku-un’ tarafından oluşturulmuştur.",
    "ui.footer.license.label": "Lisans",
    "ui.footer.termsofuse.label": "Kullanım Koşulları",
    "ui.footer.usermanual.label": "Kullanma Kılavuzu",
};

// DEBUG modunda çalışırken, verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args)


// Bu işlev sayfanın tamamen yüklenmesini (DOMContentLoaded) beklemez,
// main.js tarafından çağrılır.
export function runI18nLoaderHtmlUi(lang) {
    log("[I18nUi] 'runI18nLoaderHtmlUi' çalıştırılıyor...");

    loadI18nTextsHtml({
       path: `./data/i18n/ui/ui.${lang}.json`,
       keys: i18n_paths,
       fallback: i18n_fallback,
    });

    log("[I18nUi] 'runI18nLoaderHtmlUi' çalıştırıldı.");
}
