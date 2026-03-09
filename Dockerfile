# --------------------------
# Stage 1: dependencies + build
# --------------------------
FROM node:20-alpine AS builder

# Робоча директорія
WORKDIR /app

# Встановлюємо pnpm глобально
RUN npm install -g pnpm

# Копіюємо тільки package.json та lockfile
COPY package.json pnpm-lock.yaml ./

# Встановлюємо залежності (це шар можна кешувати)
RUN pnpm install

# Копіюємо решту проекту
COPY . .

# Build Next.js
RUN pnpm build

# --------------------------
# Stage 2: production runner
# --------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Копіюємо потрібні файли з builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Виставляємо порт
EXPOSE 3000

# Запуск Next.js у production
CMD ["pnpm", "start"]