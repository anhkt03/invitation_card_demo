import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cố định root là thư mục FE — nếu không, một package-lock.json lạc ở thư mục
  // gốc repo sẽ khiến Next coi cả monorepo là root và không resolve được node_modules của FE.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
