import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sequelize", "pg", "sqlite3"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
