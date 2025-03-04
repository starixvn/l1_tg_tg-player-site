# Base image
FROM hub.lumigame.com/base/node:22-alpine-25h1.1 AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG TRANSFORM_CONFIG
COPY ./.env.transform.${TRANSFORM_CONFIG} ./.env

RUN npm run build

# Runner stage
FROM base AS runner
ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set user for security
USER node

EXPOSE 5000 
ENV PORT 5000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 