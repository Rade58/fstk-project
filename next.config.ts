import { dirname } from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // added this in case we are having multiple projects in one repo
  // We don't have multiple projects but it's good to be explicit
  // We would use this in turborepo monorepos especially
  turbopack: {
    root: dirname(__filename),
  },
  // ------------------------------------------------------
};

export default nextConfig;
