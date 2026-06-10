const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('products.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(sheet);
console.log('Sheet names:', workbook.SheetNames);
console.log('Raw data:', raw);

const data = raw.map(product => ({
  ...product,
  image: `https://images.asics.com/is/image/asics/${product.sku.replace(/-/g, '_')}_SR_RT_GLB?qlt=100&wid=1280&hei=1452&bgc=255,255,255&resMode=bisharp`
}));

const jsContent = `const inventoryData = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('products.js', jsContent);
console.log(`Generated products.js with ${data.length} products`);
