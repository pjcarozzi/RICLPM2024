const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');


const slidesDir = path.resolve(__dirname, '../../_site/slides'); 
const thumbnailsDir = path.resolve(__dirname, '../web'); 


if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  

  const slideFiles = fs.readdirSync(slidesDir).filter(file => file.endsWith('.qmd') || file.endsWith('.html'));
  
  for (const file of slideFiles) {
    const filePath = path.join(slidesDir, file); 
    const thumbnailPath = path.join(thumbnailsDir, file.replace('.qmd', '-thumbnail.png').replace('.html', '-thumbnail.png')); // Ruta a la miniatura
    

    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle2' });
    

    await page.screenshot({ path: thumbnailPath, fullPage: true });
  }
  
  await browser.close();
})();
