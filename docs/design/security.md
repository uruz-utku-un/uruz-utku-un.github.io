[security.md](https://github.com/user-attachments/files/24362221/security.md)
# Güvenlik Tasarım Kararları (Security Design Decisions)

Bu doküman, proje genelinde alınan güvenlik odaklı tasarım kararlarını açıklar.
Amaç; niyeti, sınırları ve bilinçli kısıtlamaları görünür kılmaktır.

---

## İçerik Güvenliği Politikası (Content Security Policy - CSP)

### Amaç
- XSS (script injection) saldırılarını engellemek
- Sadece kendi kaynağımızdan (self) JS/CSS yüklenmesine izin vermek
- Eski ve riskli yüzeyleri (object/embed) kapatmak

### 'frame-ancestors' Direktifi
`frame-ancestors 'none';` meta etiketi ile **kullanılamaz**.

Bu direktif yalnızca HTTP yanıtındaki `Content-Security-Policy header`
üzerinden uygulanır.
Meta etiketi ile eklenirse tarayıcı uyarı verir ve direktif uygulanmaz.

Bu nedenle statik hosting (örn. GithHub Pages) ortamlarında
`frame-ancestors` uygulanamaz.

---

## External Links (`target="_blank"`)
Linki yeni bir sayfada açar ve güvenlik/gizlilik/SEO gerekçeleri için
`rel="noopener noreferrer nofollow"` ile kullanılır.

### Kullanım
```html
<a href="..." target="_blank" rel="noopener noreferrer nofollow">
```

### Güvenlik ve SEO Gerekçesi
- **noopener:** Açılan sayfanın `window.opener` üzerinden mevcut sayfayı
  manipüle etmesini engeller. 
- **noreferrer:** HTTP Referer bilgisinin karşı siteye gönderilmesini önler.
- **nofollow:** Arama motorlarına bu linkin sıralama sinyali taşımaması
  gerektiğini bildirir.
