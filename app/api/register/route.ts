import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { username, email, password, role = 'user' } = await request.json();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!username || !email || !password) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }
    
    // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return NextResponse.json({ error: "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้ว" }, { status: 400 });
    }
    
    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // สร้างผู้ใช้ใหม่
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });
    
    await user.save();
    
    // ส่งคืนข้อมูลผู้ใช้ (ไม่รวมรหัสผ่าน)
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    return NextResponse.json({
      message: "ลงทะเบียนสำเร็จ",
      user: userWithoutPassword
    }, { status: 201 });
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการลงทะเบียน" }, { status: 500 });
  }
}
