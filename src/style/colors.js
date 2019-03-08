import palx from "palx";
import { lighten, darken, desaturate } from "polished";

// TODO - Strip Palx out and use polished.

export const primaryColor = "#3B8EA5";

const secondary = "#F5EE9E";

const third = "#F49E4C";

const fourth = "#AB3428";

const nearBlack = "#0C090D";

const nearWhite = "#EEEEEE;";

export const palette = palx("#3B8EE5");

const collection = { primary: primaryColor, secondary, third, fourth };

const lightenUp = (name, color) => {
  let light = {};
  for (let i = 1; i < 10; i++) {
    light[`${name}-l${i}`] = lighten(`0.${i}`, color);
  }
  return light;
};

const darkenDown = (name, color) => {
  let dark = {};
  for (let i = 1; i < 10; i++) {
    dark[`${name}-d${i}`] = darken(`0.${i}`, color);
  }
  return dark;
};

const greyItUp = (name, color) => {
  let desaturated = {};
  for (let i = 1; i < 10; i++) {
    desaturated[`${name}-g${i}`] = desaturate(`0.${i}`, color);
  }
  return desaturated;
};

const generator = (name, color) => {
  const light = lightenUp(name, color);

  const dark = darkenDown(name, color);

  const desaturated = greyItUp(name, color);

  let lightDe = {};
  Object.keys(light).forEach(key => {
    lightDe = { ...lightDe, ...greyItUp(key, light[key]) };
  });

  let darkDe = {};
  Object.keys(darkDe).forEach(key => {
    darkDe = { ...darkDe, ...greyItUp(key, dark[key]) };
  });

  return { ...light, ...dark, ...desaturated, ...lightDe, ...darkDe };
};

let customColors = { "near-black": nearBlack, "near-white": nearWhite };

Object.entries(collection).forEach(entry => {
  const name = entry[0];
  const color = entry[1];
  customColors = {
    ...customColors,
    ...generator(name, color),
    [`${name}`]: color
  };
});

export default customColors;
