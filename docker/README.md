## 镜像制作步骤

1. cp -rf dist ./
2. 全局替换 ﻿sed -i "" 's/www.x-lab.ac:13001/string_new/g' grep -rl 'www.x-lab.ac:13001' ./
4. docker build -t phoenix_ui:1.0.0 ./
5. docker save phoenix_ui:1.0.0 > phoenix_ui.dk.tar

## 导入镜像步骤
1. docker load < phoenix_ui.dk.tar