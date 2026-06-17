import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Breakfast Pizza now lives under /catering — keep the old URL working.
      {
        source: "/breakfast-pizza",
        destination: "/catering/breakfast-pizza",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
