# 使用 Node.js 18 的 Alpine 版本作为构建镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 文件到工作目录
COPY package.json .

# 安装 pnpm
RUN npm install -g pnpm
# 安装项目依赖
RUN pnpm install

# 复制所有文件到工作目录
COPY . .

# 构建项目
RUN pnpm build

# 使用 Node.js 18 的 Alpine 版本作为生产镜像
FROM node:18-alpine AS production

# 设置工作目录
WORKDIR /app

# 复制构建后的文件到生产镜像
COPY --from=builder /app/.output /app

# 暴露端口
EXPOSE 3000

# 运行容器时的命令
CMD ["node", "./server/index.mjs"]
