## 镜像制作步骤

1. cp -rf dist ./
4. docker build -t phoenix_ui:1.0.0 ./
5. docker save phoenix_ui:1.0.0 phoenix_ui.dk.tar

## 导入镜像步骤
1. docker load < phoenix_ui.dk.tar