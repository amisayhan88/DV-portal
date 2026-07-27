# VeriCred Midnight DApp - Production Multi-Stage Dockerfile
FROM node:24-alpine AS base
WORKDIR /app
RUN apk add --no-libc-compat --no-cache python3 make g++ git

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json ./
COPY contract/package.json ./contract/
COPY api/package.json ./api/
COPY bboard-cli/package.json ./bboard-cli/
COPY frontend/package.json ./frontend/
RUN npm ci

# Build Compact contracts and TypeScript packages
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cd contract && npm run compact && npm run build
RUN cd api && npm run build
RUN cd bboard-cli && npm run build
RUN cd frontend && npm run build

# Production Runner image
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/contract ./contract
COPY --from=builder /app/api ./api
COPY --from=builder /app/bboard-cli ./bboard-cli
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/package.json ./frontend/package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000 6300 8088 9944
CMD ["npm", "start", "--prefix", "frontend"]
