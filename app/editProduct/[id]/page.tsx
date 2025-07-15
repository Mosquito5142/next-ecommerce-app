"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [beatUrl, setBeatUrl] = useState<string>("");
  const [status, setStatus] = useState<string>("available");
  const [loading, setLoading] = useState<boolean>(true);
  
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  // ดึงข้อมูลสินค้าเมื่อโหลดหน้า
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        
        if (response.ok) {
          const product = await response.json();
          setTitle(product.title);
          setArtist(product.artist);
          setGenre(product.genre);
          setDuration(product.duration);
          setPrice(product.price);
          setImageUrl(product.imageUrl);
          setBeatUrl(product.beatUrl);
          setStatus(product.status);
        } else {
          alert('ไม่พบสินค้าที่ต้องการแก้ไข');
          router.push('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        title,
        artist,
        genre,
        duration,
        price,
        imageUrl,
        beatUrl,
        status
      };
      
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        alert('อัพเดทสินค้าสำเร็จ!');
        router.push('/products');
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('เกิดข้อผิดพลาดในการอัพเดทสินค้า');
    }
  };

  const handleDelete = async () => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('ลบสินค้าสำเร็จ!');
          router.push('/products');
        } else {
          const errorData = await response.json();
          alert(`เกิดข้อผิดพลาด: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <p className="text-white text-xl">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">แก้ไขสินค้า</h1>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          ลบสินค้า
        </button>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-white text-sm font-bold mb-2"
          >
            ชื่อสินค้า:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="artist"
            className="block text-white text-sm font-bold mb-2"
          >
            ศิลปิน:
          </label>
          <input
            type="text"
            id="artist"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="genre"
            className="block text-white text-sm font-bold mb-2"
          >
            ประเภท:
          </label>
          <input
            type="text"
            id="genre"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="duration"
            className="block text-white text-sm font-bold mb-2"
          >
            ระยะเวลา:
          </label>
          <input
            type="text"
            id="duration"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="price"
            className="block text-white text-sm font-bold mb-2"
          >
            ราคา:
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-white text-sm font-bold mb-2"
          >
            URL รูปภาพ:
          </label>
          <input
            type="text"
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="beatUrl"
            className="block text-white text-sm font-bold mb-2"
          >
            URL บีท:
          </label>
          <input
            type="text"
            id="beatUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={beatUrl}
            onChange={(e) => setBeatUrl(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="status"
            className="block text-white text-sm font-bold mb-2"
          >
            สถานะ:
          </label>
          <select
            id="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">พร้อมจำหน่าย</option>
            <option value="unavailable">ไม่พร้อมจำหน่าย</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            อัพเดทสินค้า
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/products')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
