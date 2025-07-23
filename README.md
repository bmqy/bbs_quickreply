# 论坛快捷回帖

使用自定义内容或本扩展预定义的回帖内容，快捷回复支持的论坛的发帖！

## 支持站点:
### Discuz
- [x] [吾爱破解](https://www.52pojie.cn/)
- [x] [Discuz!官方交流社区](https://www.dismall.com/forum.php)
- [x] [油猴中文网](https://bbs.tampermonkey.net.cn/)，[（邀请链接）](https://bbs.tampermonkey.net.cn/?fromuid=92227)
- [x] [全球主机交流论坛](https://hostloc.com/)
- [ ] 不一一列举...

> PS：理论支持所有```discuz```论坛，请自行尝试。

### Discourse
- [x] [linux.do](https://linux.do/)，[（邀请链接）](https://linux.do/invites/LtswXusdSz)
- [x] [小众软件官方论坛](https://meta.appinn.net/)，[（邀请链接）](https://meta.appinn.net/invites/VKqY9S9Tt2)

> PS：理论支持所有```Discourse```论坛，请自行尝试。

### Fluarm
- [x] [Flarum Community](https://discuss.flarum.org/)
- [x] [NodeLoc](https://www.nodeloc.com/)

> PS：理论支持所有```Fluarm```论坛，请自行尝试。

### 其它
- [x] [NodeSeek](https://www.nodeseek.com/)
- [x] [v2ex](https://www.v2ex.com/)

## 支持AI
- [x] Gemini
- [x] 通义千问
- [x] Kimi
- [x] ChatGpt
- [x] DeepSeek
- [x] Grok

## 支持常量
- [x] email：```{email}```
- [x] qq：```{qq}```
- [x] wechat：```{wechat}```
- [x] url：```{url}```
- [x] 支持```base64```编码

**示例：**
``` plaintext
我的邮箱是{email}

我的QQ是{qq}
```

## 配置同步
- [x] 登录账号
- [x] WebDAV（推荐）

## 更新日志

v4.0.2 更新：
- [优化] 自由设置AI可用模型，仍需确保接口支持；

v4.0.1 更新：
- 可以忽略的小提醒；

v4.0.0 更新：
- [新增] 增加了grok的AI支持；
- [新增] 增加了webdav支持（推荐用户后期使用webdav进行备份- 同步）；
- [优化] 同时优化了界面展示；
- 其它优化；

v3.7.9 更新：
- [优化] 优化设置面板移动端表现；

v3.7.8 更新：
- [修复] 修复`Safari`浏览器使用问题；

v3.7.7 更新：
- [更新] 部分文案更新；

v3.7.6 更新：
- [修复] 修复`bug`；

v3.7.5 更新：
- [新增] `AI`支持`DeepSeek`模型；
- [优化] `AI`支持`系统角色`设定，并可`自定义`；
- [优化] `gemini`升级成`Gemini 2.0 Flash`；

v3.7.4 更新：
- [优化] 优化手机端界面展示，以更好的适配[Tampermonkey](https://apps.apple.com/app/id6738342400)移动应用；
- [优化] 可忽略的其它优化；

v3.7.3 更新：
- [新增] 支持`Fluarm`平台论坛：`NodeLoc`([#266496](https://greasyfork.org/zh-CN/scripts/36728-%E8%AE%BA%E5%9D%9B%E5%BF%AB%E6%8D%B7%E5%9B%9E%E5%B8%96/discussions/266496))；
- [修复] 修复可能的网络请求`bug`；

v3.7.2 更新：
- [新增] 网友分享列表增加7日内新增标识；

v3.7.1 更新：
- [修复] 修复`linux.do`编辑话题回复时内容超长导致的界面被遮挡问题，感谢用户反馈([#246183](https://greasyfork.org/zh-CN/scripts/36728-%E8%AE%BA%E5%9D%9B%E5%BF%AB%E6%8D%B7%E5%9B%9E%E5%B8%96/discussions/246183))；

v3.7.0 更新：
- [新增] 全量备份、恢复功能，支持回复列表及所有配置项的备份与恢复功能，可开启实时备份；

v3.6.2 更新：
- [优化] 优化平台检测逻辑(#17)；
- [更新] ```README.md```更新；

v3.6.1 更新：
- [优化] 优化平台检测逻辑；

v3.6.0 更新：
- [新增] 支持```v2ex```；
- [新增] 新增以下常量设置：```{email}```、```{qq}```、```{wechat}```、```{url}```，支持启用```base64```编码，使用示例见设置面板；
- [优化] 更新部分文案；
- [优化] 移除无用代码；

v3.5.1 更新：
- [优化] 移除油猴脚本图标菜单，功能全部转移到设置面板中；
- [修复] 修复登录后的数据错误问题，建议更新后重新登录一次账号；

v3.5.0 更新：
- [优化] 更新接口服务，为后期功能优化做准备；

v3.4.8 更新：
- [新增] ```AI```新增支持```ChatGpt```；

v3.4.7 更新：
- [新增] ```AI```支持自定义提示问语：```prompt```，让你的回复更个性化；

v3.4.6 更新：
- [优化] 优化分享功能；
- [优化] 脚本菜单增加图标，更好区分；

v3.4.5 更新：
- [新增] AI新增支持```Kimi```；

v3.4.4 更新：
- [优化] 更新注册页面找回密码提示文本；

v3.4.3 更新：
- [优化] 为设置图标加```title```提示文本；
- [优化] 版本号可跳转```Github```查看更新日志；

v3.4.2 更新：
- [优化] 更新```Discourse```论坛插件加载问题；

v3.4.1 更新：
- [新增] 支持```Discourse```平台论坛([#235263](https://greasyfork.org/zh-CN/scripts/36728-%E8%AE%BA%E5%9D%9B%E5%BF%AB%E6%8D%B7%E5%9B%9E%E5%B8%96/discussions/235263))；

v3.4.0 重磅更新，是帖皆可回复：
- [新增] 支持使用```AI```生成回帖内容，支持平台：```Gemini```、```通义千问```，由此开始：```是帖皆可回复！！！```；

v3.3.1 更新：
- [优化] 无关紧要的样式小调整；

v3.3.0 更新：
- [优化] 上传、下载、实时同步开关等操作移动到油猴脚本菜单项中；
- [新增] 选择回帖内容后立即提交功能，开关设置在脚本菜单中(#15)；

v3.2.1 更新：
- 优化设置页面显示问题；

v3.2.0 更新：
- 增加支持[NodeSeek](https://www.nodeseek.com/)；

v3.1.3 更新：
- 增加支持站点；

v3.1.2 更新：
- 如本地回复列表为空，登录后会与线上同步一次；

v3.1.1 更新：
- 非必要更新；

v3.1.0 更新：
- 新增登录账号功能；
- 登录状态可云端同步本地列表；
- 登录状态可开启实时云端同步；

v3.0.5 更新：
- 优化编辑回帖富文本显示，感谢 @blank7 反馈

v3.0.4 更新：
- 微小更新，感谢 @blank7 反馈

v3.0.3 更新：
- 再次修复严重bug，感谢 @blank7 反馈

v3.0.2 更新：
- 修复严重bug，感谢 @CodFrm、@blank7 反馈

v3.0.0 更新：
- 使用vite-plugin-monkey打包构建，方便后期持续优化升级；
- 优化ScriptCat脚本猫支持，感谢 @夜朦心漓 反馈

v2.1.4 更新：
- 更新升序排序bug；

v2.1.3 更新：
- 增加加载提示；
- 增加排序支持；

v2.1.2 更新：

-   界面的微小调整；

v2.1.1 更新：

-   更新系统回复列表；

v2.1.0 更新：

-   更新接口；

v2.0.3 更新：

-   更新接口；

v2.0.2 更新

-   修复油猴版 bug；

v2.0.0 更新

-   全新改版；

v1.1.0 更新

-   更新样式；
-   更新支持兼容 chrome；
-   其它更新；

v1.0.1 更新：

-   修复编辑帖子时内容被覆盖的 bug；  
    感谢 dnknn 的热心反馈！

v1.0.0 更新：

-   更新支持高级回复模式；
-   重置版本号为：1.0.0；  
    感谢 dnknn 的热心反馈！

v0.2.0.3 更新：

-   支持更多 discuz 论坛页；  
    感谢[mogoyu](https://greasyfork.org/zh-CN/forum/profile/mogoyu)的热心反馈！

## 联系作者

[@chanel](https://t.me/tcbmqy)

[@group](https://t.me/tgbmqy)
