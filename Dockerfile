# Gunakan image Node.js terbaru sebagai dasar
FROM node:latest

# Set kerja direktori di dalam container
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y build-essential

RUN npm install bcrypt@5

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install
RUN npx prisma generate

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Command untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "start"]
