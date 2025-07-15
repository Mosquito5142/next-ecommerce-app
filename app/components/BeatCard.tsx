import { useState } from 'react';
import { Play, Pause, Download, Heart, ShoppingCart, Clock, User, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface BeatCardProps {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  price: number;
  imageUrl: string;
  isPlaying?: boolean;
  onPlayToggle: (id: number) => void;
}

const BeatCard = ({ id, title, artist, genre, duration, price, imageUrl, isPlaying, onPlayToggle }: BeatCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover-glow transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              onClick={() => onPlayToggle(id)}
              className="bg-neon-pink/90 hover:bg-neon-pink text-white rounded-full w-16 h-16 animate-pulse-neon"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Like Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 rounded-full w-10 h-10 ${
            isLiked ? 'bg-red-500/90 text-white' : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        {/* Genre Badge */}
        <Badge className="absolute top-3 left-3 bg-neon-cyan/90 text-black font-semibold">
          {genre}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-1 truncate">{title}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="truncate">{artist}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            <span>MP3/WAV</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-neon-pink">
            ฿{price}
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold">
              <ShoppingCart className="w-4 h-4 mr-1" />
              ซื้อ
            </Button>
          </div>
        </div>
      </div>

      {/* Playing Indicator */}
      {isPlaying && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan">
          <div className="h-full bg-white/50 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default BeatCard;
