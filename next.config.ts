import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/bookings",
        permanent: true, // or false if you may change it later
      },
    ];
  },
};

export default nextConfig;
