# Case Detail Layout Screenshots

## Important Note

The screenshots captured during automated testing show "Failed to load case details" error states. This is because the automated screenshot tool had port mismatch issues (server started on port 8083 but script used port 8080).

## How to View Working Layouts

To see the fully functional layouts with actual case data, please visit:

### Live Preview URLs

**Layout Selector:**
- https://beta.jawafdehi.org/case/175/layout/selector

**Individual Layouts:**
- **Layout 1 (Hero Image):** https://beta.jawafdehi.org/case/175/layout/1
- **Layout 2 (Side-by-Side):** https://beta.jawafdehi.org/case/175/layout/2
- **Layout 3 (Card-Based):** https://beta.jawafdehi.org/case/175/layout/3
- **Layout 4 (Compact Inline):** https://beta.jawafdehi.org/case/175/layout/4

## Layout Descriptions

### Layout 1: Hero Image with Overlay
- Full-width hero image (500px height)
- Title and metadata overlaid on image with gradient
- Dramatic, magazine-style presentation
- **Visual Impact:** ⭐⭐⭐⭐⭐

### Layout 2: Side-by-Side
- Two-column layout with sticky image
- Metadata organized in sidebar cards
- Professional, report-style presentation
- **Visual Impact:** ⭐⭐⭐⭐

### Layout 3: Card-Based (Recommended)
- Featured image in card (400px height)
- Three-column metadata grid
- Clean, modular design
- **Visual Impact:** ⭐⭐⭐⭐
- **Best for general use**

### Layout 4: Compact Inline
- Floating image to right (desktop)
- Inline metadata, compact format
- Traditional article style
- **Visual Impact:** ⭐⭐⭐

## Test Image Used

All layouts use the thumbnail image:
```
https://s3.jawafdehi.org/cases/giribandhu/giribandhu-tea-estate.jpeg
```

## Viewing Instructions

1. Visit the layout selector URL above
2. Click on any layout card to preview that layout
3. Use the "Back to Layout Selector" button to try different layouts
4. Test on different devices (mobile, tablet, desktop)

## Next Steps

After reviewing the live layouts:
1. Select preferred layout design
2. Provide feedback on any adjustments needed
3. The selected layout will be applied to the main CaseDetail component
