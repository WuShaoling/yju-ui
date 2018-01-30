# 部署步骤

## 配置
1. vi src/app/index.config.js

## UI
1. gulp clean build
2. docker build -t phoenix-ui .
3. docker run -d --restart=always -p 13000:3000 -p 13022:3001 --name phoenix-ui -h phoenix-ui  phoenix-ui