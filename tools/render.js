import path from "path";
import fetch from "node-fetch";
import { writeFile, makeDir } from "./lib/fs";

// Enter your paths here which you want to render as static
// Example:
// const routes = [
//   '/',           // => build/public/index.html
//   '/page',       // => build/public/page.html
//   '/page/',      // => build/public/page/index.html
//   '/page/name',  // => build/public/page/name.html
//   '/page/name/', // => build/public/page/name/index.html
// ];
const routes = [
  "/",
  // "/contact",
  "/login",
  // "/register",
  "/about",
  "/register"
  // "/privacy",
  // "/404" // https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/
];

async function render() {
  // add dynamic routes
  // const products = await fetch(`http://${server.host}/api/products`).then(res => res.json());
  // products.forEach(product => routes.push(
  //   `/product/${product.uri}`,
  //   `/product/${product.uri}/specs`
  // ));

  routes.map(async (route, index) => {
    const url = `http://localhost:${process.env.PORT}${route}`;
    const fileName = route.endsWith("/")
      ? "index.html"
      : `${path.basename(route, ".html")}.html`;
    const dirName = path.join(
      "build/public",
      route.endsWith("/") ? route : path.dirname(route)
    );
    const dist = path.join(dirName, fileName);
    const timeStart = new Date();
    const response = await fetch(url);
    const timeEnd = new Date();
    const text = await response.text();
    await makeDir(dirName);
    await writeFile(dist, text);
    const time = timeEnd.getTime() - timeStart.getTime();
    console.info(
      `#${index + 1} ${dist} => ${response.status} ${
        response.statusText
      } (${time} ms)`
    );
  });
}

render();
