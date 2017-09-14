# phoenix-ui      
* How to run              
    ``` bash         
    # install dependencies      

    npm install 

    bower install or sudo bower install --allow -root)

    # serve with hot reload at localhost:3000

    gulp serve

    # build for production with minification

    gulp build

    # run unit tests

    gulp test

    ```
 * major framework
 
     ```
     .
    ├── app
    │   ├── directives.js                            //angular directive            
    │   ├── index.config.js                          //环境配置，全局变量配置等         
    │   ├── index.less                               //样式文件         
    │   ├── index.module.js                          //angular module init  
    │   ├── index.route.js                           //路由配置            
    │   ├── index.run.js            
    │   ├── phoenix.js                                 //初始化一些样式          
    │   ├── less                                     //样式文件夹            
    │   ├── module                                   //功能模块，不同的功能对应不同的文件夹      
    │   │   ├── about                                //关于我们功能模块             
    │   │   │   ├── about.controller.js              //关于我们对应的控制器           
    │   │   │   └── about.html                       //关于我们的页面文件            
    │   │   ├── common          
    │   │   │   ├── common.controller.js            
    │   │   │   └── common.html         
    │   │   ├── courseList          
    │   │   │   ├── courseList.controller.js            
    │   │   │   └── courseList.html         
    │   │   ├── main                                        
    │   │   │   ├── main.controller.js          
    │   │   │   └── main.html           
    │   │   └── modal                                 //模态框文件夹          
    │   │       ├── loginModal.html                   //登录框         
    │   │       └── registerModal.html          
    │   └── service                                   //封装一些接口，常用方法等            
    └── index.html                                    //入口页面，也是主页面              
    ```