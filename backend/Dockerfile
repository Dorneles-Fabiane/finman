# 1. Imagem base leve com Node 22
FROM node:22-alpine

# 2. Ativa o pnpm nativo do Node (Corepack)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# 4. Copia apenas os manifestos primeiro (aproveita o cache do Docker)
COPY package.json pnpm-lock.yaml ./

# 5. Instala as dependências dentro do container
RUN pnpm install --frozen-lockfile

# 6. Copia o restante do código
COPY . .

# 7. Expõe a porta padrão do NestJS
EXPOSE 3000

# 8. Roda o servidor em modo watch (hot-reload)
CMD ["pnpm", "run", "start:dev"]