# Member Space | DIT205

เว็บระบบสมาชิกสำหรับงาน DIT205 สร้างด้วย Next.js App Router, TypeScript, Tailwind CSS และ MySQL-compatible TiDB Cloud

## Features

- Register พร้อม bcrypt password hashing และตรวจอีเมลซ้ำ
- Login ด้วย JWT ใน HttpOnly, SameSite cookie อายุ 1 ชั่วโมง
- จำกัดการสมัครและล็อกอินไว้เฉพาะอีเมลที่กำหนดใน `ALLOWED_LOGIN_EMAIL`
- ป้องกัน `/dashboard` ด้วย `proxy.ts` และตรวจ session ซ้ำที่ `/api/me`
- Logout ลบ session cookie
- เชื่อมต่อ MySQL/TiDB Cloud ผ่าน `mysql2` และ `DATABASE_URL`; เปิด TLS อัตโนมัติเมื่อ host เป็น TiDB Cloud
- หน้าแรกแสดงข้อมูลนักศึกษา: ณัฐตะวัน บุญรอด, 6800738

## Run locally

1. ติดตั้ง Node.js LTS
2. สร้างฐานข้อมูลและตารางด้วย [`database/schema.sql`](database/schema.sql)
3. คัดลอก `.env.example` เป็น `.env.local` แล้วใส่ค่า `DATABASE_URL`, `JWT_SECRET` และ `ALLOWED_LOGIN_EMAIL`
4. รัน `npm install` จากนั้น `npm run dev` และเปิด `http://localhost:3000`

ตัวอย่างรูปแบบ URL:

```env
DATABASE_URL=mysql://USER:PERCENT_ENCODED_PASSWORD@HOST:4000/dit205_db
DB_SSL=true
JWT_SECRET=สุ่มค่าใหม่อย่างน้อย-32-ตัวอักษร
```

ถ้ารหัสผ่านมีอักขระพิเศษ เช่น `@`, `:`, `/`, `#` หรือ `%` ให้ URL-encode เฉพาะรหัสผ่านก่อนใส่ใน URL ตัวอย่างเช่น `p@ss:word` เป็น `p%40ss%3Aword` สำหรับ TiDB Cloud ใช้ HOST, USERNAME และรหัสผ่านจากเมนู Connect, port `4000`; โค้ดจะเปิด TLS โดยตรวจ `.tidbcloud.com` ใน hostname หรือกำหนด `DB_SSL=true` เอง สำหรับ MySQL local ใช้ `mysql://root:password@127.0.0.1:3306/dit205_db` และ `DB_SSL=false`.

## Deploy to Vercel

1. สร้าง TiDB Cloud instance แล้วรัน `database/schema.sql` ใน SQL Editor
2. นำโค้ดขึ้น GitHub และตรวจว่า `.env.local` ไม่ถูก stage หรือ push
3. Import repository ใน Vercel และตั้ง Project Environment Variables: `DATABASE_URL`, `DB_SSL`, `JWT_SECRET`, `STUDENT_FIRST_NAME`, `STUDENT_LAST_NAME`, `STUDENT_ID`
4. ใช้ TiDB connection URL ที่ port `4000`, ตั้ง `DB_SSL=true` และสร้าง `JWT_SECRET` ใหม่ที่ไม่ซ้ำกับเครื่อง local
5. Deploy แล้วทดสอบ `/register`, `/login`, `/dashboard` และ Logout บน URL ของ Vercel

การตั้ง Environment Variables ใหม่บน Vercel ต้อง Redeploy จึงจะมีผล และห้าม commit `.env.local` หรือรหัสผ่านฐานข้อมูล

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## References

- [04 Login and Register with Next.js and MySQL](https://melivecode.com/th/article/dit205/04-auth-mysql)
- [05 Deploy Next.js on Vercel and MySQL on TiDB Cloud](https://melivecode.com/th/article/dit205/05-deploy-tidb-vercel)