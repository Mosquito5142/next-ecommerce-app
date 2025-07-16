import { Play, Download, Headphones } from 'lucide-react';
import { Button } from './ui/button';
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-pink/20 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-floating" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-neon leading-tight">
            BEAT
            <span className="block">ZONE</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            ค้นพบบีทเพลงคุณภาพสูง เสียงใส ระดับโปรดิวเซอร์ 
            <span className="text-neon-cyan"> พร้อมสร้างสรรค์เพลงในฝัน</span>
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-pink">10K+</div>
              <div className="text-sm text-gray-400">บีทเพลง</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan">5K+</div>
              <div className="text-sm text-gray-400">ศิลปิน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple">100K+</div>
              <div className="text-sm text-gray-400">ดาวน์โหลด</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="neon-border text-white font-semibold hover-glow px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2" />
              เริ่มฟังเลย
            </Button>
            <Button size="lg" variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              ดาวน์โหลดฟรี
            </Button>
          </div>

          {/* Featured Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 glow-box">
            <Headphones className="w-5 h-5 text-neon-pink animate-pulse" />
            <span className="text-white">บีทเพลงใหม่ล่าสุดทุกวัน</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-pink rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;