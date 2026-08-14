FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.base.json ./
COPY packages/domain/package.json packages/domain/tsconfig.json ./packages/domain/
COPY apps/web/package.json apps/web/tsconfig.json apps/web/vite.config.ts apps/web/index.html ./apps/web/
RUN npm ci
COPY packages/domain/src ./packages/domain/src
COPY apps/web/src ./apps/web/src
COPY apps/web/public ./apps/web/public
ARG GEOGRAPH_BASE_PATH=/
ENV GEOGRAPH_BASE_PATH=$GEOGRAPH_BASE_PATH
RUN npm run build -w @geograph/domain && npm run build -w @geograph/web

FROM nginx:1.29-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
