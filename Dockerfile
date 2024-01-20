FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# 定义构建参数，设置默认值
ARG USERNAME="默认用户名"
ARG EMAIL="默认邮箱"
ARG TITLE="默认用户名的朋友圈"
ARG DESCRIPTION="默认简介"

# 使用构建参数设置环境变量
ENV USERNAME=$USERNAME
ENV EMAIL=$EMAIL
ENV TITLE=$TITLE
ENV DESCRIPTION=$DESCRIPTION

RUN pnpm build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/.output /app

ARG DATABASE_URL="mongodb://admin:password@0.0.0.0:27017/friend?authSource=admin&directConnection=true"

ENV DATABASE_URL=$DATABASE_URL

EXPOSE 3000

CMD ["node","./server/index.mjs"]
