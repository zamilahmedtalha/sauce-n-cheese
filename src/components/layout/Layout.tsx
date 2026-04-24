import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { GlassFlowCursor } from '../ui/GlassFlowCursor';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F5] selection:bg-pri selection:text-white">
      <GlassFlowCursor />
      <Toaster position="bottom-right" richColors theme="dark" />
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
