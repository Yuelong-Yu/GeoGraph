import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { chineseTerritoryName } from "./territory-names.js";

const historicalGeojsonDirectory = fileURLToPath(
  new URL("../../../data/historical-cache/geojson/", import.meta.url),
);

describe("Chinese territory names", () => {
  it("localizes modern country names used by the latest historical snapshot", () => {
    const names = [
      "China", "Russia", "Saudi Arabia", "Antigua and Barbuda", "Bosnia and Herzegovina",
      "Burma", "Byelarus", "Congo", "Czech Republic", "Gambia, The", "Hong Kong",
      "Ivory Coast", "Korea, Democratic People's Republic of", "Korea, Republic of",
      "Macedonia", "Netherlands Antilles", "Rapa Nui", "Saint Barthelemy",
      "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Vincent and the Grenadines",
      "Swaziland", "Tanzania, United Republic of", "Trinidad", "Turkey",
      "Turkish Cypriot-administered area", "Turks and Caicos Islands",
      "United States Virgin Islands", "Wallis and Futuna Islands", "Zaire",
    ];

    expect(names.map(chineseTerritoryName)).not.toContain(null);
    expect(names.map(chineseTerritoryName).join(" ")).not.toMatch(/[A-Za-z]/);
  });

  it("localizes common historical polities and omits unknown English labels", () => {
    expect(chineseTerritoryName("Roman Empire")).toBe("罗马帝国");
    expect(chineseTerritoryName("Ottoman Empire")).toBe("奥斯曼帝国");
    expect(chineseTerritoryName("Qing Empire")).toBe("清朝");
    expect(chineseTerritoryName("Chinese Warlords")).toBe("中国军阀");
    expect(chineseTerritoryName("Chinese   Warlords")).toBe("中国军阀");
    expect(chineseTerritoryName("Emirate of Bin Shal’an")).toBe("伊本·沙兰埃米尔国");
    expect(chineseTerritoryName("Kimek-Kipchak khaganate")).toBe("基马克—钦察汗国");
    expect(chineseTerritoryName("Rus' Khaganate")).toBe("罗斯汗国");
    expect(chineseTerritoryName("Western Gokturk Khaganate")).toBe("西突厥汗国");
    expect(chineseTerritoryName("Ouighurs")).toBe("回鹘人");
    expect(chineseTerritoryName("Siberians")).toBe("西伯利亚人");
    expect(chineseTerritoryName("Ruanruan")).toBe("柔然");
    expect(chineseTerritoryName("Uyghurs")).toBe("回鹘人");
    expect(chineseTerritoryName("Mongols")).toBe("蒙古人");
    expect(chineseTerritoryName("Tibetans")).toBe("藏族");
    expect(chineseTerritoryName("Jin")).toBe("晋朝");
    expect(chineseTerritoryName("Balhae")).toBe("渤海国");
    expect(chineseTerritoryName("South Russia")).toBe("南俄罗斯");
    expect(chineseTerritoryName("Abyssinia")).toBe("埃塞俄比亚");
    expect(chineseTerritoryName("Dominion of Newfoundland")).toBe("纽芬兰自治领");
    expect(chineseTerritoryName("Muscat and Oman")).toBe("马斯喀特和阿曼");
    expect(chineseTerritoryName("Sultinate of Zanzibar")).toBe("桑给巴尔苏丹国");
    expect(chineseTerritoryName("Great Khanate")).toBe("大汗国（元朝）");
    expect(chineseTerritoryName("Turan")).toBe("突兰");
    expect(chineseTerritoryName("Rattanakosin Kingdom")).toBe("拉达那哥欣王国");
    expect(chineseTerritoryName("Srivijaya Empire")).toBe("三佛齐（室利佛逝）");
    expect(chineseTerritoryName("Annam")).toBe("安南");
    expect(chineseTerritoryName("Malaya")).toBe("马来亚");
    expect(chineseTerritoryName("Nejd")).toBe("内志");
    expect(chineseTerritoryName("Bunyoro")).toBe("布尼奥罗");
    expect(chineseTerritoryName("French Equatorial Africa")).toBe("法属赤道非洲");
    expect(chineseTerritoryName("French West Africa")).toBe("法属西非");
    expect(chineseTerritoryName("Libya (IT)")).toBe("意属利比亚");
    expect(chineseTerritoryName("Mesopotamia (GB)")).toBe("英属美索不达米亚");
    expect(chineseTerritoryName("Hejaz")).toBe("汉志");
    expect(chineseTerritoryName("Algeria (France)")).toBe("法属阿尔及利亚");
    expect(chineseTerritoryName("An untranslated polity")).toBeNull();
  });

  it("localizes every named territory in the default 1 CE snapshot", () => {
    const names = [
      "Ainu", "Amazon hunter-gatherers", "Andean hunter-gatherers", "Arakan", "Arctic marine mammal hunters",
      "Australian aboriginal hunter-gatherers", "Axum", "Bell-shaped burials culture", "Blemmyes", "Boihaenum",
      "Bosporian Kingdom", "Brushed Pottery culture", "Caribbean hunter-gatherers", "Copena", "Couture Complex",
      "Curonians", "Desert hunter-gatherers", "Dumonii", "Eastern Masurian culture", "Finno-Ugric taiga hunter-gatherers",
      "Fourche Maline Culture", "Glades Culture", "Goodall Focus", "Guanches", "Hadramaut", "Hainan",
      "Himyarite Kingdom", "Hindu kingdoms", "Hopewell Culture", "Judea", "Kalinga", "Khoiasan", "Laurel complex",
      "Marksville Culture", "Mascat", "Maya chiefdoms and states", "Meroe", "Mill Creek Culture", "Miller", "Milograd culture",
      "Moche", "Monte Albán", "Nabatean Kingdom", "Nazca", "North American Pacifi foraging, hunting and fishing peoples",
      "Odrysian Kingdom", "Paleo-Inuit", "Paleo-Siberian hunter-gatherers", "Pampas cultures", "Patagonian shellfish and marine mammal hunters",
      "Plain bison hunters", "Plain-Pottery culture", "Plateau fichers and hunter gatherers", "Point Peninsula", "Pomeranian culture", "Porter",
      "Saami", "Saka Kingdom", "Sambian-Nothangian culture", "Satavahanihara", "Saugeen Complex", "Savanna hunter-gatherers",
      "Shellfish gatherers", "Simhala", "Subarctic forest hunter-gatherers", "Suren Kingdom", "Swift Creek Culture",
      "Tasmanian hunter-gatherers", "Teotihuacán", "West African cereal farmers", "Western Masurian culture",
    ];

    expect(names.map(chineseTerritoryName)).not.toContain(null);
    expect(chineseTerritoryName("Axum")).toBe("阿克苏姆王国");
    expect(chineseTerritoryName("Himyarite Kingdom")).toBe("希木叶尔王国");
    expect(chineseTerritoryName("Odrysian Kingdom")).toBe("奥德里西亚王国");
    expect(chineseTerritoryName("Teotihuacán")).toBe("特奥蒂瓦坎");
  });

  it("localizes every named territory with a source encyclopedia entry", () => {
    const names = new Set<string>();
    for (const file of readdirSync(historicalGeojsonDirectory)) {
      if (!file.endsWith(".geojson")) continue;
      const collection = JSON.parse(readFileSync(`${historicalGeojsonDirectory}/${file}`, "utf8"));
      for (const feature of collection.features) {
        const { NAME: name, wikipedia } = feature.properties ?? {};
        if (typeof name === "string" && typeof wikipedia === "string" && wikipedia) names.add(name);
      }
    }

    expect([...names].map(chineseTerritoryName)).not.toContain(null);
  });
});
