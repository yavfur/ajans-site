import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://ajans-site.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/hizmetler", "/hakkimizda", "/iletisim", "/gizlilik"],
        disallow: ["/admin", "/dashboard", "/api", "/giris"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
