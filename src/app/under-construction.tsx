import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-extrabold text-base_semi_purple mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">Under Construction</h1>
        <p className="text-lg text-white mb-8">
          Halaman Sedang Masa Pengembangan
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/" 
            className="px-6 py-3 bg-white text-base_semi_purple font-medium rounded-lg hover:bg-gray-400 transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link 
            href="/" 
            className="px-6 py-3 border border-gray-300 font-medium rounded-lg hover:bg-base_semi_purple transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}