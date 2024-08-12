# Указываем базовый образ
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Генерация Prisma клиента
RUN npx prisma generate

# Открываем порт приложения
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start"]
