// utils/cloudinaryUtils.js
// Frontend-only Cloudinary URL optimization (no SDK needed)

const CLOUD_NAME = 'dsxkgilnb';

// Extract public_id from existing Cloudinary URLs
export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) {
    return null;
  }
  
  // Extract public_id from URL like: 
  // https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308899/fearless_i05xj6.png
  const parts = cloudinaryUrl.split('/');
  const fileWithExtension = parts[parts.length - 1];
  const fileName = fileWithExtension.split('.')[0]; // Remove extension
  return fileName;
};

// Build optimized Cloudinary URL manually
const buildOptimizedUrl = (publicId, transformations) => {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  const transformString = transformations.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
};

// Generate optimized URL for card display (400x400)
export const getOptimizedCardUrl = (cloudinaryUrl) => {
  const publicId = extractPublicId(cloudinaryUrl);
  if (!publicId) return cloudinaryUrl;
  
  const transformations = [
    'f_auto',      // Auto-format (WebP for modern browsers)
    'q_auto',      // Auto-quality optimization
    'w_400',       // Width 400px
    'h_400',       // Height 400px
    'c_fill',      // Fill the dimensions, crop if needed
    'g_auto'       // Smart cropping
  ];
  
  return buildOptimizedUrl(publicId, transformations);
};

// Generate optimized URL for hero/banner images
export const getOptimizedHeroUrl = (cloudinaryUrl, width = 800, height = 600) => {
  const publicId = extractPublicId(cloudinaryUrl);
  if (!publicId) return cloudinaryUrl;
  
  const transformations = [
    'f_auto',
    'q_auto',
    `w_${width}`,
    `h_${height}`,
    'c_fill',
    'g_auto'
  ];
  
  return buildOptimizedUrl(publicId, transformations);
};

// Generate thumbnail URL (for cart items, etc.)
export const getThumbnailUrl = (cloudinaryUrl) => {
  const publicId = extractPublicId(cloudinaryUrl);
  if (!publicId) return cloudinaryUrl;
  
  const transformations = [
    'f_auto',
    'q_auto', 
    'w_150',
    'h_150',
    'c_fill',
    'g_auto'
  ];
  
  return buildOptimizedUrl(publicId, transformations);
};

// Simple transformation helper for custom sizes
export const getOptimizedUrl = (cloudinaryUrl, options = {}) => {
  const publicId = extractPublicId(cloudinaryUrl);
  if (!publicId) return cloudinaryUrl;
  
  const {
    width = 400,
    height = 400,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto'
  } = options;
  
  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`
  ];
  
  return buildOptimizedUrl(publicId, transformations);
};