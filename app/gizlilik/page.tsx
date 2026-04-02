import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Dijital Pazarlama Ajansı",
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Gizlilik Politikası</h1>
        <p className="text-foreground/40 text-sm mb-10">Son güncelleme: Nisan 2026</p>

        <div className="prose prose-invert max-w-none flex flex-col gap-8">
          {[
            {
              title: "1. Toplanan Veriler",
              content: `Web sitemizi ziyaret ettiğinizde veya iletişim formumuzu doldurduğunuzda aşağıdaki veriler toplanabilir:
              Ad, soyad, e-posta adresi, telefon numarası ve mesaj içeriği (form aracılığıyla).
              IP adresi, tarayıcı türü, ziyaret edilen sayfalar (analytics aracılığıyla).
              Çerezler (cookies) aracılığıyla oturum bilgileri.`,
            },
            {
              title: "2. Verilerin Kullanım Amacı",
              content: `Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılır:
              Talep ettiğiniz hizmetleri sağlamak ve size dönüş yapmak.
              Web sitesi performansını analiz etmek ve geliştirmek.
              Yasal yükümlülükleri yerine getirmek.`,
            },
            {
              title: "3. Veri Güvenliği",
              content: `Kişisel verileriniz, yetkisiz erişime karşı endüstri standardı güvenlik önlemleriyle korunmaktadır. Verileriniz üçüncü taraflarla ticari amaçla paylaşılmaz.`,
            },
            {
              title: "4. KVKK Uyumluluğu",
              content: `6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinize ilişkin haklarınızı kullanmak için info@ajans.com adresine başvurabilirsiniz. Verilerinize erişim, düzeltme, silme veya aktarım talep etme hakkına sahipsiniz.`,
            },
            {
              title: "5. Çerezler (Cookies)",
              content: `Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı işlevler çalışmayabilir.`,
            },
            {
              title: "6. İletişim",
              content: `Gizlilik politikamız hakkında sorularınız için: info@ajans.com`,
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
              <p className="text-foreground/60 leading-relaxed whitespace-pre-line text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
