import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

// Check that button doesn't have the duplicate svg
const btnMatch = html.match(/<button class="btn-create-order"[\s\S]*?<\/button>/);
console.log('Button HTML:', btnMatch ? btnMatch[0].trim() : 'NOT FOUND');
console.log('Contains SVG inside btn-create-order:', btnMatch ? btnMatch[0].includes('<svg') : false);
console.log('CSS padding 0.52rem 1rem:', html.includes('padding: 0.52rem 1rem;'));
console.log('CSS height 38px:', html.includes('height: 38px;'));
