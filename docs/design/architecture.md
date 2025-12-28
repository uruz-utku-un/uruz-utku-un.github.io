[architecture.md](https://github.com/user-attachments/files/24362220/architecture.md)
# Mimari Tasarım Kararları (Architecture Design Decisions)
Bu belge, uygulamanın istemci tarafı mimarisinde alınan temel tasarım
kararlarını, gerekçeleriyle birlikte tanımlar.

---

## Footer Yıl Bilgisi
```html
© <span id="footer-year">2025</span>
```
Footer alanında yalnızca sitenin **kuruluş yılı** temel alınır.
- JavaScript, mevcut yılı otomatik olarak algılar.
- Kuruluş yılı ile mevcut yıl **aynıysa**, yanlızca kuruluş yılı gösterilir.
- Farklıysa çıktı `2025-20XX` formatında üretilir.

Yıl güncelleme işlemi:
- `./js/utils/date_updater_html.js` modülü tarafından yapılır.
- Bu modül `./process/main.js` içinde çağrılır.

Bu yaklaşım, manuel güncelleme ihtiyacını ortadan kaldırır ve tutarlılığı
garanti eder.

---

## Link Yönetimi
Tüm bağlantılar **yeni bir tarayıcı sekmesinde** açılır.
- HTML içinde her link için **benzersiz bir** `id` tanımlanmıştır.
- Link URL'leri öncelikli olarak **JSON yapılandırma dosyasından** alınır.
- JSON yüklenemezse:
    - JavaScript modüllerinde tanımlı **fallback değerler** kullanılır.
- JavaScript'in tamamen çalışmaması ihtimaline karşı:
    - HTML içinde **statik linkler** mevcuttur.

Çalışma önceliği sırası:
1. JSON verisi
2. JavaScript fallback
3. HTML içeriği

Bu sayede sistem **hata toleransı (fault-tolerant)** bir yapı kazanır.

Kullanılan modüller:
- `./js/utils/core/fetcher.js`: Belirtilen yoldan JSON verisini çeker.
- `./js/utils/link_loader_html.js`: JSON içindeki metinleri HTML üzerindeki
  `ID` alanlarına yazar. Hata durumunda fallback değerler kullanılır.

## Link Yükleme Süreci
- `./js/process/links.js`: Linkleri yükler.

Bu süreç `main.js` içinde sıralı olarak çağrılır. Linklerin yüklenmesi burada
yönetilir.

- Yasal linkler ve dış bağlantılar (örn. github, linkedin vb.) ana içieriğin bölün
memesi için `target="_blank"` ile yeni sayfa da gösterilmiş ve `rel="..."` ile 
gerekli görülen önlemler alınmıştır. 

---

## Uluslararasılaştırma (Internationalization - i18n)
Kalabalığı  azaltmak ve çeviri kalitesini kontrol altında tutmak amacıyla
dil desteği bilinçli olarak sınırlandırılmıştır.

Desteklenen diller:
- `tr` (ana dil)
- `en`
- `pl`

Ana dil dışındaki diller makine çevirisi olduğu için kapsam genişletilmemiştir.

### Dil Seçimi (Language Select) 
- Dil seçimi, sayfanın `header` bölümünde `<select>` etiketi ile yapılır.
- Ekran okuyucular için ek bir `<span>` yardım metni sağlanmıştır.
- Bu metnin görünürlüğü CSS üzerinden kontrol edilir.

Bu yaklaşım, **erişilebilirlik (accessibility)** gereksinimlerini karşılar.

---

### `data-i18n` Kullanımı
Örnek:
```html
<p data-i18n="ui.language.help">abc</p>
```

Metinler iki kategoriye ayrılmıştır:
- **UI metinleri (sabit)**
- **İçerik metinleri (değişken)**

Ortak kullanılan modüller:
- `./js/utils/core/fetcher.js`: Belirtilen yoldan JSON verisini çeker.
- `./js/utils/core/i18n_resolver.js`: Nokta (`.`) ile ayrılmış i18n yolunu
  çözerek hedef JSON değerini döndürür.
- `./js/i18n_loader_html.js`: JSON içindeki metinleri HTML üzerindeki
  `data-i18n` alanlarına yazar. Hata durumunda fallback değerler kullanılır. 

### Metin Yükleme Süreci
Dil bazlı metin yükleme işlemleri ayrı süreçler olarak ele alınmıştır:
- `./process/i18n_ui.js`: Arayüz metinlerini yükler.
- `./process/i18n_news.js`: Gündem/içeri metinlerini yükler.

Bu süreçler `main.js` içinde sıralı olarak çağrılır.
Dil bilgisinin alınması ve seçilen dilin arayüze yansıtılması burada yönetilir.

---

## JavaScript Yapısı
```html
<script type="module" src="./js/process/main.js"></script>
```

HTML içinde yalnızca **tek bir ana modül** çağrılır.
- `main.js`, tüm uygulama akışını yönetir.
- Alt modüller bu dosya üzerinden organize edilir.

Bu yaklaşım:
- HTML'in sade kalmasını
- Uygulama akışının merkezi olarak kontrol edilmesini sağlar.

---

## CSS Yapısı
```html
<link rel="stylesheet" href="./css/style.css">
```

- HTML içinde tek bir CSS dosyası çağrılır.
- Dosya içinde:
    - Modüler CSS yapısı 
    - Responsive tasarım kuralları bulunur.

Amaç, stil katmanının **okunabilir ve sürdürülebilir** kalmasıdır.

---

## Duyarlı Tasarım (responsive Design)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- 480px ve altındaki ekranlarda:
    - Kart içi boşluklar azaltılır.
    - `h1` seviyesindeki başlıkların font boyutu düşürülür.

Bu eşik değeri, küçük ekranlarda okunabilirliği korumak için seçilmiştir.
