FROM node:20@sha256:fd0115473b293460df5b217ea73ff216928f2b0bb7650c5e7aa56aae4c028426 AS builder

WORKDIR /app

#Use the secret to set the npm auth token
RUN --mount=type=secret,id=NODE_AUTH_TOKEN sh -c \
    'npm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)'

# Set the npm registry for @navikt scope
RUN npm config set @navikt:registry=https://npm.pkg.github.com

# Copy over the package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the necessary files for the build
COPY next.config.mjs tsconfig.json ./
COPY pages pages
COPY styles styles
COPY public public

# Build the application
RUN npm run build

# Final runtime image
FROM gcr.io/distroless/nodejs20-debian11@sha256:8cf9967ae9ba1e64089f853abac42b41f2af95ff3aa00d08c26e5f75714605d4 AS runtime

WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public /app/public

# Expose the application port
EXPOSE 3000

# Set the environment variable
ENV NODE_ENV=production

# Start the application
CMD ["server.js"]