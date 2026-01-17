# How to Add Your Own Photos 📸

## Option 1: Using Local Images (Recommended)

1. Create a folder called `public` in your project root (if it doesn't exist)
2. Create a subfolder `public/images` 
3. Add your photos to `public/images/` (e.g., `photo1.jpg`, `photo2.jpg`)
4. Open `app/memories/page.tsx`
5. Replace the image URLs in the `memories` array:

```typescript
{
  id: 1,
  image: '/images/photo1.jpg',  // Changed from URL to local path
  title: 'Our First Date',
  date: 'The day it all began',
  description: 'Remember when we first met? That magical moment changed everything.',
},
```

## Option 2: Using Online Images

1. Upload your photos to a service like:
   - Imgur
   - Google Photos (shareable links)
   - Cloudinary
   - Your own website
2. Copy the direct image URL
3. Replace the URLs in `app/memories/page.tsx` with your image URLs

## Supported Image Formats
- JPG/JPEG
- PNG
- WebP
- GIF

## Tips
- Use high-quality images for best results
- Recommended size: 800x600px or larger
- Keep file sizes reasonable (under 2MB per image) for faster loading
