import React, { useState, useEffect } from 'react';
import {
  Search,
  Home,
  User,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  ChevronLeft,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';

// --- Data Mock (Data Buatan) ---
const CATEGORIES = [
  { id: 'all', name: 'Semua', icon: '🕌' },
  { id: 'tauhid', name: 'Ahli Tauhid', icon: '🛡️' },
  { id: 'tafsir', name: 'Ahli Tafsir', icon: '📖' },
  { id: 'fiqh', name: 'Ahli Fiqh', icon: '⚖️' },
  { id: 'khatib', name: 'Khatib Jumat', icon: '🎙️' },
  { id: 'hadits', name: 'Ahli Hadits', icon: '📜' },
  { id: 'quran', name: 'Ahli Quran', icon: '✨' },
];

const USTADZ_DATA = [
  {
    id: 1,
    name: 'Ustadz H. Ahmad Zulkarnain, Lc., MA',
    category: 'tafsir',
    categoryLabel: 'Ahli Tafsir',
    location: 'Jakarta Selatan',
    rating: 4.9,
    reviews: 120,
    price: 'Rp 1.500.000 / Sesi',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad&backgroundColor=c0aede',
    bio: 'Lulusan Universitas Al-Azhar Kairo. Memiliki spesialisasi dalam Tafsir Al-Quran kontemporer dan sering mengisi kajian perkantoran.',
    schedule: ['Senin', 'Rabu', 'Jumat'],
  },
  {
    id: 6,
    name: 'Ustadz Dr. Khalid Basalamah',
    category: 'tauhid',
    categoryLabel: 'Ahli Tauhid',
    location: 'Jakarta Pusat',
    rating: 5.0,
    reviews: 350,
    price: 'Infaq Sukarela',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid&backgroundColor=b6e3f4',
    bio: 'Fokus pada penguatan aqidah dan tauhid yang murni berdasarkan Al-Quran dan Sunnah. Dikenal dengan penyampaian yang lugas dan ilmiah.',
    schedule: ['Sabtu', 'Minggu'],
  },
  {
    id: 2,
    name: 'KH. Abdullah Faqih',
    category: 'fiqh',
    categoryLabel: 'Ahli Fiqh',
    location: 'Bandung',
    rating: 4.8,
    reviews: 98,
    price: 'Infaq Sukarela',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah&backgroundColor=b6e3f4',
    bio: 'Pengasuh Pondok Pesantren di Bandung. Fokus pada Fiqh Muamalah dan masalah keluarga sakinah.',
    schedule: ['Sabtu', 'Minggu'],
  },
  {
    id: 3,
    name: 'Ustadz Faisal Hanif, S.Ud',
    category: 'khatib',
    categoryLabel: 'Khatib Jumat',
    location: 'Surabaya',
    rating: 4.7,
    reviews: 45,
    price: 'Rp 750.000 / Khutbah',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal&backgroundColor=ffdfbf',
    bio: 'Khatib muda dengan penyampaian yang energik, relevan dengan gen-Z dan milenial.',
    schedule: ['Jumat'],
  },
  {
    id: 4,
    name: 'Ustadzah Fatimah Zahra, Lc',
    category: 'quran',
    categoryLabel: 'Ahli Quran',
    location: 'Malang',
    rating: 4.9,
    reviews: 67,
    price: 'Rp 500.000 / Sesi',
    avatar:
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah&backgroundColor=ffdfbf',
    bio: 'Spesialis dalam perbaikan bacaan (Tahsin) dan hafalan Al-Quran untuk dewasa maupun anak-anak.',
    schedule: ['Selasa', 'Kamis'],
  },
];

// --- Komponen Antarmuka ---

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className='fixed inset-0 bg-emerald-700 flex flex-col items-center justify-center text-white z-50'>
      <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 animate-bounce'>
        <span className='text-4xl'>🕌</span>
      </div>
      <h1 className='text-3xl font-bold tracking-wider'>
        Cari<span className='text-yellow-400'>Ustadz</span>
      </h1>
      <p className='text-emerald-200 mt-2 text-sm'>Hubungkan Kebaikan</p>
    </div>
  );
};

const LoginScreen = ({ onLogin, onSwitchToRegister }) => {
  return (
    <div className='min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-6 py-12 w-full'>
      <div className='w-full sm:max-w-md bg-white p-8 rounded-3xl shadow-xl border border-emerald-100'>
        <div className='text-center mb-10'>
          <div className='w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg text-3xl'>
            🕌
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Masuk Akun</h2>
          <p className='text-sm text-gray-500 mt-2'>
            Temukan pembimbing rohani Anda
          </p>
        </div>

        <form
          className='space-y-6'
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div>
            <label className='block text-sm font-medium text-gray-900'>
              Email
            </label>
            <input
              type='email'
              required
              className='mt-2 block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-emerald-600 outline-none'
              placeholder='nama@email.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-900'>
              Kata Sandi
            </label>
            <input
              type='password'
              required
              className='mt-2 block w-full rounded-xl border-gray-200 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-emerald-600 outline-none'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-95'
          >
            Masuk Sekarang
          </button>
        </form>

        <p className='mt-8 text-center text-sm text-gray-500'>
          Belum punya akun?{' '}
          <button
            onClick={onSwitchToRegister}
            className='font-semibold text-emerald-600 hover:text-emerald-500 underline'
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};

const RegisterScreen = ({ onRegister, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-6 py-8 w-full'>
      <div className='max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-emerald-100'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>Daftar Akun Baru</h2>
          <p className='text-sm text-gray-500 mt-1'>
            Lengkapi data diri Anda di bawah ini
          </p>
        </div>

        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            onRegister();
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Nama Depan
              </label>
              <input
                type='text'
                required
                className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none'
                placeholder='Contoh: Ahmad'
              />
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Nama Belakang
              </label>
              <input
                type='text'
                required
                className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none'
                placeholder='Contoh: Fulan'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Alamat Lengkap
            </label>
            <textarea
              rows={2}
              required
              className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none'
              placeholder='Alamat rumah tinggal saat ini'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                No. Handphone
              </label>
              <input
                type='tel'
                required
                className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none'
                placeholder='0812XXXXXXXX'
              />
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                required
                className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none'
                placeholder='nama@email.com'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Kata Sandi
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className='w-full rounded-xl border-gray-200 bg-gray-50 border py-2.5 px-3 text-sm pr-10 focus:ring-2 focus:ring-emerald-500 outline-none'
                placeholder='Minimal 8 karakter'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full mt-4 rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500 transition-all active:scale-95'
          >
            Daftar Sekarang
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Sudah punya akun?{' '}
          <button
            onClick={onSwitchToLogin}
            className='font-semibold text-emerald-600 hover:text-emerald-500 underline'
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
};

const UstadzCard = ({ data, onClick }) => (
  <div
    onClick={() => onClick(data)}
    className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 transition-all cursor-pointer hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1'
  >
    <img
      src={data.avatar}
      alt={data.name}
      className='w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 object-cover'
    />
    <div className='flex-1'>
      <div className='flex justify-between items-start'>
        <span className='bg-emerald-50 text-emerald-700 text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider'>
          {data.categoryLabel}
        </span>
        <div className='flex items-center text-yellow-500 text-xs font-bold'>
          <Star size={14} className='fill-current mr-1' />
          {data.rating}
        </div>
      </div>
      <h3 className='font-bold text-gray-800 mt-1 md:text-lg line-clamp-1'>
        {data.name}
      </h3>
      <div className='flex items-center text-gray-500 text-xs mt-1'>
        <MapPin size={14} className='mr-1 text-gray-400' />
        {data.location}
      </div>
      <div className='flex items-center justify-between mt-3'>
        <span className='text-sm font-bold text-emerald-600'>{data.price}</span>
        <span className='text-gray-400 text-[10px] md:text-xs font-semibold flex items-center group'>
          Detail{' '}
          <ArrowRight
            size={14}
            className='ml-1 transition-transform group-hover:translate-x-1'
          />
        </span>
      </div>
    </div>
  </div>
);

const DetailView = ({ data, onBack }) => {
  if (!data) return null;
  return (
    <div className='min-h-screen bg-gray-50 pb-24 md:pb-10 w-full flex justify-center'>
      <div className='max-w-4xl w-full bg-white md:mt-8 md:rounded-3xl md:shadow-2xl overflow-hidden border border-gray-100 h-fit'>
        <div className='h-44 md:h-64 bg-emerald-700 relative'>
          <button
            onClick={onBack}
            className='absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2.5 rounded-xl text-white hover:bg-white/40 transition-all z-10'
          >
            <ChevronLeft size={24} />
          </button>
          <div className='absolute -bottom-12 left-6 md:left-10'>
            <img
              src={data.avatar}
              alt={data.name}
              className='w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white bg-white shadow-xl'
            />
          </div>
        </div>

        <div className='mt-16 md:mt-20 px-6 md:px-10 pb-10'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                {data.name}
              </h1>
              <p className='text-emerald-600 font-bold text-lg'>
                {data.categoryLabel}
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-center bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100 shadow-sm'>
                <p className='text-yellow-600 font-black text-xl flex items-center justify-center'>
                  <Star size={20} className='fill-current mr-1' /> {data.rating}
                </p>
                <p className='text-[10px] font-bold text-gray-500 uppercase tracking-tighter'>
                  {data.reviews} Ulasan
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <h3 className='font-bold text-gray-900 text-lg mb-3'>
                Profil Singkat
              </h3>
              <p className='text-gray-600 text-base leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 italic'>
                "{data.bio}"
              </p>

              <h3 className='font-bold text-gray-900 text-lg mt-8 mb-4'>
                Informasi Tambahan
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4'>
                  <div className='w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600'>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-gray-400 uppercase'>
                      Lokasi
                    </p>
                    <p className='font-bold text-sm'>{data.location}</p>
                  </div>
                </div>
                <div className='bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4'>
                  <div className='w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600'>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className='text-[10px] font-bold text-gray-400 uppercase'>
                      Jadwal
                    </p>
                    <p className='font-bold text-sm'>
                      {data.schedule.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-emerald-50 rounded-3xl p-6 h-fit border border-emerald-100 shadow-sm'>
              <h3 className='font-bold text-emerald-900 mb-4'>Biaya Layanan</h3>
              <p className='text-3xl font-black text-emerald-700 mb-6'>
                {data.price}
              </p>
              <div className='space-y-3'>
                <button className='w-full bg-white text-emerald-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all'>
                  <MessageCircle size={18} /> Chat Sekarang
                </button>
                <button className='w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all'>
                  Undang Ustadz
                </button>
              </div>
              <p className='text-[10px] text-emerald-600/70 text-center mt-4 italic'>
                *Syarat dan ketentuan berlaku
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Utama ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedUstadz, setSelectedUstadz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  if (!isLoggedIn) {
    return authMode === 'login' ? (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onSwitchToRegister={() => setAuthMode('register')}
      />
    ) : (
      <RegisterScreen
        onRegister={() => setIsLoggedIn(true)}
        onSwitchToLogin={() => setAuthMode('login')}
      />
    );
  }

  const filteredUstadz = USTADZ_DATA.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || u.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderContent = () => {
    if (selectedUstadz) {
      return (
        <DetailView
          data={selectedUstadz}
          onBack={() => setSelectedUstadz(null)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className='max-w-6xl mx-auto w-full space-y-8 py-8 px-4 md:px-10 pb-24 md:pb-12 animate-in fade-in duration-500'>
            {/* Header Desktop vs Mobile */}
            <header className='bg-emerald-700 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-64 h-64 bg-emerald-600/30 rounded-full -mr-20 -mt-20 blur-3xl'></div>
              <div className='relative z-10'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8'>
                  <div>
                    <p className='text-emerald-100 text-sm md:text-lg mb-1'>
                      Assalamu'alaikum,
                    </p>
                    <h1 className='text-3xl md:text-5xl font-black'>
                      Ahmad Fulan
                    </h1>
                  </div>
                  <div className='hidden md:flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20'>
                    <div className='text-right'>
                      <p className='text-xs font-bold text-emerald-100 uppercase'>
                        Status Akun
                      </p>
                      <p className='font-bold'>Jamaah Aktif</p>
                    </div>
                    <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                      <User size={24} />
                    </div>
                  </div>
                </div>
                <div className='bg-white/15 backdrop-blur-xl p-4 md:p-5 rounded-3xl flex items-center gap-4 border border-white/30 shadow-inner max-w-2xl'>
                  <Search className='text-emerald-100' size={24} />
                  <input
                    type='text'
                    placeholder='Cari nama ustadz, kajian, atau spesialisasi...'
                    className='bg-transparent border-none outline-none text-white placeholder-emerald-200 w-full text-base md:text-lg font-medium'
                    onFocus={() => setActiveTab('search')}
                  />
                </div>
              </div>
            </header>

            {/* Kategori */}
            <section>
              <h2 className='font-black text-gray-800 mb-6 text-xl md:text-2xl flex items-center gap-3'>
                <span className='w-2 h-8 bg-emerald-600 rounded-full'></span>
                Kategori Keilmuan
              </h2>
              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4'>
                {CATEGORIES.slice(1).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setFilterCategory(cat.id);
                      setActiveTab('search');
                    }}
                    className='flex flex-col items-center gap-3 cursor-pointer group'
                  >
                    <div className='w-full aspect-square bg-white rounded-3xl shadow-sm flex items-center justify-center text-3xl md:text-4xl border border-gray-100 group-hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-100 group-hover:-translate-y-1 transition-all'>
                      {cat.icon}
                    </div>
                    <span className='text-[11px] md:text-xs font-black text-gray-600 group-hover:text-emerald-700 uppercase tracking-tighter text-center'>
                      {cat.name.replace('Ahli ', '')}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rekomendasi */}
            <section>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='font-black text-gray-800 text-xl md:text-2xl flex items-center gap-3'>
                  <span className='w-2 h-8 bg-emerald-600 rounded-full'></span>
                  Rekomendasi Terbaik
                </h2>
                <button
                  onClick={() => setActiveTab('search')}
                  className='text-sm text-emerald-600 font-bold hover:underline'
                >
                  Lihat Semua Ustadz
                </button>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {USTADZ_DATA.map((ustadz) => (
                  <UstadzCard
                    key={ustadz.id}
                    data={ustadz}
                    onClick={setSelectedUstadz}
                  />
                ))}
              </div>
            </section>
          </div>
        );

      case 'search':
        return (
          <div className='min-h-screen bg-gray-50 flex flex-col max-w-6xl mx-auto w-full md:py-8 md:px-6'>
            <div className='bg-white p-6 md:rounded-3xl shadow-xl border border-gray-100 sticky top-0 md:relative z-20'>
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                <h2 className='font-black text-2xl'>Cari Pembicara</h2>
                <div className='relative flex-1 max-w-md'>
                  <Search
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                    size={20}
                  />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Ketik nama atau spesialisasi...'
                    className='w-full bg-gray-50 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all'
                  />
                </div>
              </div>
              <div className='flex gap-2 overflow-x-auto pb-2 hide-scrollbar'>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                      filterCategory === cat.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100 scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className='p-4 md:p-0 md:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {filteredUstadz.length > 0 ? (
                filteredUstadz.map((ustadz) => (
                  <UstadzCard
                    key={ustadz.id}
                    data={ustadz}
                    onClick={setSelectedUstadz}
                  />
                ))
              ) : (
                <div className='col-span-full text-center py-32 text-gray-400'>
                  <div className='text-7xl mb-6'>🔍</div>
                  <h3 className='text-xl font-bold text-gray-600'>
                    Pencarian Tidak Ditemukan
                  </h3>
                  <p className='mt-2 text-sm max-w-xs mx-auto'>
                    Coba gunakan kata kunci lain atau ubah kategori filter Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className='min-h-screen bg-gray-50 flex flex-col items-center p-6 pb-24 max-w-2xl mx-auto w-full'>
            <div className='mt-12 mb-10 flex flex-col items-center'>
              <div className='w-28 h-28 bg-emerald-100 rounded-3xl flex items-center justify-center text-5xl shadow-xl border-4 border-white transform rotate-3'>
                👤
              </div>
              <h2 className='text-2xl font-black mt-6'>Ahmad Fulan</h2>
              <p className='text-gray-500 font-medium'>ahmad.fulan@email.com</p>
            </div>

            <div className='w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>
              {[
                { label: 'Riwayat Undangan', icon: <Calendar size={18} /> },
                { label: 'Ustadz Favorit', icon: <Star size={18} /> },
                { label: 'Pengaturan Akun', icon: <User size={18} /> },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='p-5 border-b border-gray-50 flex items-center justify-between hover:bg-emerald-50 cursor-pointer transition-colors group'
                >
                  <div className='flex items-center gap-4'>
                    <div className='text-emerald-600'>{item.icon}</div>
                    <span className='text-sm font-bold text-gray-700'>
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className='text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all'
                  />
                </div>
              ))}

              <button
                onClick={() => setIsLoggedIn(false)}
                className='w-full p-6 flex items-center justify-between text-red-500 hover:bg-red-50 transition-colors'
              >
                <span className='text-sm font-bold flex items-center gap-3 italic'>
                  <LogOut size={18} /> Keluar Dari Sesi
                </span>
                <ChevronLeft className='rotate-180' size={18} />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='bg-emerald-50 min-h-screen font-sans flex flex-col items-center'>
      {/* Navbar Desktop */}
      <div className='hidden md:flex bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 py-4 px-10 items-center justify-center w-full'>
        <div className='max-w-6xl w-full flex items-center justify-between'>
          <div
            className='flex items-center gap-3 cursor-pointer'
            onClick={() => {
              setActiveTab('home');
              setSelectedUstadz(null);
            }}
          >
            <div className='bg-emerald-600 p-2 rounded-xl text-white font-bold'>
              🕌
            </div>
            <h1 className='text-xl font-black text-emerald-800 tracking-tight'>
              Cari<span className='text-yellow-500'>Ustadz</span>
            </h1>
          </div>
          <div className='flex items-center gap-8'>
            <button
              onClick={() => {
                setActiveTab('home');
                setSelectedUstadz(null);
              }}
              className={`text-sm font-bold flex items-center gap-2 ${
                activeTab === 'home'
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-500'
              }`}
            >
              <Home size={18} /> Beranda
            </button>
            <button
              onClick={() => {
                setActiveTab('search');
                setSelectedUstadz(null);
              }}
              className={`text-sm font-bold flex items-center gap-2 ${
                activeTab === 'search'
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-500'
              }`}
            >
              <Search size={18} /> Eksplorasi
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setSelectedUstadz(null);
              }}
              className={`text-sm font-bold flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'text-emerald-600'
                  : 'text-gray-500 hover:text-emerald-500'
              }`}
            >
              <User size={18} /> Profil
            </button>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className='flex-1 w-full flex flex-col items-center'>
        {renderContent()}
      </div>

      {/* Navbar Mobile Only */}
      {!selectedUstadz && (
        <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-4 z-40 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]'>
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1.5 w-1/3 ${
              activeTab === 'home' ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <Home size={22} strokeWidth={activeTab === 'home' ? 3 : 2} />
            <span className='text-[10px] font-bold uppercase tracking-tighter'>
              Beranda
            </span>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1.5 w-1/3 ${
              activeTab === 'search' ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                activeTab === 'search' ? 'bg-emerald-50' : ''
              }`}
            >
              <Search size={22} strokeWidth={activeTab === 'search' ? 3 : 2} />
            </div>
            <span className='text-[10px] font-bold uppercase tracking-tighter'>
              Cari
            </span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1.5 w-1/3 ${
              activeTab === 'profile' ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            <User size={22} strokeWidth={activeTab === 'profile' ? 3 : 2} />
            <span className='text-[10px] font-bold uppercase tracking-tighter'>
              Profil
            </span>
          </button>
        </nav>
      )}

      <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .pb-safe { padding-bottom: env(safe-area-inset-bottom, 12px); }
        `}</style>
    </div>
  );
}
