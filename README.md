# ระบบจัดการวันลา โรงเรียนบ้านห้วยไคร้ สพป.สุโขทัย เขต 2

ระบบจัดการวันลาออนไลน์ ยื่นใบลา อนุมัติ 2 ขั้นตอน (หัวหน้าวิชาการ -> ผู้อำนวยการ) พิมพ์แบบใบลาทางการ A4 และซิงค์ Google Sheets / LINE Notify

---

## 🚀 วิธีเปิดใช้งานบนเครื่องตัวเอง (Local Development)

หาก Clone โปรเจกต์นี้มาจาก GitHub ให้เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วทำตามขั้นตอนดังนี้:

```bash
# 1. ติดตั้ง Dependencies ทั้งหมด
npm install

# 2. รันระบบ (โหมดพัฒนา)
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่: **`http://localhost:3000`** (อย่าดับเบิ้ลคลิกไฟล์ `index.html` ตรงๆ เพราะเบราว์เซอร์ไม่สามารถรันไฟล์ `.tsx` ได้)

---

## 🌐 วิธีนำขึ้น GitHub Pages ให้ไม่เป็นหน้าขาว (404 main.tsx)

สาเหตุที่หน้าเว็บขาวและขึ้น `404 main.tsx` เกิดจากการที่ GitHub Pages นำไฟล์ต้นฉบับไปเปิดโดยตรง โดยที่ยังไม่ได้ผ่านการ **Build** เป็นไฟล์ JavaScript

### วิธีตั้งค่า GitHub Pages ให้เปิดใช้งานได้อัตโนมัติ:
1. นำโค้ดทั้งหมด Push ขึ้น GitHub Repository
2. เข้าไปที่เมนู **Settings** ของ GitHub Repository นั้น
3. เลือกแท็บ **Pages** (ทางแถบเมนูด้านซ้าย)
4. ในส่วน **Build and deployment > Source**:
   - เปลี่ยนจาก `Deploy from a branch` ให้เป็น 👉 **`GitHub Actions`**
5. ระบบจะดึงไฟล์ `.github/workflows/deploy.yml` ที่ตั้งไว้ขึ้นมา Build อัตโนมัติ รอ 1-2 นาที เมื่อเสร็จแล้วหน้าเว็บจะใช้งานได้ปกติ ไม่ขาว และไม่มี 404 อีกต่อไป!

---

## ☁️ แนะนำสำหรับการใช้งานที่มี Backend (Express Server)

ระบบนี้มี Backend Node.js Express (`server.ts`) สำหรับ:
- ฐานข้อมูลกลาง `/api/database` (บันทึกข้อมูลร่วมกันข้ามเครื่องในไฟล์ `/data/db.json`)
- Proxy แจ้งเตือนเข้ากลุ่ม LINE Messaging API (`/api/line-notify`)
- Proxy ซิงค์ข้อมูลกับ Google Sheets (`/api/cloud-sync`)

หากต้องการให้ฟังก์ชันข้างต้นทำงานได้ 100% ครบทุกฟังก์ชัน แนะนำให้นำไปต่อกับบริการ Cloud ฟรีที่รองรับ Node.js เช่น:
- **Render.com** (ฟรี แนะนำมากที่สุด: เลือก New Web Service เชื่อม GitHub สั่งรัน `npm install && npm run build` และ Start command: `npm start`)
- **Railway.app**
- **Vercel**
