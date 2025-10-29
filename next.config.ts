import { dirname } from "node:path";
import { URL } from "node:url";

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

  images: {
    remotePatterns: [
      new URL("https://picsum.photos/**"),
      new URL("https://fastly.picsum.photos/**"),
    ],
  },
};

export default nextConfig;
