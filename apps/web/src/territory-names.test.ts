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
    expect(chineseTerritoryName("Algeria (France)")).toBe("法属阿尔及利亚");
    expect(chineseTerritoryName("An untranslated polity")).toBeNull();
  });
});
