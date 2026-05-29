import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/techniques", destination: "/library", permanent: true },
      { source: "/techniques/:path*", destination: "/library", permanent: true },
      { source: "/start-here", destination: "/learn", permanent: true },
      { source: "/how-to-use", destination: "/", permanent: true },
      { source: "/paths", destination: "/learn", permanent: true },
      { source: "/generations", destination: "/learn#generations", permanent: true },
      { source: "/pipeline", destination: "/learn#pipeline", permanent: true },
      { source: "/math", destination: "/learn#foundations", permanent: true },
      { source: "/evaluation", destination: "/learn#evaluation", permanent: true },
      { source: "/tinyml", destination: "/learn#tinyml", permanent: true },
      { source: "/llm", destination: "/learn#modern-ai", permanent: true },
      { source: "/mlops", destination: "/learn#deployment", permanent: true },
      { source: "/mistakes", destination: "/guides#common-errors", permanent: true },
      { source: "/comparisons", destination: "/guides#comparisons", permanent: true },
    ];
  },
};

export default nextConfig;
