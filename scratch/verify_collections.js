import fs from 'fs';
const s = fs.readFileSync('dashboard.html', 'utf8');

console.log('1. Header Store Switcher (LIVE dot):', s.includes('id="current-store-name">LIVE'));
console.log('2. Collections Chips IDs:', s.includes('id="col-filter-all"') && s.includes('id="col-filter-active"') && s.includes('id="col-filter-draft"'));
console.log('3. Search Bar Spaced Toolbar:', s.includes('collections-filter-toolbar') && s.includes('id="collection-search-input"'));
console.log('4. Compact Subtitle Style:', s.includes('Organisez vos produits en collections thématiques') && s.includes('font-size: 0.86rem; color: #6B7280;'));
console.log('5. Compact Button Style:', s.includes('Nouvelle collection') && s.includes('height: 38px;') && s.includes('white-space: nowrap;'));
console.log('6. Dynamic JS Functions:', s.includes('updateCollectionsCounts()') && s.includes('loadCollectionsFromStorage()') && s.includes('syncCollectionsToStorage()'));
console.log('7. Safe HTML escaping:', s.includes('function escapeHTML'));
