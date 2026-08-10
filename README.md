# GeoGraph

GeoGraph 是一个可交互的三维历史地球。时间轴覆盖公元前 1046 年至公元 2026 年；政治实体使用事件驱动的离散疆域快照，人物则以有来源的关键地点事件形成活动轨迹。

## 已实现的第一条完整切片

- CesiumJS 三维地球：左键旋转、滚轮缩放、点选、全球视角重置与可选人物跟随。
- 完整纪年时间轴：无公元 0 年、逐年操作、1/5/10/50 年每秒、历史事件模式、滚轮缩放刻度。
- 同一年全部政治实体共同更新；疆域颜色由实体身份固定，不随快照变化。
- 可手动开关疆域英文名；仅当完整 12px 名称能落在疆域内部时显示，台湾沿用中国的固定主色。
- PostGIS 有效时间区间、Fastify API、年度世界状态同步和事件年份查询。
- 政权/人物双详情页签；播放不因点选而暂停；点击疆域后按该坐标列出未来快照中的控制实体。
- 全人物中英文名称与别名模糊搜索。
- 远景或密集人物自动聚合，点击人物簇拉近展开；已选人物始终独立显示。
- 人物最后已知位置延续、透明度提示、已发生轨迹、帧内迁移动画与快速播放瞬移。
- 26 位跨政治、科学、思想教育、宗教、医学、艺术、技术、航海与社会思想领域的人物，共 242 条经审阅的地点事件。
- 26 套项目内透明游戏微缩人物素材；在世人物采用非精确真人复刻的象征性角色，穆罕默德采用不展示面部的背影视角。
- URL 保存当前年份和选中对象，可复制同一历史视图。

## 一键运行

需要 Docker Compose：

```bash
docker compose up --build
```

打开 <http://localhost:8080>。此命令会启动 Web、API、PostgreSQL/PostGIS，并导入 26 位人物资料。

历史疆域数据不直接打包进仓库。明确接受其 GPL-3.0 数据许可和精度说明后，可运行：

```bash
docker compose --profile historical run --rm historical-data
```

导入器会缓存并装载 `aourednik/historical-basemaps` 在公元前 1046 年至 2026 年范围内的关键快照。上游明确说明数据仍在建设中，因此 GeoGraph 保存 `BORDERPRECISION` 和来源，不把所有边界当作同等可靠。

## 本地开发

要求 Node.js 22+、PostgreSQL 16 + PostGIS，以及 Python 3.12+：

```bash
make setup
make dev
```

不连接数据库的只读界面演示模式：

```bash
npm run demo
```

打开 <http://localhost:8080>。演示模式会按年份从免费的 `historical-basemaps` 上游下载所需快照，并缓存到忽略提交的 `data/historical-cache/`；无需 Docker，也能显示和点选历史疆域。正式部署仍使用 PostgreSQL/PostGIS。

## 验证

```bash
npm test
npm run typecheck
npm run build
npm run test:e2e -w @geograph/web
```

端到端测试会启动或复用本机演示 API 和 Vite 服务。

## 数据管线

- 数据库迁移：[001_initial.sql](db/migrations/001_initial.sql)
- 人物种子：[people.json](data/seed/people.json)
- 新增 20 人的史料审校档案：[world-changing-20-people.md](docs/research/world-changing-20-people.md)
- 人物导入：[seed_people.py](scripts/data/seed_people.py)
- 历史疆域导入：[import_historical_basemaps.py](scripts/data/import_historical_basemaps.py)
- 数据许可与覆盖说明：[data/README.md](data/README.md)

正式数据与测试夹具严格分离。未收录的陆地区域使用中性地形，不以现代国界倒推，也不把空白误写成“历史上不存在政权”。

## 目录

```text
apps/web        React、CesiumJS、时间轴与交互界面
apps/api        Fastify API、PostgreSQL 和演示仓储
packages/domain 纪年、疆域快照、人物位置与迁移规则
db              PostGIS 迁移
data            经审阅的种子与许可说明
scripts/data    Python 数据导入管线
docker          API、Web、数据导入镜像
```
