# GeoGraph：新增 40 位影响世界走向人物研究档案（第一部分：14 人）

> 状态：供数据录入与审校使用；不是可直接导入的 seed 文件。研究日期：2026-08-11。本文件只覆盖第一批 14 人。

## 口径与数据约束

- 年份使用 GeoGraph 的整数时间轴：公元前年份为负数，公元年份为正数，不使用 `0` 年。
- 每位人物均设置一个恰好等于 `birthYear` 的显示锚点。对出生年或出生地有争议者，该锚点只是可视化约定，事件文字必须保留“约”“传统记载”或“不确定”等限定。
- 坐标均为现代城市、遗址或战场候选区的近似中心点，只用于地图动画，不能解释为当事人的精确位置。
- 古代传记依赖后出史料；近现代政治人物也可能存在宣传性叙述。条目优先采用博物馆、国家档案馆、总统图书馆、大学参考项目和专业历史机构资料，并交叉核验。
- 对希特勒的入选仅表示其灾难性世界影响，不构成认同；表述应以侵略战争、独裁统治、纳粹迫害和大屠杀受害者为中心，避免英雄化。
- 对华盛顿、罗斯福、列宁和毛泽东等人物，同时呈现制度影响与奴隶制、战争、镇压或群众运动造成的人命与权利代价，不作单线赞颂。
- 事件结构为 `[year, order, titleZh/titleEn, descriptionZh/descriptionEn, longitude, latitude]`；同年事件用 `order` 保持确定顺序。

---

## 1. 居鲁士大帝 / Cyrus the Great

- **Slug**：`cyrus-the-great`
- **中文名**：居鲁士大帝
- **英文名**：Cyrus the Great
- **别名**：居鲁士二世；Cyrus II；Kūruš II；Cyrus the Elder
- **生卒年**：约公元前 600–530；出生年及出生地不能精确确定，逝世战场也有相互冲突的古代记载
- **主领域**：政治
- **辅助领域**：帝国治理、军事、法律、宗教政策
- **摘要**：阿契美尼德帝国的创建者，通过征服米底、吕底亚与新巴比伦建立跨越西亚的大帝国，并延续、整合多种地方治理传统。 / Founder of the Achaemenid Empire, who conquered Media, Lydia, and Babylonia and integrated diverse local traditions of rule across western Asia.
- **入选理由**：建立了古代最具影响力的跨民族帝国之一，其帝国治理、王权表达与地方宗教政策成为后世重要参照。 / He created one of antiquity's most influential multiethnic empires, leaving durable models of imperial rule, kingship, and accommodation of local institutions.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| -600 | 1 | 约出生于安善地区 / Approximate birth in the Anshan region | 约公元前 600 年出生；具体地点未知，地图取安善常见候选地塔勒马利扬遗址，仅作区域锚点。 / Born around 600 BCE; the exact place is unknown, so Tall-e Malyan, a common candidate for Anshan, is used only as a regional anchor. | 52.405 | 30.012 |
| -559 | 1 | 继承安善王位 / Succeeds as king of Anshan | 约于此年继承父亲的王位；落点取其王朝中心帕萨尔加德。 / He probably succeeded his father around this year; Pasargadae is used as the dynastic-center anchor. | 53.167 | 30.200 |
| -550 | 1 | 击败米底王国 / Defeats the Median kingdom | 击败阿斯提阿格斯并控制埃克巴坦那；具体战斗地点不可确定。 / Defeated Astyages and took Ecbatana; the battle's exact site cannot be fixed. | 48.515 | 34.799 |
| -547 | 1 | 征服吕底亚 / Conquers Lydia | 约公元前 547 年夺取萨迪斯；部分编年采用前 546 年。 / Captured Sardis around 547 BCE; some chronologies use 546 BCE. | 28.040 | 38.488 |
| -539 | 1 | 进入巴比伦 / Enters Babylon | 波斯军队攻取巴比伦，居鲁士以巴比伦王的身份发布统治宣言。 / Persian forces took Babylon, where Cyrus presented himself as king of Babylon and issued a royal declaration. | 44.421 | 32.536 |
| -530 | 1 | 东北战役中去世 / Dies on a northeastern campaign | 古代资料对敌人和战场说法不一；地图取阿姆河下游与咸海之间的极粗略区域点，不应显示为精确战场。 / Ancient sources disagree on the enemy and battlefield; the point is only a very rough lower-Oxus/Aral regional anchor, not a precise site. | 60.500 | 41.000 |

**资料与来源元数据**

- **`iranica-cyrus-iii`** — [CYRUS iii. Cyrus II The Great](https://www.iranicaonline.org/articles/cyrus-iiI/)，Encyclopaedia Iranica：生卒年代、安善继位、米底与巴比伦征服，以及相互矛盾的死亡传统；学术参考项目，页面版权，仅提取事实。
- **`iranica-pasargadae`** — [PASARGADAE](https://www.iranicaonline.org/articles/pasargadae/)，Encyclopaedia Iranica：帕萨尔加德的年代、王都与陵墓关联；页面版权，仅提取事实。
- **`british-museum-cyrus-cylinder`** — [Cyrus Cylinder](https://www.britishmuseum.org/collection/object/W_1880-0617-1941)，British Museum：巴比伦征服后王权文本的实物与馆藏说明；文字与图像遵循馆方条款，不复用资产。

## 2. 阿育王 / Ashoka

- **Slug**：`ashoka`
- **中文名**：阿育王
- **英文名**：Ashoka
- **别名**：阿输迦；Aśoka；Ashoka the Great；Devanampiya Piyadasi
- **生卒年**：约公元前 304–232；出生年来自后世重建，统治年代也常见前 268/269 或前 273 起算等差异
- **主领域**：政治
- **辅助领域**：佛教、帝国治理、法律、铭文学
- **摘要**：孔雀王朝统治者，在征服羯陵伽后以石刻诏令推广法（dhamma）、公共治理和宗教宽容，并支持佛教机构与圣地。 / Mauryan ruler who, after the conquest of Kalinga, used rock and pillar edicts to promote dhamma, public governance, and religious tolerance while supporting Buddhist institutions and sacred sites.
- **入选理由**：将南亚大部置于同一帝国框架，并通过可见的铭文传播政治伦理，显著推动佛教跨区域发展。 / He brought much of South Asia under one imperial framework and used public inscriptions to articulate political ethics, while materially advancing Buddhism's transregional growth.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| -304 | 1 | 传统出生于孔雀王朝核心区 / Traditional birth in the Mauryan heartland | 出生年月与地点均不可靠；为满足时间轴显示，地图以王都华氏城（今巴特那）作传统区域锚点。 / Neither date nor place is secure; Pataliputra (modern Patna), the dynastic capital, is used as a conventional regional anchor. | 85.138 | 25.594 |
| -286 | 1 | 传统任职于乌贾因 / Traditional posting at Ujjain | 后出佛教传记称青年阿育王曾治理乌贾因；年份只作约略锚点。 / Later Buddhist biographies place the young Ashoka in charge of Ujjain; the year is only an approximate anchor. | 75.785 | 23.177 |
| -268 | 1 | 约开始统治 / Approximate accession | 通行现代编年约以公元前 268 年为统治开始；部分传统将继位放得更早。 / A common modern chronology begins his reign around 268 BCE, while other traditions place accession earlier. | 85.138 | 25.594 |
| -261 | 1 | 羯陵伽战争 / Kalinga War | 在羯陵伽征服后，阿育王第十三号大石诏记录其对杀戮与流放的悔意；落点取道利山诏刻区。 / After conquering Kalinga, Major Rock Edict XIII records remorse over killing and deportation; Dhauli's edict area is used as the map anchor. | 85.839 | 20.192 |
| -258 | 1 | 推行石刻诏令 / Issues rock edicts | 约自统治中期开始在帝国多地刊刻法诏；单年与具体起点并不确定，落点取吉尔纳尔大石诏。 / From roughly the middle of his reign, edicts on dhamma were inscribed across the empire; the exact first year is uncertain, and Girnar is used as a representative site. | 70.529 | 21.522 |
| -250 | 1 | 支持桑奇佛教建筑 / Supports Buddhist building at Sanchi | 桑奇大塔的早期核心传统上归于阿育王时期；具体施工年份和个人到访情况不明。 / The early core of the Great Stupa at Sanchi is traditionally assigned to Ashoka's reign; exact construction dates and his personal presence are uncertain. | 77.739 | 23.479 |
| -249 | 1 | 朝礼蓝毗尼 / Pilgrimage to Lumbini | 蓝毗尼阿育王柱铭记录其在即位第二十年前往佛陀出生地并减免当地负担。 / The Lumbini pillar inscription records a royal visit in his twentieth regnal year and fiscal concessions to the Buddha's birthplace. | 83.276 | 27.469 |
| -249 | 2 | 关联鹿野苑柱刻 / Associated pillar at Sarnath | 鹿野苑的阿育王柱和狮柱头体现王权与佛教圣地的结合；具体到访日程不能确认。 / Ashokan pillar remains and the lion capital link imperial patronage with Sarnath; a precise personal itinerary cannot be confirmed. | 83.021 | 25.381 |
| -232 | 1 | 传统卒于华氏城 / Traditional death at Pataliputra | 通常认为约公元前 232 年去世；地点主要来自后出传统。 / Generally dated to about 232 BCE; the place rests mainly on later tradition. | 85.138 | 25.594 |

**资料与来源元数据**

- **`met-mauryan-empire`** — [Mauryan Empire (ca. 323–185 B.C.)](https://www.metmuseum.org/essays/mauryan-empire-ca-323-185-b-c)，The Metropolitan Museum of Art：统治期、诏令与佛教赞助概述；网页版权，仅提取事实。
- **`unesco-lumbini`** — [Lumbini, the Birthplace of the Lord Buddha](https://whc.unesco.org/en/list/666/)，UNESCO World Heritage Centre：阿育王柱及其公元前 249 年朝礼铭文；使用页面事实，图片另行核权。
- **`unesco-sanchi`** — [Buddhist Monuments at Sanchi](https://whc.unesco.org/en/list/524/)，UNESCO World Heritage Centre：桑奇建筑群和阿育王时期核心；使用页面事实。
- **`ashoka-edicts-cscolostate`** — [The Edicts of King Ashoka](https://www.cs.colostate.edu/~malaiya/ashoka.html)，Colorado State University 托管的英译资料：用于核对诏令内容；译文版权状态未统一，仅作事实核验。

## 3. 尤利乌斯·恺撒 / Julius Caesar

- **Slug**：`julius-caesar`
- **中文名**：尤利乌斯·恺撒
- **英文名**：Julius Caesar
- **别名**：盖乌斯·尤利乌斯·恺撒；Gaius Julius Caesar；Caius Julius Caesar
- **生卒年**：公元前 100–44；古代资料对具体生日有 7 月 12 日或 13 日之别
- **主领域**：政治
- **辅助领域**：军事、法律、文学、国家制度
- **摘要**：罗马将领、政治家与作家，征服高卢并在内战中取得最高权力，其独裁统治和遇刺加速了罗马共和国向帝制的转变。 / Roman commander, politician, and author whose conquest of Gaul and victory in civil war brought supreme power, while his dictatorship and assassination accelerated the Republic's transformation into imperial rule.
- **入选理由**：其战争、政治改革、历法与个人统治改变了地中海政治秩序，并为奥古斯都建立元首制创造条件。 / His wars, reforms, calendar, and personal rule reshaped Mediterranean politics and created the conditions for Augustus's principate.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| -100 | 1 | 生于罗马 / Born in Rome | 生于罗马的贵族家庭；具体宅邸无法定位。 / Born into a Roman patrician family; the exact house cannot be located. | 12.496 | 41.902 |
| -81 | 1 | 在小亚细亚服役 / Serves in Asia Minor | 约此时随马库斯·特尔穆斯在亚细亚行省服役，并参与米蒂利尼围城；年份在资料中有小幅差异。 / Around this time he served under Marcus Thermus in Asia and took part in the siege of Mytilene; sources vary slightly on the year. | 26.555 | 39.107 |
| -69 | 1 | 任西班牙行省财务官 / Quaestor in Hispania | 当选财务官后在远西班牙行省任职；落点取主要行政中心科尔多瓦。 / After election as quaestor he served in Further Spain; Córdoba is used as the principal administrative anchor. | -4.780 | 37.888 |
| -58 | 1 | 开始高卢战争 / Begins the Gallic Wars | 在高卢指挥军队并击败赫尔维蒂人；落点取比布拉克特战场候选区。 / Commanded Roman forces in Gaul and defeated the Helvetii; the Bibracte battle area is used as an approximate anchor. | 4.039 | 46.923 |
| -52 | 1 | 阿莱西亚围城 / Siege of Alesia | 击败维钦托利并压制高卢大规模抵抗；战场认定较稳，但范围很大。 / Defeated Vercingetorix and broke the major Gallic revolt; the accepted battlefield covers a broad area. | 4.500 | 47.539 |
| -49 | 1 | 渡过卢比孔河 / Crosses the Rubicon | 率军越过意大利边界，罗马内战全面爆发；古河道的精确位置有争议。 / Led his army across the boundary into Italy, opening civil war; the ancient river's precise course is disputed. | 12.399 | 44.160 |
| -48 | 1 | 法萨卢斯获胜 / Victory at Pharsalus | 在色萨利击败庞培主力；战场点为现代候选区近似值。 / Defeated Pompey's main army in Thessaly; the point is an approximation within the proposed battlefield area. | 22.573 | 39.293 |
| -48 | 2 | 抵达亚历山大里亚 / Arrives in Alexandria | 追踪庞培至埃及并卷入托勒密王朝冲突。 / Followed Pompey to Egypt and became involved in the Ptolemaic dynastic conflict. | 29.918 | 31.200 |
| -46 | 1 | 塔普苏斯战役 / Battle of Thapsus | 在北非击败共和派残余主力；古城与战场范围为近似点。 / Defeated the main remaining republican forces in North Africa; the ancient town and battlefield are represented approximately. | 10.560 | 35.490 |
| -44 | 1 | 在元老院会议地遇刺 / Assassinated at a Senate meeting | 3 月 15 日在庞培剧场建筑群的元老院会议地点遇刺。 / Assassinated on March 15 at the Senate's meeting place in the complex of Pompey's Theatre. | 12.475 | 41.895 |

**资料与来源元数据**

- **`british-museum-caesar`** — [Julius Caesar](https://www.britishmuseum.org/collection/term/BIOG58909)，British Museum：生卒年、高卢征服、跨越卢比孔与遇刺概述；页面版权，仅提取事实。
- **`british-museum-rome-introduction`** — [Introduction to ancient Rome](https://www.britishmuseum.org/exhibitions/nero-man-behind-myth/introduction-to-ancient-rome)，British Museum：共和国危机、恺撒的军事与独裁影响；页面版权，仅提取事实。
- **`perseus-caesar-civil-war`** — [Caesar, Civil War](https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001)，Perseus Digital Library / Tufts University：一手文本的地名与战役顺序；古典文本公版，具体数字化版本依项目条款。

## 4. 奥古斯都 / Augustus

- **Slug**：`augustus`
- **中文名**：奥古斯都
- **英文名**：Augustus
- **别名**：屋大维；Octavian；Gaius Octavius；Gaius Julius Caesar Octavianus；Imperator Caesar Augustus
- **生卒年**：公元前 63–公元 14
- **主领域**：政治
- **辅助领域**：帝国治理、军事、法律、城市建设
- **摘要**：罗马第一位皇帝，在内战中战胜对手后以共和国名义重组权力，建立延续数百年的元首制。 / Rome's first emperor, who emerged from civil war and reorganized monarchical power under republican forms, establishing the principate that endured for centuries.
- **入选理由**：完成罗马从共和国到帝国的制度转型，并重塑军队、行省、税制与城市治理。 / He completed Rome's institutional transition from republic to empire and reshaped the army, provinces, taxation, and urban government.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| -63 | 1 | 生于罗马 / Born in Rome | 生于罗马帕拉蒂尼山附近；具体房屋遗址认定不宜视为绝对确定。 / Born in Rome near the Palatine; identifications of a specific house should not be treated as certain. | 12.486 | 41.889 |
| -44 | 1 | 在阿波罗尼亚获知继承 / Learns of his inheritance at Apollonia | 恺撒遇刺时正在阿波罗尼亚受训，随后获知自己被收为继承人并返回意大利。 / Training at Apollonia when Caesar was assassinated, he learned of his adoption and returned to Italy. | 19.472 | 40.724 |
| -42 | 1 | 腓立比战役 / Battles of Philippi | 与安东尼联合击败布鲁图斯、卡西乌斯阵营。 / Allied with Antony to defeat the forces of Brutus and Cassius. | 24.320 | 41.013 |
| -31 | 1 | 亚克兴海战 / Battle of Actium | 屋大维阵营击败安东尼与克利奥帕特拉的舰队；海战范围以亚克兴海角近似表示。 / Octavian's forces defeated Antony and Cleopatra's fleet; Cape Actium is used as an approximate battle anchor. | 20.770 | 38.940 |
| -30 | 1 | 控制亚历山大里亚 / Takes Alexandria | 安东尼和克利奥帕特拉死后，埃及成为罗马控制下的重要领地。 / After Antony and Cleopatra died, Egypt came under Roman control. | 29.918 | 31.200 |
| -27 | 1 | 获授“奥古斯都”称号 / Receives the title Augustus | 元老院授予“奥古斯都”称号，通常作为元首制正式开始的标志。 / The Senate conferred the title Augustus, conventionally marking the formal beginning of the principate. | 12.486 | 41.893 |
| 14 | 1 | 卒于诺拉 / Dies at Nola | 在意大利诺拉去世，提比略继位。 / Died at Nola in Italy and was succeeded by Tiberius. | 14.526 | 40.926 |

**资料与来源元数据**

- **`british-museum-augustus`** — [Augustus (Octavian)](https://www.britishmuseum.org/collection/term/BIOG57074)，British Museum：生卒年、姓名变化、内战与第一位皇帝身份；页面版权，仅提取事实。
- **`met-roman-empire`** — [The Roman Empire (27 B.C.–393 A.D.)](https://www.metmuseum.org/essays/the-roman-empire-27-b-c-393-a-d)，The Metropolitan Museum of Art：前 27 年称号和元首制背景；页面版权，仅提取事实。
- **`res-gestae-lacuscurtius`** — [Res Gestae Divi Augusti](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html)，University of Chicago LacusCurtius：奥古斯都自述的一手文本；古典文本公版，译本与网站编排依页面说明。

## 5. 君士坦丁大帝 / Constantine I

- **Slug**：`constantine-i`
- **中文名**：君士坦丁大帝
- **英文名**：Constantine I
- **别名**：君士坦丁一世；Constantine the Great；Flavius Valerius Constantinus
- **生卒年**：约 272–337；出生年份在 270 至 280 年间有不同重建，项目采用常见的 272 年
- **主领域**：政治
- **辅助领域**：宗教政策、军事、法律、城市建设
- **摘要**：罗马皇帝，在内战后重新统一帝国，给予基督教合法地位并建立君士坦丁堡，使帝国权力中心长期东移。 / Roman emperor who reunified the empire after civil wars, granted Christianity legal standing, and founded Constantinople, shifting the imperial center eastward for centuries.
- **入选理由**：其宗教政策和新都建设改变了基督教、罗马帝国及后来的拜占庭世界。 / His religious settlement and new capital transformed Christianity, the Roman Empire, and the later Byzantine world.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 272 | 1 | 约生于纳伊苏斯 / Approximate birth at Naissus | 通常取 272 年，古代资料无法确定准确年份；地点为今尼什。 / Conventionally dated to 272, though ancient evidence does not fix the exact year; Naissus is modern Niš. | 21.896 | 43.321 |
| 306 | 1 | 在约克被拥立 / Proclaimed emperor at York | 父亲君士坦提乌斯一世去世后，军队在埃博拉库姆拥立他为皇帝。 / After Constantius I died, troops acclaimed him emperor at Eboracum. | -1.082 | 53.958 |
| 312 | 1 | 米尔维安桥战役 / Battle of the Milvian Bridge | 在罗马城外击败马克森提乌斯；后世基督教叙事将此役与十字异象相连，细节存在史源问题。 / Defeated Maxentius outside Rome; later Christian narratives link the battle to a vision of the cross, whose details pose source-critical problems. | 12.467 | 41.936 |
| 313 | 1 | 米兰宗教协议 / Religious settlement at Milan | 与李锡尼就宗教宽容达成协议，后称“米兰敕令”；严格说是皇帝间协议及随后发布的诏书。 / Reached an agreement with Licinius on religious toleration, later called the Edict of Milan; more precisely it was an imperial settlement followed by rescripts. | 9.190 | 45.464 |
| 324 | 1 | 克里索波利斯获胜 / Victory at Chrysopolis | 在今于斯屈达尔附近击败李锡尼，成为罗马帝国唯一统治者。 / Defeated Licinius near modern Üsküdar and became sole ruler of the Roman Empire. | 29.015 | 41.025 |
| 325 | 1 | 召集尼西亚会议 / Convenes the Council of Nicaea | 在尼西亚召集主教会议处理教义与教会统一问题。 / Convened bishops at Nicaea to address doctrine and church unity. | 29.720 | 40.429 |
| 330 | 1 | 君士坦丁堡正式启用 / Dedicates Constantinople | 将拜占庭扩建并以君士坦丁堡为新帝国首都。 / Expanded Byzantium and dedicated Constantinople as a new imperial capital. | 28.978 | 41.008 |
| 337 | 1 | 卒于尼科米底亚附近 / Dies near Nicomedia | 在尼科米底亚附近去世，并在临终前接受洗礼；精确地点通常无法落实。 / Died near Nicomedia after receiving baptism near the end of his life; the exact site is not securely located. | 29.920 | 40.765 |

**资料与来源元数据**

- **`met-constantine-head`** — [Marble portrait head of the Emperor Constantine I](https://www.metmuseum.org/art/collection/search/252884)，The Metropolitan Museum of Art：统一帝国、基督教政策与建立新都；馆藏说明版权，事实引用。
- **`met-byzantium`** — [Byzantium (ca. 330–1453)](https://www.metmuseum.org/essays/byzantium-ca-330-1453)，The Metropolitan Museum of Art：330 年迁都及君士坦丁堡影响；网页版权，仅提取事实。
- **`york-museums-constantine`** — [Constantius Spotlight Exhibition](https://www.yorkmuseumstrust.org.uk/news-media/latest-news/constantius-spotlight-exhibition-featuring-beaurains-hoard-to-open-at-yorkshire-museum/)，York Museums Trust：306 年君士坦丁在约克被拥立的地方史与馆藏背景；页面版权，仅提取事实。

## 6. 苏莱曼一世 / Suleiman the Magnificent

- **Slug**：`suleiman-the-magnificent`
- **中文名**：苏莱曼一世
- **英文名**：Suleiman the Magnificent
- **别名**：苏莱曼大帝；立法者苏莱曼；Süleyman I；Suleiman I；Kanuni Sultan Süleyman；Suleiman the Lawgiver
- **生卒年**：1494–1566；部分资料采用 1494/95，项目以 1494 作为显示锚点
- **主领域**：政治
- **辅助领域**：法律、军事、帝国治理、艺术赞助
- **摘要**：奥斯曼帝国苏丹，在其长期统治中扩张巴尔干、地中海和西亚领土，整合行政法律并大力赞助建筑、书法与宫廷艺术。 / Ottoman sultan whose long reign expanded imperial power in the Balkans, Mediterranean, and western Asia while consolidating administrative law and sponsoring architecture, calligraphy, and court arts.
- **入选理由**：其统治代表奥斯曼帝国政治和文化影响的高峰，深刻改变欧洲、西亚与地中海力量格局。 / His reign marked a peak of Ottoman political and cultural influence and reshaped the balance of power across Europe, western Asia, and the Mediterranean.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1494 | 1 | 约生于特拉布宗 / Approximate birth at Trabzon | 通常记为 1494 年或 1494/95 年生于特拉布宗。 / Usually dated to 1494 or 1494/95 at Trabzon. | 39.717 | 41.001 |
| 1520 | 1 | 在伊斯坦布尔继位 / Accedes at Istanbul | 塞利姆一世去世后继承苏丹位，开启延续至 1566 年的统治。 / Succeeded Selim I and began a reign lasting until 1566. | 28.978 | 41.008 |
| 1521 | 1 | 攻取贝尔格莱德 / Captures Belgrade | 攻克多瑙河战略要塞贝尔格莱德。 / Captured the strategic Danubian fortress of Belgrade. | 20.449 | 44.787 |
| 1522 | 1 | 征服罗得岛 / Conquers Rhodes | 经过长期围城迫使医院骑士团撤离罗得岛。 / After a prolonged siege, forced the Knights Hospitaller to evacuate Rhodes. | 28.227 | 36.435 |
| 1526 | 1 | 莫哈奇战役 / Battle of Mohács | 奥斯曼军队击败匈牙利王军；战场落点为纪念园附近近似区域。 / Ottoman forces defeated the Hungarian royal army; the point approximates the battlefield near the memorial park. | 18.680 | 45.990 |
| 1529 | 1 | 第一次围攻维也纳 / First siege of Vienna | 奥斯曼军队围攻维也纳但撤退，标志中欧扩张的重要边界。 / Ottoman forces besieged Vienna but withdrew, marking a major limit in the push into central Europe. | 16.373 | 48.208 |
| 1534 | 1 | 进入巴格达 / Enters Baghdad | 在对萨法维王朝战争中占领巴格达。 / Took Baghdad during war with the Safavid dynasty. | 44.366 | 33.315 |
| 1555 | 1 | 阿马西亚和约 / Peace of Amasya | 与萨法维王朝达成和约，暂时确定两大帝国边界与势力范围。 / Concluded peace with the Safavids, temporarily defining the two empires' frontiers and spheres. | 35.834 | 40.650 |
| 1566 | 1 | 围攻锡盖特堡期间去世 / Dies during the siege of Szigetvár | 在最后一次匈牙利战役中去世；死讯一度对军队保密。 / Died during his final Hungarian campaign; his death was temporarily concealed from the army. | 17.805 | 46.048 |

**资料与来源元数据**

- **`british-museum-suleiman`** — [Suleyman I (the Magnificent)](https://www.britishmuseum.org/collection/term/BIOG14584)，British Museum：1494/95–1566、生涯概述、艺术赞助和最后战役；页面版权，仅提取事实。
- **`loc-ottoman-reference`** — [Ottoman Empire at a Glance](https://guides.loc.gov/ottoman-turkish/reference)，Library of Congress：统治期、帝国版图与制度影响概述；美国联邦机构页面资料，按页面权利说明使用。
- **`met-interwoven-globe`** — [Interwoven Globe chronology](https://www.metmuseum.org/exhibitions/listings/2013/interwoven-globe)，The Metropolitan Museum of Art：1522 罗得岛、1534 巴格达与贸易时间线；网页版权，仅提取事实。
- **`loc-iraq-legal-history`** — [Iraq: Legal History and Traditions](https://tile.loc.gov/storage-services/service/ll/llglrd/2018299338/2018299338.pdf)，Law Library of Congress：苏莱曼法律编纂与行政改革；美国政府研究报告，按文件权利说明使用。

## 7. 乔治·华盛顿 / George Washington

- **Slug**：`george-washington`
- **中文名**：乔治·华盛顿
- **英文名**：George Washington
- **别名**：华盛顿；General Washington；President Washington
- **生卒年**：1732–1799
- **主领域**：政治
- **辅助领域**：军事、国家建构、农业、测量
- **摘要**：大陆军总司令、美国制宪会议主席和首任总统，为新共和国确立文官统帅、总统任期与和平交接等先例；同时也是拥有并役使奴隶的种植园主。 / Commander of the Continental Army, president of the Constitutional Convention, and first U.S. president, who established precedents for civilian command, presidential tenure, and peaceful transfer while also owning and exploiting enslaved people.
- **入选理由**：其军事与政治领导直接促成美国独立和联邦国家形成，所立总统制度先例影响全球共和国实践；其奴隶制遗产也必须纳入呈现。 / His military and political leadership was central to U.S. independence and federal state formation, and his presidential precedents influenced republican practice worldwide; his slaveholding legacy must remain visible.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1732 | 1 | 生于波普斯溪 / Born at Popes Creek | 生于弗吉尼亚殖民地波普斯溪种植园。 / Born at the Popes Creek plantation in colonial Virginia. | -76.930 | 38.193 |
| 1753 | 1 | 前往勒伯夫堡执行使命 / Mission to Fort Le Boeuf | 代表弗吉尼亚总督向法国军方传递撤离俄亥俄地区的要求；路线很长，地图取终点。 / Carried Virginia's demand that French forces leave the Ohio Country; the endpoint represents a much longer route. | -79.983 | 41.626 |
| 1754 | 1 | 必要堡战败 / Defeat at Fort Necessity | 在法印冲突早期于必要堡投降，此事加剧英法北美战争。 / Surrendered at Fort Necessity early in the imperial conflict, helping widen Anglo-French war in North America. | -79.589 | 39.814 |
| 1775 | 1 | 出任大陆军总司令 / Appointed commander in chief | 在费城被第二届大陆会议任命为大陆军总司令。 / Appointed commander in chief of the Continental Army by the Second Continental Congress in Philadelphia. | -75.150 | 39.949 |
| 1776 | 1 | 特伦顿战役 / Battle of Trenton | 渡过特拉华河后在特伦顿取胜，恢复革命军士气。 / Won at Trenton after crossing the Delaware, restoring Continental morale. | -74.769 | 40.217 |
| 1777 | 1 | 福吉谷冬营 / Winter at Valley Forge | 大陆军在福吉谷度过艰难冬季并进行训练重组。 / The Continental Army endured a severe winter and reorganized its training at Valley Forge. | -75.440 | 40.101 |
| 1781 | 1 | 约克镇胜利 / Victory at Yorktown | 美法联军迫使康沃利斯投降，基本结束北美主要战事。 / American and French forces compelled Cornwallis to surrender, effectively ending major fighting in North America. | -76.509 | 37.239 |
| 1787 | 1 | 主持制宪会议 / Presides over the Constitutional Convention | 在费城主持制宪会议，会议制定新的联邦宪法。 / Presided over the Philadelphia convention that drafted the new federal Constitution. | -75.150 | 39.949 |
| 1789 | 1 | 就任首任总统 / Inaugurated as first president | 在纽约联邦厅宣誓就任美国首任总统。 / Took the oath as the first U.S. president at Federal Hall in New York. | -74.010 | 40.707 |
| 1797 | 1 | 返回弗农山庄 / Returns to Mount Vernon | 第二任期结束后主动离任并回到种植园。 / Voluntarily left office after two terms and returned to his plantation. | -77.086 | 38.708 |
| 1799 | 1 | 卒于弗农山庄 / Dies at Mount Vernon | 在弗农山庄去世；庄园的运作依赖被奴役者的劳动。 / Died at Mount Vernon, an estate whose operation depended on enslaved labor. | -77.086 | 38.708 |

**资料与来源元数据**

- **`mount-vernon-early-life`** — [George Washington's Early Life](https://www.mountvernon.org/education/secondary-sources/george-washingtons-leadership-and-legacy/george-washingtons-early-life)，George Washington's Mount Vernon：出生与早期行程时间线；页面版权，仅提取事实。
- **`mount-vernon-revolution-timeline`** — [General Washington in the Revolution](https://www.mountvernon.org/george-washington/the-revolutionary-war/timeline)，George Washington Presidential Library：1775–1781 革命战争行程；页面版权，仅提取事实。
- **`loc-washington-papers`** — [George Washington Papers](https://www.loc.gov/collections/george-washington-papers/about-this-collection/)，Library of Congress：原始书信、日记及公共生涯档案；大量原件公版，元数据依 LOC 权利说明。
- **`mount-vernon-slavery`** — [Slavery at Mount Vernon](https://www.mountvernon.org/george-washington/slavery)，George Washington's Mount Vernon：奴隶制及被奴役群体的制度背景；页面版权，仅提取事实。

## 8. 西蒙·玻利瓦尔 / Simón Bolívar

- **Slug**：`simon-bolivar`
- **中文名**：西蒙·玻利瓦尔
- **英文名**：Simón Bolívar
- **别名**：玻利瓦尔；Simón José Antonio de la Santísima Trinidad Bolívar y Palacios；El Libertador；The Liberator
- **生卒年**：1783–1830
- **主领域**：政治
- **辅助领域**：军事、国家建构、反殖民运动、政治思想
- **摘要**：委内瑞拉独立领袖和军事统帅，参与建立大哥伦比亚并推动今委内瑞拉、哥伦比亚、厄瓜多尔、秘鲁与玻利维亚的脱离西班牙统治。 / Venezuelan independence leader and commander who helped create Gran Colombia and drove emancipation from Spanish rule across present-day Venezuela, Colombia, Ecuador, Peru, and Bolivia.
- **入选理由**：其跨安第斯军事与政治计划重绘南美地图，并持续影响拉丁美洲的共和主义、统一理想和强人政治争论。 / His trans-Andean military and political project redrew South America and continues to shape debates over republicanism, unity, and personal rule in Latin America.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1783 | 1 | 生于加拉加斯 / Born in Caracas | 生于加拉加斯一个富裕克里奥尔家庭。 / Born into a wealthy Creole family in Caracas. | -66.903 | 10.480 |
| 1805 | 1 | 在罗马立誓 / Oath in Rome | 后来传记称他在蒙特萨克罗立誓致力于解放美洲；措辞来自后出回忆，应标记为传统叙事。 / Later accounts place his oath to liberate Spanish America at Monte Sacro; its wording comes from later recollection and should be marked as traditional. | 12.520 | 41.940 |
| 1811 | 1 | 参与委内瑞拉独立 / Participates in Venezuelan independence | 在加拉加斯支持第一共和国和脱离西班牙统治。 / Supported the First Republic and independence from Spain in Caracas. | -66.903 | 10.480 |
| 1812 | 1 | 发表《卡塔赫纳宣言》 / Issues the Cartagena Manifesto | 第一共和国失败后在新格拉纳达分析失败原因并提出继续战争。 / After the First Republic collapsed, analyzed its failure in New Granada and argued for continued war. | -75.479 | 10.391 |
| 1815 | 1 | 写作《牙买加来信》 / Writes the Jamaica Letter | 流亡金斯敦期间阐述西属美洲独立与政治前景。 / While exiled in Kingston, set out a vision of Spanish American independence and political futures. | -76.793 | 17.971 |
| 1816 | 1 | 从海地组织远征 / Organizes an expedition from Haiti | 在海地总统佩蒂翁支持下从莱凯筹备返回委内瑞拉；援助与废奴承诺相关。 / With Haitian president Pétion's support, prepared an expedition from Les Cayes; the aid was tied to a commitment to emancipation. | -73.750 | 18.200 |
| 1819 | 1 | 安戈斯图拉会议 / Congress of Angostura | 在安戈斯图拉提出国家组织方案；同年发动跨安第斯战役。 / Presented a plan of government at Angostura and launched the trans-Andean campaign that year. | -63.551 | 8.130 |
| 1819 | 2 | 博亚卡战役 / Battle of Boyacá | 在博亚卡取得决定性胜利，打开通往波哥大的道路。 / Won a decisive victory at Boyacá, opening the route to Bogotá. | -73.431 | 5.453 |
| 1821 | 1 | 卡拉沃沃战役 / Battle of Carabobo | 胜利巩固委内瑞拉大部的独立。 / Victory consolidated independence across most of Venezuela. | -68.165 | 10.011 |
| 1824 | 1 | 在利马领导秘鲁战争 / Leads the Peruvian campaign from Lima | 在秘鲁担任最高权力并组织战役；阿亚库乔的现场指挥者是苏克雷，不能归为玻利瓦尔亲临。 / Exercised supreme authority in Peru and organized the campaign; Sucre, not Bolívar, commanded in person at Ayacucho. | -77.043 | -12.046 |
| 1830 | 1 | 卒于圣玛尔塔附近 / Dies near Santa Marta | 在离开政治权力后于圣佩德罗·亚历杭德里诺庄园去世。 / Died at the Quinta de San Pedro Alejandrino after relinquishing political power. | -74.167 | 11.240 |

**资料与来源元数据**

- **`loc-bolivar-biography`** — [Simón Bolívar (el libertador): patriot, warrior, statesman](https://www.loc.gov/item/21006434/)，Library of Congress：1921 年公版传记及详细行程，用于编年交叉核验；馆藏书已标公版，可使用，仍需批判其时代性叙述。
- **`loc-latin-america`** — [The South American Wars of Independence](https://www.loc.gov/item/2021758380/)，Library of Congress 馆藏研究材料：牙买加、安戈斯图拉与大哥伦比亚背景；按具体数字化图书权利说明使用。
- **`banrepcultural-bolivar`** — [Simón Bolívar](https://enciclopedia.banrepcultural.org/index.php/Sim%C3%B3n_Bol%C3%ADvar)，Banco de la República de Colombia / Banrepcultural：西班牙语生平与南美行程交叉核验；页面版权，仅提取事实。

## 9. 亚伯拉罕·林肯 / Abraham Lincoln

- **Slug**：`abraham-lincoln`
- **中文名**：亚伯拉罕·林肯
- **英文名**：Abraham Lincoln
- **别名**：林肯；Honest Abe；The Great Emancipator
- **生卒年**：1809–1865
- **主领域**：政治
- **辅助领域**：法律、国家建构、战争领导、废奴
- **摘要**：美国第十六任总统，在内战中维护联邦，推动《解放宣言》和废除奴隶制的宪法进程，并在胜利前夕遭刺杀。 / Sixteenth U.S. president, who preserved the Union through civil war, advanced emancipation and the constitutional abolition of slavery, and was assassinated near the war's end.
- **入选理由**：其领导重塑了美国联邦、自由与公民身份的法律含义，并对全球废奴和民主话语产生长期影响。 / His leadership redefined the American Union and the legal meanings of freedom and citizenship, with enduring influence on abolition and democratic discourse worldwide.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1809 | 1 | 生于肯塔基州沉泉农场 / Born at Sinking Spring Farm, Kentucky | 2 月 12 日生于今霍金维尔附近。 / Born on February 12 near present-day Hodgenville. | -85.738 | 37.531 |
| 1816 | 1 | 全家迁往印第安纳 / Family moves to Indiana | 童年随家人迁居今金特里维尔附近。 / Moved with his family near present-day Gentryville during childhood. | -86.996 | 38.114 |
| 1831 | 1 | 定居新塞勒姆 / Settles at New Salem | 离开父母后在伊利诺伊新塞勒姆工作并开始公共生涯。 / Settled at New Salem, Illinois, after leaving his parents and began his public career. | -89.841 | 40.013 |
| 1837 | 1 | 迁居斯普林菲尔德 / Moves to Springfield | 取得律师资格后迁往斯普林菲尔德执业。 / Moved to Springfield to practice law after qualifying as an attorney. | -89.650 | 39.801 |
| 1858 | 1 | 发表“分裂之家”演说 / Delivers the House Divided speech | 在斯普林菲尔德州议会大厦发表演说，并在同年参与与道格拉斯的系列辩论。 / Delivered the speech at the statehouse in Springfield and joined the series of debates with Douglas that year. | -89.648 | 39.801 |
| 1861 | 1 | 就任总统 / Inaugurated president | 从斯普林菲尔德前往华盛顿并于 3 月 4 日就任；数周后内战爆发。 / Traveled from Springfield to Washington and was inaugurated on March 4; civil war began weeks later. | -77.036 | 38.897 |
| 1862 | 1 | 发布初步《解放宣言》 / Issues the preliminary Emancipation Proclamation | 9 月 22 日在华盛顿宣布自次年起解放叛乱州被奴役者的战争措施。 / Announced on September 22 that enslaved people in areas in rebellion would be freed as a war measure the following year. | -77.036 | 38.897 |
| 1863 | 1 | 葛底斯堡演说 / Gettysburg Address | 在军人国家公墓落成典礼上重新阐释联邦、平等与民主战争目标。 / Reframed the Union war around equality and democratic government at the cemetery dedication. | -77.231 | 39.820 |
| 1865 | 1 | 在福特剧院遇刺 / Assassinated at Ford's Theatre | 4 月 14 日中枪，次日在街对面的彼得森公寓去世。 / Shot on April 14 and died the next morning at the Petersen House across the street. | -77.025 | 38.897 |

**资料与来源元数据**

- **`nps-lincoln-chronology`** — [Lincoln Chronology](https://www.nps.gov/liho/learn/historyculture/lincolnchronology.htm)，U.S. National Park Service：出生、迁居、演说、总统任期与遇刺的逐年时间线；美国政府页面，按 NPS 权利说明使用。
- **`nps-lincoln-biography`** — [Abraham Lincoln](https://www.nps.gov/people/abraham-lincoln.htm)，U.S. National Park Service：生卒地点、律师生涯、总统身份与遇刺；美国政府页面，第三方图片另行核权。
- **`loc-lincoln-papers`** — [Abraham Lincoln Papers](https://www.loc.gov/collections/abraham-lincoln-papers/about-this-collection/)，Library of Congress：演说、书信与总统文件原始资料；多数原件公版，具体数字对象依 LOC 权利说明。

## 10. 富兰克林·德拉诺·罗斯福 / Franklin D. Roosevelt

- **Slug**：`franklin-d-roosevelt`
- **中文名**：富兰克林·德拉诺·罗斯福
- **英文名**：Franklin D. Roosevelt
- **别名**：富兰克林·罗斯福；FDR；Franklin Delano Roosevelt
- **生卒年**：1882–1945
- **主领域**：政治
- **辅助领域**：经济政策、战争领导、外交、社会保障
- **摘要**：美国第三十二任总统，以新政扩大联邦政府应对经济危机的能力，并在第二次世界大战大部分时期领导美国及盟国合作；其政府也实施了日裔美国人强制迁移与拘禁。 / Thirty-second U.S. president, who expanded federal capacity through the New Deal and led the United States through most of World War II and Allied cooperation; his administration also forcibly removed and incarcerated Japanese Americans.
- **入选理由**：其政策重塑现代福利国家、宏观经济治理、美国全球角色与战后国际组织，同时留下严重的公民权侵害记录。 / His policies reshaped the modern welfare state, macroeconomic governance, the U.S. global role, and postwar institutions, while also leaving a grave civil-liberties violation.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1882 | 1 | 生于海德公园 / Born at Hyde Park | 1 月 30 日生于纽约州海德公园的斯普林伍德庄园。 / Born on January 30 at Springwood in Hyde Park, New York. | -73.935 | 41.768 |
| 1900 | 1 | 进入哈佛大学 / Enters Harvard | 在马萨诸塞州剑桥学习历史并参与校刊活动。 / Studied history and worked on the student newspaper in Cambridge, Massachusetts. | -71.117 | 42.374 |
| 1910 | 1 | 当选纽约州参议员 / Elected to the New York State Senate | 从传统上支持共和党的选区当选，进入州政治；落点取奥尔巴尼州议会。 / Won election from a traditionally Republican district and entered state politics; the state capitol in Albany is used as the anchor. | -73.757 | 42.652 |
| 1913 | 1 | 出任海军部助理部长 / Becomes Assistant Secretary of the Navy | 在威尔逊政府中任职至 1920 年。 / Served in the Wilson administration until 1920. | -77.036 | 38.897 |
| 1921 | 1 | 在坎波贝洛患病 / Falls ill at Campobello | 度假期间患上导致永久下肢瘫痪的疾病，当时诊断为脊髓灰质炎；现代医学研究对病因提出过其他可能。 / Became ill while vacationing and was left permanently paralyzed in the legs; diagnosed then as polio, though later medical analyses have proposed alternatives. | -66.948 | 44.886 |
| 1928 | 1 | 当选纽约州州长 / Elected governor of New York | 在奥尔巴尼领导州政府，其救济政策成为后来新政的经验基础之一。 / Led New York's government from Albany, where relief experiments helped inform the later New Deal. | -73.757 | 42.652 |
| 1933 | 1 | 就任总统并启动新政 / Inaugurated and launches the New Deal | 在经济大萧条中就任，首个百日推动金融、救济与公共工程措施。 / Took office amid the Great Depression and advanced banking, relief, and public-works measures during the first hundred days. | -77.036 | 38.897 |
| 1941 | 1 | 珍珠港后领导美国参战 / Leads U.S. entry into war after Pearl Harbor | 12 月 8 日在国会发表演说并请求宣战。 / Addressed Congress on December 8 and requested a declaration of war. | -77.009 | 38.889 |
| 1943 | 1 | 德黑兰会议 / Tehran Conference | 与丘吉尔、斯大林首次共同会晤，协调欧洲战场和战后安排。 / Met jointly with Churchill and Stalin for the first time to coordinate the European war and postwar planning. | 51.424 | 35.721 |
| 1945 | 1 | 雅尔塔会议 / Yalta Conference | 与丘吉尔、斯大林讨论欧洲战后安排及拟议中的联合国。 / Discussed postwar Europe and the proposed United Nations with Churchill and Stalin. | 34.163 | 44.467 |
| 1945 | 2 | 卒于沃姆斯普林斯 / Dies at Warm Springs | 4 月 12 日因脑出血去世，距欧洲战争结束不足一个月。 / Died of a cerebral hemorrhage on April 12, less than a month before the war in Europe ended. | -84.681 | 32.890 |

**资料与来源元数据**

- **`fdr-library-biography`** — [FDR Biography](https://www.fdrlibrary.org/fdr-biography)，Franklin D. Roosevelt Presidential Library & Museum：出生、教育、疾病、州长、新政与战争生涯时间线；NARA 总统图书馆资料，第三方资产另行核权。
- **`fdr-day-by-day`** — [FDR Day by Day](https://www.fdrlibrary.org/timeline)，FDR Presidential Library & Museum：1933–1945 日程、会议与档案材料；具体数字对象依档案说明。
- **`nps-fdr-timeline`** — [Timeline of Franklin D. Roosevelt's Life](https://www.nps.gov/articles/timeline-of-franklin-d-roosevelt-s-life.htm)，U.S. National Park Service：地点化生平时间线；美国政府页面，嵌入图片另行核权。
- **`nps-japanese-incarceration`** — [Japanese American Life During Incarceration](https://www.nps.gov/articles/000/japanese-american-life-during-incarceration.htm)，U.S. National Park Service：第 9066 号行政命令及强制迁移、拘禁背景；美国政府页面。

## 11. 弗拉基米尔·列宁 / Vladimir Lenin

- **Slug**：`vladimir-lenin`
- **中文名**：弗拉基米尔·列宁
- **英文名**：Vladimir Lenin
- **别名**：列宁；Vladimir Ilyich Ulyanov；Vladimir Il'ich Lenin；N. Lenin
- **生卒年**：1870–1924
- **主领域**：政治
- **辅助领域**：革命理论、国家建构、经济政策、新闻出版
- **摘要**：布尔什维克领袖和苏维埃政府首任领导人，在 1917 年革命中夺取政权并建立一党国家，其思想和实践塑造二十世纪国际共产主义，也伴随内战、政治镇压与制度化暴力。 / Bolshevik leader and first head of the Soviet government, who seized power in the 1917 revolution and built a one-party state; his thought and practice shaped global communism amid civil war, political repression, and institutionalized violence.
- **入选理由**：其政党组织理论、革命政权和苏维埃国家改变全球政治版图，并引发延续整个二十世纪的革命与反革命运动。 / His party theory, revolutionary government, and Soviet state transformed global politics and catalyzed revolutionary and counterrevolutionary movements throughout the twentieth century.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1870 | 1 | 生于辛比尔斯克 / Born in Simbirsk | 4 月 22 日生于伏尔加河畔辛比尔斯克，今乌里扬诺夫斯克。 / Born on April 22 in Simbirsk on the Volga, now Ulyanovsk. | 48.403 | 54.318 |
| 1887 | 1 | 在喀山求学并被捕 / Studies and is arrested at Kazan | 进入喀山大学，后因学生抗议被捕、开除并受监视。 / Entered Kazan University, then was arrested and expelled after a student protest. | 49.123 | 55.788 |
| 1893 | 1 | 迁居圣彼得堡 / Moves to Saint Petersburg | 参与马克思主义小组并开始组织工人运动。 / Joined Marxist circles and began organizing among workers. | 30.316 | 59.938 |
| 1897 | 1 | 流放舒申斯科耶 / Exiled to Shushenskoye | 被判在西伯利亚流放三年，并在当地写作。 / Sentenced to three years of exile in Siberia and wrote there. | 91.935 | 53.326 |
| 1900 | 1 | 在欧洲组织《火星报》 / Organizes Iskra in Europe | 流放期满后前往西欧，与同伴创办地下报纸；地图取早期编辑中心慕尼黑。 / After exile he went to western Europe and helped found the underground newspaper; Munich represents its early editorial center. | 11.582 | 48.135 |
| 1903 | 1 | 俄国社会民主工党第二次代表大会 / Second Congress of the Russian Social Democratic Labour Party | 会议先在布鲁塞尔、后移至伦敦，并形成布尔什维克与孟什维克派别；地图取主要后段会址城市伦敦。 / Meeting first in Brussels and then London, the congress produced the Bolshevik–Menshevik split; London anchors the main later sessions. | -0.128 | 51.507 |
| 1917 | 1 | 从苏黎世返回俄国 / Leaves Zurich for Russia | 二月革命后结束流亡，经德国与斯堪的纳维亚返回；此点为出发地。 / Ended exile after the February Revolution and traveled via Germany and Scandinavia; this point marks departure. | 8.541 | 47.376 |
| 1917 | 2 | 抵达彼得格勒 / Arrives in Petrograd | 4 月抵达芬兰车站并提出激进政治纲领。 / Arrived at Finland Station in April and advanced a radical political program. | 30.356 | 59.955 |
| 1917 | 3 | 布尔什维克夺取政权 / Bolsheviks seize power | 11 月（俄历十月）推翻临时政府，列宁领导新的人民委员会。 / In November (October Old Style), the Bolsheviks overthrew the Provisional Government and Lenin headed the new Council of People's Commissars. | 30.314 | 59.940 |
| 1918 | 1 | 政府迁至莫斯科 / Government moves to Moscow | 在战争压力下将首都迁至莫斯科，并签署《布列斯特-立托夫斯克条约》退出世界大战。 / Under wartime pressure, moved the capital to Moscow and accepted the Treaty of Brest-Litovsk to leave the world war. | 37.617 | 55.752 |
| 1924 | 1 | 卒于戈尔基 / Dies at Gorki | 多次中风后在莫斯科郊外戈尔基庄园去世。 / Died at the Gorki estate outside Moscow after several strokes. | 37.776 | 55.508 |

**资料与来源元数据**

- **`loc-russia-timeline`** — [The Empire That Was Russia: Timeline](https://www.loc.gov/exhibits/empire/chronology.html)，Library of Congress：1870 出生与俄国历史时间轴；美国联邦机构展览页面。
- **`loc-lenin-chronology`** — [A Chronology of V. I. Lenin's Life](https://www.loc.gov/item/2020717963/)，Library of Congress 数字馆藏：喀山、彼得堡、流放、欧洲活动与 1917 年路线；馆藏图书权利见具体对象说明。
- **`loc-russian-revolution-map`** — [A Brief Introduction to the Russian Revolution and Civil War](https://tile.loc.gov/storage-services/master/gmd/gmd7/g7001/g7001s/2017588308.pdf)，Library of Congress Geography and Map Division：十月革命、迁都及内战背景；页面与地图按 LOC 权利说明。
- **`marxists-lenin-archive`** — [Lenin Internet Archive](https://www.marxists.org/archive/lenin/)，Marxists Internet Archive：一手著作和日期交叉核验；不同译本权利状态各异，仅引用事实，不批量复用文本。

## 12. 阿道夫·希特勒 / Adolf Hitler

- **Slug**：`adolf-hitler`
- **中文名**：阿道夫·希特勒
- **英文名**：Adolf Hitler
- **别名**：希特勒；Adolf Hitler；Führer（纳粹政治称谓，不建议作为界面常规别名突出显示）
- **生卒年**：1889–1945
- **主领域**：政治
- **辅助领域**：极权主义、战争、种族主义、宣传
- **摘要**：纳粹党领袖和德国独裁者，其种族主义、反犹主义和扩张政策导致欧洲战争与系统性大屠杀；纳粹政权杀害约六百万犹太人及数百万其他受害者。 / Nazi Party leader and German dictator whose racist, antisemitic, and expansionist policies drove war in Europe and systematic mass murder; the Nazi regime murdered six million Jews and millions of other victims.
- **入选理由**：其影响属于灾难性历史影响：侵略战争、种族灭绝和极权统治重塑国际法、人权制度、欧洲边界与全球记忆政治。 / His significance is catastrophically negative: aggressive war, genocide, and dictatorship reshaped international law, human-rights institutions, European borders, and global memory.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1889 | 1 | 生于因河畔布劳瑙 / Born at Braunau am Inn | 4 月 20 日生于奥匈帝国边境城镇。 / Born on April 20 in an Austro-Hungarian border town. | 13.043 | 48.258 |
| 1908 | 1 | 移居维也纳 / Moves to Vienna | 艺术学院申请失败后长期居住于维也纳；后来关于其反犹主义在此完全成形的自述并不可靠。 / Lived in Vienna after failed art-school applications; his later claim that his antisemitism fully formed there is not supported as stated. | 16.373 | 48.208 |
| 1913 | 1 | 移居慕尼黑 / Moves to Munich | 5 月离开维也纳前往慕尼黑。 / Left Vienna for Munich in May. | 11.582 | 48.135 |
| 1914 | 1 | 参加第一次世界大战 / Serves in World War I | 加入巴伐利亚军队并赴西线；落点取其部队在第一次伊普尔战役活动区，个人逐日位置不精确。 / Joined the Bavarian army and went to the Western Front; the point marks his unit's First Ypres area, not a precise daily personal location. | 2.886 | 50.851 |
| 1919 | 1 | 加入德国工人党 / Joins the German Workers' Party | 在慕尼黑加入后来改名为纳粹党的组织，并迅速成为宣传鼓动者。 / Joined in Munich the organization later renamed the Nazi Party and rapidly became its propagandist. | 11.582 | 48.135 |
| 1923 | 1 | 发动啤酒馆政变 / Launches the Beer Hall Putsch | 在慕尼黑发动未遂政变，造成死伤并以失败告终。 / Launched a failed coup in Munich that caused deaths and injuries. | 11.577 | 48.130 |
| 1924 | 1 | 在兰茨贝格服刑 / Imprisoned at Landsberg | 因叛国罪判刑但得到宽大待遇，并在狱中撰写政治宣言。 / Received a lenient sentence for treason and wrote his political manifesto while imprisoned. | 10.877 | 48.052 |
| 1933 | 1 | 被任命为德国总理 / Appointed German chancellor | 兴登堡在柏林任命其为总理；纳粹随后迅速摧毁民主制度并建立独裁。 / Hindenburg appointed him chancellor in Berlin; the Nazis then rapidly dismantled democracy and established dictatorship. | 13.376 | 52.518 |
| 1939 | 1 | 发动欧洲战争 / Launches war in Europe | 在柏林指挥入侵波兰并将欧洲推入全面战争；此事件不是其亲临波兰前线的定位。 / Directed the invasion of Poland from Berlin, plunging Europe into general war; the point does not imply his presence on the Polish front. | 13.376 | 52.518 |
| 1941 | 1 | 从“狼穴”指挥东线战争 / Directs the eastern war from the Wolf's Lair | 在东普鲁士总部指挥对苏战争；纳粹灭绝政策与战争同步升级。 / Directed the war against the Soviet Union from his East Prussian headquarters as Nazi extermination policies escalated with the conflict. | 21.493 | 54.080 |
| 1945 | 1 | 在柏林地堡自杀 / Dies by suicide in the Berlin bunker | 在德国战败和苏军攻入柏林之际自杀。 / Died by suicide as Germany collapsed and Soviet forces entered Berlin. | 13.381 | 52.512 |

**资料与来源元数据**

- **`ushmm-hitler-key-dates`** — [Adolf Hitler: Key Dates](https://encyclopedia.ushmm.org/content/en/article/adolf-hitler-key-dates)，United States Holocaust Memorial Museum：出生、维也纳、慕尼黑、纳粹崛起与死亡时间线；仅提取事实，图片依馆藏权利。
- **`ushmm-hitler`** — [Adolf Hitler](https://encyclopedia.ushmm.org/content/en/article/adolf-hitler)，United States Holocaust Memorial Museum：其意识形态、战争责任、大屠杀与生平语境；页面版权，仅提取事实。
- **`ushmm-hitler-early-years`** — [Adolf Hitler: Early Years, 1889–1921](https://encyclopedia.ushmm.org/content/en/article/adolf-hitler-early-years-1889-1921)，United States Holocaust Memorial Museum：维也纳反犹主义叙事的证据限制、慕尼黑迁居与西线经历；页面版权，仅提取事实。
- **`ushmm-holocaust-encyclopedia`** — [Introduction to the Holocaust](https://encyclopedia.ushmm.org/content/en/article/introduction-to-the-holocaust)，United States Holocaust Memorial Museum：六百万犹太受害者及其他被迫害群体的基本口径；页面版权，仅提取事实。

## 13. 毛泽东 / Mao Zedong

- **Slug**：`mao-zedong`
- **中文名**：毛泽东
- **英文名**：Mao Zedong
- **别名**：毛润之；Mao Tse-tung；Chairman Mao
- **生卒年**：1893–1976
- **主领域**：政治
- **辅助领域**：革命理论、军事、国家建构、文学
- **摘要**：中国共产党主要创建者和中华人民共和国核心缔造者，以农民动员和游击战争领导革命并建立党国体制；其统治也发动大跃进和文化大革命，造成大规模饥荒、迫害和社会破坏。 / A principal founder of the Chinese Communist Party and the central founding leader of the People's Republic of China, who mobilized peasants and guerrilla warfare to win revolution and build a party-state; his rule also launched the Great Leap Forward and Cultural Revolution, causing mass famine, persecution, and social destruction.
- **入选理由**：其革命道路、国家建立、社会改造与外交转向改变中国和冷战格局；其政策造成的巨大人命与制度代价同样是历史影响的核心。 / His revolutionary strategy, state-building, social transformation, and diplomatic realignment changed China and the Cold War; the enormous human and institutional costs of his campaigns are equally central to that impact.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| 1893 | 1 | 生于韶山 / Born at Shaoshan | 12 月 26 日生于湖南湘潭韶山冲。 / Born on December 26 at Shaoshan in Xiangtan, Hunan. | 112.526 | 27.915 |
| 1911 | 1 | 在长沙参加革命军 / Joins revolutionary forces in Changsha | 辛亥革命期间在湖南新军短期服役。 / Served briefly in the Hunan revolutionary army during the 1911 Revolution. | 112.939 | 28.228 |
| 1918 | 1 | 在北京大学图书馆工作 / Works at Peking University Library | 在李大钊领导的图书馆任助理，并接触新文化与马克思主义圈子。 / Worked as a library assistant under Li Dazhao and encountered New Culture and Marxist circles. | 116.305 | 39.992 |
| 1921 | 1 | 参加中共第一次全国代表大会 / Attends the CCP First National Congress | 作为长沙代表在上海参会；会议末段转移至嘉兴，但地图以开会起点上海为单点锚点。 / Attended as a Changsha delegate in Shanghai; the final session moved to Jiaxing, but Shanghai is used as the single starting anchor. | 121.474 | 31.230 |
| 1927 | 1 | 进入井冈山根据地 / Establishes a base in the Jinggang Mountains | 秋收起义受挫后率部进入井冈山，发展以农村根据地为中心的革命战略。 / After the Autumn Harvest Uprising failed, led forces into the Jinggang Mountains and developed a rural-base revolutionary strategy. | 114.159 | 26.570 |
| 1935 | 1 | 遵义会议后领导地位上升 / Leadership rises after the Zunyi Conference | 长征途中在遵义召开的会议强化其在中共军事和政治领导中的地位。 / The conference during the Long March strengthened his position in the CCP's military and political leadership. | 106.927 | 27.725 |
| 1936 | 1 | 到达延安地区 / Reaches the Yan'an region | 长征后中共中央以陕北为主要根据地；延安成为革命时期核心政治中心。 / After the Long March, northern Shaanxi became the CCP's main base and Yan'an its central political hub. | 109.489 | 36.585 |
| 1949 | 1 | 宣布中华人民共和国成立 / Proclaims the People's Republic of China | 10 月 1 日在北京宣布新国家成立，国民党政府退守台湾。 / Proclaimed the new state in Beijing on October 1 as the Nationalist government retreated to Taiwan. | 116.397 | 39.908 |
| 1958 | 1 | 发动大跃进 / Launches the Great Leap Forward | 在北京推动以人民公社和高指标为核心的运动；政策、强制征购和信息失真共同造成灾难性饥荒与数千万人死亡。 / Promoted the commune-based campaign from Beijing; policy, coercive procurement, and distorted reporting contributed to catastrophic famine and tens of millions of deaths. | 116.397 | 39.908 |
| 1966 | 1 | 发动文化大革命 / Launches the Cultural Revolution | 在北京动员红卫兵并打击党内外被指为敌对者，造成长期迫害、暴力、教育中断和制度破坏。 / Mobilized Red Guards in Beijing and attacked designated enemies inside and outside the party, producing prolonged persecution, violence, educational disruption, and institutional damage. | 116.397 | 39.908 |
| 1972 | 1 | 会见尼克松 / Meets Nixon | 在北京会见美国总统尼克松，中美接近改变冷战战略格局。 / Met U.S. president Richard Nixon in Beijing, a rapprochement that altered the Cold War strategic balance. | 116.397 | 39.908 |
| 1976 | 1 | 卒于北京 / Dies in Beijing | 9 月 9 日在北京去世。 / Died in Beijing on September 9. | 116.397 | 39.908 |

**资料与来源元数据**

- **`columbia-mao-profile`** — [Mao Zedong: Biographical and Political Profile](https://afe.easia.columbia.edu/special/china_1900_mao_early.htm)，Asia for Educators / Columbia University：出生、长沙、革命道路、1949 后政策和文化大革命；教学资料版权，仅提取事实。
- **`columbia-prc-chronology`** — [A Chronology of the PRC under Mao Zedong](https://afe.easia.columbia.edu/special/china_1950_prc_timeline.htm)，Asia for Educators / Columbia University：1949–1976 政策时间线；页面版权，仅提取事实。
- **`columbia-sixteen-points`** — [The Sixteen Points](https://afe.easia.columbia.edu/ps/cup/sixteen_points.pdf)，Columbia University：文化大革命早期一手文件及学术导言；原文件与译文权利分别处理，仅引用事实。
- **`usc-1981-resolution`** — [Resolution on Certain Questions in the History of Our Party since the Founding of the PRC](https://china.usc.edu/node/20941)，USC U.S.-China Institute：中共 1981 年官方历史决议英译，作为当事政党的一手自我评估，须与独立研究并读。
- **`state-department-china-1972`** — [Rapprochement with China, 1972](https://history.state.gov/milestones/1969-1976/rapprochement-china)，U.S. Department of State, Office of the Historian：尼克松访华、毛泽东会见与《上海公报》背景；美国政府页面。

## 14. 柏拉图 / Plato

- **Slug**：`plato`
- **中文名**：柏拉图
- **英文名**：Plato
- **别名**：阿里斯托克勒斯（传统本名）；Platon；Aristocles（traditional personal name）
- **生卒年**：约公元前 428/427–348/347；项目采用 `birthYear = -428`、`deathYear = -347`，二者均为约定锚点
- **主领域**：思想与教育
- **辅助领域**：哲学、政治思想、伦理、认识论、教育
- **摘要**：古希腊哲学家，以对话体探讨知识、伦理、政治和形而上学，并在雅典形成延续数代的学园传统。 / Ancient Greek philosopher whose dialogues examined knowledge, ethics, politics, and metaphysics, and whose Athenian Academy created a multigenerational intellectual tradition.
- **入选理由**：其著作与学园深刻塑造西方、伊斯兰和基督教哲学传统，“学院”也成为教育与研究机构的持久范型。 / His writings and Academy profoundly shaped Western, Islamic, and Christian philosophy, while the academy became an enduring model and name for institutions of learning.

| year | order | titleZh / titleEn | descriptionZh / descriptionEn | longitude | latitude |
|---:|---:|---|---|---:|---:|
| -428 | 1 | 约生于雅典 / Approximate birth in Athens | 通常采用前 428/427 年；古代编年也支持前 429、430 或 431 年，出生地另有埃伊纳岛传统。地图取其家族所属的雅典区域。 / Conventionally dated to 428/427 BCE, though ancient chronologies also imply 429–431 and one tradition names Aegina; Athens anchors his family setting. | 23.727 | 37.984 |
| -407 | 1 | 约成为苏格拉底追随者 / Approximate association with Socrates | 传统上认为青年时期加入苏格拉底周围的讨论圈；无法确认起始单年。 / Traditionally associated with Socrates' circle as a young man; no exact starting year can be established. | 23.727 | 37.984 |
| -399 | 1 | 苏格拉底被处死 / Execution of Socrates | 苏格拉底在雅典受审并被处死，对柏拉图的哲学和政治思考产生决定性影响。 / Socrates was tried and executed in Athens, decisively shaping Plato's philosophical and political thought. | 23.727 | 37.984 |
| -399 | 2 | 传统称前往麦加拉 / Traditional stay at Megara | 后出的第欧根尼·拉尔修记载柏拉图与其他苏格拉底门徒前往麦加拉；应标记为传统行程。 / The much later Diogenes Laertius says Plato and other Socratics went to Megara; this should be marked as a traditional itinerary. | 23.343 | 37.995 |
| -388 | 1 | 第一次前往叙拉古 / First journey to Syracuse | 约四十岁访问意大利和西西里，并在叙拉古结识狄翁；精确年份常取前 388/387。 / Around age forty visited Italy and Sicily and met Dion at Syracuse; the trip is commonly dated 388/387 BCE. | 15.293 | 37.075 |
| -387 | 1 | 形成雅典学园 / Establishes the Academy at Athens | 返回雅典后在阿卡德米亚地区组织长期哲学共同体；现代研究认为它不是某天正式注册成立的“大学”。 / After returning, organized a lasting philosophical community near the Akademeia; modern scholarship cautions that it was not a university formally founded on a single date. | 23.709 | 38.001 |
| -367 | 1 | 第二次叙拉古之行 / Second journey to Syracuse | 应狄翁等人邀请尝试影响狄奥尼修斯二世的统治，最终失败。 / Returned at Dion's urging in an unsuccessful attempt to influence Dionysius II's rule. | 15.293 | 37.075 |
| -361 | 1 | 第三次叙拉古之行 / Third journey to Syracuse | 再次前往叙拉古并陷入政治困境，后在友人协助下离开。 / Returned once more, became trapped in political conflict, and left with friends' help. | 15.293 | 37.075 |
| -347 | 1 | 约卒于雅典 / Approximate death in Athens | 约前 348/347 年去世；后出传统称葬于学园附近，墓址未被确认。 / Died around 348/347 BCE; a later tradition places his burial near the Academy, but no grave has been confirmed. | 23.709 | 38.001 |

**资料与来源元数据**

- **`sep-plato`** — [Plato](https://plato.stanford.edu/entries/plato/)，Stanford Encyclopedia of Philosophy / Stanford University：年代不确定性、思想范围与历史影响；SEP 版权，仅提取事实。
- **`iep-plato-biography`** — [Plato](https://iep.utm.edu/plato/)，Internet Encyclopedia of Philosophy / University of Tennessee at Martin：前 428/427 与其他候选年代、麦加拉传统、叙拉古行程及死亡；页面版权，仅提取事实。
- **`iep-plato-academy`** — [Plato: The Academy](https://iep.utm.edu/plato-academy/)，Internet Encyclopedia of Philosophy：学园的渐进形成、地点、组织性质与史料限制；页面版权，仅提取事实。
- **`met-hellenistic-intellectual-pursuits`** — [Intellectual Pursuits of the Hellenistic Age](https://www.metmuseum.org/essays/intellectual-pursuits-of-the-hellenistic-age)，The Metropolitan Museum of Art：柏拉图学园在古代教育史中的位置；网页版权，仅提取事实。

---

## 本部分审校摘要

- **人物数**：14
- **事件总数**：134
- **含显著年代或地点争议的人物**：居鲁士大帝、阿育王、君士坦丁一世、苏莱曼一世、柏拉图；这些人的出生锚点不得在 UI 中呈现为现代档案式精确事实。
- **含传统性单点事件**：阿育王青年任职乌贾因、西蒙·玻利瓦尔蒙特萨克罗誓言、柏拉图前往麦加拉；事件描述必须保留“传统记载”限定。
- **战场近似点**：居鲁士最后战役、恺撒的比布拉克特/阿莱西亚/卢比孔/法萨卢斯/塔普苏斯、苏莱曼的莫哈奇、华盛顿的必要堡和特伦顿、玻利瓦尔的博亚卡/卡拉沃沃、希特勒所在部队的第一次伊普尔战区。地图不应暗示米级精度。
- **伦理呈现要求**：希特勒采用纯历史责任语境，不使用庆祝性头衔、姿势或视觉特效；华盛顿显示其奴隶制关联；罗斯福显示日裔美国人强制拘禁；列宁显示一党国家和政治镇压；毛泽东显示大跃进饥荒及文化大革命迫害。
