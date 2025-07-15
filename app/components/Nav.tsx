'use client'; 
import { useState } from "react";
import { Music, Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Music className="w-8 h-8 text-neon animate-rgb-shift" />
              <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-cyan opacity-20 blur-md rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-neon">BeatZone</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              หน้าแรก
            </a>
            <a
              href="#beats"
              className="text-white hover:text-neon-cyan transition-colors duration-300"
            >
              บีทเพลง
            </a>
            <a
              href="#"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              หมวดหมู่
            </a>
            <a
              href="#"
              className="text-white hover:text-neon-cyan transition-colors duration-300"
            >
              เกี่ยวกับ
            </a>
            <a
              href="#"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              ติดต่อ
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <User className="w-5 h-5" />
            </Button>
            <Button className="neon-border bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold hover-glow">
              เข้าสู่ระบบ
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-neon-pink transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <a
                href="#"
                className="text-white hover:text-neon-pink transition-colors"
              >
                หน้าแรก
              </a>
              <a
                href="#beats"
                className="text-white hover:text-neon-cyan transition-colors"
              >
                บีทเพลง
              </a>
              <a
                href="#"
                className="text-white hover:text-neon-pink transition-colors"
              >
                หมวดหมู่
              </a>
              <a
                href="#"
                className="text-white hover:text-neon-cyan transition-colors"
              >
                เกี่ยวกับ
              </a>
              <a
                href="#"
                className="text-white hover:text-neon-pink transition-colors"
              >
                ติดต่อ
              </a>
              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" size="sm" className="hover:bg-white/10">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  ตะกร้า
                </Button>
                <Button className="neon-border bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold">
                  เข้าสู่ระบบ
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
