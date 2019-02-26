import fs from "fs";
import cheerio from "cheerio";
import { printDrainHydrateMarks } from "react-imported-component";

export const getHTMLFragments = helmet => {
  const clientHTML = fs
    .readFileSync(__dirname + "/../../build/client/index.html")
    .toString();

  const $template = cheerio.load(clientHTML);
  $template("head").append(
    helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
  );
  // $template("#app").html(markup);

  const rawHTML = $template.html();

  const appString = '<div id="app">';
  const splitter = "###SPLIT###";
  const [startingRawHTMLFragment, endingRawHTMLFragment] = rawHTML
    .replace(appString, `${appString}${splitter}`)
    .split(splitter);

  const startingHTMLFragment = `${startingRawHTMLFragment}${printDrainHydrateMarks()}`;
  return [startingHTMLFragment, endingRawHTMLFragment];
};
