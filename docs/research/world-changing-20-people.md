# GeoGraph：20 位影响世界文明走向的人物研究档案

> 状态：供数据录入与审校使用；不是可直接导入的 seed 文件。研究日期：2026-08-10。

## 口径与数据约束

- 年份采用天文学整数时间轴约定：公元年份为正数；公元前年份为负数；不存在 `0` 年。这里只在人物生卒年涉及公元前时使用负数。
- 事件只选能相对可靠地落到某一城市或地点的节点。坐标是**现代城市/遗址中心点近似值**，仅用于地球可视化，不能被理解为人物当时所在建筑的精确坐标。
- 古代人物的生卒年、姓名形式和行迹常有争议；此类节点均显式标成“传统纪年”“约”或“有争议”。GeoGraph 不应把它们呈现为同现代档案一样精确。
- 坐标以 OpenStreetMap/Nominatim 可检索的现代地点为基准；仅记录经纬度数值，不复制地图图块或说明文字。使用时应保留 OpenStreetMap attribution，并遵守 [ODbL](https://www.openstreetmap.org/copyright) 与 [Nominatim 使用政策](https://operations.osmfoundation.org/policies/nominatim/)。
- 每人的 `primaryField` 只取一个，便于地图过滤；`secondaryFields` 可多选。中文分类建议保持现有数据风格。
- 下列资料主要用于事实核验。除明确标注为公版或开放许可者外，只抽取事实，不复制页面文字、图片或其他受版权保护资产。

---

## 1. 孔子 / Confucius

- **Slug**：`confucius`
- **生卒年**：传统纪年为公元前 551–479；具体出生年份及大量生平细节来自较晚文献，需标记不确定性
- **主领域**：思想与教育
- **辅助领域**：哲学、伦理、政治思想、教育
- **摘要**：中国古代思想家与教育者，其伦理、礼制和政治思想成为东亚思想传统的重要基础。 / An ancient Chinese thinker and educator whose ideas on ethics, ritual, and government became foundational across East Asia.
- **入选理由**：其思想深刻塑造东亚教育、伦理与政治文化。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| -551 | Zou / Qufu area | 116.991 | 35.595 | 传统出生于鲁国陬邑（邹地）；现代落点取曲阜地区。 |
| -509 | Qufu | 116.991 | 35.595 | 约公元前 509–500 年间与鲁国官职和礼仪事务相关；具体任职年月依晚出传记。 |
| -501 | Wenshang area | 116.497 | 35.727 | 传统传记称任中都宰；证据晚出。 |
| -497 | Puyang area | 115.030 | 35.762 | 约此年离鲁后到卫国；周游路线属于传统重建。 |
| -492 | Shangqiu | 115.656 | 34.414 | 传统周游地点之一。 |
| -489 | Huaiyang | 114.886 | 33.732 | 传统称在陈、蔡之间受困；年份与路线不确定。 |
| -484 | Qufu | 116.991 | 35.595 | 传统纪年称返回鲁国，晚年从事教学与文献整理。 |
| -479 | Qufu | 116.991 | 35.595 | 传统逝世年份与地点。 |

**资料与使用说明**

- [Confucius](https://plato.stanford.edu/entries/confucius/)，Stanford Encyclopedia of Philosophy / Stanford University：生平史料层次与晚出传记的不确定性；SEP 版权，仅作事实引用。
- [Confucius and Confucianism](https://afe.easia.columbia.edu/special/china_1000bce_confucius.htm)，Asia for Educators / Columbia University：教学型背景资料；未见统一开放许可，仅引用，不复用页面资产。

## 2. 释迦牟尼 / Siddhartha Gautama (the Buddha)

- **Slug**：`siddhartha-gautama`
- **生卒年**：传统长年代约公元前 563–483；现代研究常把其生平整体下移至约公元前 480–400，绝对年代不能可靠确定
- **主领域**：宗教
- **辅助领域**：哲学、伦理、僧团制度、教育
- **摘要**：佛教传统的创立者，其关于苦、修行与解脱的教导形成横跨亚洲并走向全球的宗教哲学传统。 / The founder of the Buddhist tradition, whose teachings on suffering, practice, and liberation shaped a major Asian and global religious-philosophical tradition.
- **入选理由**：佛教文明与跨亚洲思想、艺术和制度传统的核心奠基者。

> 下列事件为**传统长年代的排序锚点**，不应作为现代历史学确认到单年的日期。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| -563 | Lumbini | 83.276 | 27.469 | 传统出生地；地点关联获阿育王柱铭支持，年份仍有争议。 |
| -534 | Tilaurakot / Kapilavastu candidate | 83.054 | 27.576 | 传统“出家”地点落在迦毗罗卫候选区；遗址归属有尼泊尔、印度两说。 |
| -528 | Rajgir | 85.417 | 25.017 | 求道、修行及后来弘法的重要传统地点；具体年份不确定。 |
| -528 | Bodh Gaya | 84.991 | 24.696 | 传统成道地。 |
| -528 | Sarnath | 83.021 | 25.381 | 传统首次说法地。 |
| -500 | Shravasti | 82.050 | 27.517 | 多次雨安居与讲法的代表性中段锚点；不能落实到该单一年份。 |
| -483 | Vaishali | 85.130 | 25.986 | 传统最后旅程中的重要地点。 |
| -483 | Kushinagar | 83.888 | 26.740 | 传统入灭地。 |

**资料与使用说明**

- [Life of the Buddha](https://www.metmuseum.org/essays/life-of-the-buddha)，The Metropolitan Museum of Art：区分传统年代与现代较晚年代；网页文字未标开放许可，事实引用，馆藏图像须逐件核权。
- [Mahabodhi Temple Complex at Bodh Gaya](https://whc.unesco.org/en/list/1056/) 与 [Ancient Buddhist Site of Sarnath](https://whc.unesco.org/en/list/927/)，UNESCO World Heritage Centre：地点关联；部分说明标 `CC BY-SA 3.0 IGO`，图像与其他材料仍须逐项核对。
- [Origins and Early History](https://academic.oup.com/book/62805/chapter-abstract/565031782)，Oxford Academic：现代年代争论；出版物版权，仅作事实引用。

## 3. 亚里士多德 / Aristotle

- **Slug**：`aristotle`
- **生卒年**：公元前 384–322（基本稳定）
- **主领域**：思想与教育
- **辅助领域**：哲学、逻辑学、生物学、伦理、政治思想
- **摘要**：古希腊哲学家，以逻辑、自然研究、伦理和政治理论建立了影响欧洲与伊斯兰世界两千余年的知识体系。 / A Greek philosopher whose work in logic, nature, ethics, and politics shaped European and Islamic intellectual traditions for more than two millennia.
- **入选理由**：为逻辑学、自然科学、伦理学和政治学提供了长期占主导地位的概念框架。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| -384 | Stagira | 23.746 | 40.523 | 出生。 |
| -367 | Athens | 23.707 | 37.992 | 约 17 岁赴雅典进入柏拉图学园。 |
| -347 | Assos | 26.336 | 39.489 | 柏拉图去世后离开雅典，在小亚细亚研究与教学。 |
| -345 | Mytilene / Lesbos | 26.555 | 39.107 | 约此年与泰奥弗拉斯托斯开展生物研究。 |
| -343 | Pella | 22.526 | 40.762 | 受腓力二世邀请教授少年亚历山大。 |
| -335 | Athens / Lyceum | 23.750 | 37.969 | 返回雅典并创立吕克昂学园。 |
| -323 | Chalcis | 23.595 | 38.463 | 亚历山大去世后离开雅典。 |
| -322 | Chalcis | 23.595 | 38.463 | 去世。 |

**资料与使用说明**

- [Aristotle](https://plato.stanford.edu/entries/aristotle/) 与 [Aristotle's Biology](https://plato.stanford.edu/entries/aristotle-biology/)，Stanford Encyclopedia of Philosophy / Stanford University：生平路线与莱斯博斯生物研究；SEP 版权，仅作事实引用。

## 4. 亚历山大大帝 / Alexander the Great

- **Slug**：`alexander-the-great`
- **生卒年**：公元前 356–323（年份基本稳定，具体出生日有不确定性）
- **主领域**：政治
- **辅助领域**：军事、帝国治理、国家建构、希腊化文化交流
- **摘要**：马其顿国王，其征服摧毁阿契美尼德帝国并促成横跨东地中海、埃及和西亚的希腊化世界。 / The Macedonian king whose conquests ended the Achaemenid Empire and helped create a Hellenistic world spanning the eastern Mediterranean, Egypt, and western Asia.
- **入选理由**：重塑欧亚西部政治版图，并加速希腊语文化、贸易和知识的跨区域流动。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| -356 | Pella | 22.526 | 40.762 | 出生。 |
| -336 | Aigai / Vergina | 22.313 | 40.481 | 腓力二世遇刺后即位。 |
| -334 | Granicus region | 27.242 | 40.226 | 入侵波斯后的首场主要胜利；落点为河流地区近似点。 |
| -331 | Alexandria | 29.918 | 31.200 | 在埃及建立亚历山大里亚。 |
| -331 | Gaugamela region | 43.250 | 36.361 | 决定性击败大流士三世；战场精确位置仍有讨论。 |
| -330 | Persepolis | 52.891 | 29.935 | 占领并焚毁波斯波利斯宫殿区。 |
| -326 | Hydaspes / Jhelum region | 73.730 | 32.940 | 与波鲁斯交战；战场精确位置不明。 |
| -323 | Babylon | 44.421 | 32.536 | 去世。 |

**资料与使用说明**

- [Alexander the Great Online Virtual Museum](https://alexanderthegreatmuseum.gr/doc/en/)，希腊文化机构虚拟博物馆：路线编年；许可未明确，仅引用事实。
- [Alexander the Great](https://www.britishmuseum.org/collection/term/BIOG86047)，British Museum：356–323 与生涯概述；网页与图片依馆方条款，不假定开放许可。
- [Pergamon and the Hellenistic Kingdoms of the Ancient World](https://resources.metmuseum.org/resources/metpublications/pdf/Pergamon_and_the_Hellenistic_Kingdoms_of_the_Ancient_World.pdf)，The Metropolitan Museum of Art：编年交叉核验；出版物版权依馆方条款。

## 5. 耶稣 / Jesus of Nazareth

- **Slug**：`jesus-of-nazareth`
- **生卒年**：约公元前 6–4 至公元 30 或 33；出生年份、出生地点、传道长度和受难年份均有争议
- **主领域**：宗教
- **辅助领域**：伦理、教育、社会思想
- **摘要**：一世纪犹太宗教教师，基督教信仰的核心人物，其教导及后世诠释深刻影响全球宗教、伦理、艺术与政治。 / A first-century Jewish teacher and the central figure of Christianity, whose teachings and later interpretation profoundly shaped global religion, ethics, art, and politics.
- **入选理由**：基督教传统的核心人物；其历史影响跨越宗教、国家制度与文化生活。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| -5 | Bethlehem | 35.202 | 31.705 | 取约公元前 6–4 年的中间锚点；伯利恒是福音书传统出生地，需标“传统/争议”。 |
| -4 | Nazareth | 35.303 | 32.700 | 成长于拿撒勒的地理关联较稳健；年份仅作早年显示锚点。 |
| 28 | Al-Maghtas / Jordan River | 35.550 | 31.837 | 约公元 27–29 年受施洗约翰洗礼；河两岸候选址存在争议。 |
| 29 | Capernaum | 35.575 | 32.881 | 迦百农是加利利传道的重要传统中心；年份为近似锚点。 |
| 30 | Jerusalem | 35.229 | 31.778 | 约公元 30 或 33 年在耶路撒冷被钉十字架；具体年份与地点细节有争议。 |

**资料与使用说明**

- [Life of Jesus of Nazareth](https://www.metmuseum.org/essays/life-of-jesus-of-nazareth)，The Metropolitan Museum of Art：明确为四福音传统总结，适合标注“宗教传统来源”；网页文字未标开放许可，仅作事实引用。
- [Jesus](https://www.britannica.com/biography/Jesus)，Encyclopaedia Britannica：历史生平与年代讨论；专有版权，仅引用事实。
- [Dating the Death of Jesus](https://www.pure.ed.ac.uk/ws/portalfiles/portal/10489469/Dating_the_Death_of_Jesus_Memory_and_the_Religious_Imagination.pdf)，University of Edinburgh Research Explorer：受难年代不确定性；学术论文版权，合理引用。

## 6. 穆罕默德 / Muhammad

- **Slug**：`muhammad`
- **生卒年**：约 570–632；出生具体年份不确定，632 年逝世较稳固；早期详细生平主要依赖后出的 `sīra` 与圣训
- **主领域**：宗教
- **辅助领域**：政治、法律、共同体建构、军事
- **摘要**：伊斯兰教先知与早期穆斯林共同体领袖，其宗教教导和政治实践奠定伊斯兰文明的重要基础。 / The prophet of Islam and leader of the early Muslim community, whose religious teaching and political practice established core foundations of Islamic civilization.
- **入选理由**：伊斯兰宗教、法律、政治共同体与跨区域文明传统的核心奠基者。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 570 | Mecca | 39.826 | 21.423 | 传统约于此年出生。 |
| 610 | Jabal al-Nour | 39.859 | 21.458 | 传统首次启示地点与年份。 |
| 622 | Medina | 39.611 | 24.467 | 从麦加迁往麦地那；伊斯兰纪元起点，落点取迁徙终点。 |
| 624 | Badr | 38.790 | 23.733 | 白德尔之战。 |
| 625 | Mount Uhud | 39.614 | 24.504 | 伍侯德之战。 |
| 628 | Hudaybiyyah area | 39.625 | 21.437 | 与古莱什缔约；古址精确边界不确定。 |
| 630 | Mecca | 39.826 | 21.423 | 麦加归顺/被征服，克尔白偶像被清除。 |
| 632 | Medina | 39.611 | 24.467 | 去世。 |

**资料与使用说明**

- [The Prophet Muhammad and the Origins of Islam](https://www.metmuseum.org/learn/educators/curriculum-resources/art-of-the-islamic-world/unit-one/the-prophet-muhammad-and-the-origins-of-islam)，The Metropolitan Museum of Art：约 570、610、622 及早期背景；网页未标开放许可，事实引用。
- [Muhammad](https://www.britannica.com/biography/Muhammad)，Encyclopaedia Britannica：传统编年与史料批判；专有版权，仅引用事实。
- [Islamic Art and Geometric Design](https://www.metmuseum.org/-/media/files/learn/for-educators/publications-for-educators/islamic_art_and_geometric_design.pdf)，The Metropolitan Museum of Art：约 570–632、610 启示、622 迁徙的教育材料；馆方出版物版权。

## 7. 伊本·西那 / Avicenna (Ibn Sina)

- **Slug**：`avicenna`
- **生卒年**：通常约 980–1037；传统 370 AH/980 出生年可能不可靠，也可能稍早，1037 较稳定
- **主领域**：医学
- **辅助领域**：哲学、逻辑学、自然科学、政治行政
- **摘要**：波斯医学家与哲学家，其《医典》和哲学体系连接希腊、伊斯兰与拉丁欧洲的知识传统。 / A Persian physician and philosopher whose Canon of Medicine and philosophical system connected Greek, Islamic, and Latin European traditions of knowledge.
- **入选理由**：在数世纪中塑造欧亚医学教育，同时发展影响深远的形而上学与逻辑体系。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 980 | Afshana near Bukhara | 64.528 | 39.682 | 传统出生年份与地点；可能稍早，村址为现代近似点。 |
| 990 | Bukhara | 64.456 | 39.768 | 成长、受教育并进入萨曼王廷行医；年份为早期阶段锚点。 |
| 999 | Old Urgench / Gurganj | 59.150 | 42.337 | 萨曼王朝覆亡后约于 999–1012 年间迁居花剌子模。 |
| 1012 | Gorgan | 54.444 | 36.843 | 西行后约于 1012–1014 年间停留。 |
| 1014 | Rayy | 51.438 | 35.600 | 约于此年为白益王公治病、任职。 |
| 1015 | Hamadan | 48.515 | 34.799 | 约 1015–1024 年间任御医、宰相，亦曾被监禁。 |
| 1024 | Isfahan | 51.668 | 32.655 | 约 1024–1037 年间进入较稳定且高产的创作阶段。 |
| 1037 | Hamadan | 48.515 | 34.799 | 行军途中病逝并葬于此地。 |

**资料与使用说明**

- [Avicenna ii. Biography](https://www.iranicaonline.org/articles/avicenna-ii/)，Encyclopaedia Iranica：详细路线并明确质疑 980 年；版权内容，仅引用事实。
- [Ibn Sina [Avicenna]](https://plato.stanford.edu/entries/ibn-sina/)，Stanford Encyclopedia of Philosophy / Stanford University：路线与年代概括；SEP 版权，仅引用。
- [Hamadan vii. Monuments](https://www.iranicaonline.org/articles/hamadan-vii/)，Encyclopaedia Iranica：墓葬地点；版权内容，仅引用。

## 8. 成吉思汗 / Genghis Khan

- **Slug**：`genghis-khan`
- **生卒年**：出生年争议，主要候选为 1155、1162、1167；蒙古官方传统常用 1162，部分学者倾向 1167；1227 较稳定
- **主领域**：政治
- **辅助领域**：军事、国家建构、帝国治理、贸易网络、法律
- **摘要**：蒙古帝国创建者，通过征服与制度整合重构欧亚政治秩序，同时造成大规模战争破坏与人口损失。 / Founder of the Mongol Empire, whose conquests and institutional integration reordered Eurasia while causing immense warfare, destruction, and loss of life.
- **入选理由**：建立跨大陆帝国，重塑欧亚权力格局、交通与交流网络；叙述必须同时呈现战争后果。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1162 | Dadal / Delüün Boldog candidate area | 111.650 | 49.016 | 采用蒙古官方传统年份作为显示锚点；1155、1167 亦为候选，具体出生点有争议。 |
| 1206 | Onon–Kherlen upper region | 109.300 | 47.600 | 在库里尔台被推举为成吉思汗；坐标仅为区域参考，精确会址不明。 |
| 1209 | Zhongxing / Yinchuan | 106.230 | 38.487 | 西夏臣服。 |
| 1215 | Zhongdu / Beijing | 116.407 | 39.904 | 蒙古军攻占金中都。 |
| 1219 | Otrar | 68.306 | 42.853 | 花剌子模战争开端的重要围城。 |
| 1220 | Samarkand | 66.959 | 39.654 | 攻占河中重镇。 |
| 1221 | Bamiyan | 67.827 | 34.821 | 阿富汗战役节点；细节依赖后世编年史。 |
| 1227 | Yinchuan / Liupan region | 106.230 | 38.487 | 进攻西夏期间去世；死亡具体地点与死因不明。 |

**资料与使用说明**

- [Chinggis Khan](https://afe.easia.columbia.edu/mongols/figures/figures.htm)，Asia for Educators / Columbia University：明确 1162 传统与 1167 学术判断；教育页面未标开放许可。
- [The Legacy of Genghis Khan](https://www.metmuseum.org/exhibitions/listings/2002/genghis-khan)，The Metropolitan Museum of Art：采用 `1167?–1227`；网页文字未标开放许可。
- [Genghis Khan](https://www.britishmuseum.org/collection/term/BIOG10089)，British Museum：采用 `1162–1227`，用于呈现机构间差异；依馆方使用条款。

## 9. 约翰内斯·古腾堡 / Johannes Gutenberg

- **Slug**：`johannes-gutenberg`
- **生卒年**：约 1400–1468；出生年由 1420 年已成年的档案反推，1468 较稳定
- **主领域**：工业与技术
- **辅助领域**：印刷、工程、出版、知识传播
- **摘要**：德国工匠与印刷技术革新者，把可重复使用的金属活字、油墨和压印流程整合为可规模化的欧洲印刷系统。 / A German craftsman and printing innovator who integrated reusable metal type, ink, and presswork into a scalable European printing system.
- **入选理由**：推动书籍与知识的规模化复制，改变教育、宗教、科学和公共传播。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1400 | Mainz | 8.247 | 49.993 | 推定出生地与约略出生年份。 |
| 1434 | Strasbourg | 7.745 | 48.583 | 文献首次确证其在斯特拉斯堡。 |
| 1438 | Strasbourg | 7.745 | 48.583 | 合伙技术/商业项目见于后来的诉讼档案。 |
| 1448 | Mainz | 8.247 | 49.993 | 已返回美因茨并借款建立事业。 |
| 1450 | Mainz | 8.247 | 49.993 | 约于此年与约翰·富斯特融资合作，发展印刷作坊。 |
| 1455 | Mainz | 8.247 | 49.993 | 约 1454–1455 年完成四十二行《古腾堡圣经》，同年富斯特诉讼留下档案。 |
| 1468 | Mainz | 8.247 | 49.993 | 去世。 |

**资料与使用说明**

- [Johannes Gutenberg (c. 1400–1468): The Printer](https://guides.loc.gov/gutenberg/the-printer) 与 [The Gutenberg Bible](https://guides.loc.gov/gutenberg)，Library of Congress：以档案可证事实为核心的时间线；网页未给统一开放许可，事实引用。
- [Biblia Latina / Gutenberg Bible](https://www.loc.gov/item/52002339/)，Library of Congress 馆藏记录：标注“未发现美国版权或其他限制”，但跨国权利仍由使用者判断。

## 10. 克里斯托弗·哥伦布 / Christopher Columbus

- **Slug**：`christopher-columbus`
- **生卒年**：1451–1506；可靠资料支持 1451 年晚夏至秋季出生，早年档案不完整；死亡日期较稳定
- **主领域**：航海与探索
- **辅助领域**：航海、殖民扩张、跨大西洋交流、殖民治理
- **摘要**：热那亚航海者，其受卡斯蒂利亚支持的航行开启持续性的欧洲—美洲接触，也带来殖民征服、强迫劳动、疾病传播和原住民人口灾难。 / A Genoese mariner whose Castilian-backed voyages initiated sustained European-American contact and also colonial conquest, forced labor, disease transmission, and catastrophic Indigenous population loss.
- **入选理由**：其航行成为全球交换与欧洲殖民扩张的关键转折点；影响不等于正面评价。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1451 | Genoa | 8.946 | 44.405 | 出生；具体日期约在 8–10 月之间。 |
| 1492 | Palos de la Frontera | -6.894 | 37.230 | 8 月 3 日从帕洛斯启航。 |
| 1492 | Guanahani candidate / San Salvador | -74.491 | 24.063 | 10 月 12 日登陆巴哈马；具体岛屿身份长期争议。 |
| 1492 | Bariay area, Cuba | -75.835 | 20.704 | 10 月抵达古巴东北岸；具体登陆点为重建。 |
| 1492 | La Navidad candidate, Haiti | -72.204 | 19.757 | “圣玛利亚号”搁浅后建立据点；精确遗址未定。 |
| 1498 | Gulf of Paria | -62.300 | 10.300 | 第三次航行抵达南美大陆沿岸。 |
| 1500 | Santo Domingo | -69.931 | 18.486 | 因殖民统治争议被捕并押回西班牙。 |
| 1506 | Valladolid | -4.725 | 41.652 | 去世。 |

**资料与使用说明**

- [First Sighting of Land](https://postalmuseum.si.edu/exhibition/celebrating-hispanic-heritage-exploration-christopher-columbus/first-sighting-of-land)，Smithsonian National Postal Museum：1492 年启航与登陆；网页权利依具体内容，不假定开放。
- [Christopher Columbus](https://www.floridamuseum.ufl.edu/caribarch/education/columbus/)，Florida Museum of Natural History / University of Florida：出生、四次航行、1500 被捕、1506 去世与争议综述；网页未标开放许可，事实引用。
- [The 1562 Map of America](https://www.loc.gov/collections/discovery-and-exploration/articles-and-essays/the-1562-map-of-america/)，Library of Congress：Guanahani 与航行后果背景；馆藏材料权利逐件核对。

## 11. 列奥纳多·达·芬奇 / Leonardo da Vinci

- **Slug**：`leonardo-da-vinci`
- **生卒年**：1452–1519（稳定）
- **主领域**：艺术
- **辅助领域**：工程、解剖学、自然科学、建筑
- **摘要**：文艺复兴时期的艺术家、工程师与自然研究者，把观察、绘画和机械设计结合在同一套探索实践中。 / A Renaissance artist, engineer, and investigator who joined observation, drawing, and mechanical design in a single exploratory practice.
- **入选理由**：代表艺术、科学与工程思想在近代早期的交汇。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1452 | Vinci | 10.925 | 43.787 | 出生于芬奇附近。 |
| 1469 | Florence | 11.256 | 43.770 | 约在此年前后进入佛罗伦萨韦罗基奥作坊学习。 |
| 1482 | Milan | 9.190 | 45.464 | 约于此年进入米兰宫廷服务。 |
| 1500 | Florence | 11.256 | 43.770 | 返回佛罗伦萨，继续艺术、工程与解剖研究。 |
| 1513 | Rome | 12.496 | 41.903 | 前往罗马，在教廷相关 patronage 下工作。 |
| 1516 | Amboise | 0.983 | 47.414 | 应法国国王弗朗索瓦一世邀请迁居克洛吕塞。 |
| 1519 | Amboise | 0.983 | 47.414 | 在昂布瓦斯去世。 |

**资料与使用说明**

- [Leonardo da Vinci](https://catalogue.museogalileo.it/biography/LeonardoVinci.html)，Museo Galileo：生卒年、领域概述；网站条款，事实引用，不复用资产。
- [The Evolution of Leonardo's Library: Amboise, c. 1517](https://mostre.museogalileo.it/3dstudioleo/amboise/index_eng.html)，Museo Galileo：法国晚年与去世；网站条款，事实引用，不复用资产。
- [Leonardo da Vinci: Engineer and Architect](https://leonardodavinci.stanford.edu/readings/pdf/Galluzzi.pdf)，Stanford-hosted exhibition publication：佛罗伦萨、米兰等活动阶段；出版物版权，仅作事实核验。

## 12. 马丁·路德 / Martin Luther

- **Slug**：`martin-luther`
- **生卒年**：1483–1546（稳定）
- **主领域**：宗教
- **辅助领域**：神学、社会改革、翻译、教育
- **摘要**：德国神学家与宗教改革者，其论战、翻译和组织活动推动了欧洲宗教与政治结构的长期转型。 / A German theologian and reformer whose polemics, translation, and organizing helped transform European religious and political life.
- **入选理由**：宗教改革的关键推动者，并深刻影响德语书面文化和欧洲国家—教会关系。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1483 | Eisleben | 11.548 | 51.528 | 出生。 |
| 1501 | Erfurt | 11.030 | 50.985 | 进入埃尔福特大学。 |
| 1505 | Erfurt | 11.030 | 50.985 | 进入奥古斯丁会修道院。 |
| 1512 | Wittenberg | 12.646 | 51.866 | 获神学博士并在维滕贝格任教。 |
| 1517 | Wittenberg | 12.646 | 51.866 | 公布《九十五条论纲》；“钉在教堂门上”的具体叙事有史学争议。 |
| 1521 | Worms | 8.351 | 49.634 | 出席沃尔姆斯帝国议会并拒绝撤回核心主张。 |
| 1521 | Wartburg / Eisenach | 10.306 | 50.966 | 被秘密送往瓦特堡隐居，开始翻译新约。 |
| 1522 | Wittenberg | 12.646 | 51.866 | 返回维滕贝格。 |
| 1546 | Eisleben | 11.548 | 51.528 | 在故乡去世。 |

**资料与使用说明**

- [Martin Luther's Life: Time line](https://www.luther.de/en/leben/)，Luther.de / Lutherstadt historical project：生平主时间线；网站条款，事实引用。
- [The Imperial Diet of Worms](https://www.luther.de/en/worms.html) 与 [The Wartburg](https://www.luther.de/en/wartburg.html)，Luther.de：1521–1522 行迹；网站条款，事实引用，不复用图文资产。

## 13. 伽利略·伽利莱 / Galileo Galilei

- **Slug**：`galileo-galilei`
- **生卒年**：1564–1642（稳定）
- **主领域**：科学
- **辅助领域**：天文学、物理学、工程、数学
- **摘要**：意大利自然哲学家，通过仪器观测、实验和数学论证推动了近代天文学与力学的发展。 / An Italian natural philosopher whose instrumental observations, experiments, and mathematical arguments advanced modern astronomy and mechanics.
- **入选理由**：把望远镜观测变成改变宇宙观的证据，并推动实验与数学化科学实践。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1564 | Pisa | 10.402 | 43.723 | 出生。 |
| 1581 | Pisa | 10.402 | 43.723 | 进入比萨大学学习。 |
| 1589 | Pisa | 10.402 | 43.723 | 获比萨大学数学教席。 |
| 1592 | Padua | 11.877 | 45.407 | 转任帕多瓦大学数学教授。 |
| 1609 | Padua | 11.877 | 45.407 | 改进望远镜并开始系统天文观测。 |
| 1610 | Florence | 11.256 | 43.770 | 回到托斯卡纳，任大公数学家与哲学家。 |
| 1611 | Rome | 12.496 | 41.903 | 访问罗马，展示观测成果并加入林琴科学院。 |
| 1633 | Rome | 12.496 | 41.903 | 接受宗教裁判所审判。 |
| 1633 | Arcetri | 11.253 | 43.742 | 此后在阿切特里软禁生活。 |
| 1642 | Arcetri | 11.253 | 43.742 | 去世。 |

**资料与使用说明**

- [Life: Chronology of the main events of Galileo's biography](https://www.museogalileo.it/en/galileo/life.html)，Museo Galileo：详细生平时间线；网站条款，事实引用。
- [Galileo Timeline](https://galileo.library.rice.edu/chron/galileo.html)，Rice University Libraries, The Galileo Project：日期交叉核验；教育研究网站条款，事实引用。

## 14. 詹姆斯·瓦特 / James Watt

- **Slug**：`james-watt`
- **生卒年**：1736–1819（稳定；出生日期存在旧历 1 月 19 日/新历 1 月 30 日差异，但年度不受影响）
- **主领域**：工业与技术
- **辅助领域**：机械工程、蒸汽动力、制造业、化学
- **摘要**：苏格兰工程师，通过分离冷凝器等改进显著提高蒸汽机效率，并与马修·博尔顿推动其工业化。 / A Scottish engineer whose improvements, including the separate condenser, greatly increased steam-engine efficiency and enabled industrial deployment with Matthew Boulton.
- **入选理由**：其蒸汽动力改进成为工业革命动力系统扩张的关键环节。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1736 | Greenock | -4.762 | 55.948 | 出生。 |
| 1755 | London | -0.128 | 51.507 | 前往伦敦学习精密仪器制作。 |
| 1757 | Glasgow | -4.252 | 55.864 | 在格拉斯哥大学建立仪器作坊。 |
| 1763 | Glasgow | -4.252 | 55.864 | 修理纽科门蒸汽机模型，促成其效率改进研究。 |
| 1769 | Glasgow | -4.252 | 55.864 | 获分离冷凝器相关专利。 |
| 1774 | Birmingham | -1.890 | 52.486 | 迁往伯明翰，与博尔顿推进蒸汽机商业化。 |
| 1777 | Soho, Birmingham | -1.922 | 52.501 | 博尔顿工厂使用瓦特蒸汽机（“Old Bess”）。 |
| 1819 | Heathfield, Birmingham | -1.940 | 52.503 | 在伯明翰附近去世。 |

**资料与使用说明**

- [James Watt, office equipment and high-street fashion](https://blog.sciencemuseum.org.uk/james-watt-high-street-fashion/)，Science Museum Group：出生、格拉斯哥工作、伯明翰合作与 1777 工厂发动机；网站条款，事实引用，不复用藏品图片。
- [James Watt](https://makingscience.royalsociety.org/people/na8295/james-watt)，Royal Society, Science in the Making：生卒地点与年份；网站条款，事实引用。
- [James Watt (1736–1819)](https://www.inverclyde.gov.uk/community-life-and-leisure/heritage-services/collections/watt-library/local-history/james-watt-1736-1819)，Inverclyde Council Heritage Services：格拉斯哥职业阶段；地方政府网站条款，事实引用。

## 15. 亚当·斯密 / Adam Smith

- **Slug**：`adam-smith`
- **生卒年**：1723–1790（出生日期不详，1723 年 6 月 5 日为受洗日；时间轴采用 1723）
- **主领域**：经济与社会思想
- **辅助领域**：道德哲学、政治经济学、教育、公共管理
- **摘要**：苏格兰道德哲学家与政治经济学家，以《道德情操论》和《国富论》系统讨论商业社会、分工与制度。 / A Scottish moral philosopher and political economist whose works examined commercial society, division of labor, moral judgment, and institutions.
- **入选理由**：为现代经济学与市场社会讨论提供了奠基性框架。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1723 | Kirkcaldy | -3.159 | 56.111 | 出生并在当地受洗；确切生日未知。 |
| 1737 | Glasgow | -4.252 | 55.864 | 进入格拉斯哥大学。 |
| 1740 | Oxford | -1.258 | 51.752 | 赴牛津大学贝利奥尔学院学习。 |
| 1748 | Edinburgh | -3.188 | 55.953 | 开始公开讲授修辞与文学等课程。 |
| 1751 | Glasgow | -4.252 | 55.864 | 出任格拉斯哥大学逻辑学教授，次年转任道德哲学教授。 |
| 1764 | Toulouse | 1.444 | 43.604 | 随巴克卢公爵赴欧洲大陆旅行并居留。 |
| 1766 | Paris | 2.352 | 48.857 | 在巴黎接触法国启蒙思想家与重农主义者。 |
| 1767 | Kirkcaldy | -3.159 | 56.111 | 返回家乡，集中撰写《国富论》。 |
| 1778 | Edinburgh | -3.188 | 55.953 | 出任苏格兰海关专员。 |
| 1790 | Edinburgh | -3.188 | 55.953 | 去世。 |

**资料与使用说明**

- [Adam Smith](https://worldchanging.glasgow.ac.uk/notable-people/?id=126)，University of Glasgow：生卒年、格拉斯哥与牛津教育、教授任期、大陆旅行、柯科迪写作与爱丁堡公职；大学网站条款，事实引用。
- 1723 年仅能作为年度标签；UI 不应暗示 6 月 5 日就是生日。

## 16. 查尔斯·达尔文 / Charles Darwin

- **Slug**：`charles-darwin`
- **生卒年**：1809–1882（稳定）
- **主领域**：科学
- **辅助领域**：生物学、地质学、自然史、科学写作
- **摘要**：英国博物学家，以自然选择解释物种演化，并通过环球考察、标本与通信网络构建证据。 / A British naturalist who explained evolution by natural selection and built evidence through global travel, specimens, and correspondence.
- **入选理由**：进化论深刻改变生命科学以及人类对自身起源的理解。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1809 | Shrewsbury | -2.754 | 52.708 | 出生。 |
| 1825 | Edinburgh | -3.188 | 55.953 | 进入爱丁堡大学学习医学。 |
| 1828 | Cambridge | 0.122 | 52.205 | 进入剑桥大学基督学院。 |
| 1831 | Plymouth | -4.143 | 50.376 | 登上“小猎犬号”；该船 12 月自普利茅斯启航。 |
| 1832 | Salvador da Bahia | -38.501 | -12.973 | 在巴西巴伊亚进行热带自然观察。 |
| 1835 | Galápagos Islands | -90.965 | -0.953 | 考察加拉帕戈斯群岛。坐标为群岛中心近似点。 |
| 1836 | Falmouth | -5.071 | 50.153 | “小猎犬号”航行结束并返回英格兰。 |
| 1837 | London | -0.128 | 51.507 | 在伦敦整理航行材料并发展物种变化思考。 |
| 1842 | Downe, Kent | 0.053 | 51.332 | 搬至唐恩居住与研究。 |
| 1858 | London | -0.128 | 51.507 | 达尔文与华莱士的自然选择论文在林奈学会联合宣读；达尔文本人未出席。 |
| 1859 | London | -0.128 | 51.507 | 《物种起源》出版。地点表示出版公共事件，不代表当日本人迁居。 |
| 1882 | Downe, Kent | 0.053 | 51.332 | 在家中去世。 |

**资料与使用说明**

- [Darwin timeline](https://www.darwinproject.ac.uk/learning-resources/timeline) 与 [Darwin's letters: a timeline](https://www.darwinproject.ac.uk/letters/darwins-letters-timeline.html)，Darwin Correspondence Project, University of Cambridge：教育、航行、唐恩与出版时间线；大学网站条款，事实引用。
- [Timeline of the life of Charles Robert Darwin](https://darwin-online.org.uk/timeline.html) 与 [Voyage chronological register](https://darwin-online.org.uk/converted/published/2009_Rookmaaker_F2044b.html)，The Complete Work of Charles Darwin Online：详细行程交叉核验；学术版资料，按页面条款引用，不整段复制。

## 17. 卡尔·马克思 / Karl Marx

- **Slug**：`karl-marx`
- **生卒年**：1818–1883（稳定）
- **主领域**：经济与社会思想
- **辅助领域**：哲学、政治、新闻、社会运动
- **摘要**：德国哲学家、政治经济学批判者与革命社会主义者，其著作和组织活动深刻影响现代政治运动与国家制度。 / A German philosopher, critic of political economy, and revolutionary socialist whose writings and organizing profoundly influenced modern political movements and states.
- **入选理由**：其资本主义分析、阶级理论和政治纲领成为全球性思想与制度力量。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1818 | Trier | 6.641 | 49.750 | 出生。 |
| 1835 | Bonn | 7.099 | 50.737 | 进入波恩大学学习法律。 |
| 1836 | Berlin | 13.405 | 52.520 | 转入柏林大学。 |
| 1842 | Cologne | 6.960 | 50.937 | 为《莱茵报》撰稿并主持编辑工作。 |
| 1843 | Paris | 2.352 | 48.857 | 迁居巴黎，从事政治经济与革命史研究。 |
| 1845 | Brussels | 4.352 | 50.850 | 被逐出法国后迁往布鲁塞尔。 |
| 1848 | Cologne | 6.960 | 50.937 | 革命时期返回科隆创办《新莱茵报》。 |
| 1849 | London | -0.128 | 51.507 | 被逐后抵达伦敦，并长期定居。 |
| 1864 | London | -0.128 | 51.507 | 参与创建国际工人协会。 |
| 1867 | London | -0.128 | 51.507 | 《资本论》第一卷出版阶段；地点表示其主要居住与研究地。 |
| 1883 | London | -0.128 | 51.507 | 去世。 |

**资料与使用说明**

- [The Life and Work of Karl Marx: Outstanding Dates](https://www.marxists.org/archive/marx/bio/marx/lifeandwork.htm)，Marxists Internet Archive：逐年行迹与组织活动；页面材料可能含不同权利状态，事实引用，不复制译文或图像。
- [Karl Marx Biography (1869)](https://www.marxists.org/archive/marx/bio/marx/eng-1869.htm)，Marxists Internet Archive 收录的同时代传记：巴黎、布鲁塞尔、科隆、伦敦阶段交叉核验；原始文本年代久远，但网页编校与译文按站点条款处理。

## 18. 玛丽·居里 / Marie Curie

- **Slug**：`marie-curie`
- **生卒年**：1867–1934（稳定）
- **主领域**：科学
- **辅助领域**：物理学、化学、医学技术、教育
- **摘要**：波兰出生的法国物理学家与化学家，开创放射性研究，并把相关技术用于医学。 / A Polish-born French physicist and chemist who pioneered radioactivity research and helped apply it to medicine.
- **入选理由**：首位获得诺贝尔奖的女性，也是唯一在两个不同科学门类获得诺贝尔奖的人。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1867 | Warsaw | 21.012 | 52.230 | 出生。 |
| 1891 | Paris | 2.352 | 48.857 | 迁往巴黎，在索邦大学继续学习。 |
| 1894 | Paris | 2.352 | 48.857 | 与皮埃尔·居里相识。 |
| 1898 | Paris | 2.352 | 48.857 | 与皮埃尔公布钋和镭相关研究成果。 |
| 1903 | Paris | 2.352 | 48.857 | 获诺贝尔物理学奖，并取得理学博士学位。 |
| 1906 | Paris | 2.352 | 48.857 | 接替皮埃尔的教职，成为索邦首位女性教授。 |
| 1911 | Stockholm | 18.069 | 59.329 | 获诺贝尔化学奖。 |
| 1914 | Paris | 2.352 | 48.857 | 第一次世界大战期间组织流动 X 光服务。 |
| 1921 | Washington, D.C. | -77.037 | 38.907 | 接受美国募集并由总统哈定赠予的一克镭。 |
| 1929 | Warsaw | 21.012 | 52.230 | 为华沙放射学实验室/研究机构争取镭与支持。 |
| 1934 | Sallanches | 6.632 | 45.936 | 在法国上萨瓦地区去世；诺贝尔资料标作 Sallanches。 |

**资料与使用说明**

- [Marie Curie – Facts](https://www.nobelprize.org/prizes/physics/1903/marie-curie/) 与 [Marie Curie – Biographical](https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/biographical/)，Nobel Prize Outreach / Nobel Foundation：生卒地点、迁居巴黎、研究、教职、战争医学和访美；传记页注明 Nobel Foundation copyright 已到期，但网站其他图片与编排仍按网站条款，不自动视为开放素材。
- [Marie Curie the scientist](https://www.mariecurie.org.uk/about-us/our-history/marie-curie-the-scientist)，Marie Curie charity：早年与巴黎阶段交叉核验；网站条款，事实引用。

## 19. 莫罕达斯·甘地 / Mahatma Gandhi

- **Slug**：`mahatma-gandhi`
- **生卒年**：1869–1948（稳定）
- **主领域**：政治
- **辅助领域**：社会运动、法律、反殖民、宗教思想
- **摘要**：印度反殖民运动领袖，把非暴力不合作和群众政治组织发展为影响全球的政治实践。 / A leader of India's anti-colonial movement who developed nonviolent non-cooperation and mass organizing into globally influential political practice.
- **入选理由**：其非暴力政治方法影响印度独立进程及此后的民权与反殖民运动。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1869 | Porbandar | 69.609 | 21.641 | 出生。 |
| 1888 | London | -0.128 | 51.507 | 前往伦敦学习法律。 |
| 1891 | Bombay (Mumbai) | 72.878 | 19.076 | 取得律师资格后返回印度。 |
| 1893 | Durban | 31.021 | -29.858 | 抵达南非从事法律工作。 |
| 1893 | Pietermaritzburg | 30.393 | -29.601 | 在火车上遭种族歧视并被赶下车；成为其公开政治行动的重要记忆节点。 |
| 1906 | Johannesburg | 28.047 | -26.204 | 组织反对歧视性登记法的非暴力抵抗。 |
| 1915 | Ahmedabad | 72.571 | 23.023 | 返回印度并建立科克拉布道场。 |
| 1917 | Champaran | 84.856 | 26.843 | 领导查姆帕兰真理坚持运动。坐标为当代地区中心近似点。 |
| 1930 | Dandi | 72.814 | 20.886 | 盐税抗议行进抵达丹迪并取盐。 |
| 1931 | London | -0.128 | 51.507 | 出席第二次圆桌会议。 |
| 1942 | Bombay (Mumbai) | 72.878 | 19.076 | “退出印度”运动在孟买启动，随后被捕。 |
| 1946 | Noakhali | 91.100 | 22.950 | 在诺阿卡利地区开展制止族群暴力的和平行动；坐标为地区近似点。 |
| 1948 | New Delhi | 77.209 | 28.614 | 遇刺去世。 |

**资料与使用说明**

- [Chronology of Mahatma Gandhi's Life](https://www.mkgandhi.org/sevagram/mgchronological.php)，GandhiServe / Sevagram Ashram educational archive：生平主时间线；网站条款，事实引用。
- [Gandhi Heritage Portal](https://www.gandhiheritageportal.org/)，Sabarmati Ashram Preservation and Memorial Trust / Government of India supported portal：原著、监禁与地点资料；各数字对象权利可能不同，事实引用，不批量复制文本或影像。
- [Collected Works of Mahatma Gandhi](https://www.gandhiheritageportal.org/the-collected-works-of-mahatma-gandhi)，Gandhi Heritage Portal：第一手著作入口；引用具体内容时需逐卷核对版本和权利说明。

## 20. 艾伦·图灵 / Alan Turing

- **Slug**：`alan-turing`
- **生卒年**：1912–1954（稳定）
- **主领域**：科学
- **辅助领域**：数学、计算机科学、密码分析、人工智能、生物数学
- **摘要**：英国数学家、密码分析家和计算思想先驱，为可计算性、战时密码分析、计算机设计与机器智能奠定关键基础。 / A British mathematician, cryptanalyst, and computing pioneer whose work shaped computability, wartime codebreaking, computer design, and machine intelligence.
- **入选理由**：现代计算理论和人工智能基础的奠基者之一，并对盟军密码分析作出关键贡献。

| 年 | 地点 | 经度 | 纬度 | 保守事件描述 |
|---:|---|---:|---:|---|
| 1912 | Paddington, London | -0.176 | 51.515 | 出生。 |
| 1926 | Sherborne | -2.518 | 50.947 | 进入谢伯恩学校。 |
| 1931 | Cambridge | 0.122 | 52.205 | 进入剑桥大学国王学院。 |
| 1936 | Princeton | -74.668 | 40.357 | 前往普林斯顿大学攻读博士。 |
| 1939 | Bletchley Park | -0.736 | 51.998 | 到政府密码学校战时基地报到，参与破解 Enigma。 |
| 1945 | Teddington | -0.333 | 51.424 | 加入国家物理实验室，提出 ACE 计算机设计。 |
| 1948 | Manchester | -2.242 | 53.480 | 加入曼彻斯特大学计算实验室。 |
| 1950 | Manchester | -2.242 | 53.480 | 发表机器智能论文，提出后来称为“图灵测试”的方案。 |
| 1952 | Manchester | -2.242 | 53.480 | 因同性关系被定罪并遭受强制性激素处置；面板文案应避免把国家迫害弱化为私人事件。 |
| 1954 | Wilmslow | -2.226 | 53.326 | 去世。官方裁定为自杀；有关具体情形仍有讨论，GeoGraph 只陈述官方结论时应注明口径。 |

**资料与使用说明**

- [Alan Turing: brief biography](https://bletchleypark.org.uk/wp-content/uploads/record_attachments/1800.pdf)，Bletchley Park Trust：伦敦出生、剑桥、普林斯顿、布莱切利园和战时工作；PDF/网站版权，事实引用，不复用文字或图片。
- [Alan Turing: The Enigma — chronology](https://www.turing.org.uk/index.html) 与 [Introductory biography](https://www.turing.org.uk/publications/lausannebio.html)，Andrew Hodges（图灵权威传记作者）：完整职业阶段；作者版权，事实引用，不复制文章文字。

---

## 跨人物审校建议

1. **传统年代标签**：释迦牟尼、孔子、耶稣等古代人物必须保留“传统/约/争议”字段；不能仅靠整数年份表达置信度。
2. **出生年与时间轴**：耶稣的传统出生时间位于公元前若干年，需确认系统的无 `0` 年换算；甘地、居里等现代人物可直接用公历年份。
3. **移动动画**：同一年有多个事件时使用 `order`，但不要据此推断真实旅行日期或路线；跨海航行尤其应在一帧内按现有规则完成或瞬移。
4. **敏感叙述**：哥伦布、亚历山大、成吉思汗、马克思、甘地、图灵等条目应以事实呈现殖民、战争、迫害或争议后果，避免英雄化或污名化模板语言。
5. **坐标精度**：建议种子数据保留 3 位小数。古代遗址、地区性事件和群岛节点应在描述中继续注明“近似点”。
6. **授权边界**：这些来源授权的是事实核验，不等于授权人物肖像或页面图片。立绘必须另行生成或使用明确允许的公共领域/开放许可参考资产。
