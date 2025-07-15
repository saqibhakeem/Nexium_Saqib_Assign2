import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return Response.json({ error: 'No URL provided.' }, { status: 400 });
    }

    const isProd = process.env.VERCEL === '1';

    const browser = await puppeteer.launch({
      args: isProd ? chromium.args : [],
      executablePath: isProd
        ? await chromium.executablePath()
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 🧠 adjust this if needed
      headless: true,
    });

    const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds manually


    const title = await page.title();
    const content = await page.evaluate(() => {
      const article = document.querySelector('article');
      return (article?.innerText || document.body.innerText || '').trim();
    });

    await browser.close();

    return Response.json({ title, content });
  } catch (error) {
    console.error("❌ Scraper Error:", error);
    return Response.json({ error: 'Scraping failed. Please try again.' }, { status: 500 });
  }
}
