import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { username, password } = await request.json();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !password) {
      return NextResponse.json({ error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" }, { status: 400 });
    }
    
    // ค้นหาผู้ใช้
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });
    
    if (!user) {
      return NextResponse.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }
    
    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }
    
    // ส่งคืนข้อมูลผู้ใช้ (ไม่รวมรหัสผ่าน)
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    return NextResponse.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user: userWithoutPassword
    }, { status: 200 });
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" }, { status: 500 });
  }
}
