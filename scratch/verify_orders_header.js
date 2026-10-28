import fs from 'fs';
const s = fs.readFileSync('dashboard.html', 'utf8');

console.log('Subtitle in HTML:', s.includes('Suivez et expédiez les commandes'));
console.log('Badge in HTML:', s.includes('id="orders-count-badge"'));
console.log('Title size 1.55rem:', s.includes('font-size: 1.55rem;'));
