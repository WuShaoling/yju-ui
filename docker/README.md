## 镜像制作步骤

docker build -t phoenix_ui:1.0.0 ./
docker save phoenix_ui:1.0.0 > phoenix_ui.dk.tar

## 导入镜像步骤
docker load < phoenix_ui.dk.tar