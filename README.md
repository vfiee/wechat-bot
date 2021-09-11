# 基于 Wechaty 构建的微信机器人

## 安装依赖并运行

1. 安装依赖

```zsh
pnpm install
```

2. 运行项目

```zsh
# 开发运行
pnpm dev

# docker运行
docker-compose up -d
```

## 问题

默认情况已 docker 环境为主

开发环境中,需要将`src/*.ts`文件中引入的`import Wechaty from "/wechaty"` 更换为 `import Wechaty from "wechaty"`,

docker 环境中,需要将上述引用中`"wechaty"`更换为原来的`"/wechaty"`

## 参考资料

[wechaty github](https://github.com/wechaty/wechaty#readme)  
[wechaty 官网文档](https://wechaty.js.org/docs/)  
[wechaty docker hub](https://hub.docker.com/r/wechaty/wechaty)
