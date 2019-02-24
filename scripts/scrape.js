const generateStaticHTML = async () => {
  require("dotenv").config();
  const fs = require("fs");
  const paths = require("../config/paths");
  const puppeteer = require("puppeteer");
  const PORT = process.env.PORT || 8383;

  const { sleep } = require("./utils");

  try {
    // TODO: add try/wait/retry here instead of just generally waiting for 2000 ms
    await sleep(2000);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`);
    const pageContent = await page.content();
    fs.writeFileSync(`${paths.clientBuild}/index.html`, pageContent);
    await browser.close();
    await process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

generateStaticHTML();
