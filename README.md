# Next.js SPA Dashboard

یک داشبورد مدرن با Next.js که شامل سیستم احراز هویت، مدیریت سرورها، منابع و کاربران است.

## ویژگی‌ها

- 🎨 **دارک مود**: پشتیبانی کامل از تم تاریک و روشن
- 🔐 **سیستم احراز هویت**: لاگین با نام کاربری و رمز عبور
- 📊 **داشبورد**: نمایش آمار و اطلاعات کلی
- 🖥️ **مدیریت سرورها**: مشاهده و مدیریت سرورها
- 📈 **مدیریت منابع**: نظارت بر CPU، Memory و Storage
- 👥 **مدیریت کاربران**: مدیریت نقش‌های کاربران
- 🎯 **Parallel Routes**: استفاده از Next.js Parallel Routes برای header
- 📱 **Responsive**: طراحی واکنش‌گرا برای تمام دستگاه‌ها

## تکنولوژی‌های استفاده شده

- **Next.js 15** - فریم‌ورک React
- **TypeScript** - زبان برنامه‌نویسی
- **Tailwind CSS** - فریم‌ورک CSS
- **Zustand** - مدیریت state
- **Parallel Routes** - برای header داشبورد

## نصب و راه‌اندازی

1. **کلون کردن پروژه:**
```bash
git clone git@github.com:hassanzadeh-mj/spa.git
cd spa
```

2. **نصب وابستگی‌ها:**
```bash
npm install
```

3. **اجرای پروژه:**
```bash
npm run dev
```

4. **باز کردن در مرورگر:**
```
http://localhost:3000
```

## اطلاعات ورود

برای تست سیستم:
- **نام کاربری:** `admin`
- **رمز عبور:** `admin`

## ساختار پروژه

```
src/
├── app/                    # App Router
│   ├── (dashboard)/       # Route Group برای داشبورد
│   │   ├── @header/       # Parallel Route برای header
│   │   ├── layout.tsx     # Layout داشبورد
│   │   ├── page.tsx       # صفحه اصلی
│   │   ├── servers/       # صفحات سرورها
│   │   ├── resources/     # صفحات منابع
│   │   └── users/         # صفحات کاربران
│   ├── login/             # صفحه لاگین
│   ├── api/               # API Routes
│   ├── globals.css        # استایل‌های全局
│   └── layout.tsx         # Root Layout
├── components/            # کامپوننت‌های مشترک
├── store/                 # Zustand stores
└── shared/                # کامپوننت‌های shared
```

## ویژگی‌های کلیدی

### 🎨 دارک مود
- تغییر خودکار تم بر اساس تنظیمات سیستم
- ذخیره‌سازی ترجیح کاربر در localStorage
- انیمیشن‌های نرم برای تغییر تم

### 🔐 احراز هویت
- محافظت از routes با AuthGuard
- ذخیره‌سازی وضعیت لاگین در localStorage
- ریدایرکت خودکار به لاگین

### 📊 داشبورد
- نمایش آمار کلی سیستم
- کارت‌های اطلاعاتی با انیمیشن
- طراحی مدرن و کاربرپسند

## توسعه

### اضافه کردن صفحه جدید
1. فایل جدید در `src/app/(dashboard)/` ایجاد کنید
2. Route را در navbar اضافه کنید
3. عنوان صفحه را در header تنظیم کنید

### تغییر تم
- تنظیمات رنگ در `src/app/globals.css`
- کامپوننت‌ها در `src/components/theme-*`

## License

MIT License
