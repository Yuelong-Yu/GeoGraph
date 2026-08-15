import { describe, expect, it } from "vitest";
import { chineseTerritoryName } from "./territory-names.js";

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
    expect(chineseTerritoryName("Great Khanate")).toBe("大汗国（元朝）");
    expect(chineseTerritoryName("Turan")).toBe("突兰");
    expect(chineseTerritoryName("Rattanakosin Kingdom")).toBe("拉达那哥欣王国");
    expect(chineseTerritoryName("Srivijaya Empire")).toBe("三佛齐（室利佛逝）");
    expect(chineseTerritoryName("Annam")).toBe("安南");
    expect(chineseTerritoryName("Malaya")).toBe("马来亚");
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
});
