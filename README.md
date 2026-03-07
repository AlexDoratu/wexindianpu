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
│       ├── home/                 # 首页
│       ├── products/             # 商品列表
│       ├── product-detail/       # 商品详情
│       ├── lead-form/            # 咨询/下单登记
│       └── success/              # 提交成功
├── server/                       # Node.js + Express 后端
│   ├── package.json
│   ├── data/
│   │   ├── products.json         # 商品静态数据
│   │   └── leads.db              # SQLite 数据库（运行后生成）
│   └── src/
│       ├── index.js              # 服务入口
│       ├── db.js                 # SQLite 初始化
│       └── routes/
│           ├── products.js       # GET /products
│           └── leads.js          # POST /leads
└── README.md
```

## 功能范围（第一版）

已实现：
- 商品展示（分类列表 + 详情）
- 客户咨询/下单登记
- 提交成功页

未包含（按你要求）：
- 微信支付
- 购物车
- 会员
- 优惠券
- 后台管理

## 后端接口

- `GET /products`
  - 支持可选参数 `category`（连衣裙、上衣、裤子、套装）
- `POST /leads`
  - 保存客户咨询信息到 SQLite

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

> 注意：真机调试时，`localhost` 需要改成你电脑局域网 IP（例如 `http://192.168.1.10:3000`）。

## 维护建议（2人团队）

- 继续保持“前后端目录分离 + 简单 API”原则
- 商品先维护在 `products.json`，后续再迁移数据库
- 每周复盘线索表 `leads` 字段，逐步增加来源追踪（如小红书笔记 ID）
