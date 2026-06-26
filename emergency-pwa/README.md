# แผนรับมือเหตุฉุกเฉินผู้สูงอายุ — PWA

Progressive Web App สำหรับแผนรับมือเหตุฉุกเฉินผู้สูงอายุที่อยู่คนเดียว  
อ้างอิงมาตรฐาน WHO / AHA / EMS

## Features
- ประเมินอาการ (Yes/No scoring)
- BE-FAST Stroke Check
- CPR Guide
- ระดับความรุนแรง 3 ระดับ
- SAMPLE History + Timestamp
- เบอร์ติดต่อ (กดโทรได้ทันที)
- ข้อมูลผู้ป่วย (เก็บใน localStorage)
- ใช้งาน Offline ได้ (Service Worker)
- ติดตั้งบนมือถือได้ (Add to Home Screen)

---

## 🚀 วิธี Deploy ฟรีบน Vercel (5 นาที)

### ขั้นตอนที่ 1 — GitHub
1. สมัคร [github.com](https://github.com) (ฟรี)
2. กด **New repository** → ตั้งชื่อ `emergency-pwa` → กด **Create**
3. Upload ไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น repository (ลาก drop ได้เลย)

### ขั้นตอนที่ 2 — Vercel
1. สมัคร [vercel.com](https://vercel.com) ด้วย GitHub account
2. กด **Add New Project** → เลือก repository `emergency-pwa`
3. Framework: **Vite** (Vercel จะตรวจจับอัตโนมัติ)
4. กด **Deploy**
5. รอ 1–2 นาที → ได้ Link เช่น `emergency-pwa.vercel.app`

### ขั้นตอนที่ 3 — แชร์ผ่าน Line
- ส่ง Link ผ่าน Line ให้ครอบครัวได้เลย
- เปิดใน Browser → กด "Add to Home Screen" → ได้ App บนมือถือทันที

---

## 🛠 วิธี Run ในเครื่องเพื่อทดสอบ (ต้องมี Node.js)

```bash
npm install
npm run dev
```

เปิด http://localhost:5173

```bash
npm run build    # Build สำหรับ production
npm run preview  # Preview build
```

---

## 📁 โครงสร้างไฟล์

```
src/
├── pages/
│   ├── SetupPage.tsx       # หน้าตั้งค่าข้อมูลส่วนตัว
│   ├── HomePage.tsx        # หน้าหลัก + SOS buttons
│   ├── AssessPage.tsx      # ประเมินอาการ
│   ├── StrokePage.tsx      # BE-FAST Stroke check
│   ├── CprPage.tsx         # CPR guide
│   ├── LevelsPage.tsx      # ระดับความรุนแรง
│   ├── SamplePage.tsx      # SAMPLE history + timestamp
│   ├── ContactsPage.tsx    # เบอร์ติดต่อ
│   └── PatientInfoPage.tsx # ข้อมูลผู้ป่วย
├── components/
│   ├── Layout.tsx          # Bottom navigation
│   └── PageHeader.tsx      # Header ของแต่ละหน้า
├── lib/
│   └── storage.ts          # localStorage utilities
└── App.tsx                 # Router
```

---

## 🔧 ปรับแต่ง

ข้อมูลส่วนตัว (ชื่อ เบอร์โทร ฯลฯ) ผู้ใช้กรอกเองในหน้า Setup  
ไม่มี backend ทั้งหมดเก็บใน localStorage ของเครื่องผู้ใช้

---

*อ้างอิงมาตรฐาน WHO / AHA / EMS — ไม่ใช่คำแนะนำทางการแพทย์อย่างเป็นทางการ*  
*กรณีฉุกเฉินให้โทร 1669 เสมอ*
