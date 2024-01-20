# Friend-Daily

H5 朋友圈

## 目标

- 复刻 [https://kam.space](https://kam.space)

## 数据库环境部署

```shell
docker run --name mongo \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME="数据库账号" \
      -e MONGO_INITDB_ROOT_PASSWORD="数据库密码" \
      -d prismagraphql/mongo-single-replica:5.0.3
```

## 编译

```shell
docker build \
      --build-arg USERNAME="默认用户名" \
      --build-arg EMAIL="默认邮箱" \
      --build-arg TITLE="默认用户名的朋友圈" \
      --build-arg DESCRIPTION="默认简介" \
      --build-arg DATABASE_URL="mongodb://数据库账号:数据库密码@数据库地址:27017/数据库名?authSource=admin&directConnection=true" \
      -t friend .
```
