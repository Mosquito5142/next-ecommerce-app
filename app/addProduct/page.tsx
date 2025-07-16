"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddProductPage() {
  // typescript
  type Product = {
    title: string;
    artist: string;
    genre: string;
    duration: string;
    price: number;
    imageUrl: string;
    beatUrl: string;
    status: string; // เช่น 'available', 'unavailable', 'draft'
  };

  const [title, setTitle] = useState<Product["title"]>("");
  const [artist, setArtist] = useState<Product["artist"]>("");
  const [genre, setGenre] = useState<Product["genre"]>("");
  const [duration, setDuration] = useState<Product["duration"]>("");
  const [price, setPrice] = useState<Product["price"]>(0);
  const [imageUrl, setImageUrl] = useState<Product["imageUrl"]>("");
  const [beatUrl, setBeatUrl] = useState<Product["beatUrl"]>("");
  const [status, setStatus] = useState<Product["status"]>("available");
  const router = useRouter();

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
        status,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("เพิ่มสินค้าสำเร็จ!");
        // รีเซ็ตฟอร์ม
        setTitle("");
        setArtist("");
        setGenre("");
        setDuration("");
        setPrice(0);
        setImageUrl("");
        setBeatUrl("");
        setStatus("available");

        // นำทางไปหน้าสินค้า
        router.push("/products");
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  // ... inside AddProductPage component ...
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">เพิ่มสินค้าใหม่</h1>
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          บันทึกสินค้า
        </button>
      </form>
    </div>
  );
}
