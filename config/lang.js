import React from "react";
import { ReactComponent as USAFlag } from "../src/icons/flags/4x3/us.svg";
import { ReactComponent as ChinaFlag } from "../src/icons/flags/4x3/cn.svg";
import { ReactComponent as GermanyFlag } from "../src/icons/flags/4x3/de.svg";
import { ReactComponent as SpainFlag } from "../src/icons/flags/4x3/es.svg";
import { ReactComponent as FranceFlag } from "../src/icons/flags/4x3/fr.svg";
import { ReactComponent as ItalyFlag } from "../src/icons/flags/4x3/it.svg";
import { ReactComponent as RussiaFlag } from "../src/icons/flags/4x3/ru.svg";
import { ReactComponent as UkraineFlag } from "../src/icons/flags/4x3/ua.svg";

export const namespaces = ["common", "auth", "features"];

export const langs = {
  en: {
    code: "en",
    name: "English",
    flag: USAFlag
  },
  zh: {
    code: "zh",
    name: "中文",
    flag: ChinaFlag
  },
  de: {
    code: "de",
    name: "Deutsche",
    flag: GermanyFlag
  },
  es: {
    code: "es",
    name: "Español",
    flag: SpainFlag
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: FranceFlag
  },
  it: {
    code: "it",
    name: "Italiano",
    flag: ItalyFlag
  },
  ru: {
    code: "ru",
    name: "Русский",
    flag: RussiaFlag
  },
  uk: {
    code: "uk",
    name: "Українська",
    flag: UkraineFlag
  }
};
