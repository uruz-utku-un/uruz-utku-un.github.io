/**
 * Belirtilen yoldan JSON verisi çeker.
 * try-catch çağıran işlev içinde işlenir.
 * 
 * @async
 * @param {string} path - JSON dosyasının URL'si veya yolu.
 * @returns {Promise<Object>} - Çözülmemiş JSON verisi.
 * @throws {Error} - HTTP durumu 200-299 değilse fırlatılır.
 */
export async function fetchDataJson( path ) {
    // 'fetch' URL'den veri çeker ve bir promise döndürür.
    // 'await' ile verilen söz çözülene kadar bekler ve sonucu değişkene atar.
    const res = await fetch(path);

    // 'res.ok' HTTP durum kodu 200-299 arası değilse 'false' olur.
    // hata varsa 'throw' bir 'Error' fırlatır. üstteki try/catch yakalar.
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${path}`);

    // 'res.json()' gelen cevabı JSON'a çevirir. verilen söz (promise) döner.
    // 'await' ile JSON çözülene kadar bekler ve sonucu döndürür.
    return await res.json();
}
