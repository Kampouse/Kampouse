// Dependencies:
// - puppeteer: for browser automation and taking screenshots
// - fs: for file system operations
// - path: for handling file paths
import puppeteer from 'puppeteer';

import fs from 'fs';
import path from 'path';

[
  'https://www.example.com',
  'https://www.google.com',
  'https://www.github.com'
];

const websites = [
  "https://goodpalette.io/",
  "https://tailwind.ink/",
  "https://tailwindmate.jaleelbennett.com/",
  "https://fffuel.co/",
  "https://refero.design/",
  "https://uicolors.app/create",
  "https://designresourc.es/",
  "https://tailwind-generator.com/generators",
  "https://uiverse.io/",
  "https://wheretohostmy.app/",
  "https://zed.dev/",
  "https://imgcdn.dev/"
]



async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const url of websites) {
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.setViewport({ width: 1920, height: 941 });
      const screenshotPath = path.join(__dirname, 'screenshots', `${new URL(url).hostname}.png`);
      await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Screenshot saved for ${url}`);
    } catch (error) {
      console.error(`Error taking screenshot for ${url}:`, error);
    }
  }

  await browser.close();
}

takeScreenshots().catch(console.error);
