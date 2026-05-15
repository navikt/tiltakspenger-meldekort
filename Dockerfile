FROM node:24-alpine

WORKDIR /app

# `deploy/node_modules` is produced by `pnpm deploy` in CI (see .build-for-deploy.yml)
COPY deploy/node_modules /app/node_modules/
COPY server/dist /app/dist/

ENV PORT=3050
ENV NODE_ENV=production
ENV TZ=Europe/Oslo

EXPOSE 3050

CMD ["node", "dist/server.cjs"]
