# Friend-Daily

H5 朋友圈，磨洋工中

## 目标

复刻 [https://kam.space](https://kam.space)

## 演示

[点这里](https://bytespark.me)

## 环境变量

|            变量名            |                           默认值                            |          备注          | 必填 |
|:-------------------------:|:--------------------------------------------------------:|:--------------------:|:--:|
|       DATABASE_URL        |    mysql://root:password@127.0.0.1:3306/friend-daily     |         数据库          | 是  |
|    SHADOW_DATABASE_URL    | mysql://root:password@127.0.0.1:3306/friend-daily-shadow |      影子数据库（开发用）      | 否  |
|     NUXT_PUBLIC_TITLE     |                           默认标题                           |         网站标题         | 否  |
|   NUXT_PUBLIC_USERNAME    |                          默认用户名                           |         用户名          | 否  |
|  NUXT_PUBLIC_DESCRIPTION  |                           默认描述                           |         网站介绍         | 否  |
|     NUXT_PUBLIC_EMAIL     |                       <xx@xx.com>                        |         邮件地址         | 否  |
| NUXT_PUBLIC_BANNER_IMAGE  |               <https://imgapi.cn/bing.php>               |        背景图地址         | 是  |
|    NUXT_PUBLIC_AVATAR     |         <https://imgapi.cn/api.php?fl=fengjing>          |        头像图地址         | 是  |
|   NUXT_S3_ACCESS_KEY_ID   |                                                          |   S3 ACCESS_KEY_ID   | 是  |
| NUXT_S3_SECRET_ACCESS_KEY |                                                          | S3 SECRET_ACCESS_KEY | 是  |
|      NUXT_S3_REGION       |                                                          |      S3 REGION       | 是  |
|   NUXT_S3_ENDPOINT_URL    |                                                          |   S3 ENDPOINT_URL    | 是  |
|    NUXT_S3_BUCKET_NAME    |                                                          |        S3 桶名         | 是  |
|    NUXT_S3_UPLOAD_KEY     |                                                          |      S3 文件上传路径       | 是  |
|  NUXT_S3_FILE_PREFIX_URL  |                                                          |      S3 文件地址前缀       | 是  |

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
-e NUXT_PUBLIC_AVATAR="https://imgapi.cn/api.php?fl=fengjing" \
-e NUXT_S3_ACCESS_KEY_ID="" \
-e NUXT_S3_SECRET_ACCESS_KEY="" \
-e NUXT_S3_REGION="" \
-e NUXT_S3_ENDPOINT_URL="" \
-e NUXT_S3_BUCKET_NAME="" \
-e NUXT_S3_UPLOAD_KEY="" \
-e NUXT_S3_FILE_PREFIX_URL="" \
-p 3000:3000 \
sdrpsps/friend-daily
```

## 编译镜像

```shell
docker build -t sdrpsps/friend-daily .
```
