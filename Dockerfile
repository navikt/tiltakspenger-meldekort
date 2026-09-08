FROM node:24-alpine

# Docker Hub-bildet kan ligge etter alpines sikkerhetsoppdateringer (openssl 7.9.2026), så pakkene løftes her.
# npm, corepack og yarn brukes ikke i drift og drar med seg sårbare bundlede pakker (tar, brace-expansion, ip-address).
RUN apk upgrade --no-cache \
    && rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /opt/yarn-* /usr/local/bin/yarn /usr/local/bin/yarnpkg
WORKDIR /app
# `deploy/node_modules` is produced by `pnpm deploy` in CI (see .build-for-deploy.yml)
COPY deploy/node_modules /app/node_modules/
COPY packages/server/dist /app/dist/
ENV PORT=3050
ENV NODE_ENV=production
ENV TZ=Europe/Oslo
EXPOSE 3050
CMD ["node", "dist/server.cjs"]
