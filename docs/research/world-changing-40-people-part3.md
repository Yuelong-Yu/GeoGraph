# GeoGraph：新增 40 位人物研究档案（第三部分，13 人）

> 状态：供数据录入与审校使用；不是可直接导入的 seed 文件。研究日期：2026-08-11。本文件只覆盖分配给第三组的 13 人。

## 口径与数据约束

- 年份使用公历整数；本组没有公元前事件，也不存在 `0` 年。坐标是现代城市、公共机构或历史遗址中心点的近似值，不代表私人住所或建筑内的精确位置。
- 每位人物都保留一个与 `birthYear` 完全相同的出生事件，以支持 GeoGraph 的“跟随人物”逻辑。
- 事件只取能由机构资料支持、且可保守落点的节点。论文“发表”通常落到作者当时工作的公共机构或出版城市，并在描述中说明口径。
- 蔡伦、郑和、莎士比亚的早年与部分行程来自较晚史料或残缺记录；这些节点明确标注“传统”“约”“有争议”。
- 蒂姆·伯纳斯-李仍在世，`deathYear` 为 `null`；只列出生城市、大学、CERN、MIT/W3C 等公开机构节点，不记录任何私人住址。
- 中文分类与项目现有口径一致；每人只有一个 `primaryField`，辅助领域可多选。

---

## 1. 格里高尔·孟德尔 / Gregor Mendel

- **Slug**：`gregor-mendel`
- **中文名**：格里高尔·孟德尔；别名：格雷戈尔·约翰·孟德尔、约翰·孟德尔
- **English name**: Gregor Mendel; aliases: Gregor Johann Mendel, Johann Mendel
- **生卒年 / Years**：`1822–1884`
- **主领域 / Primary field**：科学 / Science
- **辅助领域 / Secondary fields**：遗传学、植物学、气象学、教育 / Genetics, botany, meteorology, education
- **摘要 / Summary**：奥地利帝国时期的奥古斯丁会修士与实验研究者，通过豌豆杂交实验建立遗传性状分离与组合的定量规律。 / An Augustinian friar and experimental researcher in the Austrian Empire whose pea-hybrid studies established quantitative patterns of inheritance.
- **入选理由 / Inclusion reason**：其工作成为现代遗传学的基础，并改变了生物学、农业与医学理解遗传的方式。 / His work became foundational to modern genetics and transformed how biology, agriculture, and medicine understand heredity.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1822 | 1 | Hynčice | 17.715 | 49.612 | **出生于欣契采**：7 月 20 日生于当时奥地利西里西亚的欣契采。 | **Born in Hynčice:** Born on 20 July in Hynčice, then in Austrian Silesia. |
| 1840 | 1 | Olomouc | 17.251 | 49.594 | **进入哲学学院**：在奥洛穆茨哲学学院学习。 | **Entered the Philosophical Institute:** Studied at the Philosophical Institute in Olomouc. |
| 1843 | 1 | Brno | 16.594 | 49.191 | **加入奥古斯丁会**：进入老布尔诺修道院并取修会名 Gregor。 | **Joined the Augustinians:** Entered the Old Brno abbey and took the religious name Gregor. |
| 1851 | 1 | Vienna | 16.373 | 48.208 | **赴维也纳大学深造**：1851–1853 年学习物理、数学与自然科学，为后续实验奠基。 | **Studied at the University of Vienna:** From 1851 to 1853 studied physics, mathematics, and natural science, preparing for his later experiments. |
| 1854 | 1 | Brno | 16.594 | 49.191 | **开始植物杂交研究阶段**：在布尔诺教学并于 1854–1864 年间系统研究植物杂交。 | **Began the plant-hybrid research period:** Taught in Brno and systematically studied plant hybrids during 1854–1864. |
| 1865 | 1 | Brno | 16.607 | 49.195 | **报告豌豆实验结果**：向布尔诺自然科学学会作两次报告。 | **Presented the pea experiments:** Delivered two lectures to the Natural Science Society in Brno. |
| 1866 | 1 | Brno | 16.607 | 49.195 | **发表《植物杂交试验》**：研究结果在学会会刊发表，当时反响有限。 | **Published “Experiments on Plant Hybrids”:** The results appeared in the society's proceedings and initially drew little notice. |
| 1868 | 1 | Brno | 16.594 | 49.191 | **当选修道院院长**：出任老布尔诺奥古斯丁会修道院院长。 | **Elected abbot:** Became abbot of the Augustinian abbey in Old Brno. |
| 1884 | 1 | Brno | 16.594 | 49.191 | **逝世**：1 月 6 日在布尔诺去世。 | **Died:** Died in Brno on 6 January. |

**资料与来源元数据 / Sources**

- `mendel-museum-life` — [Gregor Johann Mendel](https://mendelmuseum.muni.cz/en/about-the-museum/gregor-johann-mendel), Mendel Museum, Masaryk University：1822、1840、1843、1851–1853、1854–1864、1865、1866、1868、1884 的机构编年；页面版权归馆方，仅抽取事实。
- `mendel-brno-leaflet` — [Gregor Johann Mendel in Brno](https://www.gotobrno.cz/wp-content/uploads/2018/02/Gregor-Johann-Mendel-in-Brno.pdf), TIC BRNO：布尔诺活动地点交叉核验；许可未统一声明，不复用图像。

---

## 2. 弗洛伦斯·南丁格尔 / Florence Nightingale

- **Slug**：`florence-nightingale`
- **中文名**：弗洛伦斯·南丁格尔；别名：南丁格尔
- **English name**: Florence Nightingale; aliases: The Lady with the Lamp
- **生卒年 / Years**：`1820–1910`
- **主领域 / Primary field**：医学 / Medicine
- **辅助领域 / Secondary fields**：护理、公共卫生、统计学、医院管理、社会改革 / Nursing, public health, statistics, hospital administration, social reform
- **摘要 / Summary**：英国护理改革者、统计实践者与公共卫生倡导者，以克里米亚战争期间的医院工作及其后的制度改革推动专业护理形成。 / A British nursing reformer, statistical practitioner, and public-health advocate whose Crimean War work and later institutional reforms helped establish professional nursing.
- **入选理由 / Inclusion reason**：她把护理训练、卫生改革与数据论证结合起来，长期改变了军民医院和公共卫生治理。 / She combined nursing education, sanitation reform, and statistical evidence, permanently changing hospitals and public-health administration.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1820 | 1 | Florence | 11.255 | 43.769 | **出生于佛罗伦萨**：5 月 12 日在父母旅居意大利期间出生，并以城市命名。 | **Born in Florence:** Born on 12 May while her parents were in Italy and named after the city. |
| 1837 | 1 | Embley / Romsey | -1.499 | 50.989 | **立志从事护理**：在家族位于汉普郡的 Embley 时期形成宗教使命感；具体体验属其后来的自述。 | **Resolved to pursue nursing:** During the family's Embley period she described receiving a religious calling; the experience is known from her later account. |
| 1850 | 1 | Kaiserswerth | 6.778 | 51.300 | **考察凯撒斯韦特女执事院**：首次系统接触该院的护理训练。 | **Visited Kaiserswerth:** First closely studied the deaconess institute's nursing practice. |
| 1851 | 1 | Kaiserswerth | 6.778 | 51.300 | **接受护理训练**：返回凯撒斯韦特完成数月训练。 | **Trained in nursing:** Returned to Kaiserswerth for several months of formal training. |
| 1853 | 1 | London | -0.147 | 51.515 | **管理伦敦护理机构**：出任 Harley Street 患病女士照护机构的主管。 | **Managed a London care institution:** Became superintendent of an establishment for ill gentlewomen on Harley Street. |
| 1854 | 1 | Scutari / Üsküdar | 29.016 | 41.026 | **率护理队抵达斯库台**：与 38 名志愿护士抵达英军医院，参与克里米亚战争救护与卫生改进。 | **Led nurses to Scutari:** Arrived with 38 volunteer nurses at the British military hospital and worked on care and sanitation during the Crimean War. |
| 1855 | 1 | Balaklava / Crimea | 33.600 | 44.500 | **考察克里米亚医院**：赴克里米亚前线医院考察并患重病；落点为巴拉克拉瓦地区近似点。 | **Inspected Crimean hospitals:** Visited hospitals near the front and became seriously ill; the point is an approximate Balaklava-area centroid. |
| 1860 | 1 | London | -0.116 | 51.499 | **南丁格尔护士学校开学**：依托圣托马斯医院建立制度化护士训练。 | **Nightingale Training School opened:** Established systematic nurse education at St Thomas' Hospital. |
| 1910 | 1 | London | -0.143 | 51.515 | **逝世**：8 月 13 日在伦敦去世；地图只使用城市中心，不标私人住宅。 | **Died:** Died in London on 13 August; the map uses a city centroid rather than a private residence. |

**资料与来源元数据 / Sources**

- `uk-national-archives-nightingale` — [Florence Nightingale](https://www.nationalarchives.gov.uk/education/resources/florence-nightingale/), The National Archives (UK)：出生证明、克里米亚护照、斯库台与晚年档案入口；政府档案页面，具体数字化材料权利逐件核验。
- `nightingale-museum-family-trail` — [Florence Nightingale Museum family trail](https://www.florence-nightingale.co.uk/wp-content/uploads/FNM-Family-Trail.pdf), Florence Nightingale Museum：1820、1851、1854–1856 路线核验；馆方教育材料，仅抽取事实。
- `science-museum-scutari` — [Sickness in the ranks](https://www.sciencemuseum.org.uk/objects-and-stories/medicine/sickness-ranks), Science Museum Group：38 名护士及斯库台医院背景；页面和馆藏资产依馆方条款。

---

## 3. 亚历山大·弗莱明 / Alexander Fleming

- **Slug**：`alexander-fleming`
- **中文名**：亚历山大·弗莱明；别名：亚历山大·弗莱明爵士
- **English name**: Alexander Fleming; aliases: Sir Alexander Fleming
- **生卒年 / Years**：`1881–1955`
- **主领域 / Primary field**：医学 / Medicine
- **辅助领域 / Secondary fields**：细菌学、药理学、抗生素、免疫学 / Bacteriology, pharmacology, antibiotics, immunology
- **摘要 / Summary**：苏格兰医师与细菌学家，在伦敦圣玛丽医院观察到青霉菌的抑菌作用并命名青霉素。 / A Scottish physician and bacteriologist who observed the antibacterial action of a mould at St Mary's Hospital in London and named penicillin.
- **入选理由 / Inclusion reason**：其发现经弗洛里、钱恩等人进一步开发后开启抗生素时代，重塑感染病治疗；应避免把药物工业化归于他一人。 / His discovery, subsequently developed into therapy by Florey, Chain, and their collaborators, opened the antibiotic era; industrial development should not be credited to him alone.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1881 | 1 | Lochfield near Darvel | -4.283 | 55.610 | **出生于洛克菲尔德农场附近**：8 月 6 日生于苏格兰艾尔郡达弗尔附近；坐标为地区近似点。 | **Born near Lochfield:** Born on 6 August near Darvel in Ayrshire, Scotland; the coordinate is an area centroid. |
| 1895 | 1 | London | -0.141 | 51.515 | **迁居伦敦**：少年时期赴伦敦投靠兄长并继续教育。 | **Moved to London:** Relocated to London as a teenager to join his brothers and continue his education. |
| 1901 | 1 | St Mary's Hospital, London | -0.175 | 51.517 | **进入圣玛丽医学院**：开始医学训练。 | **Entered St Mary's medical school:** Began his medical education at St Mary's. |
| 1906 | 1 | St Mary's Hospital, London | -0.175 | 51.517 | **加入接种研究部门**：在 Almroth Wright 团队从事细菌学研究。 | **Joined the Inoculation Department:** Began bacteriological research in Almroth Wright's group. |
| 1915 | 1 | Boulogne-sur-Mer | 1.614 | 50.726 | **在一战军医院工作**：于法国军医院研究伤口感染；具体驻点随战时调动，落点取布洛涅地区。 | **Worked in a wartime hospital:** Investigated wound infection in France; assignments varied, so the point uses the Boulogne area. |
| 1921 | 1 | St Mary's Hospital, London | -0.175 | 51.517 | **发现并命名溶菌酶**：识别出组织和分泌物中的天然溶菌物质。 | **Discovered and named lysozyme:** Identified a natural bacteriolytic substance in tissues and secretions. |
| 1928 | 1 | St Mary's Hospital, London | -0.175 | 51.517 | **发现青霉素的抑菌作用**：观察到培养皿中青霉菌周围细菌不能生长。 | **Observed penicillin's antibacterial action:** Noticed that bacteria failed to grow around a contaminating Penicillium mould. |
| 1945 | 1 | Stockholm | 18.068 | 59.329 | **获诺贝尔生理学或医学奖**：与 Howard Florey、Ernst Chain 共同获奖。 | **Received the Nobel Prize in Physiology or Medicine:** Shared the prize with Howard Florey and Ernst Chain. |
| 1955 | 1 | London | -0.141 | 51.515 | **逝世**：3 月 11 日在伦敦去世。 | **Died:** Died in London on 11 March. |

**资料与来源元数据 / Sources**

- `nobel-fleming-biographical` — [Sir Alexander Fleming – Biographical](https://www.nobelprize.org/prizes/medicine/1945/fleming/biographical/), Nobel Prize Outreach / Nobel Foundation：生平、研究与 1945 奖项；传记初版于获奖时期，页面为基金会版权，仅引用事实。
- `imperial-fleming-history` — [The origins of Imperial's Faculty of Medicine](https://www.imperial.ac.uk/Stories/Imperial-Medicine-Origins/), Imperial College London：1928 年圣玛丽医院发现及弗洛里、钱恩后续开发的角色界定；页面版权归校方。
- `imperial-antibiotic-warning` — [Sir Alexander Fleming knew in 1936 bacteria would beat antibiotics](https://www.imperial.ac.uk/news/189049/sir-alexander-fleming-knew-1936-bacteria/), Imperial College London：发现背景与耐药性警告；仅作事实引用。

---

## 4. 克劳德·香农 / Claude Shannon

- **Slug**：`claude-shannon`
- **中文名**：克劳德·香农；别名：克劳德·埃尔伍德·香农
- **English name**: Claude Shannon; aliases: Claude Elwood Shannon
- **生卒年 / Years**：`1916–2001`
- **主领域 / Primary field**：科学 / Science
- **辅助领域 / Secondary fields**：信息论、数学、电子工程、密码学、计算机科学 / Information theory, mathematics, electrical engineering, cryptography, computer science
- **摘要 / Summary**：美国数学家与工程师，以开关电路理论和信息论为数字计算、通信、压缩与编码提供统一数学框架。 / An American mathematician and engineer whose switching theory and information theory supplied a common mathematical framework for digital computing, communication, compression, and coding.
- **入选理由 / Inclusion reason**：他使“信息”成为可度量、可编码和可可靠传输的对象，是数字时代的关键理论奠基者。 / He made information quantifiable, encodable, and reliably transmissible, providing a central theoretical foundation for the digital age.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1916 | 1 | Petoskey, Michigan | -84.955 | 45.374 | **出生于佩托斯基**：4 月 30 日出生，后在密歇根州盖洛德成长。 | **Born in Petoskey:** Born on 30 April and raised in Gaylord, Michigan. |
| 1932 | 1 | Ann Arbor | -83.738 | 42.278 | **进入密歇根大学**：学习数学与电气工程；年份按四年制学习起点。 | **Entered the University of Michigan:** Studied mathematics and electrical engineering; the year is the start of the four-year program. |
| 1936 | 1 | Cambridge, Massachusetts | -71.094 | 42.360 | **赴 MIT 研究**：操作 Vannevar Bush 的微分分析机并研究继电器电路。 | **Began research at MIT:** Worked with Vannevar Bush's differential analyzer and studied relay circuits. |
| 1938 | 1 | Cambridge, Massachusetts | -71.094 | 42.360 | **完成开关电路硕士论文**：以布尔代数建立数字开关理论基础。 | **Completed the switching-circuit thesis:** Used Boolean algebra to establish foundations for digital switching theory. |
| 1940 | 1 | Princeton | -74.667 | 40.346 | **赴高等研究院**：取得 MIT 两个学位后在普林斯顿任研究员。 | **Joined the Institute for Advanced Study:** Became a research fellow in Princeton after earning two MIT degrees. |
| 1941 | 1 | Murray Hill, New Jersey | -74.411 | 40.684 | **加入贝尔实验室**：开展通信、密码与战时控制系统研究。 | **Joined Bell Laboratories:** Worked on communication, cryptography, and wartime control systems. |
| 1948 | 1 | Murray Hill, New Jersey | -74.411 | 40.684 | **发表信息论奠基论文**：在贝尔系统技术期刊发表《通信的数学理论》。 | **Published the foundational information-theory paper:** “A Mathematical Theory of Communication” appeared in the Bell System Technical Journal. |
| 1956 | 1 | Cambridge, Massachusetts | -71.094 | 42.360 | **返回 MIT 任教**：先任访问教授，后成为 Donner Professor，并于 1978 年荣休。 | **Returned to MIT:** Joined as a visiting professor, later became Donner Professor, and retired in 1978. |
| 2001 | 1 | Medford, Massachusetts | -71.106 | 42.418 | **逝世**：2 月 24 日在马萨诸塞州梅德福去世。 | **Died:** Died in Medford, Massachusetts, on 24 February. |

**资料与来源元数据 / Sources**

- `mit-shannon-obituary` — [Professor Emeritus Claude Shannon, founder of digital communications, dies at 84](https://news.mit.edu/2001/shannon), Massachusetts Institute of Technology：出生、求学、普林斯顿、贝尔实验室、1948 论文、回归 MIT 与去世；MIT 版权，仅引用事实。
- `ieee-shannon` — [Claude E. Shannon](https://www.itsoc.org/about/shannon), IEEE Information Theory Society：信息论、密码学及职业路径交叉核验；IEEE 页面版权。
- `mit-archives-shannon-1967` — [MIT News Office archival release](https://cdn.libraries.mit.edu/dissemination/diponline/AC0069_NewReleases/NewsRelease_1960/AC0069_1967/AC0069_196702_001.pdf), MIT Institute Archives：出生城市与 1936–1941 路线的一手校档案副本；依 MIT 使用条款。

---

## 5. 蔡伦 / Cai Lun

- **Slug**：`cai-lun`
- **中文名**：蔡伦；别名：蔡敬仲、蔡侯
- **English name**: Cai Lun; aliases: Ts'ai Lun, Cai Jingzhong, Marquis Cai
- **生卒年 / Years**：`61–121`（出生亦常作 63 年；采用 61 作为显示锚点）
- **主领域 / Primary field**：工业与技术 / Industry & Technology
- **辅助领域 / Secondary fields**：造纸、材料技术、宫廷行政 / Papermaking, materials technology, court administration
- **摘要 / Summary**：东汉宫廷官员，传统史料称其在既有纸张技术基础上改进原料与工艺，并于 105 年向朝廷奏报。 / An Eastern Han court official traditionally credited with improving the materials and process of an already existing papermaking tradition and reporting it to the court in 105.
- **入选理由 / Inclusion reason**：改进后的纸张生产传统显著降低了书写与知识传播成本；“发明纸”不应被简化为单一人物的瞬间创造。 / The improved papermaking tradition greatly reduced the cost of writing and knowledge transmission; paper should not be presented as a single-person, single-moment invention.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 61 | 1 | Leiyang / Guiyang Commandery | 112.859 | 26.423 | **传统出生于桂阳郡**：常见纪年为 61 或 63 年；落点取今耒阳市中心，古代辖境更大。 | **Traditionally born in Guiyang Commandery:** Common dates are 61 or 63; the point uses modern Leiyang, while the ancient commandery was much larger. |
| 75 | 1 | Luoyang | 112.454 | 34.619 | **约进入洛阳宫廷**：据《后汉书》“永平末”入宫，换算到单年仅为显示锚点。 | **Entered the Luoyang court, approximately:** The Book of the Later Han says “at the end of Yongping”; 75 is only a visualization anchor. |
| 89 | 1 | Luoyang | 112.454 | 34.619 | **任尚方令**：约在和帝即位后掌管宫廷器物制造，年份按常见编年。 | **Appointed Director of the Imperial Workshops:** Oversaw production of court objects after Emperor He's accession; the year follows the common chronology. |
| 97 | 1 | Luoyang | 112.454 | 34.619 | **参与宫廷典籍校理**：传统编年称参与东观经籍校订；职责细节来自较晚史书。 | **Worked on court texts:** Traditional chronology associates him with textual collation at the Eastern Library; details come from later histories. |
| 105 | 1 | Luoyang | 112.454 | 34.619 | **奏报改进造纸法**：史书称以树皮、麻头、破布和旧渔网等制纸并上奏，受到采用。 | **Reported an improved papermaking method:** Later Han history says he used bark, hemp waste, rags, and old fishing nets and presented the method to the court. |
| 114 | 1 | Longting / Hanzhong area | 106.861 | 33.153 | **受封龙亭侯**：封地通常关联今陕西汉中龙亭一带；精确古界不明。 | **Enfeoffed as Marquis of Longting:** The fief is usually associated with the Longting area of modern Hanzhong; its exact ancient boundary is uncertain. |
| 121 | 1 | Luoyang | 112.454 | 34.619 | **在宫廷清算中去世**：史书称奉命入狱前沐浴整衣、服毒去世；叙事来自后出的《后汉书》。 | **Died amid a court purge:** The later Book of the Later Han says he bathed, dressed formally, and took poison before imprisonment. |

**资料与来源元数据 / Sources**

- `hunan-cai-lun` — [Cai Lun](https://whhlyt.hunan.gov.cn/whhlyt/english/Culture/CulturalFigures/202207/t20220729_27570604.html), Hunan Provincial Department of Culture and Tourism：61/63–121、桂阳郡出生与宫廷造纸叙述；政府文化页面，仅抽取事实。
- `hou-han-shu-cai-lun` — 范晔《后汉书·宦者列传·蔡伦传》（卷七十八）：最主要的传统生平文本，但编成于蔡伦去世约三百年后，必须与现代意义的同时代档案区分；古籍文本公版，现代点校本仍可能受版权保护。
- `rijksmuseum-cai-lun` — [Paper invented by Cai-Lun and its development](https://www.rijksmuseum.nl/en/collection/publication/Paper-invented-by-Cai-Lun-and-its-development--6e4486fbb566c036043146717455880f), Rijksmuseum Research Library：蔡伦在造纸史中的传统地位；馆藏书目元数据可引用，书内资产不自动开放。

---

## 6. 阿达·洛芙莱斯 / Ada Lovelace

- **Slug**：`ada-lovelace`
- **中文名**：阿达·洛芙莱斯；别名：奥古斯塔·阿达·金、洛芙莱斯伯爵夫人
- **English name**: Ada Lovelace; aliases: Augusta Ada King, Countess of Lovelace, Augusta Ada Byron
- **生卒年 / Years**：`1815–1852`
- **主领域 / Primary field**：工业与技术 / Industry & Technology
- **辅助领域 / Secondary fields**：数学、计算思想、写作 / Mathematics, computing, writing
- **摘要 / Summary**：英国数学写作者，在翻译分析机论文时撰写篇幅更长的注释，阐述通用符号处理潜力并给出伯努利数计算方案。 / A British mathematical writer whose extensive notes on the Analytical Engine described broader symbolic uses and included a method for calculating Bernoulli numbers.
- **入选理由 / Inclusion reason**：她比同时代多数论述更清晰地认识到通用计算机器可以处理数字之外的符号；“第一位程序员”称号有定义争论，资料中应避免绝对化。 / She articulated more clearly than most contemporaries that a general machine could manipulate symbols beyond numbers; the label “first programmer” depends on definitions and should not be treated as uncontested.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1815 | 1 | London | -0.142 | 51.507 | **出生于伦敦**：12 月 10 日出生，名 Augusta Ada Byron。 | **Born in London:** Born on 10 December as Augusta Ada Byron. |
| 1828 | 1 | Ockham, Surrey | -0.459 | 51.299 | **设计“飞行学”方案**：少年时期在奥卡姆庄园附近研究鸟翼并设想飞行装置；未制成可用飞行器。 | **Developed a “Flyology” project:** As a teenager near Ockham, studied bird wings and imagined a flying apparatus; no practical aircraft resulted. |
| 1833 | 1 | London | -0.127 | 51.507 | **结识查尔斯·巴贝奇**：在伦敦社交聚会见到差分机演示，随后长期通信。 | **Met Charles Babbage:** Saw a Difference Engine demonstration at a London gathering and began a long correspondence. |
| 1835 | 1 | Ockham, Surrey | -0.459 | 51.299 | **与 William King 成婚**：婚礼地点关联奥卡姆；1838 年成为洛芙莱斯伯爵夫人。 | **Married William King:** The marriage is associated with Ockham; she became Countess of Lovelace in 1838. |
| 1840 | 1 | London | -0.127 | 51.507 | **随德·摩根学习高等数学**：通过通信接受 Augustus De Morgan 指导；落点取其伦敦学术网络中心。 | **Studied advanced mathematics with De Morgan:** Received guidance from Augustus De Morgan by correspondence; the point uses the center of their London scholarly network. |
| 1842 | 1 | London | -0.127 | 51.507 | **翻译分析机论文**：开始翻译 Luigi Menabrea 对巴贝奇分析机的法文讲稿。 | **Translated the Analytical Engine paper:** Began translating Luigi Menabrea's French account of Babbage's Analytical Engine. |
| 1843 | 1 | London | -0.127 | 51.507 | **发表分析机注释**：译文连同 A–G 注释出版，其中包含伯努利数计算表和对机器潜力的论述。 | **Published the Analytical Engine notes:** The translation appeared with Notes A–G, including a Bernoulli-number table and an account of the machine's broader potential. |
| 1852 | 1 | London | -0.142 | 51.507 | **逝世**：11 月 27 日在伦敦去世。 | **Died:** Died in London on 27 November. |

**资料与来源元数据 / Sources**

- `science-museum-ada` — [Ada Lovelace's remarkable story](https://www.sciencemuseum.org.uk/about-us/press-office/ada-lovelaces-remarkable-story-be-celebrated-science-museum), Science Museum Group：生平、书信、分析机注释和通用计算认识；馆方版权，仅引用事实。
- `unesco-ada` — [Ada Lovelace (1815–1852)](https://www.unesco.org/en/virtual-science-museum/women-science/ada-lovelace), UNESCO Virtual Science Museum：出生年、1833 年伦敦与计算史意义；文字与图像依 UNESCO 使用条款。
- `science-museum-lovelace-turing` — [Lovelace, Turing and the invention of computers](https://www.sciencemuseum.org.uk/objects-and-stories/lovelace-turing-and-invention-computers), Science Museum Group：分析机及“第一程序”说法的语境；不复用馆藏图像。

---

## 7. 托马斯·爱迪生 / Thomas Edison

- **Slug**：`thomas-edison`
- **中文名**：托马斯·爱迪生；别名：托马斯·阿尔瓦·爱迪生、“门洛帕克的奇才”
- **English name**: Thomas Edison; aliases: Thomas Alva Edison, Wizard of Menlo Park
- **生卒年 / Years**：`1847–1931`
- **主领域 / Primary field**：工业与技术 / Industry & Technology
- **辅助领域 / Secondary fields**：电气工程、录音、电影、工业研发、企业 / Electrical engineering, sound recording, motion pictures, industrial research, business
- **摘要 / Summary**：美国发明家与企业家，通过门洛帕克和西奥兰治实验室组织团队研发，在录音、电灯系统、供电与早期电影领域推动技术商业化。 / An American inventor and entrepreneur who organized team-based research at Menlo Park and West Orange and advanced the commercialization of sound recording, electric-light systems, power distribution, and early film.
- **入选理由 / Inclusion reason**：他把发明、实验室协作、专利和大规模基础设施结合为工业研发体系；许多成果是团队与既有技术共同演化，不能归为孤立的个人发明。 / He combined invention, laboratory teamwork, patents, and infrastructure into an industrial R&D system; many achievements were collaborative developments rather than isolated solo inventions.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1847 | 1 | Milan, Ohio | -82.601 | 41.297 | **出生于俄亥俄州米兰**：2 月 11 日出生。 | **Born in Milan, Ohio:** Born on 11 February. |
| 1854 | 1 | Port Huron, Michigan | -82.425 | 42.970 | **随家迁居休伦港**：在密歇根州度过少年时期。 | **Moved to Port Huron:** Relocated with his family and spent his youth in Michigan. |
| 1859 | 1 | Port Huron, Michigan | -82.425 | 42.970 | **在铁路上售报**：约 12 岁起在 Grand Trunk Railway 工作并自行实验。 | **Worked on the railroad:** Around age twelve sold newspapers on the Grand Trunk Railway and pursued experiments. |
| 1862 | 1 | Port Huron, Michigan | -82.425 | 42.970 | **成为电报员**：开始学习并从事电报操作，随后在美国多地流动任职。 | **Became a telegraph operator:** Learned telegraphy and then worked in several U.S. cities. |
| 1870 | 1 | Newark, New Jersey | -74.172 | 40.735 | **建立纽瓦克实验室**：改进股票报价机所得收益帮助其组织首个主要研发工场。 | **Established a Newark laboratory:** Proceeds from an improved stock ticker helped him organize a major development shop. |
| 1876 | 1 | Menlo Park, New Jersey | -74.336 | 40.521 | **建立门洛帕克实验室**：形成以团队、机械工场和连续试验为特点的研发机构。 | **Established the Menlo Park laboratory:** Created a team-based research site with machine shops and continuous experimentation. |
| 1877 | 1 | Menlo Park, New Jersey | -74.336 | 40.521 | **展示留声机**：开发出能够录制并回放声音的装置。 | **Demonstrated the phonograph:** Developed a machine capable of recording and reproducing sound. |
| 1879 | 1 | Menlo Park, New Jersey | -74.336 | 40.521 | **改进实用白炽灯系统**：团队获得更耐用的灯丝方案；并非历史上第一只电灯。 | **Improved a practical incandescent-light system:** The team achieved a longer-lasting lamp design; it was not the first electric lamp in history. |
| 1882 | 1 | New York City | -74.006 | 40.713 | **珍珠街电站投入运行**：完整直流照明与供电系统开始服务曼哈顿部分地区。 | **Pearl Street Station began service:** An integrated direct-current lighting and power system supplied part of Manhattan. |
| 1887 | 1 | West Orange, New Jersey | -74.239 | 40.798 | **启用西奥兰治实验室**：把研发、制造试验与资料收藏扩展到更大规模。 | **Opened the West Orange laboratory:** Expanded research, manufacturing experiments, and technical collections on a larger scale. |
| 1931 | 1 | West Orange, New Jersey | -74.239 | 40.798 | **逝世**：10 月 18 日在西奥兰治去世。 | **Died:** Died in West Orange on 18 October. |

**资料与来源元数据 / Sources**

- `loc-edison-timeline` — [Thomas Edison Timeline](https://www.loc.gov/collections/edison-company-motion-pictures-and-sound-recordings/articles-and-essays/timeline/), Library of Congress：1847、1854、1859、1862、1876 及录音/电影编年；联邦机构页面，馆藏项目权利逐件核验。
- `nps-edison-1847-1882` — [Thomas Edison Biography: 1847–1882](https://home.nps.gov/people/thomas-edison-biography-1847-1882-birth-to-pearl-street.htm), U.S. National Park Service：出生、迁居、电报、纽瓦克、门洛帕克、留声机、照明系统和珍珠街；美国联邦政府文本通常公版，第三方图片除外。
- `nps-edison-biography` — [Edison Biography](https://www.nps.gov/edis/learn/historyculture/edison-biography.htm), Thomas Edison National Historical Park：西奥兰治实验室与后期生涯；同上。

---

## 8. 蒂姆·伯纳斯-李 / Tim Berners-Lee

- **Slug**：`tim-berners-lee`
- **中文名**：蒂姆·伯纳斯-李；别名：蒂莫西·约翰·伯纳斯-李、TimBL
- **English name**: Tim Berners-Lee; aliases: Sir Timothy John Berners-Lee, TimBL
- **生卒年 / Years**：`1955–null`（仍在世）
- **主领域 / Primary field**：工业与技术 / Industry & Technology
- **辅助领域 / Secondary fields**：计算机科学、互联网标准、开放技术、数据治理 / Computer science, web standards, open technology, data governance
- **摘要 / Summary**：英国计算机科学家，在 CERN 提出并实现万维网的核心组件，随后创建 W3C 推动 URI、HTTP、HTML 与开放标准协同发展。 / A British computer scientist who proposed and implemented the core components of the World Wide Web at CERN and later founded W3C to coordinate URI, HTTP, HTML, and open standards.
- **入选理由 / Inclusion reason**：万维网把互联网变为全球可链接、可发布的信息空间，而开放发布与标准治理帮助其迅速普及。 / The Web turned the Internet into a globally linked publishing space, while open release and standards governance enabled rapid adoption.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1955 | 1 | London | -0.127 | 51.507 | **出生于伦敦**：6 月 8 日出生；只使用城市中心，不记录私人地点。 | **Born in London:** Born on 8 June; only a city centroid is used, with no private location recorded. |
| 1976 | 1 | Oxford | -1.255 | 51.754 | **从牛津大学毕业**：在 Queen's College 学习物理并取得学位。 | **Graduated from Oxford:** Studied physics at Queen's College and received his degree. |
| 1980 | 1 | CERN, Meyrin | 6.055 | 46.233 | **首次在 CERN 工作**：以独立承包者身份开发 ENQUIRE，用超文本关系组织信息。 | **First worked at CERN:** As an independent contractor, developed ENQUIRE to organize information through hypertext relationships. |
| 1984 | 1 | CERN, Meyrin | 6.055 | 46.233 | **返回 CERN**：以研究人员身份处理分布式科研信息问题。 | **Returned to CERN:** Rejoined as a fellow and worked on distributed scientific information. |
| 1989 | 1 | CERN, Meyrin | 6.055 | 46.233 | **提出万维网方案**：提交基于互联网的超文本信息管理建议。 | **Proposed the World Wide Web:** Submitted a proposal for an Internet-based hypertext information system. |
| 1990 | 1 | CERN, Meyrin | 6.055 | 46.233 | **实现首个网页客户端与服务器**：完成 HTML、HTTP、URL 的关键实现及首个网站。 | **Built the first Web client and server:** Implemented key forms of HTML, HTTP, and URL and created the first website. |
| 1993 | 1 | CERN, Meyrin | 6.055 | 46.233 | **CERN 公开发布 Web 软件**：4 月 30 日将关键软件置于公共领域；这是机构决定，不能写成他单独完成。 | **CERN released the Web software openly:** On 30 April CERN placed core software in the public domain; this was an institutional decision, not his act alone. |
| 1994 | 1 | Cambridge, Massachusetts | -71.094 | 42.360 | **在 MIT 创建 W3C**：组织跨机构的开放 Web 标准协作。 | **Founded W3C at MIT:** Organized cross-institutional collaboration on open Web standards. |
| 2016 | 1 | Oxford | -1.255 | 51.754 | **加入牛津大学计算机科学系**：以公开大学职务继续研究去中心化 Web 与社会技术问题。 | **Joined Oxford's Department of Computer Science:** Continued public institutional work on decentralized Web and sociotechnical questions. |

**资料与来源元数据 / Sources**

- `w3c-berners-lee-bio` — [Tim Berners-Lee](https://www.w3.org/People/Berners-Lee/), World Wide Web Consortium：1989 发明、1990 客户端/服务器及开放标准工作；W3C 页面依其许可条款。
- `cern-birth-of-web` — [The birth of the Web](https://home.cern/science/computing/the-birth-of-the-web/), CERN：1989、1990、首个网站与 1993 公共领域发布；CERN 文字和图像须依各自使用条款。
- `cern-licensing-web` — [Licensing the Web](https://home.cern/science/computing/birth-web/licensing-web/), CERN：1993 公共发布与 1994 年转赴 MIT 创建 W3C；仅抽取事实。
- `w3c-history` — [W3C History](https://www.w3.org/about/history/), World Wide Web Consortium：1994 年组织建立及合作机构。
- `oxford-berners-lee-2016` — [Sir Tim Berners-Lee joins Oxford's Department of Computer Science](https://www.cs.ox.ac.uk/news/1206-full.html), University of Oxford：1976 年物理学学位与 2016 年公开大学职务；校方页面版权。

---

## 9. 郑和 / Zheng He

- **Slug**：`zheng-he`
- **中文名**：郑和；别名：马和、三保太监、三宝太监
- **English name**: Zheng He; aliases: Ma He, Cheng Ho, Sanbao
- **生卒年 / Years**：`1371–1433`（出生年通常作 1371；死亡地点与是否死于返航途中有争议）
- **主领域 / Primary field**：航海与探索 / Navigation & Exploration
- **辅助领域 / Secondary fields**：外交、军事、海洋贸易、帝国行政 / Diplomacy, military affairs, maritime trade, imperial administration
- **摘要 / Summary**：明代宦官、将领与舰队统帅，在 1405–1433 年的七次远航中把明廷外交与军事力量延伸至东南亚、南亚、波斯湾及东非。 / A Ming eunuch, commander, and fleet leader whose seven voyages from 1405 to 1433 projected Ming diplomacy and military power across Southeast Asia, South Asia, the Persian Gulf, and East Africa.
- **入选理由 / Inclusion reason**：这些航行是十五世纪规模最大的国家海上行动之一，强化了印度洋外交与朝贡网络；不应误写为“发现”早已存在的港口和航线。 / The voyages were among the fifteenth century's largest state maritime operations and strengthened Indian Ocean diplomatic networks; they did not “discover” long-established ports and routes.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1371 | 1 | Kunyang / Jinning, Yunnan | 102.594 | 24.669 | **传统出生于昆阳**：生于云南马氏穆斯林家庭；1371 为常用纪年，细节主要来自后世材料。 | **Traditionally born in Kunyang:** Born into a Muslim Ma family in Yunnan; 1371 is conventional and details rely largely on later sources. |
| 1382 | 1 | Kunming / Yunnan | 102.712 | 25.040 | **明军进入云南后被俘**：约在少年时期被带入明廷体系；具体地点与日期不完全明确。 | **Captured after the Ming conquest of Yunnan:** Taken into the Ming court system while young; precise date and location remain uncertain. |
| 1390 | 1 | Beijing / Beiping | 116.407 | 39.904 | **进入燕王府服务**：约在北平追随燕王朱棣，年份为保守显示锚点。 | **Served in the Prince of Yan's household:** Associated with Zhu Di in Beiping; the year is a conservative visualization anchor. |
| 1405 | 1 | Nanjing / Longjiang | 118.755 | 32.111 | **率首次远航出发**：舰队从南京—太仓航运体系启航；具体集结和出海港涉及多个地点。 | **Departed on the first voyage:** The fleet left through the Nanjing–Taicang maritime system; assembly and sea departure involved several sites. |
| 1407 | 1 | Palembang | 104.775 | -2.990 | **在旧港击败陈祖义集团**：返航阶段以武力干预当地海上权力；并非纯粹和平访问。 | **Defeated Chen Zuyi's forces at Palembang:** Used force against a local maritime power on the return route; the voyages were not purely peaceful visits. |
| 1411 | 1 | Kotte / Sri Jayawardenepura area | 79.909 | 6.894 | **介入锡兰冲突**：舰队与当地统治者发生战争并将其带回明廷；古战场精确点不明。 | **Intervened in a Ceylon conflict:** The fleet fought a local ruler and took him to the Ming court; the exact battlefield is unknown. |
| 1415 | 1 | Hormuz | 56.459 | 27.062 | **第四次航行抵达霍尔木兹**：舰队路线首次明确延伸到波斯湾重要港口。 | **Reached Hormuz on the fourth voyage:** The fleet's route clearly extended to the major Persian Gulf port. |
| 1419 | 1 | Malindi | 40.119 | -3.219 | **第五次航行联系东非港口**：舰队使团到达马林迪等地；郑和本人是否在每一支分舰队上不可确认。 | **The fifth voyage connected with East African ports:** Missions reached Malindi and other ports; Zheng He's personal presence on every detached squadron cannot be confirmed. |
| 1431 | 1 | Nanjing | 118.796 | 32.060 | **奉命率第七次远航**：在长期停航后再次统率远航，实际离港延续到 1432 年。 | **Commissioned to lead the seventh voyage:** Led the final expedition after a long pause; the fleet's departure process continued into 1432. |
| 1433 | 1 | Calicut / Kozhikode | 75.780 | 11.258 | **约在末次航行中去世**：常见说法为在古里或返航海上去世，也有回国后去世说；坐标仅作争议地点锚点。 | **Died around the final voyage:** Common accounts place his death at Calicut or at sea on the return, while another tradition has him return to China; the point is only a disputed-location anchor. |

**资料与来源元数据 / Sources**

- `unesco-zheng-he-studies` — [Recent Studies in China on Admiral Zheng He](https://en.unesco.org/silkroad/sites/default/files/knowledge-bank-article/recent_studies_in_china_on_admiral_zheng_he.pdf), UNESCO Silk Roads Programme：史料、研究史与七次航行；学术材料版权依原作者/UNESCO 条款。
- `mariners-museum-zheng-he` — [Zheng He](https://exploration.marinersmuseum.org/subject/zheng-he/), The Mariners' Museum and Park：1405–1407、1415、1431–1433 路线与外交角色；馆方版权，仅引用事实。
- `china-heritage-voyages` — [The Voyages of Zheng He](https://www.chinaheritagequarterly.org/articles.php?issue=002&searchterm=002_zhenghe.inc), China Heritage Project, Australian National University：七次航行年代与港口清单；许可未统一声明。
- **审校提示**：1433 年死亡地点存在 Calicut、返航海上、回到中国后等不同说法；不要把南京郑和墓（通常视为衣冠冢）当作遗体安葬已确认事实。

---

## 10. 威廉·莎士比亚 / William Shakespeare

- **Slug**：`william-shakespeare`
- **中文名**：威廉·莎士比亚；别名：莎士比亚
- **English name**: William Shakespeare; aliases: Shakespeare, William Shakspere (documentary spelling variant)
- **生卒年 / Years**：`1564–1616`（4 月 23 日生日为传统推定；可确认的是 4 月 26 日受洗）
- **主领域 / Primary field**：艺术 / Arts
- **辅助领域 / Secondary fields**：戏剧、诗歌、表演、剧团经营 / Drama, poetry, acting, theatre business
- **摘要 / Summary**：英格兰剧作家、诗人、演员与剧团股东，其作品在语言、人物塑造和戏剧结构方面形成跨世纪、跨语言的影响。 / An English playwright, poet, actor, and company shareholder whose language, characterization, and dramatic structures have had enduring global influence.
- **入选理由 / Inclusion reason**：其戏剧与诗歌成为全球文学、舞台和教育传统的核心文本；大量作品写作年份只能按首演、出版或文体证据估计。 / His plays and poems became central to global literature, theatre, and education; many composition dates remain estimates based on performance, publication, and stylistic evidence.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1564 | 1 | Stratford-upon-Avon | -1.707 | 52.192 | **出生并在斯特拉特福受洗**：4 月 26 日受洗有记录；4 月 23 日出生是传统推定。 | **Born and baptized in Stratford:** His baptism on 26 April is documented; birth on 23 April is a traditional inference. |
| 1582 | 1 | Stratford-upon-Avon area | -1.707 | 52.192 | **与安妮·海瑟薇成婚**：婚姻许可和保证书留存，但仪式的确切教堂仍有争议。 | **Married Anne Hathaway:** A license and bond survive, but the exact church of the ceremony remains disputed. |
| 1585 | 1 | Stratford-upon-Avon | -1.707 | 52.192 | **双胞胎受洗**：Hamnet 与 Judith 的受洗记录是“失落年代”前的重要档案节点。 | **Twins baptized:** The baptism of Hamnet and Judith is a key documented point before the “lost years.” |
| 1592 | 1 | London | -0.105 | 51.511 | **成为伦敦剧坛已知人物**：现存文字首次明确提到他是演员和剧作家。 | **Documented in the London theatre world:** The first definite surviving reference identifies him as an established actor and playwright. |
| 1593 | 1 | London | -0.105 | 51.511 | **出版《维纳斯与阿多尼斯》**：其第一部有确证的印刷作品在伦敦发行。 | **Published “Venus and Adonis”:** His first securely documented printed work appeared in London. |
| 1594 | 1 | London | -0.105 | 51.511 | **加入宫内大臣剧团**：成为演员、作者和股东；1603 年改称国王剧团。 | **Joined the Lord Chamberlain's Men:** Worked as actor, writer, and shareholder; the company became the King's Men in 1603. |
| 1599 | 1 | Globe Theatre, London | -0.097 | 51.508 | **环球剧场建成**：剧团利用旧剧场木料修建新剧场，莎士比亚是股东之一。 | **The Globe Theatre was built:** The company reused timbers from an older theatre, and Shakespeare held a share. |
| 1603 | 1 | London | -0.105 | 51.511 | **剧团成为国王剧团**：詹姆斯一世即位后获得王室庇护，进一步巩固其职业地位。 | **The company became the King's Men:** Royal patronage under James I strengthened the company's position. |
| 1613 | 1 | Globe Theatre, London | -0.097 | 51.508 | **环球剧场焚毁**：演出《亨利八世》时失火；莎士比亚晚期活动已逐渐回到斯特拉特福。 | **The Globe burned:** A fire during “Henry VIII” destroyed the theatre; Shakespeare's late life was increasingly centered on Stratford. |
| 1616 | 1 | Stratford-upon-Avon | -1.707 | 52.192 | **立遗嘱并去世**：3 月签署遗嘱，4 月 23 日去世并葬于当地圣三一教堂。 | **Made his will and died:** Signed his will in March, died on 23 April, and was buried at Holy Trinity Church. |

**资料与来源元数据 / Sources**

- `folger-shakespeare-life` — [Shakespeare's life](https://www.folger.edu/explore/shakespeares-life/), Folger Shakespeare Library：1592 首次确证、伦敦剧团职业、遗嘱与史料边界；馆方页面版权。
- `folger-documented-timeline` — [Timeline of Shakespeare's Life](https://shakespearedocumented.folger.edu/timeline-shakespeares-life), Shakespeare Documented / Folger Shakespeare Library：1593、1599、1603、1613 及原始文献链接；资料库汇集多机构材料，资产权利逐件核验。
- `shakespeare-birthplace-timeline` — [Shakespeare's Life: A Timeline](https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/william-shakespeare/shakespeare-timeline/), Shakespeare Birthplace Trust：斯特拉特福与伦敦生涯交叉核验；馆方版权。

---

## 11. 马丁·路德·金 / Martin Luther King Jr.

- **Slug**：`martin-luther-king-jr`
- **中文名**：马丁·路德·金；别名：小马丁·路德·金、MLK
- **English name**: Martin Luther King Jr.; aliases: Martin Luther King, Jr., MLK, Michael King Jr. (birth name in early records)
- **生卒年 / Years**：`1929–1968`
- **主领域 / Primary field**：政治 / Politics
- **辅助领域 / Secondary fields**：民权、宗教、非暴力运动、社会正义 / Civil rights, religion, nonviolent movements, social justice
- **摘要 / Summary**：美国浸信会牧师与民权运动领袖，以群众组织、诉讼、抵制和非暴力直接行动推动废除种族隔离及投票权改革。 / An American Baptist minister and civil-rights leader who used mass organizing, litigation, boycotts, and nonviolent direct action to advance desegregation and voting rights.
- **入选理由 / Inclusion reason**：他帮助把美国黑人自由斗争转化为全国性政治议程，并为全球非暴力运动提供重要范式；成果属于广泛运动而非个人单独完成。 / He helped turn the Black freedom struggle into a national political agenda and provided a model for nonviolent movements worldwide; the achievements belonged to a broad movement, not one individual alone.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1929 | 1 | Atlanta | -84.372 | 33.756 | **出生于亚特兰大**：1 月 15 日出生，早期记录名 Michael King Jr.，后随父亲改名。 | **Born in Atlanta:** Born on 15 January; early records use Michael King Jr., and he was later renamed with his father. |
| 1948 | 1 | Chester, Pennsylvania | -75.356 | 39.850 | **进入克罗泽神学院**：接受神学训练并于 1951 年毕业。 | **Entered Crozer Theological Seminary:** Pursued theological study and graduated in 1951. |
| 1951 | 1 | Boston | -71.108 | 42.350 | **赴波士顿大学攻读博士**：研究系统神学，并在波士顿结识 Coretta Scott。 | **Began doctoral study at Boston University:** Studied systematic theology and met Coretta Scott in Boston. |
| 1954 | 1 | Montgomery | -86.308 | 32.377 | **出任 Dexter Avenue Baptist Church 牧师**：迁至蒙哥马利建立教会与社区工作基础。 | **Became pastor of Dexter Avenue Baptist Church:** Moved to Montgomery and built a base in church and community work. |
| 1955 | 1 | Montgomery | -86.308 | 32.377 | **参与领导蒙哥马利公交抵制**：在 Rosa Parks 被捕后成为集体行动的重要发言人与组织者。 | **Helped lead the Montgomery bus boycott:** Became a prominent spokesperson and organizer after Rosa Parks's arrest. |
| 1957 | 1 | Atlanta | -84.388 | 33.749 | **参与创建南方基督教领袖会议**：以教会网络协调南方非暴力民权行动。 | **Helped found the Southern Christian Leadership Conference:** Coordinated nonviolent civil-rights action through Southern church networks. |
| 1959 | 1 | New Delhi | 77.209 | 28.614 | **访问印度研究甘地非暴力实践**：率代表团会见活动家与政府人士；路线遍及多城，落点取新德里公共节点。 | **Visited India to study Gandhian nonviolence:** Led a delegation meeting activists and officials in several cities; New Delhi is used as the public anchor. |
| 1963 | 1 | Birmingham, Alabama | -86.802 | 33.520 | **参与伯明翰运动**：示威、逮捕和公开信推动全国关注种族隔离。 | **Participated in the Birmingham campaign:** Demonstrations, imprisonment, and his public letter focused national attention on segregation. |
| 1963 | 2 | Washington, D.C. | -77.036 | 38.889 | **在华盛顿大游行演讲**：于林肯纪念堂前发表“我有一个梦想”演讲；游行由多组织共同领导。 | **Spoke at the March on Washington:** Delivered the “I Have a Dream” address at the Lincoln Memorial; the march was jointly led by many organizations. |
| 1964 | 1 | Oslo | 10.733 | 59.913 | **领取诺贝尔和平奖**：在奥斯陆代表民权运动接受奖项。 | **Received the Nobel Peace Prize:** Accepted the award in Oslo on behalf of the civil-rights movement. |
| 1965 | 1 | Selma to Montgomery | -87.017 | 32.407 | **推动塞尔玛投票权运动**：参与最终抵达蒙哥马利的游行；坐标取塞尔玛起点。 | **Advanced the Selma voting-rights campaign:** Joined the successful march to Montgomery; the coordinate uses the Selma starting point. |
| 1968 | 1 | Memphis | -90.049 | 35.135 | **在孟菲斯遇刺**：支援环卫工人罢工期间于 4 月 4 日遇刺。 | **Assassinated in Memphis:** Killed on 4 April while supporting striking sanitation workers. |

**资料与来源元数据 / Sources**

- `king-institute-chronology` — [Chronology](https://kinginstitute.stanford.edu/king-resources/king-encyclopedia/chronology), Martin Luther King, Jr. Research and Education Institute, Stanford University：按日编年及教育、蒙哥马利与早期运动节点；研究所版权，仅引用事实。
- `king-institute-major-events` — [Major King Events Chronology: 1929–1968](https://kinginstitute.stanford.edu/king-resources/major-king-events-chronology-1929-1968), King Institute：伯明翰、华盛顿、塞尔玛、孟菲斯等交叉核验。
- `nobel-king-acceptance` — [Martin Luther King Jr. – Acceptance Speech](https://www.nobelprize.org/prizes/peace/1964/king/acceptance-speech/), Nobel Prize Outreach / Nobel Foundation：1964 年奥斯陆活动的一手演讲记录；演讲文字版权依基金会说明，项目不复制全文。

---

## 12. 纳尔逊·曼德拉 / Nelson Mandela

- **Slug**：`nelson-mandela`
- **中文名**：纳尔逊·曼德拉；别名：纳尔逊·罗利赫拉赫拉·曼德拉、马迪巴
- **English name**: Nelson Mandela; aliases: Nelson Rolihlahla Mandela, Madiba, Dalibunga
- **生卒年 / Years**：`1918–2013`
- **主领域 / Primary field**：政治 / Politics
- **辅助领域 / Secondary fields**：反种族隔离、法律、国家治理、和解、人权 / Anti-apartheid struggle, law, statecraft, reconciliation, human rights
- **摘要 / Summary**：南非反种族隔离运动领袖、政治犯和首位经全国普选产生的黑人总统，参与从白人少数统治向多种族民主制度的谈判转型。 / A South African anti-apartheid leader, political prisoner, and the country's first Black president elected by universal suffrage, central to the negotiated transition from white-minority rule to multiracial democracy.
- **入选理由 / Inclusion reason**：其长期抗争、监禁期间的象征作用和出狱后的谈判领导深刻影响南非与全球人权政治；同时应呈现运动的集体性及其政治策略的变化。 / His long struggle, symbolic role during imprisonment, and post-release negotiating leadership shaped South Africa and global human-rights politics, while the movement's collective nature and changing tactics must remain visible.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1918 | 1 | Mvezo | 28.518 | -31.955 | **出生于姆韦佐**：7 月 18 日生于特兰斯凯的 Mvezo。 | **Born in Mvezo:** Born on 18 July in Mvezo, Transkei. |
| 1939 | 1 | Alice / Fort Hare | 26.856 | -32.787 | **进入福特黑尔大学学院**：开始高等教育，1940 年因学生抗议相关事件离校。 | **Entered University College of Fort Hare:** Began higher education and left in 1940 amid a student protest dispute. |
| 1941 | 1 | Johannesburg | 28.047 | -26.204 | **抵达约翰内斯堡**：逃离包办婚姻后进入城市工作、法律与政治网络。 | **Arrived in Johannesburg:** After fleeing an arranged marriage, entered the city's work, legal, and political networks. |
| 1944 | 1 | Johannesburg | 28.047 | -26.204 | **共同创建非国大青年联盟**：与 Walter Sisulu、Oliver Tambo 等推动更积极的群众政治。 | **Co-founded the ANC Youth League:** Worked with Walter Sisulu, Oliver Tambo, and others to advance more assertive mass politics. |
| 1952 | 1 | Johannesburg | 28.047 | -26.204 | **领导反抗运动并开设律师事务所**：参与“不服从运动”，与 Tambo 建立律师事务所。 | **Led the Defiance Campaign and opened a law practice:** Helped organize civil disobedience and founded a law firm with Tambo. |
| 1955 | 1 | Kliptown | 27.887 | -26.275 | **见证《自由宪章》通过**：在人民大会期间因禁令限制而从外围关注会议。 | **Witnessed adoption of the Freedom Charter:** Followed the Congress of the People under restrictions imposed by banning orders. |
| 1962 | 1 | Howick | 30.230 | -29.488 | **在豪伊克附近被捕**：结束秘密活动和非洲之行后被警方截获；落点取公开纪念地附近。 | **Arrested near Howick:** Captured after underground activity and travel in Africa; the point uses the public capture-site memorial area. |
| 1964 | 1 | Robben Island | 18.369 | -33.806 | **被判终身监禁并囚于罗本岛**：里沃尼亚审判后开始长期监禁；后来还被转移到其他监狱。 | **Sentenced to life and imprisoned on Robben Island:** Began long imprisonment after the Rivonia Trial; he was later transferred elsewhere. |
| 1990 | 1 | Victor Verster / Paarl | 19.025 | -33.734 | **获释**：2 月 11 日从 Victor Verster Prison 走出，随即进入公开谈判政治。 | **Released from prison:** Walked free from Victor Verster Prison on 11 February and entered open negotiations. |
| 1993 | 1 | Oslo | 10.733 | 59.913 | **共同领取诺贝尔和平奖**：与 F. W. de Klerk 因终结种族隔离和奠定民主转型基础共同获奖。 | **Shared the Nobel Peace Prize:** Honored with F. W. de Klerk for ending apartheid and laying foundations for democratic transition. |
| 1994 | 1 | Pretoria | 28.188 | -25.746 | **宣誓就任南非总统**：在首次全国不分种族选举后组成新政府。 | **Inaugurated as president of South Africa:** Formed a new government after the first national nonracial election. |
| 2013 | 1 | Johannesburg | 28.047 | -26.204 | **逝世**：12 月 5 日在约翰内斯堡去世；地图只使用城市中心。 | **Died:** Died in Johannesburg on 5 December; the map uses only a city centroid. |

**资料与来源元数据 / Sources**

- `mandela-foundation-timeline` — [Biography & timeline](https://www.nelsonmandela.org/biography-timeline), Nelson Mandela Foundation Archive and Research team：出生、教育、青年联盟、反抗运动、审判、监禁、获释、总统任期与死亡；由人物基金会维护，页面版权归基金会。
- `mandela-foundation-chronology` — [Timeline](https://www.nelsonmandela.org/timeline-2), Nelson Mandela Foundation：包含对其父亲死亡年份等传记矛盾的档案纠正，体现编年仍在更新。
- `nobel-mandela` — [Nelson Mandela – Biographical](https://www.nobelprize.org/prizes/peace/1993/mandela/biographical/), Nobel Prize Outreach / Nobel Foundation：1993 奖项与当时传记；获奖时期文本存在时代局限，应以基金会新编年补充。

---

## 13. 蕾切尔·卡森 / Rachel Carson

- **Slug**：`rachel-carson`
- **中文名**：蕾切尔·卡森；别名：蕾切尔·路易丝·卡森
- **English name**: Rachel Carson; aliases: Rachel Louise Carson
- **生卒年 / Years**：`1907–1964`
- **主领域 / Primary field**：科学 / Science
- **辅助领域 / Secondary fields**：海洋生物学、环境保护、科学写作、公共政策 / Marine biology, conservation, science writing, public policy
- **摘要 / Summary**：美国海洋生物学家与科学作家，以海洋著作和《寂静的春天》将生态学证据带入大众讨论与农药政策审查。 / An American marine biologist and science writer whose books on the sea and “Silent Spring” brought ecological evidence into public debate and pesticide-policy review.
- **入选理由 / Inclusion reason**：她帮助催生现代环境运动并改变政府评估化学品风险的方式；DDT 禁令及后续制度变化由科学家、公众组织和政府共同推动。 / She helped catalyze the modern environmental movement and changed chemical-risk governance; the DDT ban and later reforms were collective outcomes involving scientists, civil society, and government.

| 年 | 序 | 地点 | 经度 | 纬度 | 中文标题与描述 | English title and description |
|---:|---:|---|---:|---:|---|---|
| 1907 | 1 | Springdale, Pennsylvania | -79.783 | 40.540 | **出生于斯普林代尔**：5 月 27 日生于宾夕法尼亚州阿勒格尼河畔地区。 | **Born in Springdale:** Born on 27 May in the Allegheny River region of Pennsylvania. |
| 1925 | 1 | Pittsburgh | -79.942 | 40.443 | **进入 Pennsylvania College for Women**：最初主修英文，后改学生物学。 | **Entered Pennsylvania College for Women:** Began in English and later changed her major to biology. |
| 1929 | 1 | Woods Hole, Massachusetts | -70.669 | 41.526 | **在海洋生物实验室实习**：首次集中开展海洋研究，并决定继续生物学训练。 | **Studied at the Marine Biological Laboratory:** Gained intensive experience with marine research and continued in biology. |
| 1929 | 2 | Baltimore | -76.621 | 39.329 | **进入约翰斯·霍普金斯大学**：在经济困难中攻读动物学研究生课程。 | **Entered Johns Hopkins University:** Pursued graduate zoology despite financial constraints. |
| 1935 | 1 | Washington, D.C. | -77.036 | 38.907 | **为美国渔业局撰写广播节目**：以兼职身份创作海洋生命系列节目。 | **Wrote radio programs for the Bureau of Fisheries:** Produced a marine-life series in a part-time federal role. |
| 1936 | 1 | Washington, D.C. | -77.036 | 38.907 | **成为初级水生生物学家**：成为渔业局少数女性专业人员之一，并开展切萨皮克湾调查。 | **Appointed junior aquatic biologist:** Became one of the bureau's few women professionals and conducted Chesapeake Bay fieldwork. |
| 1941 | 1 | Washington, D.C. | -77.036 | 38.907 | **出版《海风下》**：以文学叙事向公众呈现海洋生态；落点取其联邦工作城市。 | **Published “Under the Sea-Wind”:** Presented marine ecology to the public through literary narrative; the point uses her federal work city. |
| 1951 | 1 | Silver Spring, Maryland | -77.026 | 38.990 | **出版《我们周围的海洋》**：作品获得广泛读者并使其能够离开政府全职写作；落点取其公开居住城市中心。 | **Published “The Sea Around Us”:** Its success enabled her to leave government and write full-time; the point uses the public city centroid. |
| 1962 | 1 | Boston | -71.058 | 42.360 | **出版《寂静的春天》**：由 Houghton Mifflin 在波士顿出版，引发对农药风险的全国讨论。 | **Published “Silent Spring”:** Issued by Houghton Mifflin in Boston, prompting national debate over pesticide risks. |
| 1963 | 1 | Washington, D.C. | -77.036 | 38.889 | **就农药问题向国会作证**：支持联邦审查并主张审慎、受科学约束的化学品使用。 | **Testified to Congress on pesticides:** Supported federal review and argued for cautious, scientifically governed chemical use. |
| 1964 | 1 | Silver Spring, Maryland | -77.026 | 38.990 | **逝世**：4 月 14 日因癌症去世；不标私人住宅位置。 | **Died:** Died of cancer on 14 April; no private residence is mapped. |

**资料与来源元数据 / Sources**

- `fws-rachel-carson` — [Rachel Carson (1907–1964), Author of the Modern Environmental Movement](https://www.fws.gov/staff-profile/rachel-carson-1907-1964-author-modern-environmental-movement), U.S. Fish and Wildlife Service：出生、大学、Woods Hole、Johns Hopkins、1935–1936 联邦工作、著作、国会作证与影响；美国联邦政府文字通常公版，第三方图片除外。
- `nps-rachel-carson` — [Rachel Carson](https://www.nps.gov/people/rachel-carson.htm), U.S. National Park Service：生卒年、保护运动与遗产交叉核验；联邦机构页面。
- `yale-rachel-carson-papers` — [Rachel Carson Papers](https://beinecke.library.yale.edu/collections/highlights/rachel-carson-papers), Beinecke Rare Book & Manuscript Library, Yale University：手稿档案来源及《寂静的春天》研究材料；档案描述可引用，数字化材料权利逐件核验。

---

## 汇总与录入提醒

- 本文件共 **13 人、126 个事件节点**。
- 存在明显年代或地点争议者：
  - **蔡伦**：出生常作 61 或 63；75、89、97 等单年节点是把年号/阶段压缩成时间轴锚点；核心生平依赖约三百年后编成的《后汉书》。
  - **郑和**：1371 为常用出生年；1433 年死亡地点存在古里、返航海上、回国后等说法；舰队抵达不必然等于郑和本人踏足每个分航点。
  - **莎士比亚**：4 月 23 日生日是由 4 月 26 日受洗反推的传统；婚礼教堂、1585–1592 年经历及许多作品写作年份不能精确确认。
  - **南丁格尔**：1837 年“召唤”来自其后来自述；克里米亚前线移动只取地区锚点。
  - **弗莱明**：青霉素从观察到临床药物和工业量产是多人、多机构过程，UI 不应使用“弗莱明独自发明并制造青霉素”的表述。
  - **洛芙莱斯**：“第一位程序员”取决于对程序和执行机器的定义；建议正文使用“早期通用计算思想与程序描述的重要人物”。
- 活着的人物只有 **蒂姆·伯纳斯-李**：`deathYear: null`，不生成死亡事件；地图轨迹只使用公开城市和机构地点。
- 坐标仅为现代可视化锚点。导入时仍应沿用项目的 last-known-location 规则，且不应把古代行政区中心误解为精确个人位置。
