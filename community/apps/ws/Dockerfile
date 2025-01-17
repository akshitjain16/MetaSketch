FROM node:18-alpine
RUN apk add --no-cache openssl
WORKDIR /app

# Copying the root package.json and pnpm-lock.yaml to leverage monorepo dependencies
COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./pnpm-workspace.yaml .
COPY turbo.json .

# Copying the WebSocket app's package.json and lock file
COPY apps/ws/package.json ./apps/ws/package.json
COPY apps/ws/package-lock.json ./apps/ws/package-lock.json

# Copying the rest of the WebSocket app's source code
COPY apps/ws/src ./apps/ws/src
COPY apps/ws/tsconfig.json ./apps/ws/tsconfig.json

# Copying the @repo/db package (which contains Prisma)
COPY packages/db ./packages/db

# Installing pnpm globally
RUN npm install -g pnpm

# Installing dependencies for the monorepo
RUN pnpm install --frozen-lockfile

# Generating the Prisma client (if needed)
WORKDIR /app/packages/db
RUN npx prisma generate

# Setting the working directory to the WebSocket app
WORKDIR /app/apps/ws

# Building the TypeScript project
RUN pnpm build

# Exposeing the port the WebSocket server will run on
EXPOSE 3001

# Starting the WebSocket server
CMD ["pnpm", "start"]