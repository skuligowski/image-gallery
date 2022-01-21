FROM --platform=$BUILDPLATFORM node:16 as builder

WORKDIR /app

COPY package.json ./
COPY client/package.json client/
COPY server/package.json server/

RUN npm install

COPY . ./

RUN npm run build

FROM --platform=$TARGETPLATFORM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./
RUN npm install

ENTRYPOINT [ \ 
    "node", "server.js", \ 
    "--dbDir", "resources/db", \ 
    "--libraryDir", "resources/library", \ 
    "--port", "3000" \
]