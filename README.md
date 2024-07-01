# Friend-Daily

H5 朋友圈

## 目标

- 复刻 [https://kam.space](https://kam.space)

## 编译

```shell
docker build \
      --build-arg DATABASE_URL="mysql://friend:password@127.0.0.1:3306/friend-daily" \
      --build-arg TITLE="XXX" \
      --build-arg USERNAME="XXX" \
      --build-arg DESCRIPTION="XXXXXX" \
      --build-arg EMAIL="xx@xxx.com" \
      --build-arg BANNER_IMAGE="https://imgapi.cn/bing.php" \
      --build-arg AVATAR="./avatar.webp" \
      -t friend-daily .
```

## 启动

```shell
docker run --name friend-daily -p 3000:3000 -d friend-daily
```
