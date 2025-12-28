// DEBUG modunda çalışırken verilen tüm argümanları konsola yazdırır.
const log = (...args) => (window.DEBUG) && console.log(...args)


/**
 * HTML içindeki yıl bilgisini (footer-year) hedef element içinden alıp
 * otomatik olarak ayarlar.
 * Sitenin kuruluş yılı ve şuan ki yıl aynıysa örnek çıktı: 2025, 2025 -> 2025
 * "" farklıysa örnek çıktı: 2025, 2026 -> 2025-2026
 * ! HTML içindeki yıl bilgisi, '2025' veya '2025-2026' formatında olmalıdır.
 * 'window.DEBUG = true' ise konsola işleme dair günlükler yazıdırır.
 *
 * @param {string} elementId - Tarihi temsil eden HTML içindeki ID
 * @returns {void} - Herhangi bir değer döndürmez.
 */
export function updateFullYearHtml(elementId = 'footer-year') {
    log("[DateUpdaterHtml] 'updateFullYearHtml' çalıştırılıyor...");

    const element = document.getElementById(elementId);
    if (!element) {
        log(`[DataUpdaterHtml] ! Element bulunamadı: ${elementId}`);
        return;
    }

    // varsa metnin başındaki ve sonundaki boşlukları (whitespace) siler.
    // " 2025-2026 " -> "2025-2026"
    const year_text = element.textContent.trim();
    // metni '-' göre parçalara bölüp indeks 0'daki elemanı alır.
    // ["2025", "2026"] -> "2025"
    // parseInt: string ifadeyi tamsayıya çevirir.
    const start_year = parseInt(year_text.split('-')[0], 10);
    const current_year = new Date().getFullYear();

    // başlangıç ve mevcut yılları aynı tipte ve aynı değerdemi kontrol eder.
    if (start_year === current_year) {
        element.textContent = start_year.toString();
    } else {
        element.textContent = `${start_year} - ${current_year}`;
    }

    log("[DateUpdaterHtml] 'updateFullYearHtml' çalıştırıldı.");
}
