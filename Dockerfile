# Stage 1: Dependencies
FROM node:18-bookworm-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Stage 2: Builder
FROM node:18-bookworm-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Baked into the client bundle at build time
ARG BASE_PATH=/openhouse
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV BASE_PATH=$BASE_PATH \
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_STANDALONE=true \
    NODE_ENV=production

RUN npx prisma generate && npm run build

# Stage 3: Runner
FROM node:18-bookworm-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends openssl wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Prisma query engine for this platform (not always picked up by standalone tracing)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
# Edge middleware wasm, missed by Next 13.3 standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/server/edge-chunks ./.next/server/edge-chunks
# Prisma CLI + schema so the container can sync indexes on startup
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/openhouse || exit 1

CMD ["sh", "-c", "node node_modules/prisma/build/index.js db push --skip-generate && node server.js"]
