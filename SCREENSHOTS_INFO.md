# Case Detail Layout Screenshots

Screenshots of all four layout variants captured with real data from portal.jawafdehi.org API (Case #175).

## Screenshots

### Layout 1: Hero Image with Overlay
- **Viewport**: `layout-1-viewport.png` - Above-the-fold view
- **Full Page**: `layout-1-full.png` - Complete scrollable page

Features a dramatic full-width hero image with title and metadata overlaid.

### Layout 2: Side-by-Side
- **Viewport**: `layout-2-viewport.png` - Above-the-fold view  
- **Full Page**: `layout-2-full.png` - Complete scrollable page

Two-column professional layout with sticky image sidebar.

### Layout 3: Card-Based (Recommended)
- **Viewport**: `layout-3-viewport.png` - Above-the-fold view
- **Full Page**: `layout-3-full.png` - Complete scrollable page

Clean modular design with featured image card and metadata grid.

### Layout 4: Compact Inline
- **Viewport**: `layout-4-viewport.png` - Above-the-fold view
- **Full Page**: `layout-4-full.png` - Complete scrollable page

Traditional article style with floating image and inline metadata.

### Layout Selector
- **Full Page**: `layout-selector.png` - Layout selection interface

## Test Case

All screenshots use Case #175 from the production API with the test thumbnail:
```
https://s3.jawafdehi.org/cases/giribandhu/giribandhu-tea-estate.jpeg
```

## Live Previews

You can also view these layouts live at:
- **Selector**: https://beta.jawafdehi.org/case/175/layout/selector
- **Layout 1**: https://beta.jawafdehi.org/case/175/layout/1
- **Layout 2**: https://beta.jawafdehi.org/case/175/layout/2
- **Layout 3**: https://beta.jawafdehi.org/case/175/layout/3
- **Layout 4**: https://beta.jawafdehi.org/case/175/layout/4

## Technical Notes

Screenshots were captured using Playwright with:
- Viewport size: 1920x1080
- Browser: Chromium (headless)
- SSL certificate validation bypassed for portal.jawafdehi.org
- Wait time: 8 seconds after page load for API data to populate

