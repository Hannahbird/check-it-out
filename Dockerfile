FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# EXPOSE 5000

CMD ["npm", "run", "docker-start"]