'use client';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AdminProtected = ({ children, fallback }: AdminProtectedProps) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isAdmin()) {
      router.push('/');
    }
  }, [user, isAdmin, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            กรุณาเข้าสู่ระบบ
          </h2>
          <p className="text-gray-400 mb-6">
            คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้านี้
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold px-6 py-3 rounded-lg"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ไม่มีสิทธิ์เข้าถึง
          </h2>
          <p className="text-gray-400 mb-6">
            คุณต้องเป็นผู้ดูแลระบบเพื่อเข้าถึงหน้านี้
          </p>
          <button 
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-neon-pink to-neon-cyan text-black font-semibold px-6 py-3 rounded-lg"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtected;
