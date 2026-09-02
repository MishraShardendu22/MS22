# ==============================================================================
# MS22 Portfolio — Multi-Stage Production Dockerfile (Next.js 16 + pnpm)
# ==============================================================================
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# ------------------------------------------------------------------------------
# 1. Dependency Stage
# ------------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# ------------------------------------------------------------------------------
# 2. Build Stage
# ------------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Define standard public environment variables with fallbacks for build-time static generation
ARG NEXT_PUBLIC_BASE_URL="https://mishrashardendu22.is-a.dev"
ARG NEXT_PUBLIC_BACKEND_URL="https://portfolio-backend-2iw4.onrender.com"
ARG NEXT_PUBLIC_GITHUB_USERNAME="MishraShardendu22"
ARG NEXT_PUBLIC_LEETCODE_USERNAME="ShardenduMishra22"

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL \
    NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME \
    NEXT_PUBLIC_LEETCODE_USERNAME=$NEXT_PUBLIC_LEETCODE_USERNAME

RUN pnpm run build

# ------------------------------------------------------------------------------
# 3. Production Runner Stage
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build, static assets, and public directory
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000 || exit 1

CMD ["node", "server.js"]
