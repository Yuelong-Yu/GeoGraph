FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/domain/package.json packages/domain/tsconfig.json ./packages/domain/
COPY apps/api/package.json apps/api/tsconfig.json ./apps/api/
RUN npm ci
COPY packages/domain/src ./packages/domain/src
COPY apps/api/src ./apps/api/src
RUN npm run build -w @geograph/domain && npm run build -w @geograph/api

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/domain ./packages/domain
COPY --from=build /app/apps/api ./apps/api
CMD ["node", "apps/api/dist/server.js"]
