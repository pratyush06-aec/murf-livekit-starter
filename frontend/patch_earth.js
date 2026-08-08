const fs = require('fs');

let html = fs.readFileSync('d:/murf-livekit-starter/frontend/public/earth2050/index.html', 'utf8');

// Replace href="/..." with href="./..." for css, js, images
html = html.replace(/(href|src)="\/([^"']+)"/g, '$1="./$2"');

const css = `<style>
.k-menu, .best-of-week, .footer, .search-form, .earth-popup, .help, .timeline-new, .toogle-map-mobile, .mobile-menu, .kaspersky-app__map .modal, .transition-wrapper, .prediction-block-small, .year-town-block, .toogle-page, .authorization, .logo, .notifications-dot-tooltip, .earth-mobile-tip { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
body { background-color: transparent !important; overflow: hidden !important; }
canvas { pointer-events: auto !important; }
</style></head>`;

html = html.replace('</head>', css);

fs.writeFileSync('d:/murf-livekit-starter/frontend/public/earth2050/index.html', html);
console.log('HTML rewritten successfully.');
