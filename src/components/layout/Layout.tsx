import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlassFlowCursor } from '../ui/GlassFlowCursor';
import { FuzzyOverlay } from '../ui/FuzzyOverlay';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F5] selection:bg-pri selection:text-white relative">
      <GlassFlowCursor />
      <FuzzyOverlay />
      <Toaster position="top-center" richColors theme="dark" />
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
