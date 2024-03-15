# client build
FROM node:16.16.0 AS client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# EXPOSE 5000

CMD ["npm", "run", "docker-start"]

# server build
FROM node:16.16.0 AS server

WORKDIR /app

COPY server /app/server

COPY server/package*.json ./

RUN npm install

COPY server .

EXPOSE 5000

CMD ["npm", "start"]

# Final stage
FROM node:16.16.0
WORKDIR /app
COPY --from=client /app /app
COPY --from=server /app/server /app/server
CMD ["npm", "start"]