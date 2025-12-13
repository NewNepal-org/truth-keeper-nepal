import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QueryClient } from '@tanstack/react-query';
import { getCases, getStatistics } from '../src/services/jds-api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pages to pre-render
const pagesToPrerender = [
  { url: '/', prefetch: true },
  { url: '/about', prefetch: false },
  { url: '/information', prefetch: false },
];

async function prerender() {
  // Import the server entry after build
  const { render } = await import('../dist/server/entry-server.js');
  
  // Read the client template
  const template = fs.readFileSync(
    path.resolve(__dirname, '../dist/client/index.html'),
    'utf-8'
  );

  // Create output directory for prerendered pages
  const outputDir = path.resolve(__dirname, '../dist/client');

  for (const page of pagesToPrerender) {
    console.log(`Prerendering ${page.url}...`);
    
    // Create a new QueryClient for each page
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    // Prefetch data for the home page
    if (page.url === '/' && page.prefetch) {
      try {
        console.log('  Prefetching cases and statistics...');
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: ['cases', { page: 1 }],
            queryFn: () => getCases({ page: 1 }),
          }),
          queryClient.prefetchQuery({
            queryKey: ['statistics'],
            queryFn: getStatistics,
          }),
        ]);
        console.log('  Data prefetched successfully');
      } catch (error) {
        console.warn('  Warning: Could not prefetch data:', error instanceof Error ? error.message : String(error));
      }
    }

    // Render the page
    const { html, dehydratedState } = await render({
      url: page.url,
      queryClient,
    });

    // Insert the rendered HTML and dehydrated state into the template
    const renderedHtml = template
      .replace('<!--app-html-->', html)
      .replace(
        '</head>',
        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script></head>`
      );

    // Determine output file path
    const outputPath = page.url === '/' 
      ? path.join(outputDir, 'index.html')
      : path.join(outputDir, page.url.slice(1), 'index.html');

    // Create directory if needed
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the rendered HTML
    fs.writeFileSync(outputPath, renderedHtml);
    console.log(`  ✓ Generated ${outputPath}`);
  }

  console.log('\nPrerendering complete!');
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
