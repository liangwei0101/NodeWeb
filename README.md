# NodeWeb
在线监控管理平台Node后端代码
# 安装使用 #
npm install

# 运行
npm i
npm run dev

# 说明
此项目为VueWeb的后端代码，采用Retful风格的API作为交互，为前端提供数据。后端数据库为MongoDB，运行次代码时要先行开启数据库服务，数据库配置项在root/Settings.js中：
例如： cookieSecret: 'MyWeb',
       db: 'liangwei',
       host: 'localhost',
       port: 27017
，修改连接数据库连接后再启动该项目

# 模块
1.用户登入模快，使用的是nodejs-aes256加密
2.邮件发送模块，包括注册成功邮件和数据超标警告邮件
3.以及其他模块的增删改查（不详细说明）


