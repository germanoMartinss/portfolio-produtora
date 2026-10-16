import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Gera /robots.txt: libera todos os buscadores e aponta o sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
