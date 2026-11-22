import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    // Two root layouts ((pt) and [lang]) mean no single layout can wrap a 404 page.
    globalNotFound: true,
  },
};

export default nextConfig;
