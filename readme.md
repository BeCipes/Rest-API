# RestAPI for GoCipes Program

![GoCipes](https://avatars.githubusercontent.com/u/150586675?s=200&v=4)

Ini adalah RestAPI untuk program GoCipes. RestAPI ini dibuat menggunakan NodeJS, ExpressJS, dan Prisma ORM.

## Techstack yang digunakan

<img src="https://agussuratna.net/wp-content/uploads/2023/07/node.js-logo.png" alt="NodeJS" height="50"/> <img src="https://raw.githubusercontent.com/aleksandryackovlev/openapi-mock-express-middleware/master/assets/express-logo.png" alt="ExpressJS" height="50"/>
<img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" alt="Prisma" height="50"/>
<img src="https://github.com/winstonjs.png" alt="Winston" height="50"/>
<img src="https://repository-images.githubusercontent.com/139898859/9617c480-81c2-11ea-94fc-322231ead1f0" alt="Bycrypt" height="50"/>
<img src="https://images.ctfassets.net/nx13ojx82pll/60miWU6vSisC1N2IgQRPkt/61066f84608375c590b6dcb68fb47dc0/nodejs-cors-guide-what-it-is-and-how-to-enable-it-picture-1.png?w=1744&h=982&q=80&fm=png" alt="CORS" height="50"/>
<img src="https://www.panayiotisgeorgiou.net/wp-content/uploads/2017/03/joi-1.png" alt="Joi" height="50"/>
<img src="https://camo.githubusercontent.com/dd51cf3dbd56f3c69f73f26255f377384d4dec4665d884a56ae1fd6a7bda319c/687474703a2f2f6a77742e696f2f696d672f6c6f676f2d61737365742e737667" alt="JSON Web Token" height="50"/>

## Cara menggunakan

1. Clone repository ini
2. Install dependencies yang diperlukan dengan perintah `npm install`
3. Buat file `.env` dengan isi sebagai berikut:

   ```env
   # Port yang ingin anda pakai
   PORT=

   # Secret key untuk jwt
   SECRET=

   # URL database (sebagai contoh saya berikan dibawah)
   DATABASE_URL="mysql://root:password@localhost:3306/yourdb"
   ```

4. Jalankan server dengan menggunakan perintah `npm run dev`

### Dokumentasi API

Dokumentasi API dibuat menggunakan **`OpenAPI Specification (OAS)`** dan dapat dilihat di file `apispecs_gocipes.json`
