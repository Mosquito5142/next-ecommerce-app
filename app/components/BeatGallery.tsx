'use client'; 
import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, Edit, Plus } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import BeatCard from './BeatCard';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  price: number;
  imageUrl: string;
  beatUrl: string;
  status: string;
}

const BeatGallery = () => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ทั้งหมด');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genres = ['ทั้งหมด', 'Hip Hop', 'R&B', 'Pop', 'Electronic', 'Rock', 'Jazz', 'Trap'];

  // ดึงข้อมูลสินค้าจาก API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedGenre !== 'ทั้งหมด' && { genre: selectedGenre })
      });
      
      const response = await fetch(`/api/products?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.pagination.pages);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedGenre]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePlayToggle = (id: number) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  return (
    <section id="beats" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-4xl md:text-6xl font-bold text-neon">
              บีทเพลง
            </h2>
            <Link href="/addProduct">
              <Button className="bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold hover-glow">
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มสินค้าใหม่
              </Button>
            </Link>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            คอลเลกชั่นบีทเพลงคุณภาพสูงจากโปรดิวเซอร์ระดับโลก
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="ค้นหาบีทเพลง หรือศิลปิน..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-neon-pink"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => handleGenreChange(genre)}
                className={selectedGenre === genre 
                  ? "bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold" 
                  : "border-white/20 text-white hover:bg-white/10"
                }
              >
                {genre}
              </Button>
            ))}
          </div>

          {/* Advanced Filter Button */}
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            ตัวกรองเพิ่มเติม
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-400">
            พบ <span className="text-neon-cyan font-semibold">{products.length}</span> บีทเพลง
            {loading && " (กำลังโหลด...)"}
          </p>
        </div>

        {/* Beat Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-white text-xl">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product._id} className="relative group">
                <BeatCard
                  id={index + 1}
                  title={product.title}
                  artist={product.artist}
                  genre={product.genre}
                  duration={product.duration}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  isPlaying={currentPlaying === index + 1}
                  onPlayToggle={handlePlayToggle}
                />
                {/* Edit Button */}
                <Link href={`/editProduct/${product._id}`}>
                  <Button 
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white hover:bg-black/90"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <Button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              ก่อนหน้า
            </Button>
            
            <span className="flex items-center px-4 text-white">
              หน้า {page} จาก {totalPages}
            </span>
            
            <Button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              ถัดไป
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeatGallery;
