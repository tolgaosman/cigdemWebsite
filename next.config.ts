import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Projenin statik HTML olarak çıktı vermesini sağlar
  basePath: '/cigdemWebsite', // GitHub Pages'taki repo adın
  images: {
    unoptimized: true, // Statik exportlarda Next.js Image bileşeninin hata vermesini önler
  },
};

export default nextConfig;