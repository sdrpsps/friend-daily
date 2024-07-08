# Friend-Daily

H5 朋友圈，磨洋工中

## 目标

复刻 [https://kam.space](https://kam.space)

## 演示

[点这里](https://bytespark.me)

## 如何启动？

使用 Docker

```shell
docker run -d --name friend-daily \
-e DATABASE_URL="mysql://root:password@127.0.0.1:3306/friend-daily" \
-e NUXT_PUBLIC_TITLE="默认标题" \
-e NUXT_PUBLIC_USERNAME="默认用户名" \
-e NUXT_PUBLIC_DESCRIPTION="默认描述" \
-e NUXT_PUBLIC_EMAIL="xx@xx.com" \
-e NUXT_PUBLIC_BANNER_IMAGE="https://imgapi.cn/bing.php" \
-e NUXT_PUBLIC_AVATAR="./avatar.webp" \
-p 3000:3000 \
sdrpsps/friend-daily
```

## 编译镜像

```shell
docker build -t sdrpsps/friend-daily .
```
