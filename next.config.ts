import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Projenin statik HTML olarak çıktı vermesini sağlar
  basePath: '/cigdemWebsite', // GitHub Pages'taki repo adın
  trailingSlash: true, // GitHub Pages'te /hakkimda gibi linklerin 404 vermesini önler
  images: {
    unoptimized: true, // Statik exportlarda Next.js Image bileşeninin hata vermesini önler
  },
};

export default nextConfig;