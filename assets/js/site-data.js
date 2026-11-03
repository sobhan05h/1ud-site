/**
 * فایل داده‌های اصلی سایت 1ud.ir
 * این فایل بدون نیاز به بک‌اند یا دیتابیس، تمام اطلاعات سایت را نگه می‌دارد.
 * از طریق پنل مدیریت (/admin) می‌توانید تغییرات را انجام دهید و فایل جدید را دانلود و جایگزین کنید
 * یا از همگام‌سازی ابری رایگان (Cloud Sync) داخل پنل ادمین استفاده نمایید.
 */
window.DEFAULT_SITE_DATA = {
  meta: {
    siteName: "1ud.ir",
    brandShort: "1UD",
    pageTitle: "1ud.ir | پورتفولیو تخصصی، پروژه‌ها و مهارت‌های من",
    adminPin: "1234",
    cloudEndpoint: "",
    cloudApiKey: ""
  },
  theme: {
    bgPrimary: "#04070d",
    bgSecondary: "#08101f",
    darkBlue: "#0d2847",
    midBlue: "#1d4ed8",
    lightBlue: "#00d4ff",
    cyanGlow: "#38bdf8"
  },
  hero: {
    badge: "آماده همکاری در پروژه‌های ویژه",
    greeting: "سلام، من توسعه‌دهنده و خالق",
    name: "1UD",
    roleTitle: "طراح و توسعه‌دهنده نرم‌افزار و وب",
    bio: "به وب‌سایت رسمی 1ud.ir خوش آمدید. من بر ساخت محصولات دیجیتال سریع، مدرن و مقیاس‌پذیر تمرکز دارم. در اینجا می‌توانید مجموعه‌ای از پروژه‌های انجام‌شده، مهارت‌های فنی و مسیر حرفه‌ای من را مشاهده کنید.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    primaryCtaText: "مشاهده پروژه‌ها",
    primaryCtaLink: "#projects",
    secondaryCtaText: "ارتباط با من",
    secondaryCtaLink: "#contact",
    stats: [
      { id: "st1", value: "+۲۵", label: "پروژه موفق" },
      { id: "st2", value: "+۴ سال", label: "تجربه تخصصی" },
      { id: "st3", value: "۱۰۰٪", label: "رضایت کارفرما" },
      { id: "st4", value: "۲۴/۷", label: "پشتیبانی فنی" }
    ]
  },
  about: {
    title: "درباره من و داستان 1UD",
    subtitle: "ترکیب مهندسی دقیق، طراحی مدرن و عملکرد بی‌نقص",
    description: "من با علاقه‌ای عمیق به حل مسائل پیچیده و خلق رابط‌های کاربری چشم‌نواز وارد دنیای برنامه‌نویسی شدم. هدف من در 1ud.ir ارائه راهکارهایی است که نه‌تنها از نظر ظاهری در سطح جهانی باشند، بلکه از نظر سرعت، امنیت و تجربه کاربری نیز بالاترین استانداردها را رعایت کنند.",
    highlights: [
      "توسعه معماری‌های سبک، سریع و بهینه بدون هزینه‌های اضافی سرور",
      "طراحی رابط کاربری مدرن با تم‌های تیره (Dark UI) و جلوه‌های نئونی",
      "تسلط بر چرخه کامل تولید محصول از ایده و طراحی تا پیاده‌سازی نهایی",
      "کدنویسی تمیز، مستندسازی کامل و تحویل به‌موقع پروژه‌ها"
    ]
  },
  skills: [
    { id: "sk1", name: "JavaScript / TypeScript", category: "فرانت‌اند", level: 95, badge: "ارشد" },
    { id: "sk2", name: "React & Next.js", category: "فرانت‌اند", level: 90, badge: "حرفه‌ای" },
    { id: "sk3", name: "HTML5 / CSS3 / Tailwind", category: "فرانت‌اند", level: 98, badge: "استاد" },
    { id: "sk4", name: "UI/UX & Dark Mode Design", category: "طراحی", level: 92, badge: "حرفه‌ای" },
    { id: "sk5", name: "Node.js & REST APIs", category: "بک‌اند و ابزار", level: 85, badge: "پیشرفته" },
    { id: "sk6", name: "Python & Automation", category: "بک‌اند و ابزار", level: 88, badge: "پیشرفته" },
    { id: "sk7", name: "Git, Docker & Linux", category: "بک‌اند و ابزار", level: 86, badge: "پیشرفته" },
    { id: "sk8", name: "SEO & Web Performance", category: "طراحی", level: 94, badge: "حرفه‌ای" }
  ],
  projects: [
    {
      id: "pr1",
      title: "پلتفرم تحلیلی 1UD Cloud",
      category: "وب اپلیکیشن",
      description: "داشبورد مانیتورینگ و تحلیل داده‌های لحظه‌ای با رابط کاربری مشکی و نئون آبی، طراحی‌شده برای پردازش سریع داده‌ها در سمت کلاینت.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      tags: ["React", "TypeScript", "TailwindCSS", "Chart.js"],
      liveUrl: "https://1ud.ir",
      repoUrl: "https://github.com",
      featured: true,
      date: "۱۴۰۴"
    },
    {
      id: "pr2",
      title: "سیستم مدیریت محتوای بدون سرور (Zero-Backend CMS)",
      category: "ابزار توسعه‌دهنده",
      description: "معماری فوق‌سبک برای مدیریت کامل وب‌سایت‌های شخصی و شرکتی از طریق پنل /admin بدون نیاز به دیتابیس و هزینه‌های سنگین هاستینگ.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      tags: ["Vanilla JS", "LocalStorage", "JSON Sync", "SPA"],
      liveUrl: "https://1ud.ir/admin",
      repoUrl: "https://github.com",
      featured: true,
      date: "۱۴۰۴"
    },
    {
      id: "pr3",
      title: "اپلیکیشن کیف پول و ترید نئون",
      category: "رابط کاربری",
      description: "طراحی و پیاده‌سازی رابط کاربری صرافی دیجیتال با گراف‌های زنده، حالت تاریک اختصاصی و انیمیشن‌های روان ۶۰ فریم بر ثانیه.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80",
      tags: ["Next.js", "WebSockets", "Framer Motion", "CSS Grid"],
      liveUrl: "https://1ud.ir",
      repoUrl: "https://github.com",
      featured: true,
      date: "۱۴۰۳"
    },
    {
      id: "pr4",
      title: "ربات هوشمند و اتوماسیون تحت وب",
      category: "هوش مصنوعی و اسکریپت",
      description: "سیستم خودکارسازی فرآیندهای کاری و استخراج اطلاعات با پنل کنترل تحت وب و گزارش‌دهی لحظه‌ای در تلگرام.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      tags: ["Python", "FastAPI", "Telegram API", "Automation"],
      liveUrl: "https://1ud.ir",
      repoUrl: "https://github.com",
      featured: false,
      date: "۱۴۰۳"
    }
  ],
  experiences: [
    {
      id: "ex1",
      role: "توسعه‌دهنده ارشد و موسس 1UD",
      company: "1ud.ir (فریلنس و پروژه‌های اختصاصی)",
      period: "۱۴۰۲ - اکنون",
      description: "طراحی و اجرای ده‌ها پروژه وب‌سایت، پنل‌های مدیریتی و اپلیکیشن‌های تحت وب با تمرکز بر سرعت بالا و طراحی اختصاصی."
    },
    {
      id: "ex2",
      role: "توسعه‌دهنده فرانت‌اند (Front-End Developer)",
      company: "استودیو فناوری پیشرو",
      period: "۱۴۰۰ - ۱۴۰۲",
      description: "توسعه رابط‌های کاربری واکنش‌گرا (Responsive)، بهینه‌سازی سئو تکنیکال و کاهش زمان بارگذاری صفحات تا ۶۵ درصد."
    },
    {
      id: "ex3",
      role: "شروع مسیر برنامه‌نویسی و طراحی وب",
      company: "پروژه‌های متن‌باز و دانشگاهی",
      period: "۱۳۹۸ - ۱۴۰۰",
      description: "یادگیری عمیق ساختمان داده‌ها، الگوریتم‌ها، جاوااسکریپت مدرن و ساخت ابزارهای کاربردی تحت وب."
    }
  ],
  services: [
    {
      id: "sv1",
      title: "طراحی سایت‌های اختصاصی و فوق سریع",
      description: "پیاده‌سازی انواع وب‌سایت‌های شخصی، شرکتی و پورتفولیو با بالاترین امتیاز پرفورمنس و ظاهری متمایز.",
      icon: "code"
    },
    {
      id: "sv2",
      title: "توسعه وب‌اپلیکیشن و داشبورد (SPA)",
      description: "ساخت پنل‌های مدیریتی پیشرفته، سیستم‌های تک‌صفحه‌ای و رابط‌های کاربری تعاملی با تکنولوژی‌های روز.",
      icon: "layers"
    },
    {
      id: "sv3",
      title: "بهینه‌سازی سرعت، سئو و استقرار ارزان",
      description: "راه‌اندازی سایت روی سرورهای سبک، رایگان یا اقتصادی بدون نیاز به هزینه‌های سنگین نگهداری بک‌اند.",
      icon: "zap"
    }
  ],
  contact: {
    email: "info@1ud.ir",
    telegram: "https://t.me/1ud_ir",
    github: "https://github.com/1ud",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    phone: "۰۹۱۲۰۰۰۰۰۰۰",
    location: "ایران | همکاری به‌صورت ریموت در سراسر جهان",
    footerNote: "تمامی حقوق برای وب‌سایت 1ud.ir محفوظ است. طراحی‌شده با معماری Zero-Backend."
  }
};
