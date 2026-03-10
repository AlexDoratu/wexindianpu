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
- `USE_MOCK = true`：使用本地 mock（默认）。
- `USE_MOCK = false`：请求后端接口（默认 `http://localhost:3000`）。

建议：
- 开发 UI 与交互时优先使用 mock，速度快、不依赖后端状态。
- 联调和发布前切换 API，验证真实接口和数据契约。

---

## 后端服务（模块化）

### 1) 本地启动
```bash
cd server
npm install

# 管理端鉴权 token（生产必须替换为强随机值）
export ADMIN_TOKEN=change-me

npm run dev
```

默认地址：`http://localhost:3000`

### 2) 后端架构说明
当前后端采用分层结构：

```text
Route -> Controller -> Service -> Repository -> Data(JSON/SQLite)
```

- Route：URL 路由与中间件挂载。
- Controller：处理 HTTP 请求/响应。
- Service：业务规则（如 page-config 校验、版本控制）。
- Repository：数据读写（JSON、SQLite）。
- Data：
  - `server/data/*.json`（商品、内容、页面配置）
  - `server/data/leads.db`（线索表）

### 3) 环境变量
| 变量名 | 必填 | 默认值 | 说明 |
|---|---|---|---|
| `PORT` | 否 | `3000` | 后端监听端口 |
| `ADMIN_TOKEN` | 是（启用 admin 接口时） | 无 | 管理端接口鉴权 Token |

> 注意：若未设置 `ADMIN_TOKEN`，管理端接口鉴权会失败（返回 401）。

### 4) 接口总览

#### 健康检查
- `GET /health`

#### 商品
- `GET /products`
  - 可选 query：`category`、`keyword`、`sort`
  - `sort` 支持：`recommend`、`priceAsc`、`priceDesc`、`sales`、`new`
- `GET /products/:id`

#### 内容
- `GET /categories`
- `GET /series`
- `GET /brand`

#### 线索
- `POST /leads`
  - 必填字段：`name`、`mobile`、`wechatId`、`productName`
  - 基础限流：同 IP 每分钟最多 10 次

#### 页面配置（低代码）
前台读取：
- `GET /page-config/:pageKey`

管理端（需鉴权）：
- `GET /admin/page-configs`
- `GET /admin/page-config/:pageKey`
- `PUT /admin/page-config/:pageKey`

鉴权方式：
```http
Authorization: Bearer <ADMIN_TOKEN>
```

### 5) page-config 保存规则（重点）
`PUT /admin/page-config/:pageKey` 必须遵循：

1. body 必须包含 `version`（整数，且 >= 0）。
2. body 必须包含 `sections` 数组。
3. section 必须包含：
   - `id`（字符串）
   - `type`（`banner/series/products/custom`）
   - `enabled`（布尔）
   - `title`（字符串）
   - `data.source`（`static/api`）
   - 若 `source=api`，必须有 `data.api`
4. 乐观锁：
   - 如果请求 `version` 与服务端当前版本不一致，返回 `409`。
   - 成功保存后版本自动 +1，并更新 `updatedAt`。
5. 每次成功更新会自动写入历史快照文件，便于后续回滚。

### 6) cURL 示例

#### 6.1 获取页面配置（前台）
```bash
curl -s http://localhost:3000/page-config/home
```

#### 6.2 管理端读取（带 token）
```bash
curl -s \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:3000/admin/page-configs
```

#### 6.3 管理端更新（带 version）
```bash
curl -s -X PUT \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  http://localhost:3000/admin/page-config/home \
  -d '{
    "version": 1,
    "sections": [
      {
        "id": "hero-banner",
        "type": "banner",
        "enabled": true,
        "title": "首页轮播",
        "data": { "source": "static" }
      }
    ]
  }'
```

#### 6.4 线索提交
```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  http://localhost:3000/leads \
  -d '{
    "name": "张三",
    "mobile": "13800138000",
    "wechatId": "zhangsan_wechat",
    "productName": "云感无钢圈文胸"
  }'
```

### 7) 常见问题（FAQ）

1. **`/admin/*` 返回 401？**
   - 检查是否设置了 `ADMIN_TOKEN`。
   - 检查请求头是否带了 `Authorization: Bearer <ADMIN_TOKEN>`。

2. **保存 page-config 返回 409？**
   - 表示版本冲突：你提交的 `version` 不是最新版本。
   - 先重新 `GET` 最新配置，再合并后重试。

3. **线索接口偶发 429？**
   - 触发了同 IP 每分钟 10 次限流，稍后重试即可。

---

## 后续扩展建议
1. 接入 CMS（如 Strapi/Contentful）并在 `cms-adapter.js` 做字段映射。
2. 加入用户收藏持久化（本地缓存 + 云端用户表）。
3. 增加材质说明、尺码建议、洗护指南模块。
4. 增加“场景化导购问答”与“试穿反馈”数据闭环。
