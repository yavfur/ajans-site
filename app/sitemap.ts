import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ajans-site.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hizmetler`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gizlilik`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
