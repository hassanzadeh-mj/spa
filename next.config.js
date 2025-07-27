/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // برای static export، API routes غیرفعال می‌شوند
  // اگر API routes نیاز دارید، این گزینه را حذف کنید
};

module.exports = nextConfig; 