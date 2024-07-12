FROM node:18-alpine AS builder

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app

WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

RUN pnpm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000

CMD ["node", "./server/index.mjs"]
