FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# 定义构建参数，设置默认值
ARG DATABASE_URL="mysql://root:password@127.0.0.1:3306/friend"
ARG TITLE="默认用户名的朋友圈"
ARG USERNAME="默认用户名"
ARG DESCRIPTION="默认简介"
ARG EMAIL="xxx@xx.com"
ARG BANNER_IMAGE="https://imgapi.cn/bing.php"
ARG AVATAR="./avatar.webp"


# 使用构建参数设置环境变量
ENV DATABASE_URL=$DATABASE_URL
ENV TITLE=$TITLE
ENV USERNAME=$USERNAME
ENV DESCRIPTION=$DESCRIPTION
ENV EMAIL=$EMAIL
ENV BANNER_IMAGE=$BANNER_IMAGE
ENV AVATAR=$AVATAR

RUN pnpm build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/.output /app

EXPOSE 3000

CMD ["node","./server/index.mjs"]
