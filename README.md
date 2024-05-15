# React + TypeScript + Vite + Redux Toolkit + Tailwind CSS

## Setup

1 - yarn

## Açıklama

1 - Uygulamada Listeleme (Anasayfa), Ürün Detay, 404 (Not Found) sayfaları mevcut.

2 - Uygulamanın anasayfasında ürünler 12'şer listeleniyor.

3 - Search, Pagination ve Filtre işlemlerine url'den kaldığı yerden devam edebiliyor.

4 - Search işlemi klavyeden Enter ve SearchIcon'una tıklanarak yapılıyor. Filtrelerin kendi içerisindeki search kısımları state değiştiği andan itibaren yapılıyor.

5 - Cart ve totalCartPrice bilgileri redux'ta tutuluyor. Burada sayfa yenileme, tarayıcı kapatma ve tekrar açma işlemlerinde Cart ve totalCartPrice bilgileri korunuyor. Persist yapısı kullanıldı.

6 - Uygulamada api isteklerinde cevap gelene kadar flicker önlemek için Skeleton kullanıldı.

7 - Skeleton => ProductCard, Filtre, ProductDetail alanlarında kullanılıyor.

8 - Sepete ekleme işleminde buton tıklandıktan sonra 500 ms disabled mevcut. Ekleme işleminden sonra toast görüntüleniyor.

9 - API_URL, PAGE_LIMIT, TOAST_DURATION bilgileri env'de tutuluyor.

10 - Proje tamamen responsive tasarıma uygun.

11 - Çalışma için Unit test yazıldı.
