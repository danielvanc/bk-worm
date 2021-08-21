const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

module.exports = {
  // TODO: Re-enable webpack5 once issue with Tailwind is resolved.
  // Issue is that tailwind doesn't work on 5.
  webpack5: false,
  reactStrictMode: true,
  rewrites: () => [STUDIO_REWRITE],

  typescript: {
    ignoreBuildErrors: true,
  },
}