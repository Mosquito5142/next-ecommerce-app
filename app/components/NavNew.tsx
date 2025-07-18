'use client'; 
import { useState } from "react";
import { Music, Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

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
            <Link
              href="/"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              หน้าแรก
            </Link>
            <Link
              href="#beats"
              className="text-white hover:text-neon-cyan transition-colors duration-300"
            >
              บีทเพลง
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              หมวดหมู่
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-neon-cyan transition-colors duration-300"
            >
              เกี่ยวกับ
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-neon-pink transition-colors duration-300"
            >
              ติดต่อ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-neon-cyan" />
                  <span className="text-white text-sm">{user.username}</span>
                  {isAdmin() && (
                    <span className="px-2 py-1 bg-neon-pink/20 text-neon-pink text-xs rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>
                <Button 
                  onClick={logout}
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-white/10"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="neon-border bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold hover-glow">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            )}
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
              <Link
                href="/"
                className="text-white hover:text-neon-pink transition-colors"
              >
                หน้าแรก
              </Link>
              <Link
                href="#beats"
                className="text-white hover:text-neon-cyan transition-colors"
              >
                บีทเพลง
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-neon-pink transition-colors"
              >
                หมวดหมู่
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-neon-cyan transition-colors"
              >
                เกี่ยวกับ
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-neon-pink transition-colors"
              >
                ติดต่อ
              </Link>
              
              <div className="flex flex-col space-y-4 pt-4">
                <Button variant="ghost" size="sm" className="hover:bg-white/10 justify-start">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  ตะกร้า
                </Button>
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-neon-cyan" />
                      <span className="text-white text-sm">{user.username}</span>
                      {isAdmin() && (
                        <span className="px-2 py-1 bg-neon-pink/20 text-neon-pink text-xs rounded-full">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={logout}
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-white/10 justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      ออกจากระบบ
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button className="neon-border bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold w-full">
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
