import { loadLinksHtml } from '../utils/link_loader_html.js';


const link_keys = [
    "link_github",
    //"link_itchio",
    "link_linkedin",
    //"link_patreon",
    "link_spotify",
];

const link_fallback = {
    link_github: "https://github.com/uruz-utku-un",
    //link_itchio: "#",
    link_linkedin: "https://www.linkedin.com/in/utku-%C3%BCn-03b3043a2",
    //link_patreon: "#",
    link_spotify: "https://open.spotify.com/playlist/7EZEIPDHJzfCDihY0ScxL5",
};

// DEBUG modunda çalışırken verilen tüm argümanları konsola yazdırır.
const log = (...args) => window.DEBUG && console.log(...args)


// Bu işlev sayfanın tamamen yüklenmesini (DOMContentLoaded) beklemez,
// main.js tarafından çağrılır.
export function runLinkLoaderHtml() {
    log("[Links] 'runLinkLoaderHtml' çalıştırılıyor...");

    loadLinksHtml({
        path: './data/links.json',
        keys: link_keys,
        fallback: link_fallback,
    });

    log("[Links] 'runLinkLoaderHtml' çalıştırıldı.");
}
