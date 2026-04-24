# 1. Dependencies Stage
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Builder Stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# 3. Runner Stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create the cache directory and set permissions BEFORE switching user
RUN mkdir -p .next/cache && chown -R node:node .next

# Use --chown=node:node to ensure the app user can read/write the files
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/src/generated/prisma ./src/generated/prisma

EXPOSE 3000

USER node
CMD ["node", "server.js"]
