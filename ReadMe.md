# 视频资源站播放器

#### 本项目旨在 方便查看静态资源视频内容开发的辅助页面，为个人私有项目，任何个人或公司未经许可，不可使用。否则产生任何问题请自负~

- 项目无需部署也可直接打开使用
- 如要部署可以直接启动 node sever.js, 也可以直接丢到静态资源服务器内
- 由于非Apple设备不支持原生hls，故需要配合浏览器插件使用，插件以内置在项目内，请先安装。
- 安卓设备由于没有测试机，理论上国产浏览器会主动劫持video，也能播放，但未实际验证

#### 请修改 js/index.js
```javascript
// 替换为实际url
const baseUrl = 'your.video.website';
```
