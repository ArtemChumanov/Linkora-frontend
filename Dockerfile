# Dockerfile у Linkora-frontend
FROM node:20-alpine

# Встановлюємо pnpm глобально
RUN npm install -g pnpm

WORKDIR /app

# Копіюємо lockfile і package.json
COPY package.json pnpm-lock.yaml ./

# Встановлюємо залежності
RUN pnpm install

# Копіюємо весь проект
COPY . .

# Будуємо Next.js
RUN pnpm build

EXPOSE 3000

# Старт Next.js серверу
CMD ["pnpm", "start"]