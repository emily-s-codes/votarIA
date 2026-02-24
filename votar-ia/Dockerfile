# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de definição
COPY package*.json ./
# Instala dependências (incluindo devDependencies para o build)
RUN npm install

# Copia o código fonte (incluindo o nest-cli.json e a pasta src/llm)
COPY . .

# Executa o build (isso criará a pasta dist com o .txt dentro)
RUN npm run build

# Estágio 2: Execução
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Garante que as variáveis de ambiente existam
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Comando para rodar
CMD ["node", "dist/main"]