import { connectToDatabase } from '@/lib/mongodb';
import Product, { IProduct } from '@/models/products';
import { NextResponse } from 'next/server';

// GET - ดึงข้อมูลสินค้าทั้งหมด
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || '';
    
    // สร้าง filter สำหรับการค้นหา
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre && genre !== 'ทั้งหมด') {
      filter.genre = genre;
    }
    
    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await Product.countDocuments(filter);
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST - สร้างสินค้าใหม่
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'> = await request.json();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!body.title || !body.artist || !body.genre || !body.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const product = new Product(body);
    await product.save();
    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `Failed to create product: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create product due to an unknown error." }, { status: 500 });
  }
}
