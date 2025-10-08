const fs = require('fs');
const path = require('path');

// Import the markdown data
const MARKDOWN_DATA_PATH = path.join(__dirname, '../src/utils/markdownData.ts');
const PROJECT_ROOT = path.join(__dirname, '..');

// Base HTML template
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}" />
    <meta name="keywords" content="{{KEYWORDS}}" />
    <meta name="author" content="Native Fruits" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">

    <meta property="og:title" content="{{OG_TITLE}}" />
    <meta property="og:description" content="{{OG_DESCRIPTION}}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="{{OG_IMAGE}}" />
    <link rel="canonical" href="{{CANONICAL_URL}}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:title" content="{{OG_TITLE}}" />
    <meta name="twitter:description" content="{{OG_DESCRIPTION}}" />
    <meta name="twitter:image" content="{{OG_IMAGE}}" />
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    <script type="application/ld+json">
{{STRUCTURED_DATA}}
    </script>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body>
</html>`;

// Read markdown data
if (!fs.existsSync(MARKDOWN_DATA_PATH)) {
  console.error('Markdown data not found. Please run `npm run generate-markdown` first.');
  process.exit(1);
}

const markdownDataContent = fs.readFileSync(MARKDOWN_DATA_PATH, 'utf8');

// Extract the markdownPages object from the TypeScript file
const markdownPagesMatch = markdownDataContent.match(/export const markdownPages: Record<string, MarkdownSEOPage> = ({[\s\S]*?});/);
if (!markdownPagesMatch) {
  console.error('Could not extract markdownPages from markdownData.ts');
  process.exit(1);
}

let markdownPages;
try {
  // Safely evaluate the extracted object
  markdownPages = eval(`(${markdownPagesMatch[1]})`);
} catch (error) {
  console.error('Failed to parse markdownPages:', error);
  process.exit(1);
}

// Generate HTML entry files for each SEO page
Object.entries(markdownPages).forEach(([slug, pageData]) => {
  const { data } = pageData;
  
  // Create structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.title,
    "description": data.description,
    "url": data.canonicalUrl,
    "mainEntity": {
      "@type": "Article",
      "headline": data.heroTitle || data.title,
      "description": data.heroDescription || data.description,
      "url": data.canonicalUrl
    }
  };

  // Replace template placeholders
  let htmlContent = HTML_TEMPLATE
    .replace(/{{TITLE}}/g, data.title)
    .replace(/{{DESCRIPTION}}/g, data.description)
    .replace(/{{KEYWORDS}}/g, data.keywords)
    .replace(/{{OG_TITLE}}/g, data.ogTitle)
    .replace(/{{OG_DESCRIPTION}}/g, data.ogDescription)
    .replace(/{{OG_IMAGE}}/g, data.ogImage)
    .replace(/{{CANONICAL_URL}}/g, data.canonicalUrl)
    .replace(/{{STRUCTURED_DATA}}/g, JSON.stringify(structuredData, null, 6));

  // Write the HTML file
  const htmlPath = path.join(PROJECT_ROOT, `${slug}.html`);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Generated HTML entry: ${slug}.html`);
});

console.log(`Generated ${Object.keys(markdownPages).length} HTML entry files successfully!`);