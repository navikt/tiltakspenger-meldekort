# Chainguard-image fra Navs speil: https://sikkerhet.nav.no/docs/verktoy/chainguard-dockerimages/
# Bevisst uten digest: Chainguard backporter ikke fikser til eldre patch-versjoner, og Dependabot når ikke speilet.
# Major-taggen gir nyeste bygg av Node 24 ved hvert image-bygg.
FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim
WORKDIR /app
# `deploy/node_modules` is produced by `pnpm deploy` in CI (see .build-for-deploy.yml)
COPY deploy/node_modules /app/node_modules/
COPY packages/server/dist /app/dist/
ENV PORT=3050
ENV NODE_ENV=production
ENV TZ=Europe/Oslo
EXPOSE 3050
# Entrypointet i imaget er node, så CMD er bare skriptet.
CMD ["dist/server.cjs"]
