# RestAPI for GoCipes Program

<p align="center"><img align="center" src="https://raw.githubusercontent.com/BeCipes/Resources/main/assets/banner-becipes.png" alt="Becipes Logo"/></p>

Ini adalah RestAPI untuk program GoCipes. RestAPI ini dibuat menggunakan NodeJS, ExpressJS, dan Prisma ORM.

## Techstack yang digunakan

<img src="https://agussuratna.net/wp-content/uploads/2023/07/node.js-logo.png" alt="NodeJS" height="50"/> <img src="https://raw.githubusercontent.com/aleksandryackovlev/openapi-mock-express-middleware/master/assets/express-logo.png" alt="ExpressJS" height="50"/>
<img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" alt="Prisma" height="50"/>
<img src="https://github.com/winstonjs.png" alt="Winston" height="50"/>
<img src="https://repository-images.githubusercontent.com/139898859/9617c480-81c2-11ea-94fc-322231ead1f0" alt="Bycrypt" height="50"/>
<img src="https://images.ctfassets.net/nx13ojx82pll/60miWU6vSisC1N2IgQRPkt/61066f84608375c590b6dcb68fb47dc0/nodejs-cors-guide-what-it-is-and-how-to-enable-it-picture-1.png?w=1744&h=982&q=80&fm=png" alt="CORS" height="50"/>
<img src="https://www.panayiotisgeorgiou.net/wp-content/uploads/2017/03/joi-1.png" alt="Joi" height="50"/>
<img src="https://camo.githubusercontent.com/dd51cf3dbd56f3c69f73f26255f377384d4dec4665d884a56ae1fd6a7bda319c/687474703a2f2f6a77742e696f2f696d672f6c6f676f2d61737365742e737667" alt="JSON Web Token" height="50"/>
<img src="https://miro.medium.com/v2/resize:fit:1024/1*oT_l6QxMdTN65-0gwFqeNg.png" alt="Firebase" height="50"/>

## Cara menggunakan

1. Clone repository ini
2. Install dependencies yang diperlukan dengan perintah `npm install`
3. Rename file `.env.example` didalam folder `config` menjadi `.env` dan diisi sesuai dengan kebutuhan anda:

   ```env
   # Port yang ingin anda pakai
   PORT=

   # Secret key untuk jwt
   SECRET=

   # Bucket url and name for firebase storage
   BUCKET_URL=
   BUCKET_NAME=

   # Mailing service yang anda gunakan
   MAIL_HOST=
   MAIL_PORT=
   MAIL_USER=
   MAIL_PASS=

   # URL database (sebagai contoh saya berikan dibawah)
   DATABASE_URL="mysql://root:password@localhost:port/yourdb"

   ## Jika anda ingin menggunakan docker, maka anda dapat menambah field:
   MYSQL_DATABASE=
   MYSQL_USER=
   MYSQL_PASSWORD=
   MYSQL_ROOT_PASSWORD=
   ## Jika anda ingin menggunakan empty password
   # MYSQL_ALLOW_EMPTY_PASSWORD=true
   ```

4. Jalankan perintah `npm run migrate` untuk membuat tabel-tabel yang diperlukan
5. Jalankan server dengan menggunakan perintah `npm run dev`
6. **(Optional)** Jika anda ingin melakukan test, anda dapat menggunakan perintah `npm run test`

### Dokumentasi API

Dokumentasi API dibuat menggunakan **`OpenAPI Specification (OAS)`** dan dapat dilihat di file `apispecs_gocipes.json`
Saya juga telah menyediakan file postman yang dapat langsung di import dan digunakan.

### Notes

Project belum 100% selesai, masih ada beberapa fitur yang belum saya buat dan masih ada beberapa kekurangan.
