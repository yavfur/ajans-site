import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin kullanıcı
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@ajans.com" },
    update: {},
    create: {
      email: "admin@ajans.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin oluşturuldu:", admin.email);

  // Örnek hizmetler
  const services = [
    { name: "Paid Advertising", description: "Meta & Google Ads yönetimi", icon: "🎯" },
    { name: "E-commerce Development", description: "Shopify geliştirme ve CRO", icon: "🛍️" },
    { name: "Content & Creative", description: "İçerik üretimi ve tasarım", icon: "📝" },
    { name: "Marketplace Yönetimi", description: "Trendyol & pazaryerleri", icon: "🏪" },
    { name: "Sosyal Medya Yönetimi", description: "Instagram, TikTok, Facebook", icon: "📱" },
  ];

  const existing = await prisma.service.count();
  if (existing === 0) {
    await prisma.service.createMany({ data: services });
    console.log("✅ Hizmetler oluşturuldu.");
  } else {
    console.log("ℹ️ Hizmetler zaten mevcut, atlandı.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
