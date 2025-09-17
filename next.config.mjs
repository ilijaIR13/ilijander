/** @type {import('next').NextConfig} */
const nextConfig = {
  // zadrži ako želiš da build ne puca zbog lint/type grešaka
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // NEMOJ stavljati: output: 'export'  (to kida SSR/sesiju)

  experimental: {
    serverActions: {
      // navedi konkretne origene! (zameni ispod svojim domenom)
      allowedOrigins: [
        'http://localhost:3000',
        'https://<tvoj-projekat>.vercel.app',
        // ako imaš custom domen:
        // 'https://tvoj-domen.rs'
      ],
      // opciono: bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
