# 女装销售微信小程序（2人创业团队版）

目标：简单、快速上线，承接小红书引流用户，实现“商品展示 + 客户咨询登记”。

## 项目目录结构

```text
wexindianpu/
├── miniprogram/                  # 微信小程序前端（原生）
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── sitemap.json
│   ├── utils/
│   │   └── api.js
│   └── pages/
│       ├── home/                 # 首页（品牌介绍/主推系列/爆款推荐）
│       ├── products/             # 商品列表（分类切换+标签）
│       ├── product-detail/       # 商品详情（轮播图+信息模块）
│       ├── lead-form/            # 咨询/购买登记
│       └── success/              # 提交成功
├── server/                       # Node.js + Express 后端
│   ├── package.json
│   ├── data/
│   │   ├── products.json         # 商品静态数据（10条）
│   │   └── leads.db              # SQLite 数据库（运行后生成）
│   └── src/
│       ├── index.js              # 服务入口
│       ├── db.js                 # SQLite 初始化
│       └── routes/
│           ├── products.js       # GET /products
│           └── leads.js          # POST /leads
└── README.md
```

## 当前页面功能

1. 首页
- 品牌介绍区
- 主推系列区：通勤气质、温柔约会、显瘦百搭
- 爆款推荐区（从商品数据中读取）
- 底部固定“立即咨询”按钮

2. 商品列表页
- 支持分类：连衣裙、上衣、裤子、套装、外套
- 每个商品卡片显示：图片、名称、价格、卖点标签

3. 商品详情页
- 商品轮播图
- 展示价格、卖点、面料说明、尺码建议、适合场景、穿搭建议
- “立即咨询”按钮

4. 咨询购买页
- 字段：姓名、手机号、微信号、商品、尺码、颜色、备注
- 提交后跳转成功页

## 接口

- `GET /products`
  - 可选参数：`category`
- `POST /leads`
  - 将客户信息写入 SQLite

## 本地运行方式

### 1) 启动后端

```bash
cd server
npm install
npm run dev
```

默认地址：`http://localhost:3000`

### 2) 启动小程序

1. 打开微信开发者工具
2. 选择“导入项目”，目录选择 `miniprogram/`
3. 在 `miniprogram/utils/api.js` 确认后端地址（默认 `http://localhost:3000`）
4. 开始预览与调试

> 真机调试时，请将 `localhost` 改为你电脑局域网 IP（例如 `http://192.168.1.10:3000`）。
