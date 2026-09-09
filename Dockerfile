# syntax=docker/dockerfile:1
# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

# NEXT_PUBLIC_* di-inline saat build (bukan runtime) → terima lewat build arg.
# Nilai ini dipakai BROWSER, jadi arahkan ke domain publik backend (mis. https://domain/api/v1).
ARG NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Aktifkan output standalone khusus build Docker/VPS.
ENV NEXT_OUTPUT_STANDALONE=true

COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build

# ---- run (standalone: ramping, hanya server + deps yang dibutuhkan) ----
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Bind ke semua interface agar bisa diakses dari luar container.
ENV HOSTNAME=0.0.0.0

# next.config `output: 'standalone'` menghasilkan .next/standalone (server.js + node_modules minimal).
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
