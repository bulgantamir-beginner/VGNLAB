FROM node:22-alpine
# Prisma's query engine needs libssl to be detectable.
RUN apk add --no-cache openssl
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Bypass the npm "prebuild" env check — nothing here needs DATABASE_URL/JWT_SECRET at build time.
RUN npx prisma generate && npx next build

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "server.js"]
