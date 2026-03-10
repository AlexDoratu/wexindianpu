# 微信小程序：女性贴身衣物品牌展示系统

一个偏“品牌画册 + 轻导购”的微信小程序原型，聚焦女性贴身衣物展示：文胸、内裤、吊带/背心、家居打底、塑形系列、轻运动贴身系列。

## 体验定位
- 视觉：奶白、浅灰、雾粉、浅咖等低饱和色；强调留白、舒适与高级感。
- 内容：强化面料、场景、系列与信任表达，弱化强促销感。
- 架构：mock 数据配置化，已预留 API/CMS 对接层，方便后续正式项目扩展。

## 小程序目录

```text
miniprogram/
├── app.js
├── app.json
├── app.wxss
├── styles/
│   ├── tokens.wxss
│   ├── animation.wxss
│   └── components.wxss
├── mock/
│   ├── categories.js
│   ├── products.js
│   ├── series.js
│   └── brand.js
├── utils/
│   ├── api.js
│   ├── cms-adapter.js
│   └── format.js
└── pages/
    ├── home/
    ├── category/
    ├── product-list/
    ├── product-detail/
    ├── series/
    └── brand/
```

## 页面说明
- 首页：首页 Banner、系列精选、推荐商品。
- 分类页：六大贴身分类入口。
- 商品列表页：分类筛选 + 排序 + 收藏。
- 商品详情页：面料、体验、安心细节。
- 系列页：按场景展示系列。
- 品牌页：品牌主张、价值关键词、品质流程。

## 运行方式

### 1) 微信开发者工具
1. 打开微信开发者工具。
2. 导入项目目录，选择 `miniprogram/`。
3. 编译预览。

### 2) 数据源切换（mock / API）
编辑 `miniprogram/utils/api.js`：
- `USE_MOCK = true`：使用本地 mock。
- `USE_MOCK = false`：请求后端接口（默认 `http://localhost:3000`）。

## 后续扩展建议
1. 接入 CMS（如 Strapi/Contentful）并在 `cms-adapter.js` 做字段映射。
2. 加入用户收藏持久化（本地缓存 + 云端用户表）。
3. 增加材质说明、尺码建议、洗护指南模块。
4. 增加“场景化导购问答”与“试穿反馈”数据闭环。
