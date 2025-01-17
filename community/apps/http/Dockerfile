FROM node:18-alpine

# Install required libraries for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copying the root package.json and pnpm-lock.yaml to leverage monorepo dependencies
COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./pnpm-workspace.yaml .
COPY turbo.json .

# Copying the HTTP app's package.json and lock file
COPY apps/http/package.json ./apps/http/package.json
COPY apps/http/package-lock.json ./apps/http/package-lock.json

# Copying the rest of the HTTP app's source code
COPY apps/http/src ./apps/http/src
COPY apps/http/tsconfig.json ./apps/http/tsconfig.json

# Copying the @repo/db package (which contains Prisma)
COPY packages/db ./packages/db

# Installing pnpm globally
RUN npm install -g pnpm

# Installing dependencies for the monorepo
RUN pnpm install --frozen-lockfile

# Generating the Prisma client
WORKDIR /app/packages/db
RUN npx prisma generate

# Setting the working directory to the HTTP app
WORKDIR /app/apps/http

# Building the TypeScript project
RUN pnpm build

RUN ls -la dist

# Exposing the port the HTTP server will run on
EXPOSE 3000

# Starting the HTTP server
CMD ["pnpm", "start"]