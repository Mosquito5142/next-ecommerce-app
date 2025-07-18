import {
  Music,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="relative bg-black/60 backdrop-blur-sm border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-neon-pink" />
              <span className="text-2xl font-bold text-neon">BeatZone</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              แพลตฟอร์มบีทเพลงออนไลน์ที่ให้คุณค้นพบและดาวน์โหลดเพลงคุณภาพสูงจากศิลปินระดับโลก
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-neon-pink/20 hover:text-neon-pink"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-neon-cyan/20 hover:text-neon-cyan"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-neon-pink/20 hover:text-neon-pink"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-neon-cyan/20 hover:text-neon-cyan"
              >
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">เมนูหลัก</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-pink transition-colors"
              >
                หน้าแรก
              </a>
              <a
                href="#beats"
                className="block text-gray-400 hover:text-neon-cyan transition-colors"
              >
                บีทเพลง
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-pink transition-colors"
              >
                หมวดหมู่
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-cyan transition-colors"
              >
                ศิลปิน
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-pink transition-colors"
              >
                ข่าวสาร
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">ช่วยเหลือ</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-cyan transition-colors"
              >
                คำถามที่พบบ่อย
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-pink transition-colors"
              >
                วิธีการชำระเงิน
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-cyan transition-colors"
              >
                นีโอกสิทธิ์การใช้งาน
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-pink transition-colors"
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-neon-cyan transition-colors"
              >
                เงื่อนไขการใช้งาน
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">รับข่าวสาร</h3>
            <p className="text-gray-400 text-sm">
              สมัครรับข้อมูลบีทเพลงใหม่ล่าสุดและโปรโมชั่นพิเศษ
            </p>
            <div className="space-y-3">
              <Input
                placeholder="อีเมลของคุณ..."
                className="bg-black/20 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button className="w-full bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold">
                สมัครรับข่าวสาร
              </Button>
            </div>

            {/* Contact Info */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@beatzone.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+66 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>กรุงเทพมหานคร, ประเทศไทย</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 BeatZone. สงวนลิขสิทธิ์ทุกประการ
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                นโยบายความเป็นส่วนตัว
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
              >
                เงื่อนไขการใช้งาน
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-pink transition-colors"
              >
                คุกกี้
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
