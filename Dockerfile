FROM node:16 as builder

WORKDIR /app

COPY package.json ./
COPY client/package.json client/
COPY server/package.json server/

RUN npm install

COPY . ./

RUN npm run build && cd dist && npm install && cd ..

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./