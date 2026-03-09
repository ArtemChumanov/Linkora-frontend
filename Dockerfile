# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Встановлюємо pnpm
RUN npm install -g pnpm

# Копіюємо тільки package.json і lockfile
COPY package.json pnpm-lock.yaml ./

# Встановлюємо залежності (кешується при зміні lockfile)
RUN pnpm install

# Копіюємо решту проекту
COPY . .

# Будуємо Next.js
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Копіюємо лише потрібні файли з build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Старт Next.js
CMD ["pnpm", "start"]