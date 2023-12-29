FROM node:latest

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y build-essential

RUN npm install bcrypt@5

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
