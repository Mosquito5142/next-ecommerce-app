'use client'; 
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import BeatCard from './BeatCard';

const BeatGallery = () => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ทั้งหมด');

  const genres = ['ทั้งหมด', 'Hip Hop', 'R&B', 'Pop', 'Electronic', 'Rock', 'Jazz', 'Trap'];

  const beats = [
    {
      id: 1,
      title: "Midnight Vibes",
      artist: "DJ ProSound",
      genre: "Hip Hop",
      duration: "3:24",
      price: 299,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Neon Dreams",
      artist: "BeatMaker",
      genre: "Electronic",
      duration: "4:12",
      price: 399,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "City Lights",
      artist: "Urban Producer",
      genre: "R&B",
      duration: "3:45",
      price: 349,
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Thunder Storm",
      artist: "Storm Beats",
      genre: "Trap",
      duration: "2:58",
      price: 279,
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Summer Breeze",
      artist: "Chill Producer",
      genre: "Pop",
      duration: "3:33",
      price: 329,
      imageUrl: "https://images.unsplash.com/photo-1493748711230-013657b1cd38?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Deep Space",
      artist: "Cosmic Beats",
      genre: "Electronic",
      duration: "4:27",
      price: 449,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    },
    {
      id: 7,
      title: "Golden Hour",
      artist: "Sunset Studios",
      genre: "Jazz",
      duration: "5:15",
      price: 389,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      title: "Neon Pulse",
      artist: "Electric Mind",
      genre: "Electronic",
      duration: "3:52",
      price: 359,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop"
    }
  ];

  const handlePlayToggle = (id: number) => {
    setCurrentPlaying(currentPlaying === id ? null : id);
  };

  const filteredBeats = beats.filter(beat => {
    const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beat.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'ทั้งหมด' || beat.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

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
          <h2 className="text-4xl md:text-6xl font-bold text-neon mb-4">
            บีทเพลง
          </h2>
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                onClick={() => setSelectedGenre(genre)}
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
            พบ <span className="text-neon-cyan font-semibold">{filteredBeats.length}</span> บีทเพลง
          </p>
        </div>

        {/* Beat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => (
            <BeatCard
              key={beat.id}
              {...beat}
              isPlaying={currentPlaying === beat.id}
              onPlayToggle={handlePlayToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" className="neon-border bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold hover-glow">
            โหลดเพิ่มเติม
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeatGallery;