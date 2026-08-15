# 中国历史政权边界数据源：三国至两晋

> 调研日期：2026-08-15。目标是为 GeoGraph 补足中国区域的政权级**矢量**疆域快照，优先覆盖三国（220–280）和两晋（265–420）；不改变应用代码或现有数据。

## 结论

可以找到更细的权威数据源。首选是哈佛大学费正清中心与复旦大学历史地理研究中心的 **CHGIS V6**：它的时间序列包含“Regime Polygons”（政权疆域多边形），最小时间粒度为一年，可以按年份筛出单年切片。因此它是补曹魏、蜀汉、孙吴、西晋、东晋及同时期地方政权的合适基础数据。

但它的公开许可只准学术研究，明确禁止商业使用、转售和再分发。把其原始文件或转换后的 GeoJSON 提交到仓库、由 API 提供给浏览器，均应先取得 CHGIS/哈佛/复旦的书面再分发授权。在授权之前，不应导入或托管该数据。

## 候选来源与取舍

| 来源 | 三国/两晋覆盖与时间精度 | 可取得形式 | 许可与结论 |
| --- | --- | --- | --- |
| [CHGIS V6](https://chgis.fas.harvard.edu/data/chgis/v6/)（哈佛＋复旦） | 覆盖公元前 222 至公元 1911；官方说明包含政权多边形，时间序列可按任意单年筛选。 | 从 Harvard Dataverse 的 V6 下载页取得 GIS 时间序列；可用 QGIS/GDAL 筛选后转 GeoJSON。 | **仅学术、非商业；禁止转售和再分发**。数据质量与技术最合适，但先取得书面授权。 |
| [中央研究院 CCTS WMTS](https://gis.sinica.edu.tw/ccts/) | 有现成的三国 `ad0262`、西晋 `ad0281`、东晋 `ad0382` 图层。 | WMTS 栅格瓦片；图层元数据为 PNG overlay，不是边界矢量。 | 中研院版权，未经允许不得商用。适合验收/人工比对，不应用作自动矢量化或直接替代 GeoJSON。 |
| [OpenHistoricalMap](https://www.openhistoricalmap.org/export) | 官网中国项目目前列出的完整边界主要是清代广东、广西、浙江、福建台湾，未列三国数据。 | CC0 为主；可导出 XML、Overpass API 或 Planet。 | 开放、可作为未来自建数据的发布/协作平台；**当前不能填补三国缺口**。 |

### CHGIS：为何是首选

- [项目介绍](https://chgis.fas.harvard.edu/pages/intro/)确认其目标覆盖中国历史行政单位与地名，时段为公元前 221/222 至 1911；时间序列的主要覆盖是传统内地省份，内蒙古、青海、新疆和西藏不在完整 Time Series 范围内。因此它应当作为**中国区域的补层**，不能取代 GeoGraph 现有全球底图。
- [使用说明](https://chgis.fas.harvard.edu/pages/howto/)明确列出 `Time Series Regime Polygons`，并说明最小时间粒度为一年：选取某年有效的对象即可生成该年快照。
- [数据模型](https://chgis.fas.harvard.edu/pages/database/)说明政权/王朝、行省和府等高层级单位使用多边形，并以开始年、结束年记录各历史实例；[政权边界元数据](https://geodiscovery.uwm.edu/catalog/sde-columbia-chgis_v4_time_reg_pgn_gbk/metadata)列出 `NAME_CH`、`BEG_YR`、`END_YR`、`NOTE_ID` 等字段语义。这是可追溯到具体边界与史料注释的必要条件。
- V6 下载页的原文许可是“free for academic research, no commercial use, resale, or redistribution permitted”。项目的公开网页未在可无登录读取的页面逐文件列出 V6 压缩包格式；导入前应在获权下载包中记录实际文件、字符编码和字段。旧版政权边界目录记录为矢量 GIS 数据及 `GeoPackage` 分发格式，不能据此断言 V6 完全相同。

## 建议的接入与验收方案（须先获授权）

1. 向 CHGIS 联系方申请明确许可：允许将筛选、投影转换和简化后的政权边界在 GeoGraph 的 Git 仓库/API/网页中再分发；同时确认是否允许与当前 GPL-3.0 全球底图一起发布。仅“非商业研究许可”不足以覆盖公开托管。
2. 获权后，只读取 CHGIS 的政权（regime）多边形层；以 `BEG_YR <= year AND END_YR >= year` 生成事件年切片，并保留原始系统 ID、中文名、日期规则、来源注释 ID、许可证及几何精度元数据。导出时统一为 WGS 84 / GeoJSON，不能把一个大一统“中国”外轮廓错误覆盖掉曹魏、蜀汉、孙吴的并列政权。
3. 首轮不必逐年复制。优先制作 220、221、229、263、265/266、280/281、304、317、382 年；它们分别覆盖三国建立、蜀亡、魏晋易代、吴亡与西晋统一、晋室南渡、东晋时期等可见状态变化。实际年份应以 CHGIS 的有效期字段为准。
4. 验收时将导出切片与中央研究院的 [262 年三国图](https://gis.sinica.edu.tw/showwmts/index.php?l=ad0262&s=ccts)、[281 年西晋图](https://gis.sinica.edu.tw/showwmts/index.php?l=ad0281&s=ccts)、[382 年东晋图](https://gis.sinica.edu.tw/showwmts/index.php?l=ad0382&s=ccts)对照；这些官方服务分别标明对应朝代、PNG 格式和非商用版权。人工审查应特别处理模糊边界、羁縻/属国与相互重叠的区域，而不是把不确定边界伪装成精确国界。
5. 在真正接入前做小范围验收：核对下载包是否确有曹魏、蜀汉、孙吴与西/东晋的政权记录、各年筛选结果是否无拓扑缝隙/重叠、中文字段编码是否正确。公开资料证明该层和按年机制存在；具体文件版本的实体名称与完整性仍应以获得的数据包为准。

## 非授权情况下的安全路线

可继续使用现有 `historical-basemaps` 全球快照，不把 CCTS 瓦片描摹成新 GeoJSON，也不从 CHGIS 复制/转换数据。若必须开源并公开再分发，需另行获得与此用途兼容的原始授权，或由有权利人以允许再分发的条款发布政权矢量数据；OpenHistoricalMap 的 CC0 出口只有在其自身已有相应的三国数据时才可直接使用。
